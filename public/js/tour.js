// let ImageMap = require('image-map');
console.log("version 3");

let mainImage = document.getElementById("tour-img");
let tourDiv = document.getElementById("tour-div");
let overlayDiv = document.getElementById("tour-overlay-div");
const maps = {
    "abbey": [2782.3, 3283.14, 524.566, 622.262]
};

let interval;
let svgMap = document.createElement('object');
svgMap.type = "image/svg+xml";
svgMap.class = "tour-overlay";
overlayDiv.appendChild(svgMap);

function switchImgs(room) {
    let filepath1 = `./img/${room}1.jpg`;
    let filepath2 = `./img/${room}2.jpg`;
    // console.log(filepath1);
    // console.log(filepath2);

    let isFirstImg = false; 

    mainImage.src = filepath1;
    // tourDiv.style.background = `url(${filepath1})`;
    // mainImage.setAttribute("usemap", `#${room}`);
    interval = setInterval(function(){
        if (isFirstImg) {
            mainImage.src = filepath2;
            console.log(filepath2);
            // tourDiv.style.background = `url(${filepath2})`;
            isFirstImg = false;
        } else {
            mainImage.src = filepath1;
            console.log(filepath1);
            // tourDiv.style.background = `url(${filepath1})`;
            isFirstImg = true;
        }
    }, 1000);
    
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
    // svgMap.style.position = "absolute";
    

    // let svgObj = svgMap.contentDocument;
    // console.log(svgObj);    
    // let sections = svgObj.getElementsByClassName("clickable");
    // console.log(sections);

    console.log("svg map created");

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

// rmb to clear interval on clicking into another page
function moveRooms(nextRoom) {
    nextRoom = nextRoom.toLowerCase();
    nextRoom.replace(/\s/g, '');

    console.log(nextRoom);

    clearInterval(interval);
    switchImgs(nextRoom);
    createSvgMap(nextRoom);
    // createImgMap(nextRoom);
    // createInlineSvg(nextRoom);
}

moveRooms("abbey");

