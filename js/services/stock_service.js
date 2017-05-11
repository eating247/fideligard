Fideligard.factory("StockService", 
  ["_", "DateService", "$http", '$q',
  function(_, DateService, $http, $q) {
    var StockService = {};

    var _stockSymbols = ['GOOG', 'MSFT', 'TSLA', 'VTI', 'AAPL'];

    var _stocks = [];

    StockService.stockQuery = function(stockSymbol) {
      var query =  
        'http://query.yahooapis.com/v1/public/yql?q=%20select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20=%20%22' + 
        stockSymbol + 
        // date input range
        '%20%22and%20startDate%20=%20' + 
        '"2016-01-01"' + 
        '%20and%20endDate%20=%20' + 
        '"2016-06-30"' + 
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

    // return stock data by date
    _filterDate = function(date) {
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
      var stocks = _filterDate( DateService.hyphenFormat() );
      var oneDayAgo = _filterDate( DateService.nDaysAgo(1) );
      var sevenDaysAgo = _filterDate( DateService.nDaysAgo(7) );
      var thirtyDaysAgo = _filterDate( DateService.nDaysAgo(30) );

      var formatted = stocks.map( function(obj, i) {
        return {
          symbol: obj.Symbol,
          price: _format(obj.Close),
          one: _format(obj.Close - oneDayAgo[i].Close),
          seven: _format(obj.Close - sevenDaysAgo[i].Close),
          thirty: _format(obj.Close - thirtyDaysAgo[i].Close)
        }
      })
      console.log(formatted)
      return formatted;
    }

    _format = function(num) {
      return Number(num).toFixed(2)
    }

    return StockService;
  }])