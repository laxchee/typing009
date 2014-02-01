$(document).ready(function(){
   
    var device = navigator.userAgent.toLowerCase();
    var ios = device.match(/(iphone)/);
    if (ios) {
        $('.holder').addClass('blurme');
        $('.appIos').removeClass('body');
        $('.iphone').show();
        $('.placeholder').hide();
        $(".time_header").hide();
    }
    // --------------------------------------------------------
    // Home Screen
    // --------------------------------------------------------
    var button = $('.iphone_cover');
    var audio1 = document.getElementById('audio');
    var onClick = function() {
        audio1.play(); // audio will load and then play
        audio1.pause();
        audio1.currentTime = 0;
    };

    $('.iphone_cover').click(function(){
        $(this).fadeOut( 1300 );
        $('.holder').addClass('blurme2');
        $(".time_header").show();
        onClick();
    });

    

});