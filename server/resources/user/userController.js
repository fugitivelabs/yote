
const User = require('mongoose').model('User');
const YoteError = require('../../global/helpers/YoteError');
const apiUtils = require('../../global/api/apiUtils')

// TODO: in theory, we could split "controller" into single/many/utils files
// any utility functions (internal facing only)

// single api functions
exports.getSingleById = async (req, res) => {
  const user = await User.findById(req.params.id)
  if(!user) {
    throw new YoteError("Could not find matching User", 404)
  }
  // res.json(user)
  res.send({success: true, user})
}

exports.createSingle = async (req, res) => {
  let newUser = new User(req.body)
  const user = await newUser.save()
  res.json(user)
}

exports.updateSingleById = async (req, res) => {
  let oldUser = await User.findById(req.params.id)
  if(!oldUser) {
    throw new YoteError("Could not find matching User", 404)
  }
  oldUser = Object.assign(oldUser, req.body)
  const user = await oldUser.save()
  res.json(user)

}

exports.deleteSingle = async (req, res) => {
  // todo: need to test
  const oldUser = await User.findById(req.params.id)
  if(!oldUser) {
    throw new YoteError("Could not find matching User", 404)
  }
  const deletedCount = oldUser.remove()
  res.json()

}

exports.getDefault = async (req, res) => {
  res.send({success: true, defaultObj: User.getDefault()});
}

// list api functions
exports.getListWithArgs = async (req, res) => {
  // console.log(req.params)
  const { query, pagination, sort } = apiUtils.buildMongoQueryFromUrlQuery(req.query);
  // console.log("after parse", query, pagination, sort)
  const users = await User.find(query)
    .skip(pagination ? (pagination.page-1)*pagination.per : null)
    .limit(pagination ? pagination.per : null)
    .sort(sort)
  res.json(users)
}


// other experimental/future todos
exports.getSingleByArgs = async (req, res) => {}
exports.bulkUpdate = async (req, res) => {}