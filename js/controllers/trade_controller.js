Fideligard.controller("TradeCtrl", 
  ["$scope", "DateService", "StockService", "stockData",
  function($scope, DateService, StockService, stockData) {

    $scope.hello = 'not broken';

    $scope.cashAvailable = 1000000;

    $scope.orderStatus = 'VALID';

    $scope.submitTrade = function() {
      console.log($scope.newTrade)
    }


}]);