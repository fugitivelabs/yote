/********

SETUP ENVIRONTMENT VARIABLES:

manually choose which server env app will point to 

**********/

// developer's local IP address to run app on a device
// NOTE: To get your IP address type ifconfig in terminal. Under en0: find inet
let devLocal = {
  url: "http://your-IP-Address:3030"
}

// production server (should be https)
let productionEnv = {
  url: "http://yote.f-labs.co"
}

// for running on simulator/emulator
let simulator = {
  url: "http://localhost:3030" // simulator
}

// testing server
let stagingEnv = {
  url: "http://yote.f-labs.co"
}

let env = simulator;
// let env = devLocal;
// let env = stagingEnv;
// let env = productionEnv;


export default env;
