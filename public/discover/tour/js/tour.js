"use strict";
// let ImageMap = require('image-map');
// const maps = {
//     "abbey": [2782.3, 3283.14, 524.566, 622.262]
// };

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

var muted = true;

var audio = document.getElementById("footstepsAudio");
audio.volume = 1;
var clickAudio = document.getElementById("clickAudio");
clickAudio.volume = 0.7;
var liftAudio = document.getElementById("liftAudio");
liftAudio.volume = 0.8;

const roomNames = {
    "17liftstairsview": "L17 Lifts",
    "17liftloungeview": "L17 Lifts",
    "17leftcorridor": "USP-facing corridor",
    "17pantry": "Pantry",
    "17laundrycorridor": "UTR-facing corridor",
    "17laundryroom": "Laundry Room",
    "17lounge": "Level Lounge",

    "dininghall": "Dining Hall",
    "lobbydhview": "Lobby",
    "lobbymain": "Lobby",
    "lobbypostboxview": "Lobby",

    "outsidemaindoors": "Outside Main Doors",
    "mph": "Multipurpose Hall",
    "mphfromdropoffpoint": "Multipurpose Hall",
    "mphoutside": "Walkway to MPH",
    "dropoffpoint": "Drop Off Point",
    "bridgetolearnlobe": "Walkway to Learn Lobe",

    "b1outsidellmaindoors": "B1 Outside Learn Lobe",
    "b1learnlobefromlift": "B1 Outside Learn Lobe",
    "b1liftlobby": "B1 Lift Lobby",

    "abbey": "Abbey",
    "b1fullcorridor": "Learn Lobe B1",
    "b1rightcorridor": "Learn Lobe B1",
    "b1incorridor": "Learn Lobe B1",
    "blankcanvas": "Blank Canvas",
    "launchpad": "Launchpad",
    "boxoffice": "Box Office",
    "l1fullcorridor": "Learn Lobe L1",
    "l1incorridor": "Learn Lobe L1",
    "l1rightcorridor": "Learn Lobe L1",
    "oasis": "Oasis",
    "readingroom": "Reading Room",
    "seminarroom": "Seminar Room 5",
}

