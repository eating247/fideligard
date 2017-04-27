Fideligard.controller("StocksCtrl", ["$scope", "DateService", "StockService", 
  function($scope, DateService, StockService) {

    $scope.date = function() {
      return DateService.hyphenFormat();
    }

    $scope.entry = StockService.stockTableData();

    $scope.$on('change.date', function(event) {
      console.log('updating date');
      $scope.entry = StockService.stockTableData();
    })


}]);