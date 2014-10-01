/*
  DIRECTIVES GO HERE 
*/



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

  .directive("ytRow", function(){
    return {
      restrict: 'E'
      , transclude: true
      , template: '<div yt-row ng-transclude> </div>'
    };
  })

// end of the file
;