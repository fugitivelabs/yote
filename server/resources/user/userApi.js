// const UserSchema = require('./UserModel')
const standardUser = require('./userController')
const userSessions = require('./sessionController')

const { requireLogin, requireAccountAccess } = require('../../global/handlers/authHandler')

module.exports = (router) => {

  // sessions
  router.post(`/api/users/login`, userSessions.login)
  router.post('/api/users/register', userSessions.register)

  router.post('/api/users/logout', requireLogin, userSessions.logout)
  router.post('/api/users/get-logged-in', requireLogin, userSessions.getLoggedIn)
  // router.get('/api/users/get-logged-in', userSessions.getLoggedIn) // easier testing

  // passwords
  // router.post('/api/users/change-password', requireLogin, userSessions.changePassword);

  // router.post('/api/users/request-reset' , userSessions.requestReset);
  // router.post('/api/users/check-reset-token' , userSessions.checkResetToken);
  router.get('/api/users/request-reset/:email' , userSessions.requestReset);
  router.get('/api/users/check-reset-token/:token' , userSessions.checkResetToken);

  router.post('/api/users/reset-password', userSessions.resetPassword)

  // standard
  router.get('/api/users/default', standardUser.getDefault)
  router.get('/api/users/:id', standardUser.getSingleById)
  router.get('/api/users', standardUser.getListWithArgs)

  router.post('/api/users', standardUser.createSingle)

  router.put('/api/users/:id', standardUser.updateSingleById)
}