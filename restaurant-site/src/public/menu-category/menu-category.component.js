(function() {
"use strict";

angular.module('public')
.component('menuCategory', {
  templateUrl: 'src/public/menu-category/menu-category.html',
  bindings: { //we need the binding becase we will need the specific category
    category: '<' //this category expected as a binding needs to be added as an attribute in menu.html
  }
});

})();
