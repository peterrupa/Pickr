$(document).ready(function() {
    $('.countDown').hide();

    (function($){
    
        $.extend({
            
            APP : {                
                
                formatTimer : function(a) {
                    if (a < 10) {
                        a = '0' + a;
                    }                              
                    return a;
                },    
                
                startTimer : function(dir) {
                    
                    let a;
                    
                    // save type
                    $.APP.dir = dir;
                    
                    // get current date
                    $.APP.d1 = new Date();
                    
                    switch($.APP.state) {
                            
                        case 'pause' :
                            
                            // resume timer
                            // get current timestamp (for calculations) and
                            // substract time difference between pause and now
                            $.APP.t1 = $.APP.d1.getTime() - $.APP.td;                            
                            
                        break;
                            
                        default :
                            
                            // get current timestamp (for calculations)
                            $.APP.t1 = $.APP.d1.getTime(); 
                            
                            // if countdown add ms based on seconds in textfield
                            if ($.APP.dir === 'cd') {
                                $.APP.t1 += parseInt($('#cd_seconds').val())*1000;
                            }    
                        
                        break;
                            
                    }                                   
                    
                    // reset state
                    $.APP.state = 'alive';   
                    $('#' + $.APP.dir + '_status').html('Running');
                    
                    // start loop
                    $.APP.loopTimer();
                    
                },
                
                pauseTimer : function() {
                    
                    // save timestamp of pause
                    $.APP.dp = new Date();
                    $.APP.tp = $.APP.dp.getTime();
                    
                    // save elapsed time (until pause)
                    $.APP.td = $.APP.tp - $.APP.t1;
                    
                    // change button value
                    $('#' + $.APP.dir + '_start').val('Resume');
                    
                    // set state
                    $.APP.state = 'pause';
                    $('#' + $.APP.dir + '_status').html('Paused');
                    
                },
                
                stopTimer : function() {
                    
                    // change button value
                    $('#' + $.APP.dir + '_start').val('Restart');                    
                    
                    // set state
                    $.APP.state = 'stop';
                    $('#' + $.APP.dir + '_status').html('Stopped');
                    
                },
                
                resetTimer : function() {

                    // reset display
                    $('#' + $.APP.dir + '_ms,#' + $.APP.dir + '_s,#' + $.APP.dir + '_m,#' + $.APP.dir + '_h').html('00');                 
                    
                    // change button value
                    $('#' + $.APP.dir + '_start').val('Start');                    
                    
                    // set state
                    $.APP.state = 'reset';  
                    $('#' + $.APP.dir + '_status').html('Reset & Idle again');
                    
                },
                
                endTimer : function(callback) {
                   
                    // change button value
                    $('#' + $.APP.dir + '_start').val('Restart');
                    
                    // set state
                    $.APP.state = 'end';
                    
                    // invoke callback
                    if (typeof callback === 'function') {
                        callback();
                    }    
                    
                },    
                
                loopTimer : function() {
                    
                    let td;
                    let d2,t2;
                    
                    let ms = 0;
                    let s  = 0;
                    let m  = 0;
                    let h  = 0;
                    
                    if ($.APP.state === 'alive') {
                                
                        // get current date and convert it into 
                        // timestamp for calculations
                        d2 = new Date();
                        t2 = d2.getTime();   
                        
                        // calculate time difference between
                        // initial and current timestamp
                        if ($.APP.dir === 'sw') {
                            td = t2 - $.APP.t1;
                        // reversed if countdown
                        } else {
                            td = $.APP.t1 - t2;
                            if (td <= 0) {
                                // if time difference is 0 end countdown
                                $.APP.endTimer(function(){
                                    $.APP.resetTimer();
                                    $('#' + $.APP.dir + '_status').html('Ended & Reset');
                                });
                            }    
                        }    
                        
                        // calculate milliseconds
                        ms = td%1000;
                        if (ms < 1) {
                            ms = 0;
                        } else {    
                            // calculate seconds
                            s = (td-ms)/1000;
                            if (s < 1) {
                                s = 0;
                            } else {
                                // calculate minutes   
                                let m = (s-(s%60))/60;
                                if (m < 1) {
                                    m = 0;
                                } else {
                                    // calculate hours
                                    let h = (m-(m%60))/60;
                                    if (h < 1) {
                                        h = 0;
                                    }                             
                                }    
                            }
                        }
                      
                        // substract elapsed minutes & hours
                        ms = Math.round(ms/100);
                        s  = s-(m*60);
                        m  = m-(h*60);                                
                        
                        // update display
                        $('#' + $.APP.dir + '_ms').html($.APP.formatTimer(ms));
                        $('#' + $.APP.dir + '_s').html($.APP.formatTimer(s));
                        $('#' + $.APP.dir + '_m').html($.APP.formatTimer(m));
                        $('#' + $.APP.dir + '_h').html($.APP.formatTimer(h));
                        
                        // loop
                        $.APP.t = setTimeout($.APP.loopTimer,1);
                    
                    } else {
                    
                        // kill loop
                        clearTimeout($.APP.t);
                        return true;
                    
                    }  
                    
                }
                    
            }    
        
        });
        $('#start').click(function() {
            //$.APP.startTimer('sw');
            $('.carousel').carousel('next', [Math.floor(Math.random() * 100000000)]);
            $('.countDown').show();
        });
        $('#sw_start').click(function() {
            $.APP.startTimer('sw');
            //$( "#sw_start" ).replaceWith( "<a id="sw_reset" className="waves-effect waves-light btn-flat">RESET</a>" );
        });    

        $('#cd_start').click(function() {
            $.APP.startTimer('cd');
        });           
        
        $('#sw_stop,#cd_stop').click(function() {
            $.APP.stopTimer();
        });
        
        $('#sw_reset,#cd_reset').click(function() {
            $.APP.resetTimer();
            //$( "#sw_reset" ).replaceWith( "<a id="sw_start" className="waves-effect waves-light btn-flat">START</a>" );
        });  
        
        $('#sw_pause,#cd_pause').click(function() {
            $.APP.pauseTimer();
        });                
                
    })(jQuery);
        
});
