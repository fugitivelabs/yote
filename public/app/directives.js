/*
  DIRECTIVES GO HERE 
*/


// this is a sample directive
angular.module('Yote')

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