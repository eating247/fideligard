Fideligard.controller("StocksCtrl", ["$scope", "DateService", "StockService", 
  function($scope, DateService, StockService) {

    $scope.date = function() {
      return DateService.hyphenFormat();
    }

    $scope.entry = function() {
      return StockService.stockTableData();
    }

}]);