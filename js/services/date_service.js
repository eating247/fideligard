Fideligard.factory("DateService", ["_", 
  function(_) {
    var DateService = {};

    var _date = new Date(2014, 0, 90); // initialized form value

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

      // return _date.toLocaleDateString() //01-01-17 format
    }

    DateService.setDateValue = function(value) {
      _date = new Date(2014, 0, value)
      return _date;
    }

    return DateService;
  }])