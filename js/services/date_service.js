Fideligard.factory("DateService", ["_", 
  function(_) {
    var DateService = {};

    var _value = 90;

    var _date = new Date(2016, 0, _value); // initialized form value

    DateService.date = function() {
      return _date;
    }

    DateService.hyphenFormat = function() {
      var date = _date.toISOString().slice(0,10);
      return date; // 2017-01-01 format
    }

    DateService.stringFormat = function() {
      var date = _date.toDateString();
      date = date.slice(4, 10) + ',' + date.slice(10)
      return date; // Jan 1, 2017 format
    }

    // processes date input from slider form
    DateService.setDateValue = function(value) {
      _value = value;
      _date = new Date(2016, 0, _value)
      return _date;
    }

    DateService.nDaysAgo = function(n) {
      one = new Date(2016, 0, _value - n);
      return one.toISOString().slice(0,10);
    }

    return DateService;
  }])