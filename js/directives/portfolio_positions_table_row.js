Fideligard.directive('portfolioPositionsTableRow', function(){
    return {
        templateUrl: "js/templates/portfolio_positions_table_row.html",
        restrict: "A",
        scope: {
          position: "=",
          date: "="
        }
    };
});