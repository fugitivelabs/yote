/**
 * to run from /server folder:
 * 
  on local:
  node util/exampleUtil.js
  against production database:
  NODE_ENV=production node util/exampleUtil.js
 */


let async = require('async');
let utilWrapper = require('./utilWrapper');
let saveToCsv = require('./saveToCsv');

console.log("util - run example cli util");

// require any specific models we need
let Product = require('mongoose').model('Product')

// util wrappers handles database, model init, etc for you
utilWrapper.run((config, secrets) => {
  
  // whatever logic you want

  Product.find({}, (err, products) => {

    if(err || !products) {
      // exit with an error code
      process.exit(1)
    } else {
      // do stuff with them
      console.log("FOUND " + products.length + " PRODUCTS")  
      
      
      // optional: output the results to a csv
      let headers = ["Identifier", "Title", "Description"]
      let data = [];
  
      for(let product of products) {
        nextLine = {
          "Identifier": product._id
          , "Title": product.title
          , "Description": product.description
        }
        data.push(nextLine);
      }

      saveToCsv.generate(
        headers
        , data
        , "example_output"
        , () => {
          console.log("SAVED CSV OF THIS DATA")
          // exit with no error code
          process.exit();
        }
      )
    }


  })

})