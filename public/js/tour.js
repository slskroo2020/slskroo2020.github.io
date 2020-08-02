"use strict";
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

let myImage = new Image();

const roomNames = {
    "17liftstairsview": "Lifts",
    "17liftloungeview": "Lifts",
    "17leftcorridor": "Cinnamon-facing corridor",
    "17pantry": "Pantry",
    "17laundrycorridor": "Forest-facing corridor",
    "17laundryroom": "Laundry Room",

    "dininghall": "Dining Hall",
    "lobbydhview": "L1 Lobby",
    "lobbymain": "L1 Lobby",
    "lobbypostboxview": "L1 Lobby",

    "outsidemaindoors": "Outside Main Doors",
    "mph": "Multipurpose Hall",
    "mphfromdropoffpoint": "Multipurpose Hall",
    "mphoutside": "Walkway to MPH",
    "dropoffopint": "Drop Off Point",
    "bridgetolearnlobe": "Walkway to Learn Lobe",

    "abbey": "Abbey",
    "b1fullcorridor": "Learn Lobe B1",
    "b1rightcorridor": "Learn Lobe B1",
    "blankcanvas": "Blank Canvas",
    "boxoffice": "Box Office",
    "l1fullcorridor": "Learn Lobe L1",
    "l1incorridor": "Learn Lobe L1",
    "l1rightcorridor": "Learn Lobe L1",
    "oasis": "Oasis",
    "readingroom": "Reading Room",
    "seminarroom": "Seminar Room",

}

const roomDescriptions = {
    "17liftstairsview": "Through the doors on the left are the stairs! \n\nAlso, welcome to level 17 :) We used this floor as a demo because it is one of only two floors with both a laundry room and pantry -- the location of these two rooms are the same no matter which floor it is! \n\nPantry floors: 5, 9, 13, 17, 21 \nLaundry floors: 9, 17",
    "17liftloungeview": "On the right is the level lounge! Take note that you can only enter lounges of your own zone / house using your matric card",
    "17leftcorridor": "We usually chalk each other's doors so everyone has a fun, personalised door instead of a plain one :') Also, the pantry is up ahead!",
    "17pantry": "There's a pantry every 4 floors, with amenities like a fridge, water cooler (which dispenses both hot and ice water), microwave, electric stove and sink to store ice cream, wash your tupperware or do your cooking! Remember to label your food before putting it into the fridge!",
    "17laundrycorridor": "The garbage disposal room and laundry room are along this corridor. The garbage disposal room has different chutes for recyclables and general waste, as well as some cleaning supplies like a mop and bucket. Click the arrow ahead to see the laundry room!",
    "17laundryroom": "Located on 2 floors, Level 9 and Level 17, the laundry rooms come equipped with both washing machines and dryers. They cost $1 each, can be paid by ez-link card or a $1 coin, and would provide you with a fresh set of clothes in no time at all! (Well, specifically, 30 minutes for the washing machines and 40 minutes for the dryers)",
}

function preloadAllImgs() {
    let img = new Image();
    const allRooms = Object.keys(roomNames);
    for (let i = 0; i < allRooms.length; i++) {
        img.src = `./img/${allRooms[i]}.jpg`;
        console.log(allRooms[i]);
    }
}

// function preloadImgs(area) {
//     const l17 = [];
//     const l1main = [];
//     const l1learnlobe = [];
//     const b1learnlobe = [];
//     const b1outside = [];
//     const l3 = [];
//     let img = new Image();
//     switch(area) {
//         case "l17":
//             for (let i = 0; i < l17.length; i++) {
//                 img.src = `./img/${room}.jpg`;
//             }
//             break;
//         case "l1main":
//             break;
//         case "l1learnlobe":
//             break;
//         case "b1learnlobe":
//             break;
//         case "b1outside":
//             break;
//         case "l3":
//             break;
//         default:
//             // do nothing
//     }
//     img.src=url;
// }

