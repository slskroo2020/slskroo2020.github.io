// server.js

require('dotenv').config();

const express = require('express')
, app = express()
, server = require('http').createServer(app)
, port = process.env.PORT || 3000
, path = require('path')
, socketio = require('socket.io')
, mysql = require('mysql')
, pool = mysql.createPool({
	host : process.env.MYSQLHOST,
	user : process.env.MYSQLUSER,
	password : process.env.MYSQLPASS,
	database : process.env.MYSQLDB,
    charset : 'utf8mb4_unicode_ci',
    port : process.env.MYSQLPORT
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/:id', function (req, res) {
    res.status(404).redirect('/404.html');
    res.sendFile('index.html', {root: path.join(__dirname, 'public/'+req.params.id)});
})

app.get('*', function(req, res) {
    res.status(404).redirect('/404.html');
});

server.listen(port, function(){
    console.log (`Server listening on port ${port}.`);
});

var igDetails = [];
var igImages = [];
var igReviews = [];

pool.getConnection(function(err, connection){
    if (err) throw err;
    connection.query(`SELECT * FROM ig_details`, function (err, result1) {
        if (err) throw err;
        if (result1.length < 1) {
            console.log(`Database Empty.`);
            connection.release();
        } else {
            igDetails = result1;
            console.log(`Step 1 Success`);
            connection.query(`SELECT * FROM reviews`, function (err, result2) {
                if (err) throw err;
                igReviews = result2;
                console.log(`Step 2 Success`);
            connection.query(`SELECT * FROM images_videos`, function (err, result3) {
                if (err) throw err;
                igImages = result3;
                console.log(`Step 3 Success`);
                // connection.query(`SELECT * FROM social_media WHERE name='${targetIG}'`, function (err, result3) {
                //     if (err) throw err;
                //     socialMedia = result3;
                //     console.log(`Step 3 Success`);
                    connection.release();
                });
            });
        };
    });
});


socketio.listen(server).on('connection', function (socket) {
    console.log(`Got a connection on socket: ${socket}.`);

    socket.on('reqIG', function(targetIG) {
        console.log(`Retrieving IG data for ${targetIG}`);
        var det = [], img = [], rev = [];

        for (var i=0;i<igDetails.length;i++){
            if (igDetails[i].name == targetIG) {
                det.push(igDetails[i]);
            }
        }
        for (var i=0;i<igImages.length;i++){
            if (igImages[i].name == targetIG) {
                img.push(igImages[i]);
            }
        }
        for (var i=0;i<igReviews.length;i++){
            if (igReviews[i].name == targetIG) {
                rev.push(igReviews[i]);
            }
        }

        if (det.length == 0) {
            socket.emit('retIG', "empty");
            console.log(`Single IG Request Failed: IG does not exist.`);
        }

        socket.emit('retIG', {'ig': det, 'reviews': rev, 'img': img});
    });

    socket.on('reqIGPage', function(targetCategory) {
        console.log(`Retrieving IG data for ${targetCategory}`);
        var det = [], img = [];
        for (var i=0;i<igDetails.length;i++) {
            if (igDetails[i].category == targetCategory) {
                det.push(igDetails[i]);
                name = igDetails[i].name;
                for (var x=0;x<igImages.length;x++) {
                    if (igImages[x].name == igDetails[i].name) img.push(igImages[x]);
                }
            }
        }
        socket.emit('retIGPage', {'ig': det, 'img': img});
    });
    
    socket.on('disconnect', function(){
        console.log(`Socket: ${socket} disconnected.`);
    });
});