$(document).ready(function(){
$(function()
{
/*Defines*/
	var cookieToken = "|^|";
	
	var alarmDate = [];
	var alarmTone = [];
	var alarmCounter = 0;

	/*write a cookie based on the arguments*/
	/*saveCookie(str,str,int)*/
	$.fn.saveCookie = function(cookieName,cookieData,cookieNumOfDays)
	{
	  var exdate=new Date();	
	  exdate.setDate(exdate.getDate()+(cookieNumOfDays)); 
	  document.cookie=cookieName+"=" +escape(cookieData)+";expires="+exdate.toGMTString();
	  //alert(cookieName+"="+cookieData);
	}
	
	/*loads a cookie by name, splits it by the token, and returns an array of values*/
	/*loadCookie(str)*/
	$.fn.loadCookie = function(cookieName)
	{
	if (document.cookie.length>0)
	  {
	  cookieStart=document.cookie.indexOf(cookieName + "=");
	  if (cookieStart!=-1)
		{
		cookieStart=cookieStart + cookieName.length+1;
		cookieEnd=document.cookie.indexOf(";",cookieStart);
		if (cookieEnd==-1) cookieEnd=document.cookie.length;
		return unescape(document.cookie.substring(cookieStart,cookieEnd)).split(cookieToken);
		}
	  }
	  return null;
	}
	
	$.fn.fixDate = function(timeStamp,daysToAdd)
	{
	 var alarmDate = new Date();
	 var currentDate = new Date();
	 
	/*parse the string to a date*/
	alarmDate.setTime(Date.parse(timeStamp));	  	
    /*include the days to advance the alarm date*/
	alarmDate.setDate(alarmDate.getDate()+daysToAdd);  
	
	if(currentDate > alarmDate)
	 {
		/*if the loaded alarm date is older than today, take the time and apply it to today*/
		currentDate.setHours(alarmDate.getHours(),alarmDate.getMinutes());
		timeStamp = currentDate;
	 }
	else
	 {
		timeStamp = alarmDate;					 
	 }	 
	 return timeStamp;
	}	
	
	/*formats a date object to either 24hr or 12hr format based on the second argument*/
	/*makeTimeStr(Date,bool)*/
	var hours_time = $("#hour, #hour2"),
		min_time = $("#min, #min2"),
		sec_time = $("#sec, #sec2"),
		am_pm_time = $("#am_pm, #am_pm2"),
	  	toggle = true ;

	$.fn.makeTimeStr = function(dateObj,format12)
	{
	  var hours = dateObj.getHours();
	  var minutes = dateObj.getMinutes();
	  var seconds = dateObj.getSeconds();
	  var format ="";
	
	  // Convert an hours component of "0" to "12"
		format = ( hours >= 12 ) ? "PM" : "AM";   
		hours = (hours == 0) ? 12 : hours;		 
		hours = ( hours > 12 ) ? hours - 12 : hours;	   
		minutes = (minutes < 10 ? "0" : "") + minutes;
		seconds = (seconds < 10 ? "0" : "") + seconds;
		hours = (hours < 10 ? "0" : "") + hours;
	     
	  // Compose the string for display
	  var timeString = hours + "&nbsp;&nbsp;:&nbsp;&nbsp;" + minutes + "&nbsp;&nbsp;&nbsp;" +format;
	  sec_time.text(seconds);

	  if( sec_time.html() === '00' || toggle ){
		hours_time.text(hours);
		min_time.text(minutes);
		am_pm_time.text(format);
		toggle = false;
	  }

	  return timeString;
	}
	
	/*remove alarm from arrays, remove the UI element, hide group if no alarms are left*/
	/*removeAlerm(int)*/
	$.fn.removeAlarm = function(index)
	{
		alarmTone[index] = null;
		alarmDate[index] = null;
		$("#alarm"+index).remove();	
		
		if($("#alarmList").children().size() < 1)
		 {
		   $("#alarmGroup").hide();
		 }
	}
	
	/*changes which form elements are shown, based on input*/
	/*alarmFormSet(bool)*/
	$.fn.alarmFormSet = function(formatFlag)
	{
		$("#standardFormat").show();
	}
	
	/*add alarm elements to UI*/
	/*addAlarm(int)*/
	$.fn.addAlarmUI = function(alarmId)
	{
		var repDates = $('.setting_rep_select').html();
		// $("#alarmList").append("<div id='alarm"+alarmId+"'><a href='#' id='alarmRemove"+alarmId+"'><img src='images/remove.png' alt='Remove Alarm' border='0'/></a> <span>"+$.fn.makeTimeStr(alarmDate[alarmId],$("#12hourFormat").is(':checked'))+"</span></div>");
	   $("#alarmList").append('<div class="timer_log" id="alarm'+alarmId+'"><div class="setting_date"><div class="setting_year">'+current_year+'</div><div class="setting_months">'+month_name_short+' <span class="orange">'+currentdate+'</span></div></div><div class="setting_breaker"></div><div class="setting_date"><div>HOURS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MINUTES</div><div class="alarm_date orange"><span>'+$.fn.makeTimeStr(alarmDate[alarmId],$("#12hourFormat").is(':checked'))+'</span></div><ul class="date_rep">' +repDates+ '</ul></div><a href="#" id="alarmRemove'+alarmId+'"><div class="setting_off"></div></a><div class="clear"></div></div>');
	   //bind the remove function to the newly created elements
	   $("#alarmRemove"+alarmId).bind("click", {index:alarmId}, function(e){
	   //suppress click action
	   e.preventDefault();
	   //call remove alarm
	   $.fn.removeAlarm(e.data.index); 	 
		});
		  	
	   $("#alarmGroup").css("display","inline");
	}

	var faceicon = $(".faceicon");

	var alertClock = function(){
		faceicon.addClass('unhappy');
        faceicon.removeClass('wiggler');
        setTimeout(function(){$(".faceicon").addClass('wigglerrr')},500);
        $(".frame_bg").addClass('frame_bg_alert');
        $('.content_info div').addClass('white');

	}

	var laxClock = function(){
		var clock = $(".used");
		clock.find('.orange').removeClass('orange');
        clock.find('.rep_light').addClass('rep_light_no');
        clock.find('.setting_off').addClass('setting_off_off');
		faceicon.removeClass('unhappy');
        faceicon.removeClass('wigglerrr');
        setTimeout(function(){$(".faceicon").addClass('wiggler')},500);
        $(".frame_bg").removeClass('frame_bg_alert');
        $('.content_info div').removeClass('white');
	}


	/*Timer action, for web and mobile */
    
    var shaker = true;

	$('.stop').click(function(){
    	if ( !shaker ){
        	laxClock();
        	shaker = true;
    	}
    	else{
    		alertClock();
    		shaker = false;
    	}
    });


    jQuery(window).bind('shakeupdown',function(){

    	if ( !shaker ){
        	laxClock();
        	shaker = true;
    	}
    	else{
    		alertClock();
    		shaker = false;
    	}
    });

	$('.pause').click(function(){
    	laxClock();
        setTimeout(function(){alertClock()},5000);
    });

    jQuery(".phone-center, .iphone").bind('pinchclose',function(){
    	laxClock();
    	setTimeout(function(){alertClock()},5000);
    });

	/*Handles the updating of the clock and all things done on interval*/
	$.fn.updateClock = function()
	{
	  var currentTime = new Date();
	  
		for(i=0;i<alarmDate.length;i++)
		 {
		  if(alarmDate[i] != null)
		  {	 
		   //make sure date object is updated to today;		   
		    alarmDate[i] = $.fn.fixDate(alarmDate[i],0);
		   //get the milisecond time stamps, then round it down to seconds for comparision 			
			 if((parseInt(alarmDate[i].getTime()/1000,10) == parseInt(currentTime.getTime()/1000,10)))
			  {		 
				 if(alarmTone[i] != null)
				  {	 
					//play the alarm
					// $("#jquery_jplayer").setFile(alarmTone[i]).play(); 
					console.log('adsandjkasbdkjasbdkjsabdjkasb jkdbsjakd kasndlkasmdlmakldnklsamdnlks');
				  }
				 else
				  {
					//trigger silent alarm
				  } 
				 //show the dialog
				  if($("#dialog").isOpen != true)
				   {
				        alertClock();
						// $("#dialog").dialog('open');
				   }
				  //line through alarms already triggered
					$('#alarm'+i).addClass('used');
				 				 
				 //update already triggered alarm to the next day, so that if they leave the window open the alarm will sound without refresh
				 alarmDate[i] = $.fn.fixDate(alarmDate[i],1);

			  }
			
		  }
		}
					 	  
	  var currentTimeString = $.fn.makeTimeStr(currentTime);
	  $("#clock").text(currentTimeString);

	}
	  
	 /*Loads options from cookies, and applies them to their given area.*/ 
	$.fn.loadOptions = function()
	 {
 	   var fontSize = $.fn.loadCookie("fontSize");
	   var formatFlag = $.fn.loadCookie("Format");
	   //var alarmFade = $.fn.loadCookie("alarmFade");
		
	   if(formatFlag == "true")/*using quotes because of boolean conversion issues from string*/
	    {
		 $("#12hourFormat").removeAttr('checked'); 
		}
	   else
	    {
    	$("#12hourFormat").attr('checked','checked'); 
		 
		}	
	 }  
	  
	/*primer function used to set up data before the application runs*/	
	$.fn.primer = function()
	{	
		/*load cookie data*/
		alarmTone = $.fn.loadCookie("Tones");
		alarmDate = $.fn.loadCookie("Dates");
	    $.fn.loadOptions();
		
		$("#customMp3File").hide();
		
		if(alarmDate != null && alarmDate != "")
		 {
			for(i=0;i<alarmDate.length;i++)
			 {
			  if(alarmDate[i] != null && alarmDate[i] !="")
			   {
				  /*cookies are loaded data as strings, this fixes it.*/
				  if(typeof(alarmDate[i]).toLowerCase() == "string")
				   {
					alarmDate[i] = $.fn.fixDate(alarmDate[i],0);
				   }			   
				$.fn.addAlarmUI(i);
			   }
   				alarmCounter = alarmDate.length-1;
			 }			 
		 }
		else
		 {
		  	alarmDate = [];
			alarmTone = [];
		 } 
		
		//alarmCounter++;
		
		/*based on the users choice, change what date format form elements are shown*/
		$.fn.alarmFormSet($("#12hourFormat").is(':checked'));
		
		/*set the the clock up*/
		$.fn.updateClock();
	} 
	 
	$("#saveAlarms").click(function() 
	{ 
	  if(alarmDate.length > 0)
	   {
	  var tmpDate = alarmDate;
	  var tmpTone = alarmTone;

	  /*goes through and looks for nulled values and removes them before saving.*/	  
	  for(i=0;i<tmpDate.length;i++)
	   {
	    if(tmpDate[i] == null)
		 {
		  tmpDate.splice(i,1);
		  tmpTone.splice(i,1);
		 }
	   }
	  /*create 2 10 year long cookies, one containing the tones for the alarm the others the dates*/	   
	  $.fn.saveCookie("Tones",tmpTone.join(cookieToken),3650);
	  $.fn.saveCookie("Dates",tmpDate.join(cookieToken),3650);
	  }
	 else
	  {
	   /*Removes the cookies if there is nothing to save*/
	  $.fn.saveCookie("Tones","",-1);
	  $.fn.saveCookie("Dates","",-1);	   
	  } 
	});

	$("#jquery_jplayer").jPlayer(
	{
	  oggSupport: false,
	  volume: 100,
	  swfPath: "http://bruceburge.com/utilities/libs/js/"
	})

	.onSoundComplete( function() 
	{
	  $(this).play(); /*repeat*/
	});


	$("#dialog").dialog(
	  {
		bgiframe: true,
		modal: true,
		stack: true,
		autoOpen: false,
		buttons: 
		{
		  Ok: function(){
		  $(this).dialog('close');
		  //start fader here
		  }
		},
		close: function(){
		$("#jquery_jplayer").stop(); 
		//stop fader here
		}
	  });

	$("#12hourFormat").change( function()
	{	
		//based on the checkbox show or hide the fields
		$.fn.alarmFormSet($(this).is(':checked'));			
		//rewrite, the alarms, and reformat the string with, current time format
		for(i=0;i<alarmDate.length;i++)
		 {
		  if(alarmDate[i] != null)
		   {
			$("#alarmRemove"+i+" + span").text($.fn.makeTimeStr(alarmDate[i],$(this).is(':checked')));
		   }	
		 }
	});
	
	$(".timer_add_set").click(function()
	{
		var item_log = $('.timer_log').length;
		if (item_log < 5) {
		var timeMod = 0;
		var hrs = 0;
		var mins = 0;
		var formatFlag = $("#12hourFormat").is(':checked');
		alarmDate[alarmCounter] = new Date();
		
		if(formatFlag)
		{
		//if pm is selected add 12 to the hour
		timeMod = ($("select[name$='amPm']").val() == 1)?12:0;
		}
		hrs = parseInt($("select[name='hour"+formatFlag+"']").val(),10)+timeMod;
		mins = parseInt($("select[name='minute"+formatFlag+"']").val(),10);
		
		alarmDate[alarmCounter].setHours(hrs,mins,00);	  
		$("#alarmGroup").css("display","inline");

		
		$.fn.addAlarmUI(alarmCounter);
		alarmCounter++;
		toggle = true ;
		$.fn.makeTimeStr(new Date());
		}
	});

	/*first calls to start the application*/	
	$.fn.primer();
	/*start the the timer, and run the updateClock function every second*/
	setInterval("$(this).updateClock()",1000);
	});
// -->

// --------------------------------------------------------
// Today date
// --------------------------------------------------------
    var cdt = new Date();

    var current_month = cdt.getMonth();  
    var monthNames = ["January", "February", "March", "April", "May", "June",  
    "July", "August", "September", "October", "November", "December"];
    var monthNamesShort = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",  
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    var month_name = monthNames[current_month]; 
    var month_name_short = monthNamesShort[current_month]; 

    var daynumber = cdt.getDay();
    var dayNames = ["sunday", "Monday", "Tuesday", "wednesday", "thursday", "friday", "saturday"];
    var day_name = dayNames[daynumber];
     
    var current_year =cdt.getFullYear();  
    var currentdate = cdt.getDate();

    $('#day, #day2').text( currentdate );
    $('#month, #month2').text( month_name ); 
    $('#day_name, #day_name2').text( day_name );

});