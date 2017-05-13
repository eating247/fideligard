Fideligard.factory("TradeService", ["_", 
  function(_) {
    var TradeService = {};

    var _trades = [];

    TradeService.save = function(newTrade) {
      console.log(newTrade)
      _trades.push(newTrade);
    }

    TradeService.getTrades = function() {
      return _trades;
    }

    return TradeService;
  }])