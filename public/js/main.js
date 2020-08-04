(function ($) {
"use strict";
// TOP Menu Sticky
$(window).on('scroll', function () {
  
	var scroll = $(window).scrollTop();
	if (scroll < 100) {
    $("#sticky-header").removeClass("sticky");
    $('#back-top').fadeIn(500);
	} else {
    $("#sticky-header").addClass("sticky");
    $('#back-top').fadeIn(500);
	}
});

// Loading bar
var count = 4;

var url = document.title;
var pageChk = false;
if (url == "LOCIPs" || url == "Arts - Interest Groups"|| url == "Loading..."|| url == "Sports - Interest Groups" || url == "Enrichment - Interest Groups" || url == "OCTs" || url == "Student Groups") pageChk = true;

function animate() {
  if(count == 99 || $('#percent').text() == '100%'){
    clearInterval(loading);
  } else {
    count = count + 1;
    $('#progress').width(count+'%');
    $('#percent').text(count+'%');
  }
}

var loading = setInterval(animate, 50);

$(window).on('load', function() {
    // Intro Sequence
    if (pageChk == false) {
      clearInterval(loading);
      $('#progress').width('100%');
      $('#percent').text('100%');
      $('#loadingtext').text('Hyperdrive ready!');
      $('#cover').fadeOut(500);
    }
});



$(document).ready(function(){

// mobile_menu
var menu = $('ul#navigation');
if(menu.length){
	menu.slicknav({
		prependTo: ".mobile_menu",
		closedSymbol: '+',
		openedSymbol:'-'
	});
};
// blog-menu
  // $('ul#blog-menu').slicknav({
  //   prependTo: ".blog_menu"
  // });

// review-active
$('.slider_active').owlCarousel({
  loop:true,
  margin:0,
  items:1,
  autoplay:true,
  navText:['<i class="ti-angle-left"></i>','<i class="ti-angle-right"></i>'],
  nav:true,
  dots:false,
  autoplayHoverPause: true,
  autoplaySpeed: 800,
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
  responsive:{
      0:{
          items:1,
          nav:false,
      },
      767:{
          items:1,
      },
      992:{
          items:1,
          nav:true
      },
      1200:{
          items:1,
      },
      1600:{
          items:1,
          nav:true
      }
  }
});



// review-active
var brand_active = $('.brand_active');
if(brand_active.length){
  brand_active.owlCarousel({
  loop:true,
  margin:0,
  autoplay:true,
  navText:['<i class="ti-angle-left"></i>','<i class="ti-angle-right"></i>'],
  nav:false,
  dots:false,
  autoplayHoverPause: false,
  autoplaySpeed: 800,
  center: false,
    responsive:{
        0:{
            items:2,
            nav:false
        },
        767:{
            items:3
        },
        992:{
            items:4
        },
        1200:{
            items:5
        },
        1500:{
            items:5
        }
    }
  });
}


// for filter
  // init Isotope
  var $grid = $('.grid').isotope({
    itemSelector: '.grid-item',
    percentPosition: true,
    masonry: {
      // use outer width of grid-sizer for columnWidth
      columnWidth: 1
    }
  });

  // filter items on button click
  $('.portfolio-menu').on('click', 'button', function () {
    var filterValue = $(this).attr('data-filter');
    $grid.isotope({ filter: filterValue });
  });

  //for menu active class
  $('.portfolio-menu button').on('click', function (event) {
    $(this).siblings('.active').removeClass('active');
    $(this).addClass('active');
    event.preventDefault();
	});
  
  // wow js
  new WOW().init();

  // counter 
  $('.counter').counterUp({
    delay: 10,
    time: 10000
  });

/* magnificPopup img view */
$('.popup-image').magnificPopup({
	type: 'image',
	gallery: {
	  enabled: true
  }
});

/* magnificPopup img view */
$('.img-pop-up').magnificPopup({
	type: 'image',
	gallery: {
	  enabled: true
	}
});

/* magnificPopup galleries for each day */
$('.img-pop-up-d1').magnificPopup({
	type: 'image',
	gallery: {
	  enabled: true
	}
});

$('.img-pop-up-d2').magnificPopup({
	type: 'image',
	gallery: {
	  enabled: true
	}
});

$('.img-pop-up-d3').magnificPopup({
	type: 'image',
	gallery: {
	  enabled: true
	}
});

$('.img-pop-up-d4').magnificPopup({
	type: 'image',
	gallery: {
	  enabled: true
	}
});

$('.vid-pop-up').magnificPopup({
	type: 'iframe',
	gallery: {
	  enabled: true
	}
});

/* magnificPopup video view */
$('.popup-video').magnificPopup({
	type: 'iframe'
});


  // scrollIt for smoth scroll
  $.scrollIt({
    upKey: 38,             // key code to navigate to the next section
    downKey: 40,           // key code to navigate to the previous section
    easing: 'linear',      // the easing function for animation
    scrollTime: 600,       // how long (in ms) the animation takes
    activeClass: 'active', // class given to the active nav element
    onPageChange: null,    // function(pageIndex) that is called when page is changed
    topOffset: 0           // offste (in px) for fixed top navigation
  });

  // scrollup bottom to top
  $.scrollUp({
    scrollName: 'scrollUp', // Element ID
    topDistance: '4500', // Distance from top before showing element (px)
    topSpeed: 300, // Speed back to top (ms)
    animation: 'slide', // Fade, slide, none
    animationInSpeed: 200, // Animation in speed (ms)
    animationOutSpeed: 200, // Animation out speed (ms)
    easingType: 'easeInOutExpo',
    scrollText: '<i class="ti-angle-up"></i>', // Text for element
    activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
    scrollSpeed: 900,
    animation: 'slide'
  });


  // blog-page

  //brand-active
$('.brand-active').owlCarousel({
  loop:true,
  margin:30,
items:1,
autoplay:true,
  nav:false,
dots:false,
autoplayHoverPause: true,
autoplaySpeed: 800,
  responsive:{
      0:{
          items:1,
          nav:false

      },
      767:{
          items:4
      },
      992:{
          items:7
      }
  }
});

// blog-dtails-page

  //project-active
$('.project-active').owlCarousel({
  loop:true,
  margin:30,
items:1,
// autoplay:true,
navText:['<i class="Flaticon flaticon-left-arrow"></i>','<i class="Flaticon flaticon-right-arrow"></i>'],
nav:true,
dots:false,
// autoplayHoverPause: true,
// autoplaySpeed: 800,
  responsive:{
      0:{
          items:1,
          nav:false

      },
      767:{
          items:1,
          nav:false
      },
      992:{
          items:2,
          nav:false
      },
      1200:{
          items:1,
      },
      1501:{
          items:2,
      }
  }
});

if (document.getElementById('default-select')) {
  $('select').niceSelect();
}

  //about-pro-active
$('.details_active').owlCarousel({
  loop:true,
  margin:0,
items:1,
// autoplay:true,
navText:['<i class="ti-angle-left"></i>','<i class="ti-angle-right"></i>'],
nav:true,
dots:false,
// autoplayHoverPause: true,
// autoplaySpeed: 800,
  responsive:{
      0:{
          items:1,
          nav:false

      },
      767:{
          items:1,
          nav:false
      },
      992:{
          items:1,
          nav:false
      },
      1200:{
          items:1,
      }
  }
});

});

// resitration_Form
$(document).ready(function() {
	$('.popup-with-form').magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#name',

		// When elemened is focused, some mobile browsers in some cases zoom in
		// It looks not nice, so we disable it:
		callbacks: {
			beforeOpen: function() {
				if($(window).width() < 700) {
					this.st.focus = false;
				} else {
					this.st.focus = '#name';
				}
			}
		}
	});
});



