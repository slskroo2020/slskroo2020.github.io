// let ImageMap = require('image-map');
// const maps = {
//     "abbey": [2782.3, 3283.14, 524.566, 622.262]
// };

console.log("version 3");

let mainImage = document.getElementById("tour-img");
let tourDiv = document.getElementById("tour-div");
let overlayDiv = document.getElementById("tour-overlay-div");
let roomName = document.getElementById("tour-room-name");
let roomDesc = document.getElementById("tour-room-description");

let interval;
let previousRoom;

let svgMap = document.createElement('object');
svgMap.type = "image/svg+xml";
svgMap.class = "tour-overlay";
overlayDiv.appendChild(svgMap);

function switchImgs(room) {
    let bg = `./img/${room}.jpg`; 
    // might change to jpg
    let filepath1 = `./img/${room}1.svg`;
    let filepath2 = `./img/${room}2.svg`;

    let isFirstImg = true; 

    tourDiv.style.backgroundImage = `url(${bg})`;
    mainImage.src = filepath1;
    // mainImage.setAttribute("usemap", `#${room}`);
    interval = setInterval(function(){
        if (isFirstImg) {
            mainImage.src = filepath2;
            console.log("switch to " + filepath2);
            isFirstImg = false;
        } else {
            mainImage.src = filepath1;
            console.log("switch to " + filepath1);
            isFirstImg = true;
            previousRoom = room;
        }
    }, 1000); 
}

function fileNotFound() {
    moveRooms(previousRoom);
    alert("Sorry, the next room hasn't been implemented yet!");
}

// function createImgMap(room) {
//     // room = room.toLowerCase();
//     // room.replace(/\s/g, '');

//     let map = document.createElement('map');
//     map.name = room;
//     let area1 = document.createElement('area');
//     area1.shape="rect";
//     area1.href = "console.log('b1corridorright')";
//     area1.coords="3288,3857,2763,3306";
//     map.appendChild(area1);

//     ImageMap('img[usemap]');
//     console.log(map);

// }

function createSvgMap(room) {
    // let svgMap = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    
    svgMap.data = `./img/${room}.svg`;
    console.log("svg map created");

    // let svgObj = svgMap.contentDocument;
    // let sections = svgObj.getElementsByClassName("clickable");
}

// function createInlineSvg(room) {
//     let coods = maps[room];
//     let svgMap = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//     svgMap.setAttributeNS(null,"x",coods[0]);
//     svgMap.setAttributeNS(null,"y",coods[1]);
//     svgMap.setAttributeNS(null,"width",coods[2]);
//     svgMap.setAttributeNS(null,"height",coods[3]);
//     svgMap.setAttributeNS(null,"fill","#fff");
//     svgMap.class = "tour-img";
//     svgMap.style.position = 'relative';

//     tourDiv.appendChild(svgMap);
// }

// TODO
function createRoomText(room) {
    
}

function moveRooms(nextRoom) {
    nextRoom = nextRoom.toLowerCase();
    nextRoom.replace(/\s/g, '');

    console.log(nextRoom);

    clearInterval(interval);
    switchImgs(nextRoom);
    createSvgMap(nextRoom);
    // createRoomText(nextRoom);
}

moveRooms("abbey");

