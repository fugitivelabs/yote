module.exports = class YoteError extends Error {
  // we want to define some more custom fields on the error objects
  // https://gist.github.com/slavafomin/b164e3e710a6fc9352c934b9073e7216
  constructor (message, statusCode, fields) {
  
    // Calling parent constructor of base Error class.
    // stringify the message so it can be parsed by the browser fetch API
    super(JSON.stringify(message));
    
    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name;

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);
    
    // set custom http error code, default to 500
    this.statusCode = statusCode || 500;
    this.fields = fields || {} // for more custom stuff
  }
}