// let ImageMap = require('image-map');
// const maps = {
//     "abbey": [2782.3, 3283.14, 524.566, 622.262]
// };

console.log("version 4");

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

const roomNames = {
    "17liftstairsview": "Lifts",
    "17liftloungeview": "Lifts",
    "17leftcorridor": "USP-facing corridor",
    "17pantry": "Pantry",
    "17laundrycorridor": "Forest-facing corridor",
    "17laundryroom": "Laundry Room",

}

const roomDescriptions = {
    "17liftstairsview": "You can see the stairs on the left!",
    "17liftloungeview": "On the right is the level lounge! Take note that you can only enter lounges of your own zone / house using your matric card",
    "17leftcorridor": "We usually chalk each other's doors so everyone has a fun, personalised door instead of a plain one :') Also, the pantry is up ahead!",
    "17pantry": "There's a pantry every 4 floors, with amenities like a fridge, water cooler (which dispenses both hot and ice water), microwave, electric stove and sink to store ice cream, wash your tupperware or do your cooking! Remember to label your food before putting it into the fridge!",
    "17laundrycorridor": "The garbage disposal room and laundry room are along this corridor. The garbage disposal room has different chutes for recyclables and general waste, as well as some cleaning supplies like a mop and bucket. Click the arrow ahead to see the laundry room!",
    "17laundryroom": "Located on 2 floors, Level 9 and Level 17, the laundry rooms come equipped with both washing machines and dryers :) They cost $1 each and would provide you with a fresh set of clothes in no time! (Well, specifically, 30 minutes for the washing machines and 40 minutes for the dryers)",
}

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

function createRoomText(room) {
    if (roomNames[room]) {
        let uppCase = roomNames[room].toUpperCase();
        roomName.innerText = uppCase;
    } else {
        roomName.innerText = "Well I have no idea where you are";
    }

    if (roomDescriptions[room]) {
        roomDesc.innerText = roomDescriptions[room];
    } else {
        roomName.innerText = "";
    }
}

function moveRooms(nextRoom) {
    nextRoom = nextRoom.toLowerCase();
    nextRoom.replace(/\s/g, '');

    console.log(nextRoom);

    clearInterval(interval);
    switchImgs(nextRoom);
    createSvgMap(nextRoom);
    createRoomText(nextRoom);
}

moveRooms("17liftloungeview");

