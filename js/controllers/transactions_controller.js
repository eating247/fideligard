Fideligard.controller("TransactionsCtrl", 
  ["$scope", "TradeService",
  function($scope, TradeService) {

    $scope.transactions = TradeService.getTrades();


}]);