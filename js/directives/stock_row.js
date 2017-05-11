Fideligard.directive("stockRow", function() {
  return {
    templateUrl: "js/templates/stock_row.html",
    restrict: "A",
    scope: {
      tableData: "="
    }
  }
})