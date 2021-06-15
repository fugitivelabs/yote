
let Product = require('mongoose').model('Product');

exports.apiWrapper = async () => {

}

exports.getList = async (req, res, next) => {

  console.log("TESTING LIST 1")
  // let query = {}
  let query = {type: "doesnt exist"}
  // let query = "break me"
  const products = await Product.find(query)
  console.log("TESTING LIST 2")

  // throw Error({msg: "product error"})

  if(products?.length == 0) {
    console.log("RETURNED 0")
    throw new Error("Didn't find anything")
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