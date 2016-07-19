(function($) {
  $.fn._clock = {};
  $.fn.clock = function (options) 
  {	  
	  object          = this;
	  object._options = options;
	  var objectId   = $(object).attr('id');
	  
	  if ($.fn._clock[objectId] == undefined) {
		  $.fn._clock[objectId] = {};
	  }
	  
	  $.fn._clock[objectId]['_object'] = object;
	  
	  if ($.fn._clock[objectId]['_interval'] != undefined) {
		  clearInterval($.fn._clock[objectId]['_interval']);
	  }
	  
	  function update() 
	  {		  
		  object = $.fn._clock[objectId]['_object'];
		 
		  var date   = {};
		  var fields = ['day', 'month', 'year', 'hour', 'minute', 'second']; 
		  for (i = 0; i < fields.length; i++) {
			  if (object._options[fields[i]] < 10) {
				  date[fields[i]] = '0' + object._options[fields[i]];
		      } else {
		    	  date[fields[i]] = object._options[fields[i]];
		      }
		  }
		  
		  if ($.fn._clock[objectId]['_initialized'] == undefined) {
			  for (i = 0; i < fields.length; i++) {
				  var container = $('<span></span>');
				  container.attr('id', objectId  + '-' + fields[i]);
				  container.attr('class', objectId  + '-' + fields[i]);
				  $(object).append(container);
			  }
			  $.fn._clock[objectId]['_initialized'] = true;
		  }
		  for (i = 0; i < fields.length; i++) {
			  if (fields[i] == 'hour' || fields[i] == 'minute') {
				  date[fields[i]] = date[fields[i]] + ':';
			  }
			  if (fields[i] == 'day' || fields[i] == 'month') {
				  date[fields[i]] = date[fields[i]] + '.';
			  }
			  $('#' + objectId + '-' + fields[i]).html(date[fields[i]]);
		  }
	  }
	  
	  function daysOfMonth(month, year)
	  {
		  var daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		  if (year%4 == 0) {
			  daysOfMonth[1]++;
		  }
		  
		  return daysOfMonth[month - 1];
	  }
	  
	  function tick() 
	  {
		  object = $.fn._clock[objectId]['_object'];
		  
		  object._options.second++;
		  if (object._options.second == 60) {
			  object._options.second = 0;
			  object._options.minute++;
			  if (object._options.minute == 60) {
				  object._options.minute = 0;
				  object._options.hour++;
				  if (object._options.hour == 24) {
					  object._options.hour = 0;
					  object._options.day++;
					  if (object._options.day == daysOfMonth(object._options.month, object._options.year) + 1) {
						  object._options.day = 1;
						  object._options.month++;
						  if (object._options.month == 13) {
							  object._options.month = 1;
							  object._options.year++;
						  }
					  }
				  }
			  }
		  }	  
	  }		  
	  
	  update();
	  $.fn._clock[objectId]['_interval'] = setInterval(function () {
		  tick();
		  update();
	  }, 1000);
	  
	  if (this._options['syncTimeout'] != undefined && this._options['syncTimeout'] > 0) {
		  $.fn._clock[objectId]['_syncTimeout'] = setTimeout(function () {
			  var timestamp = Number(new Date());
			  
			  object = $.fn._clock[objectId]['_object'];
			  
			  $.get('/date-time/sync/timezone/' + object._options['timezone'] + '/?' + timestamp, {}, function (data) {
				  eval('var data = ' + data);
				  
				  object = $.fn._clock[objectId]['_object'];
				  
				  data.syncTimeout = object._options['syncTimeout'];
				  $(object).clock(data);
			  });
		  }, this._options['syncTimeout']);
	  }
  };
})(jQuery);
