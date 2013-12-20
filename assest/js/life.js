


$(document).ready(function(){
    // --------------------------------------------------------
    // Home Screen
    // --------------------------------------------------------

    var frame = $('.frame').contents().find('body');
    console.log(frame.length);
    $('.iphone_cover').click(function(){
        $(this).fadeOut( 1300 );
        $('.holder').addClass('blurme2');
    });

    // --------------------------------------------------------
    // Monster interaction
    // --------------------------------------------------------
    
    var faceicon = $(".faceicon");

    jQuery(window).bind('shakeupdown',function(){
        $('#body').removeClass("pink");
        faceicon.removeClass('unhappy');
        faceicon.removeClass('wigglerrr');
    });

    jQuery("#body").bind('pinchclose',function(){
        $('#body').addClass("pink");
        faceicon.addClass('unhappy');
        faceicon.addClass('wigglerrr');
    });
    $('.holder').addClass('blurme');


    var switchs = 1;
    $('.timer_holder').animate({'marginBottom': '-202px' });
    $('.time_header').click(function(){
        var time_height = $('.time_alarm').height();
        var time_total = 0 - time_height - 202 + 'px';

        if( switchs == 0 ){
            $('.timer_holder').animate({'marginBottom': time_total });
            switchs++;   
        }
        else if( switchs == 1 ){
            $('.timer_holder').animate({'marginBottom': '0px' });
            switchs--;   
        }
        


    });

    // --------------------------------------------------------
    // Font import
    // --------------------------------------------------------

    WebFontConfig = {
    google: { families: [ 'Rationale::latin' ] }
      };
      (function() {
        var wf = document.createElement('script');
        wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
          '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
      })();

    WebFontConfig = {
    google: { families: [ 'Lato:400,700:latin' ] }
      };
      (function() {
        var wf = document.createElement('script');
        wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
          '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
      })();

    // --------------------------------------------------------
    // rep-day trigger
    // --------------------------------------------------------

    $('.rep-day').click(function(){
        $(this).toggleClass('active');
        var repinfo = $(this).attr('data-true');

        if( $(this).hasClass('active') ){
            repinfo++;
        }
        
    });


});