function checkImgs(room) {
    const bg = `./img/${room}.jpg`; 
    const filepath1 = `./img/${room}1.svg`;
    const filepath2 = `./img/${room}2.svg`;
    const svgData = `./img/${room}.svg`;

    var loadTime = setTimeout(function(){$('#loading-overlay').fadeIn(100);}, 100);
    
    myImage.src = bg;
    myImage.onload = function(){
        myImage.src = filepath1;
        myImage.onload = function(){
            myImage.src = filepath2;
            myImage.onload = function(){
                myImage.src = svgData
                myImage.onload = function() {
                    // SUCCESS
                    previousRoom = room;
                    switchImgs(room);
                    createRoomText(room);
                    svgMap.data = svgData;
                    window.clearTimeout(loadTime);
                    $('#loading-overlay').fadeOut(100);
                }
            }
        }
    }
    myImage.onerror = fileNotFound; 
}
function switchImgs(room){
    console.log("images all loaded");
    
    const bg = `./img/${room}.jpg`; 
    let filepath1 = `./img/${room}1.svg`;
    let filepath2 = `./img/${room}2.svg`;
    let isFirstImg = true; 

    // set background to image of room
    tourDiv.style.backgroundImage = `url(${bg})`;

    // set SVG animations
    mainImage.src = filepath1;
    interval = setInterval(function(){
        if (isFirstImg) {
            mainImage.src = filepath2;
            console.log("switch to " + filepath2);
            isFirstImg = false;
        } else {
            mainImage.src = filepath1;
            console.log("switch to " + filepath1);
            isFirstImg = true;
        }
    }, 1000); 
}    

function fileNotFound() {
    moveRooms(previousRoom);
    alert("Sorry, that room hasn't been implemented yet!");
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

/*
function createSvgMap(room) {
    // let svgMap = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    
    svgMap.data = `./img/${room}.svg`;
    console.log("svg map created");

    // let svgObj = svgMap.contentDocument;
    // let sections = svgObj.getElementsByClassName("clickable");
}
*/

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
        console.log("boop");
        let uppCase = roomNames[room].toUpperCase();
        roomName.innerText = uppCase;
    } else {
        roomName.innerText = "aw man where are you even??";
    }

    if (roomDescriptions[room]) {
        roomDesc.innerText = roomDescriptions[room];
    } else {
        roomDesc.innerText = "Some realllllyyyyyyyyyyyyyyyyyyy looooooooooonnnnnnnnnnnnngggggggggggggg placeholder description";
    }
}

function search() {
    const nextRoom = document.getElementById('tour-search-text').value;
    // do some stuff here to map common search terms to the right room
    // if starts with 'the ' just remove; lower case everything
    moveRooms(nextRoom);
}

function moveRooms(nextRoom) {
    nextRoom = nextRoom.toLowerCase();
    nextRoom.replace(/\s/g, '');

    console.log(nextRoom);

    clearInterval(interval);
    checkImgs(nextRoom);
}

const DH = "Dining Hall";
const MCL = "Master&#39;s Common Lounge";
const abbey = "Abbey";
const learnlobeL1 = "Learn Lobe L1";
const learnlobeB1 = "Learn Lobe B1";
const boxOffice = "Box Office";
const MPH = "Multi-purpose Hall";

const roomDict = {
    "mcl" : MCL,
    "master's common lounge" : MCL,
    "master's lounge" : MCL,
    "third floor lounge": MCL,
    "dh" : DH,
    "cookhouse" : DH,
    "canteen" : DH,
    "eating" : DH,
    "dining hall" : DH,
    "abbey" : abbey,
    "music" : abbey,
    "jamming" : abbey,
    "L1 learnlobe" : learnlobeL1,
    "learnlobe l1" : learnlobeL1,
    "b1 learnlobe" : learnlobeB1,
    "learnlobe b1" : learnlobeB1,
    "box office" : boxOffice,
    "coffee" : boxOffice,
    "hall" : MPH,
    "mph" : MPH,
    "multi-purpose hall" : MPH,
    "multipurpose hall" : MPH,
    "sports" : MPH,
}

const masterLounge = ["mcl", "master's common lounge", "master's lounge", "third floor lounge"];
const diningHall = ["dh", "cookhouse", "dining hall", "canteen", "eating"];
// const boxOffice = ["L1", "box office"];
var Rooms = masterLounge.concat(diningHall).sort();

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML += roomDict[arr[i]];
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + roomDict[arr[i]] + "'>";
            b.id = roomDict[arr[i]];
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            if (document.getElementById(roomDict[arr[i]]) == null) {
                a.appendChild(b);
            }
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
    document.getElementById("search").addEventListener("click", moveRooms(inp.value));
  }
  
/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("tour-search-text"), Rooms);

preloadAllImgs();
moveRooms("outsidemaindoors");

// $("#tour-img").on("error", function(){fileNotFound()});

// Buttons
// $("#L17Button").on("click", function(){moveRooms('17liftstairsview')});
// $("#L1Button").click(function(){moveRooms('17liftstairsview')});
// $("#LLButton").click(function(){moveRooms('17liftstairsview')});
// $("#abbeyButton").click(function(){moveRooms('17liftstairsview')});

$(window).on('load', function() {
    $('#loading-overlay').fadeOut(500);
});