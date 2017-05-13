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

    $scope.cash = 1000000;

    $scope.cost = !isNaN($scope.newTrade.quantity) ? ($scope.newTrade.quantity * $scope.newTrade.price) : '--' ;  

    $scope.orderStatus = $scope.cost < $scope.cash ? true : false;

    $scope.checkValidity = function() {
      $scope.cost < $scope.cash ? true : false;
      // cost is less than cash on hand
      // TO DO: can't sell stocks not in portfolio
    }

    $scope.submitTrade = function() {
      console.log($scope.newTrade)
      // validate
      // create new transaction
    }

}]);