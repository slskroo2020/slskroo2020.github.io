(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * Copyright (c) 2020, Travis Clarke (https://www.travismclarke.com/)
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.ImageMap = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var version = "2.0.1";

  var RESIZE = "resize";
  var LOAD = "load";
  var USEMAP = "usemap";
  var COORDS = "coords";
  var COMPLETE = "complete";
  /**
   * ImageMap main library constructor
   *
   * @param selector {string} CSS selector
   * @param wait {number} [wait=500] debounce wait interval
   * @constructor
   */

  var ImageMap = /*#__PURE__*/function () {
    function ImageMap(selector, wait) {
      _classCallCheck(this, ImageMap);

      this.selector = selector instanceof Array ? selector : document.querySelectorAll(selector);
      if (document.readyState !== COMPLETE) window.addEventListener(LOAD, this.update.bind(this));else this.update();
      window.addEventListener(RESIZE, this.debounce(this.update, wait).bind(this));
    }

    _createClass(ImageMap, [{
      key: "update",

      /**
       * Update
       */
      value: function update() {
        var imgs = this.selector;

        for (var i = 0; i < imgs.length; i++) {
          var img = imgs[i];
          if (img.getAttribute(USEMAP) === undefined) return;
          var newImg = img.cloneNode();
          newImg.addEventListener(LOAD, this.handleImageLoad(img.offsetWidth, img.offsetHeight));
          newImg.src = img.src; // required for IE
        }
      }
      /**
       * Debounce
       *
       * @param {function} func
       * @param {number} [wait=500]
       */

    }, {
      key: "debounce",
      value: function debounce(func) {
        var _this = this;

        var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
        var timeout;
        return function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          window.clearTimeout(timeout);
          timeout = window.setTimeout(function (ctx) {
            return func.apply(ctx, args);
          }, wait, _this);
        };
      }
      /**
       * handleImageLoad
       *
       * @param {number} [offsetWidth=0]
       * @param {number} [offsetHeight=0]
       */

    }, {
      key: "handleImageLoad",
      value: function handleImageLoad() {
        var offsetWidth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var offsetHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        return function (e) {
          var w = e.target.width;
          var h = e.target.height;
          var mapName = e.target.getAttribute(USEMAP).replace(/^#/, "");
          var areas = document.querySelectorAll(ImageMap.genAreaSelector(mapName));

          var _loop = function _loop(i) {
            var area = areas[i];
            var coordsString = area.dataset[COORDS] = area.dataset[COORDS] || area.getAttribute(COORDS);
            var coordsArrayOld = coordsString.split(",");
            var coordsArrayNew = coordsArrayOld.map(function (_, i) {
              // Scale the coordinate from the original width/height to the actual rendered width/height (i.e. offset)
              return i % 2 === 0 ? Number(coordsArrayOld[i] / w * offsetWidth) : Number(coordsArrayOld[i] / h * offsetHeight);
            });
            area.setAttribute(COORDS, coordsArrayNew.toString());
          };

          for (var i = 0; i < areas.length; i++) {
            _loop(i);
          }
        };
      }
    }], [{
      key: "genAreaSelector",
      value: function genAreaSelector(mapName) {
        return "map[name=\"".concat(mapName, "\"] area");
      }
    }]);

    return ImageMap;
  }();

  function _ImageMap(selector, wait) {
    return new ImageMap(selector, wait);
  }

  _ImageMap.VERSION = version;

  return _ImageMap;

})));

},{}],2:[function(require,module,exports){
let ImageMap = require('image-map');

let mainImage = document.getElementById("tour-img");
let tourDiv = document.getElementById("tour-div");

function switchImgs(room) {
    // room = room.toLowerCase();
    // room.replace(/\s/g, '');

    const filepath1 = `./img/${room}1.jpg`;
    const filepath2 = `./img/${room}2.jpg`;

    let isFirstImg = false; 

    mainImage.src = filepath1;
    mainImage.setAttribute("usemap", `#${room}`);
    const interval = setInterval(function(){
        if (isFirstImg) {
            mainImage.src = filepath2;
            isFirstImg = false;
        } else {
            mainImage.src = filepath1;
            isFirstImg = true;
        }
    }, 1000);
}

function createImgMap(room) {
    // room = room.toLowerCase();
    // room.replace(/\s/g, '');

    let map = document.createElement('map');
    map.name = room;
    let area1 = document.createElement('area');
    area1.shape="rect";
    area1.href = "console.log('b1corridorright')";
    area1.coords="3288,3857,2763,3306";
    map.appendChild(area1);

    ImageMap('img[usemap]');
    console.log(map);

}

// rmb to clear interval on clicking into another page
function moveRooms(nextRoom) {
    nextRoom = nextRoom.toLowerCase();
    nextRoom.replace(/\s/g, '');

    switchImgs(nextRoom);
    createImgMap(nextRoom);
}

moveRooms("abbey");
},{"image-map":1}]},{},[2]);
