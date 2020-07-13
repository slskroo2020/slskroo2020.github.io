(function ($) {
"use strict";
var audio = document.getElementById("bgaudio");

$(window).on('load', function() {
  audio.volume = 0.3;
});

$('.mutebtn').on('click', function() {
  event.preventDefault();
  $('.muteicon').toggleClass('fa-volume-mute');
  $('.muteicon').toggleClass('fa-volume-up');
  if (audio.paused == false) {
    audio.pause();
  } else {
    audio.play();
  }
});

// Seamless Audio Loop Fix
audio.addEventListener('timeupdate', function(){
    var buffer = .44
    if(this.currentTime > this.duration - buffer){
        this.currentTime = 0
        this.play()
    }
});

})(jQuery);	