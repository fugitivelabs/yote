/********

SETUP ENVIRONTMENT VARIABLES:

__DEV__ never worked very well, so let's just do it manually

NOTE: To get your IP address type ifconfig in terminal.

**********/

let simulator = {
  url: "http://localhost:3030" // ios simulator only, use localIP if android network request fails
}

let localIP = {
  url: "http://10.0.0.26:3030"
}

// testing server
let stagingEnv = {
  url: "http://yote.f-labs.co"
}

let productionEnv = {
  url: "http://yote.f-labs.co"
}

let env = simulator;
// let env = localIP;
// let env = stagingEnv;
// let env = productionEnv;


export default env;
