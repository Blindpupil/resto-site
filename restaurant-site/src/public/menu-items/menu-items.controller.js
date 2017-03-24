(function() {
"use strict"

angular.module('public')
.controller('MenuItemsController',MenuItemsController);


//All we're doing is exposing these particular menuItems array as a menuItems property on the controller instance itself
MenuItemsController.$inject = ['menuItems'];
function MenuItemsController(menuItems) {
  var $ctrl = this;

  $ctrl.menuItems = menuItems;
}


})();
