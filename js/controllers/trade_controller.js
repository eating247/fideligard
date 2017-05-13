Fideligard.controller("TradeCtrl", 
  ["$scope", "DateService", "StockService", "$stateParams",
  function($scope, DateService, StockService, $stateParams) {

    // convert params into newTrade object properties

    $scope.newTrade = {
      date: $stateParams.date,
      price: $stateParams.price,
      symbol: $stateParams.symbol,
      buy: true,

    };

    console.log('params: ', $scope.newTrade)
    console.log('symbol: ', $scope.newTrade.symbol)
    console.log('date: ', $scope.newTrade.date)
    console.log('price: ', $scope.newTrade.price)


    $scope.cashAvailable = 1000000;

    $scope.orderStatus = false;

    $scope.cost = function() {
      var cost = $scope.newTrade && !isNaN($scope.newTrade.quantity) ? ($scope.newTrade.quantity * $scope.price) : '--' ;      
      return cost;
    }


    $scope.checkValidity = function() {
    }

    $scope.submitTrade = function() {
      console.log($scope.newTrade)
      //validate
      //create new transaction
    }


}]);