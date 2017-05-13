Fideligard.factory("PortfolioService", 
  ["StockService", "TradeService",
  function(StockService, TradeService) {
    var PortfolioService = {};

    var _positions = []; //data for lower table

    var _overview = []; // data for upper table

    return PortfolioService;
  }])