Fideligard.controller("PortfolioCtrl", 
  ["$scope", "TradeService", "DateService", "PortfolioService",
  function($scope, TradeService, DateService, PortfolioService) {

    $scope.date = DateService.stringFormat();

    $scope.positions = PortfolioService.getPositions();

    // update stock table with new date selections
    $scope.$on('change.date', function(event) {
      $scope.date = DateService.hyphenFormat();
      $scope.positions = PortfolioService.getPositions();
    })

}]);