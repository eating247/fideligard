Fideligard.controller("PortfolioCtrl", 
  ["$scope", "TradeService",
  function($scope, TradeService) {

    $scope.cash = TradeService.getCash();


}]);