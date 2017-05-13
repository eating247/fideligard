Fideligard.controller("TradeCtrl", 
  ["$scope", "DateService", "StockService", "stockData",
  function($scope, DateService, StockService, stockData) {

    $scope.hello = 'not broken';

    $scope.cashAvailable = 1000000;

    $scope.orderStatus = false;

    $scope.price = 100

    $scope.cost = $scope.newTrade ? ($scope.newTrade.quantity * $scope.price) : '--' ;

    $scope.submitTrade = function() {
      console.log($scope.newTrade)
    }


}]);