const ProductSchema = require('./ProductModel')
const Product = require('mongoose').model('Product');
const YoteError = require('../../global/helpers/YoteError');
const apiUtils = require('../../global/api/apiUtils')

// TODO: in theory, we could split "controller" into single/many/utils files
// any utility functions (internal facing only)

// single api functions
exports.getSingleById = async (req, res) => {
  const product = await Product.findById(req.params.id).catch(err => {
    console.log(err);
    throw new YoteError("Error finding Product", 404)
  });
  if(!product) throw new YoteError("Could not find a matching Product", 404);
  res.json(product);
}

exports.createSingle = async (req, res) => {
  const newProduct = new Product(req.body)
  const product = await newProduct.save().catch(err => {
    console.log(err)
    throw new YoteError("Error creating Product", 404)
  });
  res.json(product)
}

exports.updateSingleById = async (req, res) => {
  let oldProduct = await Product.findById(req.params.id).catch(err => {
    console.log(err)
    throw new YoteError("Error finding Product", 404)
  });
  if(!oldProduct) throw new YoteError("Could not find matching Product", 404);
  oldProduct = Object.assign(oldProduct, req.body)
  const product = await oldProduct.save().catch(err => {
    console.log(err)
    throw new YoteError("Could not update Product", 404)
  });
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
  const oldProduct = await Product.findById(req.params.id).catch(err => {
    console.log(err)
    throw new YoteError("Error finding Product", 404)
  });;
  if(!oldProduct) throw new YoteError("Could not find matching Product", 404);
  const deletedProduct = await oldProduct.remove().catch(err => {
    console.log(err)
    throw new YoteError("There was a problem deleting this Product", 404)
  });
  // console.log('product deleted', deletedProduct);
  // return the deleted product ??
  res.json(deletedProduct);
  /**
   * NOTES
   * 
   * similarly to update, mongoose does provide a single step "findByIdAndRemove",
   * however not planning to use for same reasons as above
   */
}

exports.getDefault = async (req, res) => {
  const defaultProduct = await Product.getDefault();
  if(!defaultProduct) throw new YoteError("Error finding default Product", 404);
  res.json(defaultProduct);
}

// list api functions
exports.getListWithArgs = async (req, res) => {
  const { query, pagination, sort, limit } = apiUtils.buildMongoQueryFromUrlQuery(req.query);
  // get count so we can determine total pages for front end to allow proper pagination
  const count = pagination ? await Product.countDocuments(query) : null
  const totalPages = count && Math.ceil(count / pagination.per)
  const products = await Product.find(query)
    .skip(pagination ? (pagination.page - 1) * pagination.per : null)
    .limit(pagination ? pagination.per : (limit || 500))
    .sort(sort)
    .catch(err => {
      console.log(err);
      throw new YoteError("There was a problem finding Product list", 404);
    });
  res.json({ products, totalPages })
}

// other experimental/future todos
exports.getSingleByArgs = async (req, res) => { }
exports.bulkUpdate = async (req, res) => { }