Fideligard.controller("StocksCtrl", ["$scope", 
  function($scope) {

    $scope.date;
    $scope.dateValue = 90;
    $scope.min = 1;
    $scope.max = 180;

    $scope.setDateValue = function(dateForm) {
      if (dateForm.date.$valid) {
        $scope.date = new Date(2015, 0, $scope.dateValue);
        console.log('saving date ' + $scope.date)
      } else {
        $scope.dateValue = 90;
      }
    }

}]);