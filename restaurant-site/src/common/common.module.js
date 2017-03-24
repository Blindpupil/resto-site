(function() {
"use strict";

angular.module('common',[])
.constant('ApiPath', 'https://restoserver-coursera.herokuapp.com') //the server we deployed in the beginning
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');  //the .interceptors is an array. We push our own interceptors there so that they run as part of the $http system.
}


})();
