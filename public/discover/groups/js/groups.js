var socket = io({transports: ['websocket'], upgrade: false});
const iosocket = socket.connect();

var drawnCheck = false;

iosocket.on('connect', function() {
    console.log("Connected!");

    iosocket.emit('reqGroups');
    iosocket.on('retGroups', function(DB) {
        if (drawnCheck == true) return;
        drawnCheck = true;
        if (DB == "empty") {
            window.location.replace("https://tww2020.site/404.html");
        } else {
            var ig = DB;

            for (var i=0;i<ig.length;i++) {
                // Exclude Student Partners
                if (ig[i].category != "SP") {
                    // Populate IG Lists
                var newIG = $("<li></li>");
                newIG.html(`<a href="${ig[i].category.toLowerCase()}/g/?ig=${ig[i].name.replace(/\&/g, "%26")}">${ig[i].name.replace(/_/g, " ")}</a>`);
                $(`#${ig[i].category.toLowerCase()}-div`).append(newIG);
                }
            }    
        }
        $('#progress').width('100%');
        $('#percent').text('100%');
        $('#loadingtext').text('Hyperdrive ready!');
        $('#cover').fadeOut(500);
    });

    iosocket.on('disconnect', function() {
        console.log("Disconnected");
    });
});

