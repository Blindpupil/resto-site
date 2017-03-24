(function() {
"use strict";

/**
 * Restaurant module that includes the public module as a dependency
 */
angular.module('restaurant', ['public']) //we divide the app into a public and add it here, foreseeing there will be a an admin side too.
.config(config);

config.$inject = ['$urlRouterProvider'];  //we added the route directly in the module.js since it's only 1 route.
function config($urlRouterProvider) {

  // If user goes to a path that doesn't exist, redirect to public root
  $urlRouterProvider.otherwise('/');
}

})();
