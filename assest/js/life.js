


$(document).ready(function(){
    // --------------------------------------------------------
    // Home Screen
    // --------------------------------------------------------

    var frame = $('.frame').contents().find('body');
    $('.iphone_cover').click(function(){
        $(this).fadeOut( 1300 );
        $('.holder').addClass('blurme2');
    });

    // --------------------------------------------------------
    // Monster interaction
    // --------------------------------------------------------

    $('.holder').addClass('blurme');

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

    $.fn.WhiteConDown = function()
    {
        $('.whiteBg').animate({ top : '100%' });
        objects.fadeTo( "slow", 1 );
        objects.css({ zIndex : '10' });
        $('.phone-center').animate({ width : '100%' });
        Wtcontent.animate({ bottom : '-100%' });
    }

    $.fn.WhiteConUp = function()
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
       }

    });

    $('.support').click(function(){
        $.fn.WhiteConUp();
    });

    // --------------------------------------------------------
    // App screen on desktop
    // --------------------------------------------------------

    var device = navigator.userAgent.toLowerCase();
    var ios = device.match(/(iphone)/);
    if (ios) {
         $('.appIos').removeClass('body');
         $('.iphone').show();
         $('.placeholder').hide();
    }

});