const product = require('./productController')

const { requireLogin, requireAccountAccess } = require('../../global/handlers/authHandler')

module.exports = (router) => {

  router.get('/api/products/default', product.getDefault)
  router.get('/api/products/:id', product.getSingleById)

  router.get('/api/products', 
    requireLogin, 
    requireAccountAccess, 
    product.getListWithArgs
  )

  router.post('/api/products', requireLogin, product.createSingle)

  router.put('/api/products/:id', product.updateSingleById)

}