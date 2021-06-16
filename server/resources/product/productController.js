
const Product = require('mongoose').model('Product');
const YoteError = require('../../global/helpers/YoteError');

// single api actions
exports.getSingleById = async (req, res) => {
  const product = await Product.findById(req.params.id)
  if(!product) {
    throw new YoteError("Could not find matching Product", 404)
  }
  res.json(product)
}

// list api actions
exports.getListWithArgs = async (req, res) => {

  // let query = {}
  let query = {type: "doesnt exist"}
  // let query = "break me"
  const products = await Product.find(query)
  // .catch(err => { throw new Error(err, "things happened")}) // catch custom errors if we need to, or do something different with error
  res.json(products)
}



// experimental/future/todos
exports.getSingleByArgs = async (req, res) => {}

exports.bulkUpdate = async (req, res) => {}