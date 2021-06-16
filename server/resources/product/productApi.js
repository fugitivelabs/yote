const ProductSchema = require('./ProductModel')

const product = require('./productController')

module.exports = (router) => {

  router.get('/api/products/:id', product.getSingleById)
  router.get('/api/products', product.getListWithArgs)
}