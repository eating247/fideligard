Fideligard.controller("TradeCtrl", 
  ["$scope", "$stateParams", "StockService", "TradeService", "$state", "PortfolioService",
  function($scope, $stateParams, StockService, TradeService, $state, PortfolioService) {

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
      if ($scope.newTrade.type) {
        // if buying: make sure cash can cover trade
        return $scope.cost() < $scope.cash ? true : false;
      } else {
        // if selling: cannot sell more quantity than they own
        var position = PortfolioService.findPos($scope.newTrade.symbol)
        return position && (position.quantity >= $scope.newTrade.quantity) ? true: false; 
      } 
    }

    $scope.submitTrade = function() {
      // validate + store in trade service
      if ($scope.orderStatus()) {
        TradeService.save($scope.newTrade);
        $state.go('stocks.transactions');
      }
    }

}]);