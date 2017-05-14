Fideligard.controller("StocksCtrl", 
  ["$scope", "DateService", "StockService", "stockData",
  function($scope, DateService, StockService, stockData) {

    $scope.displayDate = DateService.stringFormat();

    $scope.date = DateService.hyphenFormat();

    $scope.symbolFilterValue = false;

    $scope.changeSymbolFilter = function() {
      $scope.symbolFilterValue = !$scope.symbolFilterValue;
    }

    $scope.tableData = StockService.formatStockData();

    // update stock table with new date selections
    $scope.$on('change.date', function(event) {
      $scope.date = DateService.hyphenFormat();
      $scope.displayDate = DateService.stringFormat();
      $scope.tableData = StockService.formatStockData();
    })


}]);