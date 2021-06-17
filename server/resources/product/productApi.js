const ProductSchema = require('./ProductModel')

const product = require('./productController')

module.exports = (router) => {

  router.get('/api/products/:id', product.getSingleById)
  router.get('/api/products', product.getListWithArgs)

  router.post('/api/products', product.createSingle)

  router.put('/api/products/:id', product.updateSingleById)

}