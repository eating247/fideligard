Fideligard.directive('transactionTableRow', function(){
    return {
        templateUrl: "js/templates/transaction_table_row.html",
        restrict: "A",
        scope: {
          transaction: "=",
        }
    };
});