Fideligard.factory("TradeService", ["_", 
  function(_) {
    var TradeService = {};

    var _trades = [];

    TradeService.save = function(newTrade) {
      console.log(newTrade)
      _trades.push(newTrade);
    }

    return TradeService;
  }])