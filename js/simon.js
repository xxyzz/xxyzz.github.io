document.addEventListener('DOMContentLoaded', function() {
  var power = false, start = false, strict = false;

  document.getElementById('power').addEventListener('click', function() {
    power = !power;
    play_audio();
    console.log('power: ' + power);
  });

  document.getElementById('start').addEventListener('click', function() {
    start = !start;
    play_audio();
    console.log('start: ' + start);
  });

  document.getElementById('strict').addEventListener('click', function() {
    strict = !strict;
  });

  function play_audio () {
    if (power && start) {
      document.getElementById('green').addEventListener('click', function() {
        var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
        audio.play();
      });
      document.getElementById('red').addEventListener('click', function() {
        var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
        audio.play();
      });
      document.getElementById('yellow').addEventListener('click', function() {
        var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
        audio.play();
      });
      document.getElementById('blue').addEventListener('click', function() {
        var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
        audio.play();
      });
    }
  }
});
