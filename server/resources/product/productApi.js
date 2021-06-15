const ProductSchema = require('./ProductModel')

const product = require('./productController')

module.exports = (router) => {

  router.get('/api/products', product.getList)
}