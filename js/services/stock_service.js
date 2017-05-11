Fideligard.factory("StockService", 
  ["_", "DateService", "$http", '$q',
  function(_, DateService, $http, $q) {
    var StockService = {};

    var _stockSymbols = ['GOOG', 'MSFT', 'TSLA', 'VTI', 'AAPL']

    var _stocks = [];

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

    StockService.filterDate = function(date) {
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
      var stocks = StockService.filterDate(date);
      var formatted = stocks.map( function(obj) {
        return {
          symbol: obj.Symbol,
          price: _format(obj.Close),
          one: _format(obj.Close),
          seven: _format(obj.Close),
          thirty: _format(obj.Close)
        }
      })
      console.log(formatted)
      return formatted;
    }


    _compare = function(index, numDays) {
      return _stock[index-numDays].Close;
    }

    _format = function(num) {
      return Number(num).toFixed(2)
    }

    // returns processed data for table formatting to stocks controller
    _getData = function(stock) { 
      var i = stock.indexOf(entry);
      stock.one = _format(entry.Close - _compare(i, 1));
      stock.seven = _format(entry.Close - _compare(i, 7));
      stock.thirty = _format(entry.Close - _compare(i, 30));
      return stock;
    }

    return StockService;
  }])