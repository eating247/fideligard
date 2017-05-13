Fideligard.controller("TradeCtrl", 
  ["$scope", "$stateParams",
  function($scope, $stateParams) {

    // convert params into newTrade object properties

    $scope.newTrade = {
      date: $stateParams.date,
      price: $stateParams.price,
      symbol: $stateParams.symbol,
      quantity: 10,
      buy: true,

    };

    console.log('params: ', $scope.newTrade)
    console.log('symbol: ', $scope.newTrade.symbol)
    console.log('date: ', $scope.newTrade.date)
    console.log('price: ', $scope.newTrade.price)


    $scope.cashAvailable = 1000000;

    $scope.orderStatus = false;

    $scope.cost = !isNaN($scope.newTrade.quantity) ? ($scope.newTrade.quantity * $scope.newTrade.price) : '--' ;  


    $scope.checkValidity = function() {
      // cost is less than cash on hand
      // 
    }

    $scope.submitTrade = function() {
      console.log($scope.newTrade)
      // validate
      // create new transaction
    }


}]);