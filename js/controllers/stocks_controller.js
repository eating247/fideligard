Fideligard.controller("StocksCtrl", 
  ["$scope", "DateService", "StockService", "stockData",
  function($scope, DateService, StockService, stockData) {

    $scope.date = function() {
      return DateService.hyphenFormat();
    }

    $scope.stockData = stockData;

    // update stock table with new date selections
    $scope.$on('change.date', function(event) {
      console.log('updating date');
      $scope.entry = StockService.stockTableData();
    })


}]);