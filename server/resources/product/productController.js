
const Product = require('mongoose').model('Product');
const YoteError = require('../../global/helpers/YoteError');

// TODO: in theory, we could split "controller" into single/many/utils files

// single api actions
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

}

// list api actions
exports.getListWithArgs = async (req, res) => {

  let query = {}
  // let query = {type: "doesnt exist"}
  // let query = "break me"
  const products = await Product.find(query)
  // .catch(err => { throw new Error(err, "things happened")}) // catch custom errors if we need to, or do something different with error
  res.json(products)
}



// other experimental/future todos
exports.getSingleByArgs = async (req, res) => {}
exports.bulkUpdate = async (req, res) => {}