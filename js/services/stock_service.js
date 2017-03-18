Fideligard.factory("StockService", ["_", "DateService",
  function(_, DateService) {
    var StockService = {};

    var _aaplQuery = aapl.query.results.quote; // array of stock info by date

    StockService.compare = function(index, numDays) {
      return _aaplQuery[index-numDays].Close;
    }

    StockService.getAAPL = function() {
      var date = DateService.hyphenFormat();
      var entry = _.find(_aaplQuery, {"Date": date});
      // populate object for table
      var stock = {};
      stock.symbol = entry.Symbol;
      stock.price = Number(entry.Close).toFixed(2); // refactor rounding

      // holes
      var i = _aaplQuery.indexOf(entry);
      stock.one = Number(entry.Close - StockService.compare(i, 1)).toFixed(2);
      stock.seven = Number(entry.Close - StockService.compare(i, 7)).toFixed(2);
      stock.thirty = Number(entry.Close - StockService.compare(i, 30)).toFixed(2);
      return stock;
    }

    return StockService;
  }])