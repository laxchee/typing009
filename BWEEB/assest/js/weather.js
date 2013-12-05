function weather(mode){

    // Specify the ZIP/location code and units (f or c)
    var loc = 'SNXX0006'; // or e.g. SPXX0050
    var u = mode;

    var query = "SELECT item.condition FROM weather.forecast WHERE location='" + loc + "' AND u='" + u + "'";
    var cacheBuster = Math.floor((new Date().getTime()) / 1200 / 1000);
    var url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(query) + '&format=json&_nocache=' + cacheBuster;

    window['wxCallback'] = function(data) {
        var info = data.query.results.channel.item.condition;
        $('#wxTemp').html(info.temp + '&deg;' + (u.toUpperCase()));

// --------------------------------------------------------
// weather BG
// --------------------------------------------------------
        var tem = info.temp
        
        if (tem < 40 ) {
            console.log('cold');
        }
        else if ( tem > 80 ) {
            console.log('hooottttt');
        }
    };
    
    $.ajax({
        url: url,
        dataType: 'jsonp',
        cache: true,
        jsonpCallback: 'wxCallback'
    });
    
}

$(document).ready(function(){
// --------------------------------------------------------
// toggle function 0F 0C
// --------------------------------------------------------
    weather('c');
    $('button').toggle(
      function(){
        weather('f');
      },
      function(){
        weather('c');
      }
    );

});


// --------------------------------------------------------
// Monster interaction
// --------------------------------------------------------
jQuery(document).ready(function () {

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
    $('.iphone_cover').click(function(){
        $(this).fadeOut();
        $('.holder').removeClass('blurme');
    });
});