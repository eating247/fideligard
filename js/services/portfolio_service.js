Fideligard.factory("PortfolioService", 
  ["StockService", "TradeService", "DateService",
  function(StockService, TradeService, DateService) {
    var PortfolioService = {};

    var _date = function() {
      return DateService.hyphenFormat();
    }

    var _seeded = [{date: "2016-06-21", price: "695.94", symbol: "GOOG", quantity: 10, type: true}, {date: "2016-06-21", price: "695.94", symbol: "GOOG", quantity: 10, type: true}, {date: "2016-06-21", price: "695.94", symbol: "GOOG", quantity: 10, type: true}]

    var _trades = TradeService.getTrades();

    var _positions = []; //data for lower table

    var _overview = []; // data for upper table

    var _getPositions = function() {
      console.log('filtering', _trades.length, 'trades')
      // filter _trades for those <= _date
      var filtered = _filterBeforeDate();
      console.log('trades <= current date', filtered.length)

      // filter _trades for those <= _date
      // aggregate by symbol
      // collect stock info: current, one, seven, thirty day prices
      // collect trade info: quantity, cost basis, current value, profit/loss (based on type, buy/sell)
    }

    var _filterBeforeDate = function() {
      var filtered = [];
      filtered.push(
        _trades.filter( function(trade) {
          return trade.date <= _date();
        })
      )
      return [].concat.apply([], filtered);
    }


    PortfolioService.getPositions = function() {
      _getPositions();
      return _positions;
    }

    return PortfolioService;
  }])