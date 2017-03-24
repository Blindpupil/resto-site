(function () {
"use strict";

angular.module('public')  //we need the controller in the public
.controller('MenuController', MenuController);

MenuController.$inject = ['menuCategories']; //this is the menuCategories defined in the state in public.route.js ln 28.
function MenuController(menuCategories) {
  var $ctrl = this;

  $ctrl.menuCategories = menuCategories; //now menuCategories is a property on the instance of MenuController.
} //This will be available in menu.html, as defined in the templateUrl of the state. Now menu.html should be able to get the data.

})();
