document.addEventListener('DOMContentLoaded', function() {
  var run = false,
    timeout;
  var work = true;
  var reset = false;
  var countElement = document.getElementById('time');

  function countDown() {
    timeout = 25 * 60 * 1000;
    var currentTime = (new Date()).getTime();
    var endTime = (new Date()).getTime() + timeout;

    var updater = function() {

      if (reset) {
        timeout = 25 * 60 * 1000;
        reset = false;
        currentTime = (new Date()).getTime();
        endTime = (new Date()).getTime() + timeout;
      }

      if (run && currentTime < endTime) {
        currentTime += 1000;
        var time = new Date();
        time.setTime(endTime - currentTime);
        var minutes = time.getMinutes();
        var seconds = time.getSeconds();
        countElement.textContent = (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
      }

      if (currentTime >= endTime) {
        work = !work;
        timeout = work ? 25 * 60 * 1000 : 5 * 60 * 1000;
        countElement.style.color = work ? "#f44336" : "#4caf50";
        currentTime = (new Date()).getTime();
        endTime = (new Date()).getTime() + timeout;
      }
    };

    setInterval(updater, 1000);

  }

  countDown();

  document.getElementById('start').addEventListener('click', function() {
    run = true;
  }, false);

  document.getElementById('stop').addEventListener('click', function() {
    run = false;
  }, false);

  document.getElementById('reset').addEventListener('click', function() {
    document.getElementById('time').textContent = '25:00';
    run = false;
    reset = true;
  }, false);

});
