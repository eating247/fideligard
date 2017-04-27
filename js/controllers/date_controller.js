Fideligard.controller("DateCtrl", ["$scope", "DateService", "StockService",
  function($scope, DateService, StockService) {

    // initialized date is Mar 31, 2014
    $scope.dateValue = 90;

    $scope.displayDate = function() {
      return DateService.stringFormat();
    }

    $scope.setDateValue = function(dateForm) {
      if (dateForm.date.$valid) {
        $scope.date = DateService.setDateValue($scope.dateValue);
        console.log('saving new date ' + $scope.date);
      }
    }

}]);