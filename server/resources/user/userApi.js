// const UserSchema = require('./UserModel')
const standardUser = require('./userController')
const userSessions = require('./sessionController')

const { requireLogin, requireAccountAccess } = require('../../global/handlers/authHandler')

module.exports = (router) => {

  // sessions
  router.post(`/api/users/login`, userSessions.login)
  router.post('/api/users/register', userSessions.register)
  router.post('/api/users/logout', requireLogin, userSessions.logout)
  router.post('/api/users/get-logged-in', userSessions.getLoggedIn)

  // standard
  router.get('/api/users/default', standardUser.getDefault)
  router.get('/api/users/:id', standardUser.getSingleById)
  router.get('/api/users', standardUser.getListWithArgs)

  router.post('/api/users', standardUser.createSingle)

  router.put('/api/users/:id', standardUser.updateSingleById)
}