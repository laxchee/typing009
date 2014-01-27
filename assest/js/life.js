$(document).ready(function(){
    window.addEventListener('touchstart', function() {
    var buffer = myContext.createBuffer(1, 1, 22050);
    var source = myContext.createBufferSource();
    source.buffer = buffer;

    // connect to output (your speakers)
    source.connect(myContext.destination);

    // play the file
    source.noteOn(0);

    }, false);
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