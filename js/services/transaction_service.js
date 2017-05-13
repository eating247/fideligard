Fideligard.factory("TradeService", ["_", 
  function(_) {
    var TradeService = {};

    var _trades = [];

    TradeService.recordNewTrade = function(trade) {
      _trades.push(
          {
            date: trade.date,
            symbol: trade.symbol,
            type: trade.type,
            quantity: trade.quantity,
            price: trade.price
          }
        );
      }
    }

    return TradeService;
  }])