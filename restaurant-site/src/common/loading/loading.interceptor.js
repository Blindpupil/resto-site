(function() {
"use strict";

angular.module('common')
.factory('loadingHttpInterceptor', LoadingHttpInterceptor); //interceptors are factories (creates a function and waits for the return value)

LoadingHttpInterceptor.$inject = ['$rootScope', '$q'];
/**
 * Tracks when a request begins and finishes. When a
 * request starts, a progress event is emitted to allow
 * listeners to determine when a request has been initiated.
 * When the response completes or a response error occurs,
 * we assume the request has ended and emit a finish event.
 */
function LoadingHttpInterceptor($rootScope, $q) {

  var loadingCount = 0; //its normal to have various ASYNC requests going through at the same time. We don't want the event to turn off the spinner while there's another event still happening.
  var loadingEventName = 'spinner:activate';

  //below the return value.
  return { //this is just a big object literal with 3 properties, request, response and responseError
    request: function (config) {  //the request is expected to be a function that takes in a config object which is everything needed for the $http to make the request (url, headers, etc.).
      // console.log("Inside interceptor, config: ", config);

      if (++loadingCount === 1) {  //so this will happen before making the request. Every time a request is sent the counter will increase
        $rootScope.$broadcast(loadingEventName, {on: true}); //we broadcast our loadingEventName event with the property on set to true
      }

      return config;
    },

    response: function (response) { //Every time a response is obtained the counter will decrease. Every time there's a pending request, the loading indicator will still be going.
      if (--loadingCount === 0) { //once the response comes back, we can again broadcast it with the value false
        $rootScope.$broadcast(loadingEventName, {on: false});
      } //The event will only turn off completely when there are no more counts (counts===0) 

      return response;
    },

    responseError: function (response) {
      if (--loadingCount === 0) {
        $rootScope.$broadcast(loadingEventName, {on: false});
      }
      // make sure to reject the response, if not it's going to look like it returned successfully
      return $q.reject(response);
    }
  };
}

})();
