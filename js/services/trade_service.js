Fideligard.factory("TradeService", ["_", 
  function(_) {
    var TradeService = {};

    var _trades = [];

    var _cash = 1000000; // initial amount to play with

    TradeService.save = function(newTrade) {
      console.log(newTrade)
      _trades.push(newTrade);
      _registerTrade(newTrade);
    }

    var _registerTrade = function(trade) {
      if (trade.type) { // buy
        _cash += (trade.quantity * trade.price);
      } else { // sell
        _cash -= (trade.quantity * trade.price);
      }
    }

    TradeService.getCash = function() {
      return _cash;
    }

    TradeService.getTrades = function() {
      console.log(_trades);
      return _trades;
    }

    return TradeService;
  }])