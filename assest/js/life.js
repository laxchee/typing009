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

    $('.iphone_cover').click(function(){
        $(this).fadeOut( 1300 );
        $('.holder').addClass('blurme2');
    });

});