/***************************************************************

This is an example of a Yote-module level directive that does not
need to referenced in app.js

To use external directives, include the file here, and reference 
in the Yote module definition within app.js.


NOTE: make sure you also reference the directive in
/server/views/includes/ng-directives.jade 

***************************************************************/


angular.module('Yote')
  
  /* this is a sample directive
  *  to use, simply add enter to any html element
  *  i.e. 
  *     - Jade 
  *         button(enter) jade button
  *     - HTML
  *         <button enter> html button </button>
  */
  .directive("enter", function() {
    return function(scope, element, attrs) {
        element.bind("mouseenter", function() {
          // scope.$apply(attrs.enter);
          alert("this is working!");
        });
    }
  })


// end of the file
;