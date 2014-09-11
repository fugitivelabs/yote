'user strict'

/* USER FACTORY SERVICE */

angular.module('Yote')

/*******************************************************************************************
* By default, Yote uses Angular factories as the services model. 
* 
* Using factories vs services vs provider is mostly a matter of preference, though 
* there are some fundamental advantages to each. 
* 
* A starting point for further documentation and discussion on the matter can be found at 
* http://tylermcginnis.com/angularjs-factory-vs-service-vs-provider/
*
* If services or providers are preferred for this specific resource, this is still the  
* place to put them.
*******************************************************************************************/


.factory('UserFactory', ['$http', '$q', function($http, $q) {

  var urlBase = "/api/users";
  var UserFactory = [];
  var _user;

  



}])
;