Fideligard.controller("DateCtrl", ["$scope", "DateService", "StockService", "$rootScope",
  function($scope, DateService, StockService, $rootScope) {

    $scope.dateValue;

    $scope.displayDate = function() {
      return DateService.stringFormat();
    }

    $scope.setDateValue = function(dateForm) {
      if (dateForm.date.$valid) {
        $scope.date = DateService.setDateValue($scope.dateValue);
        $rootScope.$broadcast('change.date');
      }
    }

}]);