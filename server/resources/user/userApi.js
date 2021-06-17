const UserSchema = require('./UserModel')
const user = require('./userController')

module.exports = (router) => {

  router.get('/api/users/default', user.getDefault)
  router.get('/api/users/:id', user.getSingleById)
  router.get('/api/users', user.getListWithArgs)

  router.post('/api/users', user.createSingle)

  router.put('/api/users/:id', user.updateSingleById)

}