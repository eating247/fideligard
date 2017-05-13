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
          templateUrl: "js/templates/portfolio.html",
          controller: "PortfolioCtrl"
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
      params: { // default params
        date: '2016-06-21',
        symbol: "GOOG",
        price: '695.94'
      },
      views: {
        "portfolio@": {
          templateUrl: "js/templates/trade.html",
          controller: "TradeCtrl"
        }
      }
    })
    .state('stocks.transactions', {
      url: '/transactions',
      views: {
        "portfolio@": {
          templateUrl: "js/templates/transactions.html",
          controller: "TransactionsCtrl"
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