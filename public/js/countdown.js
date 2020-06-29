(function ($) {
  "use strict";

var countDate = new Date('Aug 2, 2020 18:00:00').getTime();

function countdown(){
  var now = new Date().getTime();
  var gap = countDate - now;

  var second = 1000;
  var minute = second*60;
  var hour = minute*60;
  var day = hour*24;

  var d = Math.floor(gap / (day));
  var h = Math.floor((gap % (day))/(hour));
  var m = Math.floor((gap % (hour))/(minute));
  var s = Math.floor((gap % (minute))/second);

  $("#day").text(d);
  $("#hour").text(h);
  $("#minute").text(m);
  $("#second").text(s);
};

countdown();

setInterval(function(){
  countdown();}, 1000
);

})(jQuery);	