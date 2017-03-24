(function() {
"use strict";

angular.module('common')
.component('loading', {
  template: '<img src="images/spinner.svg" ng-if="$ctrl.show">',
  controller: LoadingController
});

LoadingController.$inject = ['$rootScope'];
function LoadingController ($rootScope) {
  var $ctrl = this;
  var listener;

  $ctrl.$onInit = function() { //$onInit: lifecycle method that will get called to initialize our LoadingController
    $ctrl.show = false;
    listener = $rootScope.$on('spinner:activate', onSpinnerActivate); //whenever some action happens in the app, turn on the spinner. Each action will throw an event called spinner:activate (it's importante to namespace the event so you know where it's coming from)
  }; //the question remains, who will throw the event? the $http service has provides the possibility to plug stuff into its lifecycle: "interceptors". see loading.interceptor.js

  $ctrl.onDestroy = function() {
    listener(); //onDestro, also destroy the listener to avoid memory leaks;
  };

  function onSpinnerActivate(event, data) { //angular passes the event and the data that came with the event
    $ctrl.show = data.on; //and the only date we're interested is this on property, which will be a boolean. $ctrl.show will be set to this boolean.
  }
}

})();
