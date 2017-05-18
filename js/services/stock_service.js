Fideligard.factory("StockService", 
  ["_", "DateService", "$http", '$q',
  function(_, DateService, $http, $q) {
    var StockService = {};

    // var _stockSymbols = ['GOOG', 'MSFT', 'TSLA', 'VTI', 'AAPL', 'PG', 'YHOO', 'FB', 'WMT', 'SSNLF', 'BP', 'GM', 'HP', 'VZ', 'T', 'COST'];

    var _stockSymbols = ['MSFT'];

    var _stocks = [];

    var _stockData = {};

    var _query = function(stockSymbol) {
      var query =  
        "https://www.quandl.com/api/v3/datasets/WIKI/" 
        // symbol
        + stockSymbol + ".json?"
        // start date
        + "start_date=2016-06-01&"
        // end date
        + "end_date=2017-01-01"
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
      // var requests = [];
      // for(var i = 0; i < _stockSymbols.length; i++) {
      //   requests.push(_getStock(_stockSymbols[i]))
      // }

      // return $q.all(requests)
      //          .then(function(response) {
      //             console.table(response)
      //             for(var i = 0; i < response.length; i++) {
      //               _stocks.push(response[i].dataset.data);
      //             };
      //             _processData(_stocks)
      //             return _stockData;
      //          }, function(response) {
      //           console.error(response);
      //          })
      _stocks.push(response)
      _processData(_stocks)
    }

    // organize stock info by date + symbol
    var _processData = function(stocks) {
      _stocks.forEach(function(stock) {
        var sym = stock.dataset.dataset_code;
        var data = stock.dataset.data;
        _stockData[sym] = {};
        for(var i = 0; i < data.length; i++) {
          var date = data[i][0];
          var price = data[i][1];
          _stockData[sym][date] = price;
        }

        console.log("HELLOOOOOO")
        // for missing dates, use closing price from day before
        for(var i = 1; i < 180; i++) {
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

      _stockSymbols.forEach(function(sym) {
        var price = _stockData[sym][date]
        displayedData.push({
          symbol: sym,
          price: price,
          one: price - _stockData[sym][oneDayBefore],
          seven: price - _stockData[sym][sevenDaysBefore],
          thirty: price - _stockData[sym][thirtyDaysBefore]
        })
      })

      console.table(displayedData)
      return displayedData;
    }

    return StockService;
  }])