const roomDescriptions = {
    "17liftstairsview": "Welcome to level 17 :) We are using this floor as a demo because it is one of only two floors with both a laundry room and pantry -- the location of these two rooms are the same no matter which floor it is! \n\nPantry floors: 5, 9, 13, 17, 21 \nLaundry floors: 9, 17",
    "17liftloungeview": "On the right is the level lounge for all your free-and-easy chilling and studying! Every lounge has its own unique feel and decor :) \n\nTake note that you can only enter lounges of your own zone / house using your matric card",
    "17leftcorridor": "We usually chalk each other's doors so everyone has a fun, personalised door instead of a plain one :') Also, the pantry is up ahead!",
    "17pantry": "There's a pantry every 4 floors, with amenities like a fridge, water cooler (which dispenses both hot and ice water), microwave, electric stove and sink. Store your ice cream, wash your tupperware or do your cooking here! Remember to label your food before putting it into the fridge!",
    "17laundrycorridor": "The refuse room and laundry room are along this corridor. The refuse room has different chutes for recyclables and general waste, as well as some cleaning supplies. Click the arrow ahead to see the laundry room! \n\n(Note: UTR stands for U-Town Residences)",
    "17laundryroom": "Located on 2 floors, Level 9 and Level 17, the laundry rooms come equipped with both washing machines and dryers. They cost $1 each, can be paid by ez-link card or a $1 coin, and would provide you with a fresh set of clothes in no time at all! (Well, specifically, 30 minutes for the washing machines and 40 minutes for the dryers!)",
    "17lounge": "Take care of and decorate your own lounge with your floormates to make it a space you love :')",

    "dininghall": "Colloquially known as the DH, here's where we get our food (duh). The DH serves breakfast (7 - 10.30am) and dinner (5.30 - 9.30pm) on weekdays, breakfast only on Saturdays and dinner only on Sundays! Just tap your matric card at the station on the right and collect the meal ticket. You can tap up to 3 times a meal, and save unused tickets for up to 13 days! \n\nWe share the dining hall with USP (Cinnamon College), and for this semester we have to keep strictly to our half and within the demarcated zones. Remember to bring your reusable containers and utensils to take away meals where possible! :)", 
    "lobbydhview": "Head through those double doors to our dining hall!",
    "lobbymain": "This is the main lobby, the oft-used meeting spot for mealtimes or heading out of Tembusu together!",
    "lobbypostboxview": "Yes - you actually have an individual postbox here (except for suites, which share one)! There's also a vending machine and water cooler beside the postboxes :)",

    "outsidemaindoors": "Having exited the college through the main doors, you can head left towards the multipurpose hall (MPH), right towards the learn lobe, or down those stairs towards the UTown Green, where you can find FairPrice, Octobox, the food courts, UTown bus stop and more!",
    "mph": "This is where sports Interest Groups (IGs) hold their activities! This is also the venue for Tembusu Forums, hosted by our Rector, Dr Tommy Koh, which always feature an interesting line-up of speakers regarding pertinent issues in the world today.",
    "mphfromdropoffpoint": "This is where sports Interest Groups (IGs) hold their activities! This is also the venue for Tembusu Forums, hosted by our Rector, Dr Tommy Koh, which always feature an interesting line-up of speakers regarding pertinent issues in the world today.",
    "mphoutside": "Go straight ahead to the Multipurpose Hall! If you turn left here, you can head to the drop-off point.",
    "dropoffpoint": "Here's where you collect supper deliveries, take Grabs, drive in, get your parents to fetch you etc.!",
    "bridgetolearnlobe": "The door at the end leads into the Learn Lobe, where the... learning happens :) There are multiple Seminar Rooms in the building, and more excitingly, the themed rooms - Box Office, Oasis, Blank Canvas, Reading Room, Abbey, and Launchpad! Click in to explore more :) \n\nContinuing down this walkway is the Education Resource Centre (ERC), where the Mac & PC Commons and some NUS-wide seminar rooms are located. It's also connected to the Stephen Riady Centre (SRC) which has the gym and food courts!",

    "b1outsidellmaindoors": "After exiting from the Learn Lobe's main door on B1, this sheltered walkway connects the lifts area with the Learn Lobe building. On the left you can see part of the outdoors amphitheatre, and if you head slightly to the right you'll reach the Tembusu College Office and OHS Office area!",
    "b1learnlobefromlift": "Walking from the B1 lifts, you reach this area in front of the outdoors amphitheatre. Here, some Interest Groups meet and the finale night for arts week last semester was held! There are three doors ahead that lead into the Learn Lobe - from left to right, they are the Launchpad, Blank Canvas, and main doors.",
    "b1liftlobby": "Small tip: B1 is the only floor you can click in the lift without tapping your matric card!",
    
    "abbey": "If you love music, you’re at the right place! The Abbey is Tembusu’s very own jamming studio. Equipped with state-of-the-art sound systems, amplifiers, and all manners of instruments, the stage is set for you and like-minded musicians to jam and have fun! You can book a timeslot after getting the Abbey license. There are often small performances held here during some of the themed weeks as well :)",
    "b1fullcorridor": "This is level B1 of the Learn Lobe, where the Abbey, Blank Canvas, Reading Room, Launchpad and a few SRs are located! There's a side door behind and the main door down the corridor on the right.",
    "b1rightcorridor": "This is level B1 of the Learn Lobe, where the Abbey, Blank Canvas, Reading Room, Launchpad and a few SRs are located!",
    "b1incorridor": "This is level B1 of the Learn Lobe, where the Abbey, Blank Canvas, Reading Room, Launchpad and a few SRs are located! The main door is behind, and there's a side door down the corridor on the left.",
    "blankcanvas": "Home to acrylic paints, 3D printers, a soldering station and more, the blank canvas is a place for creativity and crafting! If you like getting your hands dirty, this place is for you.",
    "launchpad": "An exciting space for ideation, expression, education and everything in between. The sky is the limit!",
    "boxoffice": "If you're interested in coffee, film or just looking for a place to chill, you'll definitely want to head over to The Box Office! Whether you want to catch up and bond over making some latte art or watching a movie (or two!) — there's no better place to do it than in Tembusu's own home cinema.",
    "l1fullcorridor": "This is level 1 of the Learn Lobe, where the Box Office, Oasis, College Students' Committee (CSC) room and a few SRs are located! The main door into the Learn Lobe is down the corridor on the right.",
    "l1incorridor": "This is level 1 of the Learn Lobe, where the Box Office, Oasis, College Students' Committee (CSC) room and a few SRs are located! The main door into the Learn Lobe is behind.",
    "l1rightcorridor": "This is level 1 of the Learn Lobe, where the Box Office, Oasis, College Students' Committee (CSC) room and a few SRs are located!",
    "oasis": "Take a break and wind down from your daily stresses in this quiet, comfortable, and safe space, set up for your mental wellness and relaxation :')",
    "readingroom": "The reading room’s collection is carefully curated with the input of the entire fellowship; there are a myriad of books reflecting the movement of thought from the ancients to the contemporary! Our catalogue can be found at http://www.librarything.com/catalog.php?view=Tembusu&shelf=shelf",
    "seminarroom": "These seminar rooms (SRs) are used for Junior and Senior Seminars, some Interest Groups (IGs), and even just your own studying! You can choose to book a room, or just head down to see if there's space for you (remember to abide by the zoning rules)",
}

