require("babel-register")({
  ignore: /\/(build|node_modules)\//
  , presets: ["env"]
});
require( "./yote" ); 