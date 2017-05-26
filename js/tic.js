document.addEventListener('DOMContentLoaded', function() {
  // default set
  var single_mode = true;
  var x_turn = true;
  var x_point = 0;
  var o_point = 0;
  result = 3;
  var checkerboard = [
    0, 0, 0, 0, 0, 0, 0, 0, 0
  ];

  // single or double button
  document.getElementById('mode').addEventListener('click', function() {
    single_mode = !single_mode;
    var data = "";
    if (single_mode) {
      data = {
        message: "Play against computer"
      };
      document.getElementById('mode').childNodes[1].textContent = "person";
    } else {
      data = {
        message: "Play against a friend"
      };
      document.getElementById('mode').childNodes[1].textContent = "people";
    }
    document.getElementById('toast').MaterialSnackbar.showSnackbar(data);
    restart();
  });

  // restart button
  document.getElementById('restart').addEventListener('click', function() {
    restart();
    single_mode = true;
    data = {
      message: "Restart game"
    };
    document.getElementById('toast').MaterialSnackbar.showSnackbar(data);
    document.getElementById('mode').childNodes[1].textContent = "person";
  });

  // O player button
  document.getElementById('o').addEventListener('click', function() {
    if (single_mode) {
      x_turn = false;
    }
  });

  // restrat game
  function restart() {
    x_point = 0;
    o_point = 0;
    clear_board();
    document.getElementById('x').childNodes[3].textContent = "-";
    document.getElementById('o').childNodes[3].textContent = "-";
  }

  function clear_board() {
    x_turn = true;
    result = 3;
    checkerboard = [
      0, 0, 0, 0, 0, 0, 0, 0, 0
    ];
    var pieces = document.getElementsByClassName('pieces');
    for (var i = 0; i < pieces.length; i++) {
      pieces[i].style.visibility = "hidden";
    }
  }

  // chick to show piece
  var grids = document.getElementsByClassName('grid');
  Array.prototype.forEach.call(grids, function(grid) {
    grid.addEventListener('click', function() {
      if (checkerboard[this.id] === 0) {
        if (x_turn) {
          this.children[0].children[1].style.visibility = "visible";
          checkerboard[this.id] = 1;
          x_turn = !x_turn;
          console.log(checkerboard);
          check_win();
          show_result(result);
        } else {
          this.children[0].children[0].style.visibility = "visible";
          checkerboard[this.id] = 2;
          x_turn = !x_turn;
          console.log(checkerboard);
          check_win();
          show_result(result);
        }
      }
    });
  });

  // main game function
  function game() {
    if (single_mode) {
    }
  }

  function check_win() {
    if ((checkerboard[0] === 1 && checkerboard[1] === 1 && checkerboard[2] === 1) || (checkerboard[3] === 1 && checkerboard[4] === 1 && checkerboard[5] === 1) ||
      (checkerboard[6] === 1 && checkerboard[7] === 1 && checkerboard[8] === 1) || (checkerboard[0] === 1 && checkerboard[3] === 1 && checkerboard[6] === 1) ||
      (checkerboard[1] === 1 && checkerboard[4] === 1 && checkerboard[7] === 1) || (checkerboard[2] === 1 && checkerboard[5] === 1 && checkerboard[8] === 1) ||
      (checkerboard[0] === 1 && checkerboard[4] === 1 && checkerboard[8] === 1) || (checkerboard[2] === 1 && checkerboard[4] === 1 && checkerboard[6] === 1)) {
      result = 1; // x win
      x_point += 1;
    } else if (
      (checkerboard[0] === 2 && checkerboard[1] === 2 && checkerboard[2] === 2) || (checkerboard[3] === 2 && checkerboard[4] === 2 && checkerboard[5] === 2) ||
      (checkerboard[6] === 2 && checkerboard[7] === 2 && checkerboard[8] === 2) || (checkerboard[0] === 2 && checkerboard[3] === 2 && checkerboard[6] === 2) ||
      (checkerboard[1] === 2 && checkerboard[4] === 2 && checkerboard[7] === 2) || (checkerboard[2] === 2 && checkerboard[5] === 2 && checkerboard[8] === 2) ||
      (checkerboard[0] === 2 && checkerboard[4] === 2 && checkerboard[8] === 2) || (checkerboard[2] === 2 && checkerboard[4] === 2 && checkerboard[6] === 2)
    ) {
      result = 2; // y win
      o_point += 1;
    } else if (checkerboard.indexOf(0) === -1) {
      result = 0; // draw
    }
  }

  function show_result(result) {
    if (result === 0) {
      data = {
        message: "Draw"
      };
    } else if (result === 1) {
      data = {
        message: "X win"
      };
    } else if (result === 2) {
      data = {
        message: "O win"
      };
    }
    if (result !== 3) {
      document.getElementById('toast').MaterialSnackbar.showSnackbar(data);
      document.getElementById('x').childNodes[3].textContent = x_point;
      document.getElementById('o').childNodes[3].textContent = o_point;
      setTimeout(clear_board, 1000);
    }
  }

});
