/*
  DIRECTIVES GO HERE 
*/



angular.module('Yote')
  
  /* this is a sample filter
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