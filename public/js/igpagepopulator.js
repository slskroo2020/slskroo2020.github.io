(function ($) {
"use strict";

var socket = io({transports: ['websocket'], upgrade: false});
const iosocket = socket.connect();

$(document).ready(function () {

    const urlParams = new URLSearchParams(window.location.search);
    var query = $('#pageTitle').text();

    iosocket.on('connect', function() {
        console.log("Connected!");

        iosocket.emit('reqIGPage', query);
        iosocket.on('retIGPage', function(DB) {
            if (DB == "empty") {
                window.location.replace("https://tww2020.site/404.html");
            } else {
                var ig = DB.ig;
                var img = DB.img;
                
                console.log(ig.length);
                for (var i=0;i<ig.length;i++) {
                    console.log(i);
                    // Retrieve Thumbnail
                    var thumbnail = {filename:"", type:""};
                    for (var x=0;x<img.length;x++) {
                        if (img[x].name == ig[i].name) {
                            if (img[x].type == "png" || img[x].type == "jpg" || img[x].type == "jpeg") {
                                thumbnail.filename = img[x].ref;
                                thumbnail.type = img[x].type;
                                console.log("Found! "+img[x].ref+"."+img[x].type);
                                break;
                            }
                        }
                    }
                    console.log("Continuing.")

                    // Create IG Box
                    var igBox = $("<div></div>");
                    igBox.attr({
                        'class': 'col-lg-3 ig-item shadow rounded',
                    });
                    igBox.html(`<a href="single.html?ig=${ig[i].name.replace(/\&/g, "%26")}" class="ig-link">
                                    <div class="ig-thumb rounded-top" style="background: url(../img/ig/${thumbnail.filename}.${thumbnail.type});"></div>
                                    <div class="row py-2 px-3">
                                        <div class="col">
                                            <h4>${ig[i].name.replace(/_/g, " ")}</h4>
                                            <p>${ig[i].tagline}</p>
                                        </div>
                                    </div>
                                </a>`)
                    $('#igContainer').append(igBox)
                }    
            }
            VanillaTilt.init(document.querySelectorAll(".ig-item"));
            // $('#cover').fadeOut(500);
            // $('body').getNiceScroll().resize();
        });

        iosocket.on('disconnect', function() {
            console.log("Disconnected");
        });
    });
});

})(jQuery);	
