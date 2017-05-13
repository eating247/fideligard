Fideligard.factory("PortfolioService", 
  ["StockService", "TradeService", "DateService",
  function(StockService, TradeService, DateService) {
    var PortfolioService = {};

    var _date = DateService.hyphenFormat();

    var _trades = TradeService.getTrades();

    var _positions = []; //data for lower table

    var _overview = []; // data for upper table

    var _getPositions = function() {
      var position;
      _trades.forEach(function(trade) {
        if ((trade.date < _date) && _findExistingPosition(trade.symbol)) {
          console.log('creating position')
          _positions.push(
            position = {
              symbol: trade.symbol,
              quantity: 0,
              costBasis: 0,
              currentVal: 0,
              profitLoss: 0,
              current: 0,
              one: 0,
              seven: 0,
              thirty: 0
            }
          );
        } else {
          position = _findExistingPosition(trade.symbol);
        }
        _positions[trade.symbol]
      })
    }
    
    //make sure _positions doesn't already include any trades with trade.symbol
    var _findExistingPosition = function(sym) {
      return $.grep(_positions, function(object){ return object.symbol == sym; });
    }

    PortfolioService.getPositions = function() {
      _getPositions();
      return _positions;
    }

    return PortfolioService;
  }])