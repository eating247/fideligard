Fideligard.factory("StockService", 
  ["_", "DateService", "$http", '$q',
  function(_, DateService, $http, $q) {
    var StockService = {};

    var _stockSymbols = ['GOOG', 'MSFT', 'TSLA', 'VTI', 'AAPL']

    var _stocks = [];

    StockService.compare = function(index, numDays) {
      return _stock[index-numDays].Close;
    }

    StockService.format = function(num) {
      return Number(num).toFixed(2)
    }

    StockService.stockQuery = function(stockSymbol) {
      var query =  
        'http://query.yahooapis.com/v1/public/yql?q=%20select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20=%20%22' + 
        stockSymbol + 
        // date input range
        '%20%22and%20startDate%20=%20' + 
        '"2014-01-01"' + 
        '%20and%20endDate%20=%20' + 
        '"2014-06-30"' + 
        '%20&format=json&diagnostics=true%20&env=store://datatables.org/alltableswithkeys%20&callback=';
      return query;
    }

    StockService.getStock = function(stockSymbol) {
      return $http({
        method: "GET",
        url: StockService.stockQuery(stockSymbol)
      })
    }

    StockService.all = function() {
      var requests = [];
      for(var i = 0; i < _stockSymbols.length; i++) {
        requests.push(StockService.getStock(_stockSymbols[i]))
      }

      return $q.all(requests)
               .then(function(response) {
                  for(var i = 0; i < response.length; i++) {
                    _stocks.push(response[i].data.query.results.quote);
                  }
                  return _stocks;
               }, function(response) {
                console.error(response);
               })
    }

    StockService.filterDate = function() {
      var date = DateService.hyphenFormat();
      var filtered = [];
      _stocks.forEach( function(stock) {
        var filteredObj = stock.filter( function(obj) {
          return obj.Date === date;
        })
        filtered.push(filteredObj)
      })
      return [].concat.apply([], filtered);
    }

    // returns processed data for table formatting to stocks controller
    _getData = function(stock) { 
      var i = stock.indexOf(entry);
      stock.one = StockService.format(entry.Close - StockService.compare(i, 1));
      stock.seven = StockService.format(entry.Close - StockService.compare(i, 7));
      stock.thirty = StockService.format(entry.Close - StockService.compare(i, 30));
      return stock;
    }

    return StockService;
  }])