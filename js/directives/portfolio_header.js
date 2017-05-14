Fideligard.directive('portfolioHeader', function(){
    return {
        templateUrl: "js/templates/portfolio_header.html",
        restrict: "A",
        transclude: true,
        scope: {
          stock: "=",
          date: "="
        }
    };
});