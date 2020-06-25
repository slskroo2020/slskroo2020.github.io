var socket = io({transports: ['websocket'], upgrade: false});
const iosocket = socket.connect();

(function ($) {
"use strict";

$(document).ready(function () {

    const urlParams = new URLSearchParams(window.location.search);
    var query = urlParams.get('ig');
    console.log(query);

    iosocket.on('connect', function() {
        console.log("Connected!");

        iosocket.emit('reqIG', query);
        iosocket.on('retIG', function(DB) {
            if (DB == "empty") {
                window.location.replace("https://tww2020.site/404.html");
            } else {
                var ig = DB.ig;
                var img = DB.img;
                var sm = DB.sm;

                $('#bgtext').attr("data-bg-text", ig[0].name);
                $('#igtitle').text(ig[0].name);
                $('#igdesc').text(ig[0].description);
                $('#igtagline').text(ig[0].tagline);
                
                // Carousel
                for (var i=0;i<img.length;i++) {
                    var indic = $("<li></li>").attr({
                        'data-target': '#carouselIndicators',
                        'data-slide-to': i    
                    });
                    var carItem = {
                        title: img[i].title,
                        caption: img[i].caption
                    }
                    
                    var carDiv = $("<div></div>").addClass('carousel-item');

                    if (i==0) {
                        indic.addClass("active");
                        carDiv.addClass("active");
                    }

                    // If Image
                    if (img[i].type=="jpg" || img[i].type=="png") {
                        carItem.class = "imp-pop-up";
                        carItem.url = `../../img/ig/${ig[0].name}/${img[i].ref}.${img[i].type}`;
                        carItem.content = `<img class="d-block" src="../../img/ig/${ig[0].name}/${img[i].ref}.${img[i].type}" alt="${img[i].title}">`;
                    }
                    
                    // If Video
                    else if (img[i].type=="youtube" || img[i].type=="vimeo") {
                        carItem.class = "popup-video";
                        
                        if (img[i].type=="youtube") {
                            carItem.url = `https://www.youtube.com/watch?v=${img[i].ref}`;
                            carItem.content = `<iframe class="carousel-embed-responsive-item" src="https://www.youtube.com/embed/${img[i].ref}?rel=0&mute=1" allow="autoplay" frameborder="0" allowfullscreen alt="${img[i].title}"></iframe>`;
                        } else { // Vimeo
                            carItem.url = `https://www.youtube.com/watch?v=${img[i].ref}`;
                            carItem.content = `<iframe class="carousel-embed-responsive-item" src="https://www.youtube.com/embed/${img[i].ref}?rel=0&mute=1" allow="autoplay" frameborder="0" allowfullscreen alt="${img[i].title}"></iframe>`;
                        };
                    }

                    var carElement = `<a href="${carItem.url}" class="${carItem.class}" title="<span class='mfp-header'>${carItem.title} | </span>${carItem.caption}">
                                        <div class="carousel-overlay"></div>
                                        ${carItem.content}
                                        <div class="carousel-caption d-none d-md-block">
                                            <h5>${carItem.title}</h5>
                                            <p>${carItem.caption}</p>
                                        </div>
                                    </a>`;

                    carDiv.append(carElement);
                    $('.carousel-indicators').append(indic);
                    $('.carousel-inner').append(carDiv);
                }

                for (var i=0;i<sm.length;i++) {
                    var smLink = $('<a></a>').attr({
                        class: "social",
                        href: sm[i].url,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    })
                    var smIcon = $('<i></i>').addClass(`fa fa-${sm[i].type} fa-2x`);
                    smLink.append(smIcon);
                    
                    $('#smcontainer').append(smLink);
                }
            }
            document.title = query;
            $('#cover').fadeOut(500);
            $('body').getNiceScroll().resize();
        });

        iosocket.on('disconnect', function() {
            console.log("Disconnected");
        });
    });
});

})(jQuery);	

