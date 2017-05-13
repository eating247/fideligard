Fideligard.controller("TradeCtrl", 
  ["$scope", "$stateParams", "StockService", "TradeService", "$state",
  function($scope, $stateParams, StockService, TradeService, $state) {

    var _stocks = StockService.formatStockData();

    // convert params into newTrade
    $scope.newTrade = {
      date: $stateParams.date,
      price: $stateParams.price,
      symbol: $stateParams.symbol,
      quantity: 10,
      type: true,
    };

    $scope.cash = TradeService.getCash();

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