async function preloadAllImgs() {
    let img = new Image();
    const allRooms = Object.keys(roomNames);
    for (let i = 0; i < allRooms.length; i++) {
        img.src = `./img/${allRooms[i]}.jpg`;
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
                    if (muted == false) {
                        audio.pause();
                        audio.currentTime = 0;
                    }
                }
            }
        }
    }
    myImage.onerror = fileNotFound; 
}
function switchImgs(room){
    
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
            // console.log("switch to " + filepath2);
            isFirstImg = false;
        } else {
            mainImage.src = filepath1;
            // console.log("switch to " + filepath1);
            isFirstImg = true;
        }
    }, 1000); 
}    

function fileNotFound() {
    moveRooms(previousRoom);
    alert("Sorry, that place hasn't been implemented yet!");
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
        let uppCase = roomNames[room].toUpperCase();
        roomName.innerText = uppCase;
    } else {
        roomName.innerText = "aw man idk where you are";
    }

    if (roomDescriptions[room]) {
        roomDesc.innerText = roomDescriptions[room];
    } else {
        roomDesc.innerText = "Some placeholder description";
    }
}

function search() {
    const nextRoom = document.getElementById('tour-search-text').value;
    // do some stuff here to map common search terms to the right room
    // if starts with 'the ' just remove; lower case everything
    moveRooms(nextRoom);
}

$('.mutebtn').on('click', function(ev) {
    $('.muteicon').toggleClass('fa-volume-mute');
    $('.muteicon').toggleClass('fa-volume-up');
    muted = true;
    ev.preventDefault();
});

function moveRooms(nextRoom) {
    if (muted == false) {
        audio.currentTime = 0;
        clickAudio.currentTime = 0;
        audio.play();
        clickAudio.play();
    }
    
    nextRoom = nextRoom.toLowerCase();
    nextRoom.replace(/\s/g, '');

    clearInterval(interval);
    checkImgs(nextRoom);
}

const liftButtons = document.getElementById('lift-buttons');

function lift() {
    if (muted == false) {
        clickAudio.currentTime = 0;
        clickAudio.play();
    }
    liftButtons.style.display = "block";
    tourDiv.addEventListener("click", liftClick);
}

function liftClick(){
    liftButtons.style.display = "none";
    tourDiv.removeEventListener("click", liftClick);
};

$('.lift-button').click(function(){
    if (muted == false) {
        liftAudio.currentTime = 0;
        liftAudio.play();
    }
})

window.setTimeout(function(){muted = false;}, 100);

// $("#tour-img").on("error", function(){fileNotFound()});

// Buttons
// $("#L17Button").on("click", function(){moveRooms('17liftstairsview')});
// $("#L1Button").click(function(){moveRooms('17liftstairsview')});
// $("#LLButton").click(function(){moveRooms('17liftstairsview')});
// $("#abbeyButton").click(function(){moveRooms('17liftstairsview')});

// preloadAllImgs().then(moveRooms("outsidemaindoors"));

$(window).on('load', function() {
    // $('#nav-div').fadeOut();
    $('#loading-overlay').fadeOut(500);
    preloadAllImgs();
    tourDiv.style = "cursor:pointer"; 
    $('#tour-div').one("click", start); 
});

function start(){
    $('#nav-div').removeClass("invisible");
    $('#tour-img').fadeIn();
    moveRooms("outsidemaindoors");
};




// ignore everything after this, it's the not fully functional search stuff currently

// const DH = "Dining Hall";
// const MCL = "Master&#39;s Common Lounge";
// const abbey = "Abbey";
// const learnlobeL1 = "Learn Lobe L1";
// const learnlobeB1 = "Learn Lobe B1";
// const boxOffice = "Box Office";
// const MPH = "Multi-purpose Hall";

// const roomDict = {
//     "mcl" : MCL,
//     "master's common lounge" : MCL,
//     "master's lounge" : MCL,
//     "third floor lounge": MCL,
//     "dh" : DH,
//     "cookhouse" : DH,
//     "canteen" : DH,
//     "eating" : DH,
//     "dining hall" : DH,
//     "abbey" : abbey,
//     "music" : abbey,
//     "jamming" : abbey,
//     "L1 learnlobe" : learnlobeL1,
//     "learnlobe l1" : learnlobeL1,
//     "b1 learnlobe" : learnlobeB1,
//     "learnlobe b1" : learnlobeB1,
//     "box office" : boxOffice,
//     "coffee" : boxOffice,
//     "hall" : MPH,
//     "mph" : MPH,
//     "multi-purpose hall" : MPH,
//     "multipurpose hall" : MPH,
//     "sports" : MPH,
// }

