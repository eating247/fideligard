Fideligard.controller("TransactionsCtrl", 
  ["$scope", "TradeService",
  function($scope, TradeService) {

    $scope.transactions = TradeService.getTrades();

    $scope.changeSort = function(arg) {
      $scope.sortType = arg;
      $scope.sortValue = !$scope.sortValue;
      console.log($scope.sortType, $scope.sortValue)
    }


}]);