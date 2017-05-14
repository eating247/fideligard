Fideligard.controller("PortfolioCtrl", 
  ["$scope", "TradeService", "DateService", "PortfolioService",
  function($scope, TradeService, DateService, PortfolioService) {

    $scope.trades = TradeService.getTrades();

    $scope.date = DateService.stringFormat();

    $scope.positions = PortfolioService.getPositions();

    $scope.overview = PortfolioService.getOverview();

    // update portfolio table with current date selections
    $scope.$on('change.date', function(event) {
      $scope.trades = TradeService.getTrades();
      $scope.date = DateService.hyphenFormat();
      $scope.positions = PortfolioService.getPositions();
      $scope.overview = PortfolioService.getOverview();
    })

}]);