//------- Mailchimp js --------//  
// function mailChimp() {
//   $('#mc_embed_signup').find('form').ajaxChimp();
// }
// mailChimp();



        // Search Toggle
        $("#search_input_box").hide();
        $("#search").on("click", function () {
            $("#search_input_box").slideToggle();
            $("#search_input").focus();
        });
        $("#close_search").on("click", function () {
            $('#search_input_box').slideUp(500);
        });
        // Search Toggle
        $("#search_input_box").hide();
        $("#search_1").on("click", function () {
            $("#search_input_box").slideToggle();
            $("#search_input").focus();
        });
        $(document).ready(function() {
          $('select').niceSelect();
        });


        


      const tilt = $('.js-tilt').tilt({
          maxTilt:        20,
          // perspective:    10,   // Transform perspective, the lower the more extreme the tilt gets.
          // easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
          // scale:          1,      // 2 = 200%, 1.5 = 150%, etc..
          // speed:          500,    // Speed of the enter/exit transition.
          // transition:     true,   // Set a transition on enter/exit.
          // disableAxis:    null,   // What axis should be disabled. Can be X or Y.
          // reset:          true,   // If the tilt effect has to be reset on exit.
          // glare:          true,  // Enables glare effect
          // maxGlare:       1       // From 0 - 1.
      });


      // var cursor = document.getElementById('cursor');
      // document.addEventListener('mousemove', function(e){
      // var x = e.clientX;
      // var y = e.clientY;
      // cursor.style.left = x + 'px';
      // cursor.style.top = y + 'px';
      // })

})(jQuery);	

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"]), button.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top) // Add "- (number) to accomodate for a sticky header if any"
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Rellax Custom Settings
  var rellaxFast = new Rellax('.rellax-notsofast', {
    speed: 1.5
  })
  var rellaxFast = new Rellax('.rellax-fast', {
    speed: 2
  })
  var rellaxSlow = new Rellax('.rellax-slow', {
    speed: -5
  })
  var rellaxFaster = new Rellax('.rellax-faster', {
    speed: 2.5
  })
  
  // Prevent Dropdowner Action Cleanly
  $('a.dropdowner').click(function(e){
      e.preventDefault();
  });

// NiceScroll
// $(function() {
//   $("body").niceScroll({
//     cursorborder: "none",
//     cursorcolor:'#C85930',
//     cursorwidth: 10,
//     cursoropacitymin: 0.3,
//     autohidemode: 'leave',
//     zindex: 999
//   });
// });
