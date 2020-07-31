(function ($) {
    "use strict";

    var canvas = document.getElementById('canvas'),
    displayToCanvasScale = canvas.clientWidth/128;

    var ctx = canvas.getContext('2d');

    var memCvs = document.createElement('canvas');
    memCvs.width = CANVAS_WIDTH;
    memCvs.height = CANVAS_HEIGHT;

    var memCtx = memCvs.getContext('2d'),
    myImgData = memCtx.createImageData(CANVAS_WIDTH, CANVAS_HEIGHT); // might change to global variable

    // Resizing Canvas
    function scaleCanvas() {
        if (window.matchMedia("(min-width: 768px)").matches) {
            $('#canvas').attr('width', '490');
            $('#canvas').attr('height', '490');
        } else {
            $('#canvas').attr('width', window.innerWidth*0.8);
            $('#canvas').attr('height', window.innerWidth*0.8);
        }
        redraw(myImgData);
    }
    scaleCanvas();
    
    window.addEventListener('resize', scaleCanvas);

    // API Req
    function httpGetAsync(theUrl, callback) {
        let xmlHttp = new XMLHttpRequest();

        xmlHttp.onload = function() { 
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
                callback(xmlHttp.response);
        }
        xmlHttp.open("GET", theUrl, true);
        xmlHttp.responseType = "json";
        xmlHttp.send(null);
    };

    // Drawing Function
    function redraw(imgData) {
        ctx.imageSmoothingEnabled = false;
        // clear canvas
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        
        // update memCtx with new image data  
        memCtx.putImageData(imgData, 0, 0);
        ctx.drawImage(memCvs, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, 0, 0, canvas.clientWidth, canvas.clientHeight);
    }

    // Bitfield Conversion
    function bitfieldToImgData(grid) {
        // grid is raw binary data: 4 bits for one pixel, like "0000", so 2 pixels in 1 byte
        // first map to: higher and lower nibbles in each byte
        // then map to: 8-bit unsigned int array used by imgData, r g b a each being one byte 

        const gridValue = Object.values(grid.grid);
        let rgbaArr = new Uint8ClampedArray(128*128*4);
        for (let i = 0; i < gridValue.length; i++) {
            // iterates over each byte to separate into the two bits
            const num = gridValue[i]; // gives an integer between 0 and 255
            const nibble1 = (num & 0xF0) >> 4; // 0xF0 == '11110000'
            const nibble2 = num & 0x0F // 0x0F == '00001111'
            const color1 = ColorIndex[nibble1];
            const color2 = ColorIndex[nibble2];
            const rgba1 = ColorRGB[color1];
            const rgba2 = ColorRGB[color2];

            rgbaArr[i*8] = rgba1[0];
            rgbaArr[i*8 + 1] = rgba1[1];
            rgbaArr[i*8 + 2] = rgba1[2];
            rgbaArr[i*8 + 3] = 255;
            rgbaArr[i*8 + 4] = rgba2[0];
            rgbaArr[i*8 + 5] = rgba2[1];
            rgbaArr[i*8 + 6] = rgba2[2];
            rgbaArr[i*8 + 7] = 255;
        }

        myImgData.data.set(rgbaArr);
        redraw(myImgData);
    }

    httpGetAsync("https://tplace.xyz/api/grid", bitfieldToImgData);

})(jQuery);	

