/*
  FILTERS GO HERE 
*/


angular.module('Yote')

  /* this is a sample filter
  *  to use, simply add |reverse to the bound model
  *  i.e. {{ message | reverse }}
  */
  .filter('reverse', function() {
    return function(text) {
      // avoid an exception being thrown during dirty checking before the state is defined
      if(!text)
        return false;
      else 
        return text.split("").reverse().join("");
    }
  })

// end file
;