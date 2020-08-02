(function ($) {
    "use strict";
    $(document).ready(function(){
        var date = new Date();

        // convert to GMT+8
        var utc = date.getTime() + (date.getTimezoneOffset() * 60000);
        var now = new Date(utc + (3600000*8));

        var day = now.getUTCDate();
        var month = now.getUTCMonth() + 1;
        
        console.log(`Day: ${day}, Month" ${month}`);

        var stage = 1;

        if (month == 8) {
            if (day <= 3) stage = 1;
            if (day == 4) stage = 2;
            if (day >= 5) stage = 3;
        } else if (month > 8) stage = 3;

        $('#tembingoImg').attr({src:`img/tembingo_d${stage}.jpg`});
        
        function resize() {
            if (window.matchMedia("(min-width: 768px)").matches) {
                $('#tembingoLink').attr({href:`img/tembingo_d${stage}_full.jpg`});
            } else {
                $('#tembingoLink').attr({href:`img/tembingo_d${stage}_mobile.jpg`});
            }
        }
        resize();
        $(window).resize(resize);
    });
})(jQuery);