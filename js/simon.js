document.addEventListener('DOMContentLoaded', function() {
  var power = false,
    start = false,
    strict = false,
    audio1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    audio2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    audio3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    audio4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
    green_button = document.getElementById('green'),
    red_button = document.getElementById('red'),
    yellow_button = document.getElementById('yellow'),
    blue_button = document.getElementById('blue');

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function press_green() {
    green_button.style.backgroundColor = "#C8E6C9";
    audio1.play();
    setTimeout(function() {
      green_button.style.backgroundColor = "#4caf50";
    }, 100);
  }

  function press_red() {
    red_button.style.backgroundColor = "#FFCDD2";
    audio2.play();
    setTimeout(function() {
      red_button.style.backgroundColor = "#f44336";
    }, 100);
  }

  function press_yellow() {
    yellow_button.style.backgroundColor = "#FFF9C4";
    audio3.play();
    setTimeout(function() {
      yellow_button.style.backgroundColor = "#ffeb3b";
    }, 100);
  }

  function press_blue() {
    blue_button.style.backgroundColor = "#BBDEFB";
    audio4.play();
    setTimeout(function() {
      blue_button.style.backgroundColor = "#2196f3";
    }, 100);
  }


  document.getElementById('power').addEventListener('click', function() {
    power = !power;
    if (!power) {
      start = false;
    }
    clickable();
  });

  document.getElementById('start').addEventListener('click', function() {
    start = true;
    click_play_audio();
    clickable();

    play_audio([0, 1, 2, 3]);

  });

  document.getElementById('strict').addEventListener('click', function() {
    strict = !strict;
  });

  // User click button effect
  function click_play_audio() {
    green_button.addEventListener('click', function() {
      if (power && start) {
        press_green();
      }
    });
    red_button.addEventListener('click', function() {
      if (power && start) {
        press_red();
      }
    });
    yellow_button.addEventListener('click', function() {
      if (power && start) {
        press_yellow();
      }
    });
    blue_button.addEventListener('click', function() {
      if (power && start) {
        press_blue();
      }
    });
  }

  // Computer plays audio function
  async function play_audio(array) {
    for (let i = 0; i < array.length; i++) {
      switch (array[i]) {
        case 0:
          press_green();
          break;
        case 1:
          press_red();
          break;
        case 2:
          press_yellow();
          break;
        case 3:
          press_blue();
          break;
        default:
      }
      if (i - 1 != array.length) {
        await sleep(100);
      }
    }
  }

  // Add or remove mouse pointer
  function clickable() {
    Array.prototype.forEach.call(document.getElementsByClassName('push'), function(button) {
      if (power && start) {
        button.classList.add("clickable");
      } else {
        button.classList.remove("clickable");
      }
    });
  }

});
