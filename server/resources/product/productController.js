const ProductSchema = require('./ProductModel')
const Product = require('mongoose').model('Product');
const YoteError = require('../../global/helpers/YoteError');
const apiUtils = require('../../global/api/apiUtils')

// TODO: in theory, we could split "controller" into single/many/utils files
// any utility functions (internal facing only)

// single api functions
exports.getSingleById = async (req, res) => {
  const product = await Product.findById(req.params.id)
  if(!product) {
    throw new YoteError("Could not find matching Product", 404)
  }
  // res.json(product)
  res.send({success: true, product})
}

exports.createSingle = async (req, res) => {
  let newProduct = new Product(req.body)
  const product = await newProduct.save()
  res.json(product)
}

exports.updateSingleById = async (req, res) => {
  let oldProduct = await Product.findById(req.params.id)
  if(!oldProduct) {
    throw new YoteError("Could not find matching Product", 404)
  }
  oldProduct = Object.assign(oldProduct, req.body)
  const product = await oldProduct.save()
  res.json(product)

  /**
   * NOTES
   * 
   * mongoose provides a "findByIdAndUpdate" function to shorthand this, however 
   * these limit us a little bit for the more complicated cases, AND they bypass 
   * some of the additional built in model validation stuff so not planning to use
   * 
   * normally we'd want to use the spread operator, but it appears that internally this 
   * calls .toObject() on the mongo object, removing our .save() methods
   * oldProduct = {
   *  ...oldProduct
   *  , ...req.body
   * }
   * , hence using Object.assign above
   */
}

exports.deleteSingle = async (req, res) => {
  // todo: need to test
  const oldProduct = await Product.findById(req.params.id)
  if(!oldProduct) {
    throw new YoteError("Could not find matching Product", 404)
  }
  const deletedCount = oldProduct.remove()
  res.json()

  /**
   * NOTES
   * 
   * similarly to update, mongoose does provide a single step "findByIdAndRemove",
   * however not planning to use for same reasons as above
   */
}

exports.getDefault = async (req, res) => {
  res.send({success: true, defaultObj: Product.getDefault()});
}

// list api functions
exports.getListWithArgs = async (req, res) => {
  // console.log(req.params)
  const { query, pagination, sort } = apiUtils.buildMongoQueryFromUrlQuery(req.query);
  console.log("after parse", query, pagination, sort)

  // let query = {}
  // let query = {type: "doesnt exist"}
  // let query = "break me"
  const products = await Product.find(query)
    .skip(pagination ? (pagination.page-1)*pagination.per : null)
    .limit(pagination ? pagination.per : null)
    .sort(sort)
  // .catch(err => { throw new Error(err, "things happened")}) // catch custom errors if we need to, or do something different with error
  res.json(products)
}


// other experimental/future todos
exports.getSingleByArgs = async (req, res) => {}
exports.bulkUpdate = async (req, res) => {}