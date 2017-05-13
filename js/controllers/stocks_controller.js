Fideligard.controller("StocksCtrl", 
  ["$scope", "DateService", "StockService", "stockData",
  function($scope, DateService, StockService, stockData) {

    $scope.date = DateService.hyphenFormat();

    $scope.symbolFilterValue = false;

    $scope.changeSymbolFilter = function() {
      $scope.symbolFilterValue = !$scope.symbolFilterValue;
    }

    $scope.tableData = StockService.formatStockData();

    // update stock table with new date selections
    $scope.$on('change.date', function(event) {
      console.log('updating date');
      $scope.date = DateService.hyphenFormat();
      $scope.tableData = StockService.formatStockData();
    })


}]);