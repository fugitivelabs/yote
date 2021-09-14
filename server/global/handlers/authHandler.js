const ProductSchema = require('../../resources/product/ProductModel')
const Product = require('mongoose').model('Product');

module.exports = {

  requireLogin: (req, res, next) => {
    console.log("LOGIN CHECK HIT - by cookie");
    // check by passport session
    if(!req.isAuthenticated()) {
      console.log("UNAUTHORIZED");
      res.status(403).send("UNAUTHORIZED - NOT LOGGED IN");
    } else {  next(); }
  }

  , requireAccountAccess: async (req, res, next) => {
    // this is a made up one, but in theory we can lock down queries this way
    // ex: trial portals, where a lot of things are determined simply by having an "AccountUser" object in your name
    // since list args are now just query params, we can check if a certain key is ANYWHERE in the param
    // and if so, check custom stuff against it. we can also append that to the end of update/single queries as a search param
    // , like ?accountId=xxx
    // NOTE - havent found a good way to pass args into these, but dont think we need to

    // this check will not actually do anything, but will fetch some stuff just to test
    // REQUIREMENT: a product with that description exists in the database (because obviously)

    if(!req.query || !req.query.description) {
      res.status(403).send("UNAUTHORIZED - NOT LOGGED IN");
    } else {

      const product = await Product.findOne({description: req.query.description})
      if(!product) {
        res.status(403).send("ARBITRARILY RESTRICTING BECAUSE YOU DIDNT PASS API CHECKS");
      } else {
        // delete req.query.description // can REMOVE it here too if you want, but prob bad for debugging
        // but then it doesnt effect the subsequent query
        next();
      }

    }
  }

}