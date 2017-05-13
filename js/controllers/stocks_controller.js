Fideligard.controller("StocksCtrl", 
  ["$scope", "DateService", "StockService", "stockData",
  function($scope, DateService, StockService, stockData) {

    $scope.date = function() {
      return DateService.hyphenFormat();
    }

    $scope.symbolFilterValue = false;

    $scope.changeSymbolFilter = function() {
      $scope.symbolFilter = !$scope.symbolFilter;
    }

    $scope.tableData = StockService.newFormatStockData();

    // update stock table with new date selections
    $scope.$on('change.date', function(event) {
      console.log('updating date');
      $scope.tableData = StockService.newFormatStockData();
    })


}]);