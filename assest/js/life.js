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
        audio1.load();
        audio1.play();
        // audio1.pause();
        // audio1.currentTime = 0;
    });

    function html5_audio(){
    var a = document.createElement('audio');
    return !!(a.canPlayType && a.canPlayType('audio/mp3;').replace(/no/, ''));
    }
     
    var play_html5_audio = true;
    // if(html5_audio()) play_html5_audio = true;
     
    function play_sound(url){
        if(play_html5_audio){
            var snd = new Audio(url);
            snd.load();
            snd.play();
        }else{
            $("#sound").remove();
            var sound = $("<embed id='sound' type='audio/mp3' />");
            sound.attr('src', url);
            sound.attr('loop', false);
            sound.attr('hidden', true);
            sound.attr('autostart', true);
            $('body').append(sound);
        }
    }
     
    play_sound('alarm.mp3');
});