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