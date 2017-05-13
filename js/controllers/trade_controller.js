Fideligard.controller("TradeCtrl", 
  ["$scope", "$stateParams", "TradeService", "$state",
  function($scope, $stateParams, TradeService, $state) {

    // convert params into newTrade object properties

    $scope.newTrade = {
      date: $stateParams.date,
      price: $stateParams.price,
      symbol: $stateParams.symbol,
      quantity: 10,
      type: true,
    };

    // from trade service
    $scope.cash = 1000000;

    $scope.cost = function() {
      return !isNaN($scope.newTrade.quantity) ? ($scope.newTrade.quantity * $scope.newTrade.price) : '--';
    }

    $scope.orderStatus = function() {
      // cost is less than cash on hand
      // TO DO: can't sell stocks not in portfolio
      return $scope.cost() < $scope.cash ? true : false;
    }

    $scope.submitTrade = function() {
      // validate + store in trade service
      if ($scope.orderStatus()) {
        TradeService.save($scope.newTrade);
        $state.go('stocks.transactions');
      }
    }

}]);