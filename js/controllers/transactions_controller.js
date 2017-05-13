Fideligard.controller("TransactionsCtrl", 
  ["$scope", "TradeService",
  function($scope, TradeService) {

    $scope.transactions = TradeService.getTrades();

    $scope.changeSort = function(arg) {
      $scope.sortType = arg;
      $scope.sortValue = !$scope.sortValue;
      console.log($scope.sortType, $scope.sortValue)
    }

    $scope.sortDisplay = function(arg) {
      if ($scope.sortType === arg) {
        return $scope.sortValue ? 'glyphicon glyphicon-triangle-top' : 'glyphicon glyphicon-triangle-bottom';
      }
    }


}]);