/**
* SECRETS FILE USAGE:
*
* This file is intended to allow you to safely use secret api keys in your application without exposing them in publicly.
*
* Stock Yote currently uses three secret keys; two for user session security and one for our email API.
*
* To use, create a new file in the same directly as "secrets-sample.js" named "secrets.js", and copy the above code into it.
*
* Replace "sessionSecret" and "tokenSecret" with any randomly generated strings (we recommend [https://www.random.org/strings/](https://www.random.org/strings/)).
* Replace "mandrill" with your own Mandrill api key (source url).
*
* You're ready to roll!
*
*
* Advanced:
*
* Additional keys can be added and used for other services. To use, first add the new key with a descriptive name to the above javascript object.
*
* Then, in your controller, require the secrets object:
*
*     var secrets = require('[RELATIVE PATH TO CONFIG FILE]')[process.env.NODE_ENV].secrets;
*
* secrets.APITOKEN will then be populated and can be used by that controller.
*
*/

//EXAMPLE "secrets.js" file below

module.exports = {
  //randomly generated
  sessionSecret:    "xxxxxxxxxx" //used for cookie session management
  , tokenSecret:    "yyyyyyyyyy" //used for token session management
  //api keys
  , mandrill:       "zzzzzzzzzz"
}

//END EXAMPLE
