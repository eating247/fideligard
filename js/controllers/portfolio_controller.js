Fideligard.controller("PortfolioCtrl", 
  ["$scope", "TradeService", "DateService", "PortfolioService",
  function($scope, TradeService, DateService, PortfolioService) {

    $scope.date = DateService.stringFormat();

    $scope.hello = "HELLLOOOO"

    $scope.positions = PortfolioService.getPositions();

    // update portfolio table with current date selections
    $scope.$on('change.date', function(event) {
      $scope.date = DateService.hyphenFormat();
      $scope.positions = PortfolioService.getPositions();
      console.log($scope.positions)
    })

}]);