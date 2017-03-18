Fideligard.controller("StocksCtrl", ["$scope", 
  function($scope) {

    $scope.dateValue = 20;
    $scope.min = 1;
    $scope.max = 180;

    $scope.translateDateValue = function() {
      var start = new Date(2015, 1, 1);
      start.setDate(start.getDate() + $scope.dateValue)
    }

    $scope.setDateValue = function(dateForm) {
      // set event listeners
      if (dateForm.date.$valid) {
        // save date 
        console.log('saving date now')
      }
    }

}]);