Fideligard.factory("DateService", ["_", 
  function(_) {
    var DateService = {};

    var _value = 50;

    // initialized value
    var _date = moment('2016-05-31').add(_value, 'days').toDate(); 

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
      _value = value;
      // _date = new Date(2016, 5, value)
      _date = moment('2016-05-31').add(_value, 'days').toDate();
      return _date;
    }

    // for stock service data processing
    DateService.setHyphenDateValue = function(value) {
      var date = moment('2016-05-31').add(value, 'days').toDate();
      return date.toISOString().slice(0,10);
    }    

    // provides date for selected date - n days
    DateService.nDaysAgo = function(n) {
      var n = new Date(2016, 5, (_value - n));
      return n.toISOString().slice(0,10);
    }

    return DateService;
  }])