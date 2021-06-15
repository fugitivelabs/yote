
const Product = require('mongoose').model('Product');
const YoteError = require('../../global/helpers/YoteError')

exports.getList = async (req, res, next) => {

  console.log("TESTING LIST 1")
  // let query = {}
  let query = {type: "doesnt exist"}
  // let query = "break me"
  const products = await Product.find(query)
    // .catch(err => { throw new Error(err, "things happened")})
  console.log("TESTING LIST 2")

  // throw Error({msg: "product error"})

  if(products?.length == 0) {
    console.log("RETURNED 0")
    throw new YoteError("Error querying Products: Didn't find anything", 404)
    // next("Didn't find anything")
  } else {
    res.send(products)
  }


  // try {
  //   console.log("TESTING LIST 1")
  //   // let query = {}
  //   let query = {type: "doesnt exist"}
  //   // let query = "break me"
  //   const products = await Product.find(query)
  //   console.log("TESTING LIST 2")

  //   // throw Error({msg: "product error"})

  //   if(products?.length == 0) {
  //     console.log("RETURNED 0")
  //     throw new Error("Didn't find anything")
  //   }

  //   res.send({success: true, products})

  // } catch (err) {
  //   console.log("CATCH", err)
  //   next(err)
  //   // res.send({success: false, err})

  // }
}