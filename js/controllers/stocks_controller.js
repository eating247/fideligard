Fideligard.controller("StocksCtrl", 
  ["$scope", "DateService", "StockService", "stockData",
  function($scope, DateService, StockService, stockData) {

    $scope.date = function() {
      return DateService.hyphenFormat();
    }

    console.log(stockData)
    $scope.stockData = stockData;

    $scope.entry = StockService.formatStockData();
    console.log($scope.entry)

    // update stock table with new date selections
    $scope.$on('change.date', function(event) {
      console.log('updating date');
      $scope.entry = StockService.formatStockData();
      console.log($scope.entry)
    })


}]);