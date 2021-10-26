/**
 * Sever-side controllers for Notification.
 * By default, Yote's server controllers are dynamic relative
 * to their models -- i.e. if you add fields to the Notification
 * model, the create and update controllers below will respect
 * the new schema.
 *
 * NOTE: HOWEVER, you still need to make sure to account for
 * any model changes on the client
 */
const NotificationSchema = require('./NotificationModel');
const Notification = require('mongoose').model('Notification');
const YoteError = require('../../global/helpers/YoteError');
const apiUtils = require('../../global/api/apiUtils');


// Node event emitter. Info: https://nodejs.org/api/events.html#events_class_eventemitter
// Allows us to emit and listen for events and pass data around.
const events = require('events');
// init the emitter that we'll use to send notifications to the web front end
const NotificationEmitter = new events.EventEmitter();

// TODO: in theory, we could split "controller" into single/many/utils files
// any utility functions (internal facing only)

// util methods

/**
 * @param {string} link - ex: `/${user._id/resource/${resource._id}}`
 * @param {string} message - ex: "Some resource has been updated!"
 * @param {string} userId - Mongo user id of the user that this notification will be sent to.
 * @param {(err: string) => void} cb - The callback that handles the response.
 */
exports.utilCreate = async ({ link, message, userId }, cb = () => {}) => {
  console.log('creating new notification');
  const newNotification = new Notification({
    link: link
    , message: message
    , _user: userId
  });
  const notification = await newNotification.save().catch(err => {
    console.log(err);
    cb(err);
  });
  // new notification. Emit a new event with the user id.
  // If the user is subscribed they will receive the notification
  // If the user isn't subscribed then nothing will happen.
  // TODO: add mobile notifications
  // notificationUtils.sendPush(notification._user, notification.message); 
  NotificationEmitter.emit(notification._user, notification);
  cb();
}

// end util methods

// single api functions
exports.getSingleById = async (req, res) => {
  const notification = await Notification.findById(req.params.id).catch(err => {
    console.log(err);
    throw new YoteError("Error finding Notification", 404);
  });
  if(!notification) throw new YoteError("Could not find matching Notification", 404);
  res.json(notification);
}

exports.updateSingleById = async (req, res) => {
  let oldNotification = await Notification.findById(req.params.id).catch(err => {
    console.log(err);
    throw new YoteError("Error finding Notification", 404);
  });
  if(!oldNotification) throw new YoteError("Could not find matching Notification", 404);
  oldNotification = Object.assign(oldNotification, req.body);
  const notification = await oldNotification.save().catch(err => {
    console.log(err);
    throw new YoteError("Could not update Notification", 404);
  });
  res.json(notification);
}

exports.deleteSingle = async (req, res) => {
  const oldNotification = await Notification.findById(req.params.id).catch(err => {
    console.log(err);
    throw new YoteError("Error finding Notification", 404);
  });
  if(!oldNotification) throw new YoteError("Could not find matching Notification", 404);
  const deletedNotification = await oldNotification.remove().catch(err => {
    console.log(err);
    throw new YoteError("There was a problem deleting this Notification", 404);
  });
  // console.log('notification deleted', deletedNotification);
  // return the deleted notification
  res.json(deletedNotification);
}

// list api functions
exports.getListWithArgs = async (req, res) => {
  const { query, pagination, sort } = apiUtils.buildMongoQueryFromUrlQuery(req.query);
  // restrict to only the logged in user's notifications
  query._user = req.user._id;
  // get count so we can determine total pages for front end to allow proper pagination
  const count = pagination ? await Notification.countDocuments(query) : null
  const totalPages = count && Math.ceil(count / pagination.per)
  const notifications = await Notification.find(query)
    .skip(pagination ? (pagination.page - 1) * pagination.per : null)
    .limit(pagination ? pagination.per : null)
    .sort(sort)
    .catch(err => {
      console.log(err);
      throw new YoteError("There was a problem finding Notification list", 404);
    });
  res.json({notifications, totalPages})
}

exports.subscribe = (req, res) => {
  // create an event listener for the loggedInUser so we can send new notifications
  // as they are created.
  // console.log('notification subscribe hit');
  // set headers to enable event-stream.
  // more info on these headers here: https://www.w3schools.com/html/html5_serversentevents.asp
  // the above link uses PHP for the example code. This link shows an example in node/express: https://stackoverflow.com/a/59041709
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Connection', 'keep-alive')
  // send headers to establish the stream.
  res.flushHeaders();

  // by default the server will close this connection after 2 minutes of inactivity and a new one will be opened.
  // this will keep the connection open until it is closed by the client.
  // res.connection.setTimeout(0);
  
  // set up an event listener for this user
  // this function will fire each time the event is triggered
  const sendNotification = notification => {
    // console.log('listener hit!');
    // data must be a string.
    res.write(`data: ${JSON.stringify(notification)}\n\n`)
    // flush sends the data without closing the connection
    res.flush();
  }
  // add a listener for this user's id.
  NotificationEmitter.addListener(req.user.id, sendNotification)

  req.on('close', () => {
    // console.log('connection closed by client!');
    // client closed the connection, remove the listener
    NotificationEmitter.removeListener(req.user.id, sendNotification)
    // calling res.end() may not be necessary once the client closes the connection, but it doesn't throw any errors.
    res.end();
  })
}

exports.dismissList = async (req, res) => {
  console.log('dismissing notifications');
  const updateResult = await Notification.updateMany({
    _user: req.user._id
    , _id: { $in: req.body.notificationIds }
    , unread: true
  }, {
    $set: {
      unread: false
    }
  }).catch(err => {
    console.log(err);
    throw new YoteError("There was a problem dismissing notifications", 404);
  });
  // send the update result I guess. Not important to the front end since we optimistically update the store when the action is dispatched.
  res.json(updateResult);
}

// // used to test push notifications on web
// exports.test = (req, res) => {
//   console.log('sending');
//   this.utilCreate({
//     link: '/test'
//     , message: "here goes!"
//     , userId: req.user._id
//   })
//   res.end('Sent!')
// }