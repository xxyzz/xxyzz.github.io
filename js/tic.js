document.addEventListener('DOMContentLoaded', function() {
  // default set
  var single_mode = true;
  var x_turn = true;
  var user_first = true; // user choose x
  var x_point = 0;
  var o_point = 0;
  var result = 3;
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
    user_first = true;
    data = {
      message: "Restart game"
    };
    document.getElementById('toast').MaterialSnackbar.showSnackbar(data);
    document.getElementById('mode').childNodes[1].textContent = "person";
  });

  // X player button
  document.getElementById('o').addEventListener('click', function() {
    if (single_mode) {
      user_first = true;
      x_turn = true;
    }
  });

  // O player button
  document.getElementById('o').addEventListener('click', function() {
    if (single_mode) {
      user_first = false;
      x_turn = true;
      computer();
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
    user_first = true;
    result = 3;
    checkerboard = [
      0, 0, 0, 0, 0, 0, 0, 0, 0
    ];
    var pieces = document.getElementsByClassName('pieces');
    for (var i = 0; i < pieces.length; i++) {
      pieces[i].style.visibility = "hidden";
    }
    if (single_mode && !user_first) {
      computer();
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
          show_result(check_win());
          x_turn = !x_turn;
          if (single_mode && result === 3) {
            computer();
          }
        } else {
          this.children[0].children[0].style.visibility = "visible";
          checkerboard[this.id] = 2;
          show_result(check_win());
          x_turn = !x_turn;
          if (single_mode && result === 3) {
            computer();
          }
        }
      }
    });
  });

  function check_win() {
    if ((checkerboard[0] === 1 && checkerboard[1] === 1 && checkerboard[2] === 1) || (checkerboard[3] === 1 && checkerboard[4] === 1 && checkerboard[5] === 1) ||
      (checkerboard[6] === 1 && checkerboard[7] === 1 && checkerboard[8] === 1) || (checkerboard[0] === 1 && checkerboard[3] === 1 && checkerboard[6] === 1) ||
      (checkerboard[1] === 1 && checkerboard[4] === 1 && checkerboard[7] === 1) || (checkerboard[2] === 1 && checkerboard[5] === 1 && checkerboard[8] === 1) ||
      (checkerboard[0] === 1 && checkerboard[4] === 1 && checkerboard[8] === 1) || (checkerboard[2] === 1 && checkerboard[4] === 1 && checkerboard[6] === 1)) {
      return 1; // x win
    } else if (
      (checkerboard[0] === 2 && checkerboard[1] === 2 && checkerboard[2] === 2) || (checkerboard[3] === 2 && checkerboard[4] === 2 && checkerboard[5] === 2) ||
      (checkerboard[6] === 2 && checkerboard[7] === 2 && checkerboard[8] === 2) || (checkerboard[0] === 2 && checkerboard[3] === 2 && checkerboard[6] === 2) ||
      (checkerboard[1] === 2 && checkerboard[4] === 2 && checkerboard[7] === 2) || (checkerboard[2] === 2 && checkerboard[5] === 2 && checkerboard[8] === 2) ||
      (checkerboard[0] === 2 && checkerboard[4] === 2 && checkerboard[8] === 2) || (checkerboard[2] === 2 && checkerboard[4] === 2 && checkerboard[6] === 2)
    ) {
      return 2; // y win
    } else if (checkerboard.indexOf(0) === -1) {
      return 0; // draw
    }
  }

  function show_result(value) {
    switch (value) {
      case 0:
        data = {
          message: "It's a draw!"
        };
        result = 0;
        break;
      case 1:
        data = {
          message: "X win!"
        };
        x_point += 1;
        result = 1;
        break;
      case 2:
        data = {
          message: "O win!"
        };
        result = 2;
        o_point += 1;
        break;
    }

    if (result !== 3) {
      document.getElementById('toast').MaterialSnackbar.showSnackbar(data);
      document.getElementById('x').childNodes[3].textContent = x_point;
      document.getElementById('o').childNodes[3].textContent = o_point;
      setTimeout(clear_board, 1000);
    }
  }

  // Computer Move
  function computer() {
    var moves = 0;
    var avaliable_position = get_available_positon(checkerboard);
    if (avaliable_position.length !== 0) {
      moves = avaliable_position[Math.floor(Math.random() * avaliable_position.length)];
      var show = document.getElementById(moves);
      if (user_first) {
        checkerboard[moves] = 2;
        show.children[0].children[0].style.visibility = "visible";
      } else {
        checkerboard[moves] = 1;
        show.children[0].children[1].style.visibility = "visible";
      }
      x_turn = !x_turn;
      show_result(check_win());
    } else {
      show_result(0);
    }
  }
  // get avaliable positon
  function get_available_positon(board) {
    var indexes = [],
      i = -1;
    while ((i = board.indexOf(0, i + 1)) != -1) {
      indexes.push(i);
    }
    return indexes;
  }

});
