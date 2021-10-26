/**
 * CRUD API for Notification.
 *
 */

const notification = require('./notificationController')

const { requireLogin, requireAccountAccess } = require('../../global/handlers/authHandler')

module.exports = (router) => {

  router.get('/api/notifications/test', requireLogin, notification.test);
  router.get('/api/notifications/subscribe', requireLogin, notification.subscribe);
  router.get('/api/notifications/:id', requireLogin, notification.getSingleById)

  router.get('/api/notifications', requireLogin, notification.getListWithArgs)

  // // same but with api level restrictions
  // router.get('/api/notifications', 
  //   requireLogin, 
  //   requireAccountAccess, 
  //   notification.getListWithArgs
  // )

  router.put('/api/notifications/dismiss-list', requireLogin, notification.dismissList);
  router.put('/api/notifications/:id', requireLogin, notification.updateSingleById);

  router.delete('/api/notifications/:id', requireLogin, notification.deleteSingle);

}