// const masterLounge = ["mcl", "master's common lounge", "master's lounge", "third floor lounge"];
// const diningHall = ["dh", "cookhouse", "dining hall", "canteen", "eating"];
// // const boxOffice = ["L1", "box office"];
// var Rooms = masterLounge.concat(diningHall).sort();

// function autocomplete(inp, arr) {
//     /*the autocomplete function takes two arguments,
//     the text field element and an array of possible autocompleted values:*/
//     var currentFocus;
//     /*execute a function when someone writes in the text field:*/
//     inp.addEventListener("input", function(e) {
//         var a, b, i, val = this.value;
//         /*close any already open lists of autocompleted values*/
//         closeAllLists();
//         if (!val) { return false;}
//         currentFocus = -1;
//         /*create a DIV element that will contain the items (values):*/
//         a = document.createElement("DIV");
//         a.setAttribute("id", this.id + "autocomplete-list");
//         a.setAttribute("class", "autocomplete-items");
//         /*append the DIV element as a child of the autocomplete container:*/
//         this.parentNode.appendChild(a);
//         /*for each item in the array...*/
//         for (i = 0; i < arr.length; i++) {
//           /*check if the item starts with the same letters as the text field value:*/
//           if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
//             /*create a DIV element for each matching element:*/
//             b = document.createElement("DIV");
//             /*make the matching letters bold:*/
//             b.innerHTML += roomDict[arr[i]];
//             /*insert a input field that will hold the current array item's value:*/
//             b.innerHTML += "<input type='hidden' value='" + roomDict[arr[i]] + "'>";
//             b.id = roomDict[arr[i]];
//             /*execute a function when someone clicks on the item value (DIV element):*/
//             b.addEventListener("click", function(e) {
//                 /*insert the value for the autocomplete text field:*/
//                 inp.value = this.getElementsByTagName("input")[0].value;
//                 /*close the list of autocompleted values,
//                 (or any other open lists of autocompleted values:*/
//                 closeAllLists();
//             });
//             if (document.getElementById(roomDict[arr[i]]) == null) {
//                 a.appendChild(b);
//             }
//           }
//         }
//     });
//     /*execute a function presses a key on the keyboard:*/
//     inp.addEventListener("keydown", function(e) {
//         var x = document.getElementById(this.id + "autocomplete-list");
//         if (x) x = x.getElementsByTagName("div");
//         if (e.keyCode == 40) {
//           /*If the arrow DOWN key is pressed,
//           increase the currentFocus variable:*/
//           currentFocus++;
//           /*and and make the current item more visible:*/
//           addActive(x);
//         } else if (e.keyCode == 38) { //up
//           /*If the arrow UP key is pressed,
//           decrease the currentFocus variable:*/
//           currentFocus--;
//           /*and and make the current item more visible:*/
//           addActive(x);
//         } else if (e.keyCode == 13) {
//           /*If the ENTER key is pressed, prevent the form from being submitted,*/
//           e.preventDefault();
//           if (currentFocus > -1) {
//             /*and simulate a click on the "active" item:*/
//             if (x) x[currentFocus].click();
//           }
//         }
//     });
//     function addActive(x) {
//       /*a function to classify an item as "active":*/
//       if (!x) return false;
//       /*start by removing the "active" class on all items:*/
//       removeActive(x);
//       if (currentFocus >= x.length) currentFocus = 0;
//       if (currentFocus < 0) currentFocus = (x.length - 1);
//       /*add class "autocomplete-active":*/
//       x[currentFocus].classList.add("autocomplete-active");
//     }
//     function removeActive(x) {
//       /*a function to remove the "active" class from all autocomplete items:*/
//       for (var i = 0; i < x.length; i++) {
//         x[i].classList.remove("autocomplete-active");
//       }
//     }
//     function closeAllLists(elmnt) {
//       /*close all autocomplete lists in the document,
//       except the one passed as an argument:*/
//       var x = document.getElementsByClassName("autocomplete-items");
//       for (var i = 0; i < x.length; i++) {
//         if (elmnt != x[i] && elmnt != inp) {
//           x[i].parentNode.removeChild(x[i]);
//         }
//       }
//     }
//     /*execute a function when someone clicks in the document:*/
//     document.addEventListener("click", function (e) {
//         closeAllLists(e.target);
//     });
//     document.getElementById("search").addEventListener("click", moveRooms(inp.value));
//   }
  
// /*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
// autocomplete(document.getElementById("tour-search-text"), Rooms);

