SC.initialize({
  client_id: 'YOUR_CLIENT_ID'
});

$(document).ready(function() {
  SC.get('/tracks', { ids: '155876731' }, function(tracks) {
    $(tracks).each(function(index, track) {
      $('#test').append($('<li></li>').html(track));
    });
  });
});

// var waveform = new Waveform({
// });

// waveform.data
var Weeknd = React.createClass({displayName: "Weeknd",
    render: function() {
        return (
          React.createElement("div", null, 
            React.createElement("object", {className: "body", data: "assets/svg/weekndWeeknd.svg", type: "image/svg+xml"})
          )
        );
    }
});

React.render(
	React.createElement(Weeknd, null),
	document.getElementById('weeknd')
);