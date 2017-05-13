Fideligard.controller("PortfolioCtrl", 
  ["$scope", "TradeService", "DateService", "PortfolioService",
  function($scope, TradeService, DateService, PortfolioService) {

    $scope.date = function() {
      return DateService.stringFormat();
    }

    

    $scope.positions = PortfolioService.getPositions();


}]);