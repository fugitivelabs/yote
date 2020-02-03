require("babel-register")({
  ignore: /\/(build|node_modules)\//
  , presets: [
    "env"
    , "react"
    , "stage-2"
  ]
});
require( "./yote" ); 