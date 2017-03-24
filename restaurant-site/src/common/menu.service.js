(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {  //constant is defined in the common.module
      return response.data;
    });
  };

  service.getMenuItems = function (category) {  //takes category as an argument, just like the url request name.
    //we could do it as before and simply concatenate more strings. However, instead we create a config object:

    var config = {};
    if (category) {  //if there's any category (category == true)
      config.params = {'category': category}; //assign the 'category' property to that category that you retreive in the params property, which will be appended as GET parameters
    }

    //pass the config as an argument of the $http.get
    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

}


})()
