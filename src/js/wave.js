function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
};

var url = "http://api.soundcloud.com/tracks/155876731";
var options = {
    auto_play: false,
    buying: false,
    liking: false,
    download: false,
    sharing: false,
    show_artwork: false,
    show_comments: false,
    show_playcount: false,
    show_user: false,
    start_track: 0
};

var iframeElement = document.getElementById('sound-cloud-widget');
//debugger;
iframeElement.src = location.protocol + "//" + 'w.soundcloud.com/player/' + "?url=" + url;

var widget = SC.Widget(iframeElement);

//Load song
widget.load(url, options);

widget.bind(SC.Widget.Events.READY, function() {
    widget.bind(SC.Widget.Events.PLAY, function(soundObj) {
        widget.getSounds(function(sound) {
            var waveURL = sound[0].waveform_url;

            httpGetAsync(waveURL.replace('w1', 'wis'), function(val) {
                var soundArray = JSON.parse(val).samples;
                var soundArrayLength = soundArray.length;
                var prevIndex = 0;
                var currIndex = 0;
                widget.bind(SC.Widget.Events.PLAY_PROGRESS, function(soundObj) {
                    prevIndex = currIndex;
                    currIndex = Math.round(soundObj.relativePosition * soundArrayLength);

                    if (prevIndex !== currIndex) {
                        var volumeLevel = soundArray[currIndex];
                        if (volumeLevel > 130) {
                            $('body').css({
                                'background-color': '#818085'
                            });
                        } else if (volumeLevel > 110) {
                            $('body').css({
                                'background-color': '#717076'
                            });
                        } else if (volumeLevel > 100) {
                            $('body').css({
                                'background-color': '#6F5D54'
                            });
                        } else if (volumeLevel > 90) {
                            $('body').css({
                                'background-color': '#5F4C4C'
                            });
                        } else if (volumeLevel > 70) {
                            $('body').css({
                                'background-color': '#444F5C'
                            });
                        } else {
                            $('body').css({
                                'background-color': '#494850'
                            });
                        }
                    }
                });
            });
        });
    });
});