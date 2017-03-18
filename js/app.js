var Fideligard = angular.module("Fideligard", ['ui.router']);

Fideligard.config(["$stateProvider", "$urlRouterProvider", 
  function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/")

  $stateProvider
    .state('default', {
      url: '/',
      views: {
        "date": {
          templateUrl: "js/templates/date.html",
          controller: "DateCtrl"
        },
        "stocks": {
          templateUrl: "js/templates/stocks.html",
          controller: "StocksCtrl"
        },
        "portfolio": {
          templateUrl: "js/templates/portfolio.html"
        }
      }
    })
}])

Fideligard.factory('_', ['$window', function($window) {
  return $window._;
}]);

Fideligard.run(function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});