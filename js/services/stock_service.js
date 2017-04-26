Fideligard.factory("StockService", ["_", "DateService", "$http",
  function(_, DateService, $http) {
    var StockService = {};

    var _stock = aapl.query.results.quote; // array of stock info by date

    StockService.compare = function(index, numDays) {
      return _stock[index-numDays].Close;
    }

    StockService.format = function(num) {
      return Number(num).toFixed(2)
    }

    StockService.stockTableData = function() {
      var date = DateService.hyphenFormat();
      var entry = _.find(_stock, {"Date": date});
      var stock = {};
      stock.symbol = entry.Symbol;
      stock.price = StockService.format(entry.Close); 

      //holes
      var i = _stock.indexOf(entry);
      stock.one = StockService.format(entry.Close - StockService.compare(i, 1));
      stock.seven = StockService.format(entry.Close - StockService.compare(i, 7));
      stock.thirty = StockService.format(entry.Close - StockService.compare(i, 30));
      return stock;
    }

    return StockService;
  }])