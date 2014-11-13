/***************************************************************

This is an example of a Yote-module level filter that does not
need to referenced in app.js

To use external filters, such as 'angular-num2txt.min.js', 
include the file here, and reference in the Yote module definition
within app.js.

NOTE: make sure you also reference the filter in
/server/views/includes/ng-filters.jade 

***************************************************************/



'use strict';

angular.module('Yote')

  /* this is a sample filter
  *  to use, simply add |reverse to the bound model
  *  i.e. {{ message | reverse }}
  */
  .filter('reverse', function() {
    return function(text) {
      console.log(typeof(text));
      // avoid an exception being thrown during dirty checking before the state is defined
      if(text)
        return text.split("").reverse().join("");
      else 
        return false;
    }
  })

// end file
;
