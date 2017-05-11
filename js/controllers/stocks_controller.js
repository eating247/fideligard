Fideligard.controller("StocksCtrl", ["$scope", "DateService", "StockService",
  function($scope, DateService, StockService) {

    $scope.date = function() {
      return DateService.hyphenFormat();
    }

    $scope.entry = StockService.stockTableData();

    // update stock table with new date selections
    $scope.$on('change.date', function(event) {
      console.log('updating date');
      $scope.entry = StockService.stockTableData();
    })


}]);