Fideligard.factory("PortfolioService", 
  ["StockService", "TradeService", "DateService",
  function(StockService, TradeService, DateService) {
    var PortfolioService = {};

    var _date = function() {
      return DateService.hyphenFormat();
    }

    var _trades = TradeService.getTrades();

    var _positions = []; //data for lower table

    var _overview = []; // data for upper table

    var _getPositions = function() {
      console.log('filtering', _trades.length, 'trades')
      var position, type;
      // filter _trades for those <= _date
      // aggregate by symbol
      // collect stock info: current, one, seven, thirty day prices
      // collect trade info: quantity, cost basis, current value, profit/loss (based on type, buy/sell)
    }

    PortfolioService.getPositions = function() {
      _getPositions();
      return _positions;
    }

    return PortfolioService;
  }])