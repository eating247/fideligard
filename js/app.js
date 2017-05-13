var Fideligard = angular.module("Fideligard", ['ui.router']);

Fideligard.config(["$stateProvider", "$urlRouterProvider", 
  function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/stocks")

  $stateProvider
    .state('stocks', {
      url: '/stocks',
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
      },
      resolve: {
        stockData: function(StockService) {
          return StockService.all();
        }
      }
    })
    .state('stocks.trade', {
      url: '/trade',
      views: {
        "portfolio@": {
          templateUrl: "js/templates/trade.html"
        }
      }
    })
    .state('stocks.transactions', {
      url: '/transactions',
      views: {
        "portfolio@": {
          templateUrl: "js/templates/transactions.html"
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