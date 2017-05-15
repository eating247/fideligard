Fideligard.factory("DateService", ["_", 
  function(_) {
    var DateService = {};

    var _value = 90;

    var _date = new Date(2016, 5, _value); // initialized form value

    DateService.date = function() {
      return _date;
    }

    // 2017-01-01 format
    DateService.hyphenFormat = function() {
      var date = _date.toISOString().slice(0,10);
      return date;
    }

    // Jan 1, 2017 format
    DateService.stringFormat = function() {
      var date = _date.toDateString();
      date = date.slice(4, 10) + ',' + date.slice(10)
      return date; 
    }

    // processes date input from slider form
    DateService.setDateValue = function(value) {
      _date = new Date(2016, 5, value)
      return _date;
    }

    // processes date input from stock service
    DateService.setHyphenDateValue = function(value) {
      _date = new Date(2016, 5, value)
      return DateService.hyphenFormat();
    }    

    // provides date for selected date - n days
    DateService.nDaysAgo = function(n) {
      one = new Date(2016, 5, (_value - n));
      return one.toISOString().slice(0,10);
    }

    return DateService;
  }])