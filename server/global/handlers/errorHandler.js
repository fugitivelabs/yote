
const YoteError = require('../helpers/YoteError')

module.exports = (error, req, res, next) => {
  console.log("catching error") 

  /**
   * goal here is unified error catching
   * 
   * if errors happen, just throw them and move on
   * let this determine what to send back
   * 
   * for mongoose errors
   * https://mongoosejs.com/docs/api/error.html
   * 
   * other notes
   * https://www.npmjs.com/package/express-async-errors
   * 
   * http codes
   * https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/#h-handle-errors-gracefully-and-return-standard-error-codes
   */

  console.log("message", error.message)
  console.log("stack", error.stack)
  console.log("name", error.name)

  if(error instanceof YoteError) {
    console.log("custom yote error")
    res.status(error.statusCode).send(error.message)
  } else {
    
    // send default "server 500" error
    res.status(500).send(error.message)
  }
};