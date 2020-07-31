var socket = io({transports: ['websocket'], upgrade: false});
const iosocket = socket.connect();

var drawnCheck = false;

function initMagnificPopup(){
    // $('.img-pop-up .popup-video').magnificPopup({
    //     callbacks: {
    //         elementParse: function(item) {
    //             if (item.el.context.className == 'iframe') {
    //                 item.type = 'iframe';
    //             } else {
    //                 item.type = 'image';
    //                 item.image = {titlesrc: 'data-title'};
    //             }
    //         }
    //     },
    // });
    // gallery: {enabled: true},
    // type: 'image'
    $('.img-pop-up').magnificPopup({
        type: 'image',
        gallery: { 
           enabled: true 
        },
        image: {
            titleSrc: 'data-title' 
        }
    });
    $('.popup-video').magnificPopup({
        type: 'iframe',
    });
    console.log("Magnific Initialised");
}

const urlParams = new URLSearchParams(window.location.search);
var query = urlParams.get('ig');

if (query=="College_Students'_Committee") $('#cscnav').addClass('active');
if (query=="Tembusu_Ambassadors") $('#tambsnav').addClass('active');
if (query=="Education_Working_Group_(EWG)") $('#ewgnav').addClass('active');
if (query=="Alumni_Working_Group") $('#awgnav').addClass('active');

iosocket.on('connect', function() {
    console.log("Connected!");

    iosocket.emit('reqIG', query);
    iosocket.on('retIG', function(DB) {
        if (drawnCheck == true) return;
        drawnCheck = true;
        if (DB == "empty") {
            window.location.replace("https://tww2020.site/404.html");
        } else {
            var ig = DB.ig;
            var reviews = DB.reviews;
            var img = DB.img;
            // var sm = DB.sm;

            $('#bgtext').attr("data-bg-text", ig[0].name.replace(/_/g, " "));
            $('#igtitle').text(ig[0].name.replace(/_/g, " "));
            $('#igdesc').text(ig[0].description);
            $('#igtagline').text(ig[0].tagline);
            $('#igcovidplans').text(ig[0].covidplans);
            
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
                if (img[i].type=="jpg" || img[i].type=="png" || img[i].type=="jpeg") {
                    carItem.class = "img-pop-up";
                    carItem.url = `../../img/ig/${img[i].ref}.${img[i].type}`;
                    carItem.content = `<img class="d-block" src="../../img/ig/${img[i].ref}.${img[i].type}" alt="${img[i].ref}">`;
                }
                
                // If Video
                else if (img[i].type=="youtube" || img[i].type=="vimeo") {
                    carItem.class = "popup-video";
                    
                    if (img[i].type=="youtube") {
                        carItem.url = `https://www.youtube.com/watch?v=${img[i].ref}`;
                        carItem.content = `<img class="d-block" src="http://img.youtube.com/vi/${img[i].ref}/0.jpg" alt="${img[i].ref}">
                                            <div class="play-button"></div>`
                        // carItem.content = `<iframe class="carousel-embed-responsive-item" src="https://www.youtube.com/embed/${img[i].ref}?rel=0&mute=1" allow="autoplay" frameborder="0" allowfullscreen alt="${img[i].title}"></iframe>`;
                    } else { // Vimeo
                        carItem.url = `https://www.youtube.com/watch?v=${img[i].ref}`;
                        carItem.content = `<img class="d-block" src="http://img.youtube.com/vi/${img[i].ref}/0.jpg" alt="${img[i].ref}">
                                            <div class="play-button"></div>`
                        // carItem.content = `<iframe class="carousel-embed-responsive-item" src="https://www.youtube.com/embed/${img[i].ref}?rel=0&mute=1" allow="autoplay" frameborder="0" allowfullscreen alt="${img[i].title}"></iframe>`;
                    };
                }

                // var carElement = `<a href="${carItem.url}" class="${carItem.class}" title="${carItem.title}" data-title="<span class='mfp-header'>${carItem.title} | </span>${carItem.caption}">
                var carElement = `<a href="${carItem.url}" class="${carItem.class}">
                                    ${carItem.content}
                                </a>`;
                                    // <div class="carousel-caption d-none d-md-block">
                                    //     <h5>${carItem.title}</h5>
                                    //     <p>${carItem.caption}</p>
                                    // </div>

                carDiv.append(carElement);
                $('.carousel-indicators').append(indic);
                $('.carousel-inner').append(carDiv);
            }

            for (var i=0;i<reviews.length;i++) {
                var quote = $("<blockquote></blockquote>");
                quote.attr({
                    'class': 'generic-blockquote ig-quote'
                })
                quote.html(reviews[i].quote+'<br><span class="ig-quote-author"> - '+reviews[i].person+'</span>');
                $('#igquotecontainer').append(quote)
            }

            // for (var i=0;i<sm.length;i++) {
            //     var smLink = $('<a></a>').attr({
            //         class: "social",
            //         href: sm[i].url,
            //         target: "_blank",
            //         rel: "noopener noreferrer"
            //     })
            //     var smIcon = $('<i></i>').addClass(`fa fa-${sm[i].type} fa-2x`);
            //     smLink.append(smIcon);
                
            //     $('#smcontainer').append(smLink);
            // }
        }
        document.title = query;
        initMagnificPopup();
        $('#progress').width('100%');
        $('#percent').text('100%');
        $('#loadingtext').text('Hyperdrive ready!');
        $('#cover').fadeOut(500);
    });

    iosocket.on('disconnect', function() {
        console.log("Disconnected");
    });
});

