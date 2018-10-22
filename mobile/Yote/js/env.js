/********

SETUP ENVIRONTMENT VARIABLES:

__DEV__ never worked very well, so let's just do it manually

NOTE: To get your IP address type ifconfig in terminal. Under en0: find inet

**********/

let simulator = {
  url: "http://localhost:3030" // simulator
}

// will most likely have to be https bc of Apple restrictions
let productionEnv = {
  url: "http://yote.f-labs.co"
}

let devLocal = {
  url: "http://your-IP-Address:3030" // when running on real device
}

let stagingEnv = {
  url: "http://yote.f-labs.co"
}

let env = simulator;
// let env = devLocal;
// let env = stagingEnv;
// let env = productionEnv;


export default env;
