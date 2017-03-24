(function() {
'use strict';

angular.module('public')  //retreiving public (no [])
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {   //this will hold all the public stuff
      absract: true,  //abstract true meanst that you can never go directly to this state. This is a parent where other states inherit from.
      templateUrl: 'src/public/public.html'
    })
    .state('public.home', {
      url: '/',   //this will inherit from the previous one.
      templateUrl: 'src/public/home/home.html'  //this is the template injected in the home (/)
    })
    .state('public.menu', { //they are part of the same parent public, so this one will be inserted where public.home was inserted, in the ui-view tag of public.html
      url: '/menu',
      templateUrl: 'src/public/menu/menu.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl',
      resolve: {  //before anything, we need to gather the data that the menu will show.
        menuCategories: ['MenuService', function (MenuService) { //the data we need is the categories in the menu, so we call it that. We anticipate the creation of a MenuService that gathers all the data, and inject it right there to protect against minification
          return MenuService.getCategories(); //we need this menuCategories to get the Categories, so we anticipate the creation of such function later and call it that
        }] //since admins will also need the data, let's define MenuService in common
      }
    })
    .state('public.menuitems', {
      url: '/menu/{category}',
      templateUrl: 'src/public/menu-items/menu-items.html',
      controller: 'MenuItemsController',
      controllerAs: 'menuItemsCtrl',
      resolve: {
        menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
          return MenuService.getMenuItems($stateParams.category);
        }]
      }
    });

}
})();
