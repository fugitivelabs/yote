
const User = require('mongoose').model('User');
const YoteError = require('../../global/helpers/YoteError');
const apiUtils = require('../../global/api/apiUtils')

// TODO: in theory, we could split "controller" into single/many/utils files
// any utility functions (internal facing only)

// single api functions
exports.getSingleById = async (req, res) => {
  const user = await User.findById(req.params.id).catch(err => {
    console.log(err)
    throw new YoteError("Error finding this User", 404)
  })
  if(!user) throw new YoteError("Could not find matching User", 404)
  res.json(user)
}

exports.createSingle = async (req, res) => {
  const newUser = new User(req.body)
  const user = await newUser.save().catch(err => {
    console.log(err)
    throw new YoteError("Error creating User", 404)
  })
  if(!user) throw new YoteError("Could not create User", 404)
  res.json(user)
}

exports.updateSingleById = async (req, res) => {
  let oldUser = await User.findById(req.params.id).catch(err => {
    console.log(err)
    throw new YoteError("Error finding this User", 404)
  })
  if(!oldUser) throw new YoteError("Could not find matching User", 404)
  oldUser = Object.assign(oldUser, req.body)
  const user = await oldUser.save().catch(err => {
    console.log(err)
    throw new YoteError("Error updating this User", 404)
  })
  res.json(user)
}

exports.deleteSingle = async (req, res) => {
  // todo: need to test
  const oldUser = await User.findById(req.params.id).catch(err => {
    console.log(err)
    throw new YoteError("Error finding this User", 404)
  })
  if(!oldUser) throw new YoteError("Could not find matching User", 404)

  const deletedUser = oldUser.remove().catch(err => {
    console.log(err)
    throw new YoteError("There was a problem deleting this User", 404)
  })
  res.json(deletedUser)
}

exports.getDefault = async (req, res) => {
  const defaultUser = await User.getDefault();
  if(!defaultUser) throw new YoteError("Error finding default User", 404);
  res.json(defaultUser);
}

// list api functions
exports.getListWithArgs = async (req, res) => {
  // console.log(req.params)
  const { query, pagination, sort } = apiUtils.buildMongoQueryFromUrlQuery(req.query);
  // console.log("after parse", query, pagination, sort)
  const users = await User.find(query)
    .skip(pagination ? (pagination.page - 1) * pagination.per : null)
    .limit(pagination ? pagination.per : null)
    .sort(sort)
    .catch(err => {
      console.log(err)
      throw new YoteError("There was a problem finding Users", 404)
    })
  res.json(users)
}


// other experimental/future todos
exports.getSingleByArgs = async (req, res) => {}
exports.bulkUpdate = async (req, res) => {}