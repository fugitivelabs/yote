/********

SETUP ENVIRONTMENT VARIABLES:

__DEV__ never worked very well, so let's just do it manually

NOTE: To get your IP address type ifconfig in terminal. Under en0: find inet

**********/

let simulator = {
  url: "http://localhost:3030" // simulator
}

let productionEnv = {
  url: "http://yote.f-labs.co"
}

let erikLocal = {
  url: "http://10.254.133.106:3030"
}

let austinLocal = {
  url: "http://10.254.102.111:3030"
}

let stagingEnv = {
  url: "http://yote.f-labs.co"
}

let mazenLocal = {
  url: "http://10.254.102.101:3030"
}

let env = simulator;
// let env = erikLocal;
// let env = austinLocal;
// let env = mazenLocal;
// let env = stagingEnv;
// let env = productionEnv;


export default env;
