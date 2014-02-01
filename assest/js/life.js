$(document).ready(function(){
   
    var device = navigator.userAgent.toLowerCase();
    var ios = device.match(/(iphone)/);
    if (ios) {
        $('.holder').addClass('blurme');
        $('.appIos').removeClass('body');
        $('.iphone').show();
        $('.placeholder').hide();
    }
    // --------------------------------------------------------
    // Home Screen
    // --------------------------------------------------------
    var audio1 = document.getElementById('audio');
    
    $('.iphone_cover').click(function(){
        $(this).fadeOut( 1300 );
        $('.holder').addClass('blurme2');
        // audio1.load();
        audio1.play();
    });

});