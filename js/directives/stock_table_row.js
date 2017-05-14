Fideligard.directive('stockTableRow', function(){
    return {
        templateUrl: "js/templates/stock_table_row.html",
        restrict: "A",
        scope: {
          stock: "=",
          date: "="
        }
    };
});