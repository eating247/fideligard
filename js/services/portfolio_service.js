Fideligard.factory("PortfolioService", 
  ["StockService", "TradeService", "DateService",
  function(StockService, TradeService, DateService) {
    var PortfolioService = {};

    var _date = function() {
      return DateService.hyphenFormat();
    }

    // var _seeded = [{date: "2016-06-21", price: "695.94", symbol: "GOOG", quantity: 10, type: true}, {date: "2016-06-21", price: "695.94", symbol: "GOOG", quantity: 10, type: true}, {date: "2016-06-21", price: "695.94", symbol: "GOOG", quantity: 10, type: true}]

    var _trades = TradeService.getTrades();

    var _positions = []; //data for lower table

    var _overview = []; // data for upper table

    var _getPositions = function() {
      // console.log('filtering', _trades.length, 'trades')
      // filter _trades for those <= _date
      _positions = [];
      var filtered = _filterBeforeDate();

      // aggregate by symbol
      filtered.forEach(function(trade) {
        var position = _findSym(trade.symbol);
        console.log(trade.symbol, position, 'position')
        if (!position) {
          //if position obj doesn't exist for trades for this symbol, create one + populate with price info relative to selected date
          console.log('creating position for ', trade.symbol)
          var currentPrices = _findPrices(trade.symbol);
          console.log('prices ', currentPrices)
          _positions.push(
                position = {
                symbol: trade.symbol,
                quantity: 0,
                costBasis: 0,
                currentVal: 0,
                // collect stock info: current, one, seven, thirty day prices
                current: currentPrices.price,
                one: currentPrices.one,
                seven: currentPrices.seven,
                thirty: currentPrices.thirty
          })
        }
        // collect trade info: quantity, cost basis, current value, profit/loss (based on buy/sell)
        var type = trade.type ? 1 : -1;
        position.quantity += type * trade.quantity;
        position.costBasis += type * trade.quantity * trade.price;
        position.currentVal += trade.quantity * trade.price;
        console.log(position)
      })
    }

    var _filterBeforeDate = function() {
      var filtered = [];
      filtered.push(
        _trades.filter( function(trade) {
          return trade.date <= _date();
        })
      )
      console.log('trades <= current date:', filtered)
      return [].concat.apply([], filtered);
    }

    var _findPrices = function(sym) {
      return StockService.formatStockData().filter( function(stock) {
        return stock.symbol === sym
      })
    }

    var _findSym = function(sym) {
      return _positions.find(function(position) {
        return position.symbol === sym;
      })
    }

    PortfolioService.getPositions = function() {
      _getPositions();
      console.log(_positions)
      return _positions;
    }

    return PortfolioService;
  }])