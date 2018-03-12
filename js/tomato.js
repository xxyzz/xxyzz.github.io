document.addEventListener('DOMContentLoaded', function() {
  var run = false, timeout = 0, currentTime = 0, endTime = 0, work = true, reset = false, worktime = 25, restime = 5;
  var countElement = document.getElementById('time');
  var startButton = document.getElementById('start');

  function countDown() {
    if (timeout == currentTime == endTime == 0) {
      timeout = worktime * 60 * 1000;
      currentTime = (new Date()).getTime();
      endTime = (new Date()).getTime() + timeout;
    }
    var updater = function() {
      if (reset) {
        resetFunction();
        reset = false;
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
        timeout = work ? worktime * 60 * 1000 : breaktime * 60 * 1000;
        countElement.style.color = work ? "#f44336" : "#4caf50";
        currentTime = (new Date()).getTime();
        endTime = (new Date()).getTime() + timeout;
      }
    };

    setInterval(updater, 1000);

  }

  countDown();

  function changeButtonText() {
    if (run) {
      run = false;
      startButton.textContent = 'resume';
    } else {
      run = true;
      startButton.textContent = 'pause';
    }
  }

  function resetFunction() {
    timeout = worktime * 60 * 1000;
    currentTime = (new Date()).getTime();
    endTime = (new Date()).getTime() + timeout;
    startButton.textContent = 'start';
    countElement.textContent = worktime + ':00';
    reset = true;
    run = false;
  }

  startButton.addEventListener('click', changeButtonText, false);

  document.getElementById('reset').addEventListener('click', resetFunction, false);

  var dialog = document.querySelector('#dialog');
  var showDialogButton = document.querySelector('#show-dialog');
  if (! dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
  }
  showDialogButton.addEventListener('click', function() {
    dialog.showModal();
  });
  dialog.querySelector('.close').addEventListener('click', function() {
    dialog.close();
  });

  document.getElementById('save').addEventListener('click', () => {
    let reg = /^\d+([.]?(\d+)?)?$/;
    let workTimeInput = document.getElementById('workTime').value;
    let restTimeInput = document.getElementById('restTime').value;
    if (reg.test(workTimeInput) && reg.test(restTimeInput) && !run) {
      worktime = parseInt(workTimeInput, 10);
      restime = parseInt(restTimeInput, 10);
      countElement.textContent = worktime + ':00';
    }
    dialog.close();
  });
});