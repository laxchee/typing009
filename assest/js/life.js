


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

    $('.Nana').click(function(){
        $(".used").find('.orange').removeClass('orange');
        $(".used").find('.rep_light').addClass('rep_light_no');
        $(".used").find('.setting_off').addClass('setting_off_off');
        $('#body').removeClass("pink");
        faceicon.removeClass('unhappy');
        faceicon.removeClass('wigglerrr');
        $(".frame_bg").removeClass('frame_bg_alert');
        setTimeout(function(){faceicon.addClass('wiggler')},500);
    });

    var switchs = 1;
    $('.timer_holder').animate({'marginBottom': '-106px' });
    $('.time_header').click(function(){
        var time_height = $('.time_alarm').height();
        var time_total = 0 - time_height - 106 + 'px';

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

    // --------------------------------------------------------
    // White Content drawer
    // --------------------------------------------------------
    
    var objects = $('.content-left, .content-right');
    var Wtcontent = $('.informationHolder');

    $.fn.WhiteConDown = function(index)
    {
        $('.whiteBg').animate({ top : '100%' });
        objects.fadeTo( "slow", 1 );
        objects.css({ zIndex : '10' });
        $('.phone-center').animate({ width : '100%' });
        Wtcontent.animate({ bottom : '-100%' });
    }

    $.fn.WhiteConUp = function(index)
    {
        $('.whiteBg').animate({ top : '0px' });
        objects.fadeTo( "slow", 0.3 );
        objects.css({ zIndex : '-2' });
        $('.phone-center').animate({ width : '60%' });
        Wtcontent.animate({ bottom : '30px', top : 'inherit' });
    }

    var lastScrollTop = 0,
        min = true;
    $(window).scroll(function(event){
       var st = $(this).scrollTop();
       var stH = $(document).height() - $(window).height()

       if (st == lastScrollTop && !min){
            $.fn.WhiteConDown();
            min = true;

       } else if (st == stH && min){
            $.fn.WhiteConUp();
            min = false;
            console.log('up up up');
       }

    });

    $('.support').click(function(){
        $.fn.WhiteConUp();
    });



});