Fideligard.factory("StockService", 
  ["_", "DateService", "$http", '$q',
  function(_, DateService, $http, $q) {
    var StockService = {};

    var _stockSymbols = ['MSFT', 'AAPL', 'GOOG', 'TSLA', 'FB', 'T', 'PG', 'GM', 'BP', 'COST', 'WMT', 'AMZN', 'IBM'];

    var _stocks = [];

    var _stockData = {};

    var _query = function(stockSymbol) {
      var query =  
        "https://www.quandl.com/api/v3/datasets/WIKI/" 
        // symbol
        + stockSymbol + ".json?"
        // start date
        + "start_date=2015-12-01&"
        // end date
        + "end_date=2016-12-31"
        + "&&column_index=4&transformation=rdiff"
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
                  console.log("RESPONSE SUCCESSFUL")
                  console.table(response)
                  for(var i = 0; i < response.length; i++) {
                    _stocks.push(response[i].data);
                  };
                  _processData(_stocks)
                  return _stockData;
               }, function(response) {
                console.log("RESPONSE FAILED")
                console.error(response);

                // fallback on hardcoded data in case of 429 error
                _stockSymbols = ['MSFT', 'AAPL', 'GOOG', 'TSLA', 'FB', 'T', 'PG', 'GM', 'BP', 'COST', 'WMT', 'AMZN', 'IBM'];
                _stocks = responses;
                _processData(_stocks);
               })
    }

    var _processData = function(stocks) {
      // creating _stockData object for easier reference
      // organizes stock info by symbol + date
      _stocks.forEach(function(stock) {
        var sym = stock.dataset.dataset_code;
        var data = stock.dataset.data;
        _stockData[sym] = {};
        for(var i = 0; i < data.length; i++) {
          var date = data[i][0];
          var price = data[i][1];
          _stockData[sym][date] = price;
        }

        // for missing dates, use closing price from day before
        for(var i = 1; i < 398; i++) {
          var date = DateService.setHyphenDateValue(i);
          if(!_stockData[sym][date]) {
            var dateBefore = DateService.setHyphenDateValue(i - 1);
            _stockData[sym][date] = _stockData[sym][dateBefore];
          }
        }
      });
    }

    StockService.formatStockData = function() {
      var date = DateService.hyphenFormat();
      var oneDayBefore = DateService.nDaysAgo(1);
      var sevenDaysBefore = DateService.nDaysAgo(7);
      var thirtyDaysBefore = DateService.nDaysAgo(30)

      // contains objects holding data for each row in stock panel
      var displayedData = []; 

      // parse data to be displayed for each stock
      _stockSymbols.forEach(function(sym) {
        var price = _stockData[sym][date];
        displayedData.push({
          symbol: sym,
          price: price,
          one: price - _stockData[sym][oneDayBefore],
          seven: price - _stockData[sym][sevenDaysBefore],
          thirty: price - _stockData[sym][thirtyDaysBefore]
        })
      })
      return displayedData;
    }

    return StockService;
  }])