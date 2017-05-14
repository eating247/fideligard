Fideligard.factory("StockService", 
  ["_", "DateService", "$http", '$q',
  function(_, DateService, $http, $q) {
    var StockService = {};

    var _stockSymbols = ['GOOG', 'MSFT', 'TSLA', 'VTI', 'AAPL', 'PG', 'YHOO', 'FB', 'WMT', 'SSNLF', 'BP', 'GM', 'HP', 'VZ', 'T', 'COST'];

    var _stocks = [];

    var _stockData = {};

    var _query = function(stockSymbol) {
      var query =  
        'http://query.yahooapis.com/v1/public/yql?q=%20select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20=%20%22' + 
        stockSymbol + 
        // date input range
        '%20%22and%20startDate%20=%20' + 
        '"2016-06-01"' + 
        '%20and%20endDate%20=%20' + 
        '"2016-11-27"' + 
        '%20&format=json&diagnostics=true%20&env=store://datatables.org/alltableswithkeys%20&callback=';
      return query;
    }

    var _getStock = function(stockSymbol) {
      return $http({
        method: "GET",
        url: _query(stockSymbol)
      })
    }

    // return stock info for entire interval in date form
    StockService.all = function() {
      var requests = [];
      for(var i = 0; i < _stockSymbols.length; i++) {
        requests.push(_getStock(_stockSymbols[i]))
      }

      return $q.all(requests)
               .then(function(response) {
                  for(var i = 0; i < response.length; i++) {
                    _stocks.push(response[i].data.query.results.quote);
                  }
                  _processData(_stocks)
                  return _stockData;
               }, function(response) {
                console.error(response);
               })
    }

    // organize stock info by date + symbol
    var _processData = function(stocks) {
      for (var j = 1; j <= 180; j++) {
        var date = DateService.setHyphenDateValue(j);
        var entry = _stockData[date] = {};
        var stocksByDate = _filterDate(date);
        // if no stock data for current date, retrieves stock info for previous date
        var counter = 1;
        while (!stocksByDate.length) {
          var date = DateService.setHyphenDateValue(j - counter);
          var stocksByDate = _filterDate(date);
          counter++;
        }
        for (var k = 0; k < stocksByDate.length; k++) {
          entry[stocksByDate[k].Symbol.replace(/%20/g, "")] = stocksByDate[k].Close;
        }
      }

      // fill in holes for data
      for (var j = 1; j <= 180; j++) {
        var date = DateService.setHyphenDateValue(j);
        var entry = _stockData[date];
        var stocksByDate = _filterDate(date);
        // if no data found for a specific date, substitute with data from day before
        if (!stocksByDate.length) {
          var dateBefore = DateService.setHyphenDateValue(j - 1);
          var entryBefore = _stockData[dateBefore];
          var entry = $.extend({}, entryBefore);
        }
      }
      return _stockData;
    }

    // return all stock data for specified date
    var _filterDate = function(date) {
      var filtered = [];
      _stocks.forEach( function(stock) {
        filtered.push(
          stock.filter( function(obj) {
            return obj.Date === date;
          })
        )
      })
      return [].concat.apply([], filtered);
    }

    StockService.formatStockData = function() {
      var date = DateService.hyphenFormat();
      var stocksAtDate = _stockData[date];
      var oneDayAgo = _stockData[DateService.nDaysAgo(1)];
      var sevenDaysAgo = _stockData[DateService.nDaysAgo(7)];
      var thirtyDaysAgo = _stockData[DateService.nDaysAgo(30)];

      var displayedData = [];
      Object.keys(stocksAtDate).forEach(function(sym) {
        var obj = stocksAtDate[sym];
        displayedData.push({
          symbol: sym,
          price: obj,
          one: obj - oneDayAgo[sym],
          seven: obj - sevenDaysAgo[sym],
          thirty: obj - thirtyDaysAgo[sym]
        })
      })
      return displayedData;
    }

    // round to two dec
    // TO DO: more formatting...currency format? add + for increases
    var _format = function(num) {
      return Number(num).toFixed(2)
    }

    return StockService;
  }])