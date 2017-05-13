Fideligard.controller("TradeCtrl", 
  ["$scope", "DateService", "StockService", "$stateParams",
  function($scope, DateService, StockService, $stateParams) {

    // convert params into newTrade object properties

    console.log('params: ', $stateParams)
    console.log('symbol: ', $stateParams.symbol)
    console.log('date: ', $stateParams.date)
    console.log('price: ', $stateParams.price)

    $scope.newTrade = {
      date: $stateParams.date,
      price: $stateParams.price,
      symbol: $stateParams.symbol
    }

    $scope.cashAvailable = 1000000;

    $scope.orderStatus = false;

    $scope.cost = $scope.newTrade ? ($scope.newTrade.quantity * $scope.price) : '--' ;

    $scope.submitTrade = function() {
      console.log($scope.newTrade)
      //validate
      //create new transaction
    }


}]);