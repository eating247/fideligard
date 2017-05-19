Fideligard.factory("PortfolioService", 
  ["StockService", "TradeService", "DateService",
  function(StockService, TradeService, DateService) {
    var PortfolioService = {};

    var _date = function() {
      return DateService.hyphenFormat();
    }

    var _trades = TradeService.getTrades();

    var _positions = []; //data for lower table

    var _overview; // data for upper table

    var _getPositions = function() {
      _positions = [];
      var filtered = _filterBeforeDate();
      // console.log(filtered.length, 'trades at this date')

      // aggregate by symbol
      filtered.forEach(function(trade) {
        var position = PortfolioService.findPos(trade.symbol);
        if (!position) {
          // if position obj doesn't exist for trades for this symbol, create + populate with price info relative to selected date
          var currentPrices = _findPrices(trade.symbol);
          _positions.push(
                position = {
                symbol: trade.symbol,
                quantity: 0,
                costBasis: 0,
                currentVal: 0,
                // price info relative to current date
                current: currentPrices.price,
                one: currentPrices.one,
                seven: currentPrices.seven,
                thirty: currentPrices.thirty
          })
        }
        // collect trade info
        var type = trade.type ? 1 : -1;
        position.quantity += type * trade.quantity;
        position.costBasis += type * trade.quantity * trade.price;
        position.currentVal += position.quantity * position.current;
      })
    }

    var _filterBeforeDate = function() {
      var filtered = [];
      filtered.push(
        _trades.filter( function(trade) {
          return trade.date <= _date();
        })
      )
      return [].concat.apply([], filtered);
    }

    var _findPrices = function(sym) {
      return StockService.formatStockData().find( function(stock) {
        return stock.symbol === sym
      })
    }

    PortfolioService.findPos = function(sym) {
      return _positions.find(function(position) {
        return position.symbol === sym;
      })
    }

    PortfolioService.getPositions = function() {
      _getPositions();
      return _positions;
    }

    var _getOverview = function() {
      _overview = {
        costBasis: 0,
        currentVal: 0
      }
      
      _positions.forEach(function(position) {
        _overview.costBasis += position.costBasis;
        _overview.currentVal += position.currentVal;
      })
    }

    PortfolioService.getOverview = function() {
      _getOverview();
      return _overview;
    }

    return PortfolioService;
  }])