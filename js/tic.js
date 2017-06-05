document.addEventListener('DOMContentLoaded', function() {
  // default set
  var mode = 1; // 0: easy 1: medium 2: impossible 3: double
  var x_turn = true;
  var user_first = true; // user choose x
  var x_point = 0;
  var o_point = 0;
  var result = 4; // 0: draw 1: x win 2: o win 3: game on 4: start game
  var checkerboard = [
    0, 0, 0, 0, 0, 0, 0, 0, 0
  ];

  // set mode
  document.getElementById('easy').addEventListener('click', function() {
    if (mode !== 0) {
      mode = 0;
      data = {
        message: "Easy mode, you go first or click O button let computer go first"
      };
      document.getElementById('toast').MaterialSnackbar.showSnackbar(data);
      document.getElementById('drop_down').children[1].textContent = "Easy";
      restart();
    }
  });
  document.getElementById('medium').addEventListener('click', function() {
    if (mode !== 1) {
      mode = 1;
      data = {
        message: "Medium mode, you go first or click O button let computer go first"
      };
      document.getElementById('toast').MaterialSnackbar.showSnackbar(data);
      document.getElementById('drop_down').children[1].textContent = "Medium";
      restart();
    }
  });
  document.getElementById('impossible').addEventListener('click', function() {
    if (mode !== 2) {
      mode = 2;
      data = {
        message: "Impossible mode, you go first or click O button let computer go first"
      };
      document.getElementById('toast').MaterialSnackbar.showSnackbar(data);
      document.getElementById('drop_down').children[1].textContent = "Impossible";
      restart();
    }
  });
  document.getElementById('double').addEventListener('click', function() {
    if (mode !== 3) {
      mode = 3;
      data = {
        message: "Play against a friend"
      };
      document.getElementById('toast').MaterialSnackbar.showSnackbar(data);
      document.getElementById('drop_down').children[1].textContent = "Play against a friend";
      restart();
    }
  });

  // restart button
  document.getElementById('restart').addEventListener('click', function() {
    restart();
    mode = 1;
    user_first = true;
    data = {
      message: "Restart game"
    };
    document.getElementById('toast').MaterialSnackbar.showSnackbar(data);
  });

  // O player button
  document.getElementById('o').addEventListener('click', function() {
    if (mode != 3 && result === 4) {
      user_first = false;
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
    result = 4;
    checkerboard = [
      0, 0, 0, 0, 0, 0, 0, 0, 0
    ];
    var pieces = document.getElementsByClassName('pieces');
    for (var i = 0; i < pieces.length; i++) {
      pieces[i].style.visibility = "hidden";
    }
    if (mode !== 3 && !user_first) {
      computer();
    }
  }

  // chick to show piece
  var grids = document.getElementsByClassName('grid');
  Array.prototype.forEach.call(grids, function(grid) {
    grid.addEventListener('click', function() {
      if (checkerboard[this.id] === 0 && (result === 3 || result == 4)) {
        if (x_turn) {
          this.children[0].children[1].style.visibility = "visible";
          checkerboard[this.id] = 1;
          result = 3;
          show_result(check_win());
          x_turn = !x_turn;
          if (mode !== 3 && result === 3) {
            computer();
          }
        } else {
          this.children[0].children[0].style.visibility = "visible";
          checkerboard[this.id] = 2;
          show_result(check_win());
          x_turn = !x_turn;
          if (mode !== 3 && result === 3) {
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
      default:
        result = 3;
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
    var run_board = checkerboard.slice();
    if (avaliable_position.length !== 0) {
      moves = get_moves(mode, run_board, avaliable_position);
      var show = document.getElementById(moves);
      if (user_first && !x_turn) {
        checkerboard[moves] = 2;
        show.children[0].children[0].style.visibility = "visible";
      } else if (!user_first && x_turn) {
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

  // get moves
  function get_moves(mode, board, avaliable_moves) {
    var run_move = 0, run_result = 3, depth = 0, scores = [], moves = [];

    if (mode === 0) {
      get_random_move(avaliable_moves);
      return run_move;
    } else if (mode === 1) {
      if (Math.random() < 0.5) {
        get_random_move(avaliable_moves);
        return run_move;
      } else {
        run_move = get_best_move(board, avaliable_moves);
        return run_move;
      }
    } else {
      run_move = get_best_move(board, avaliable_moves);
      return run_move;
    }

    // get random move
    function get_random_move(avaliable_moves) {
      run_move = avaliable_moves[Math.floor(Math.random() * board.length)];
    }

    // get best move
    function get_best_move(board, avaliable_moves) {}
    //   if (avaliable_moves.length === 0 || run_result !== 3) {
    //     depths.push()
    //   } else if (moves.length === ) {
    //
    //   }
    // }
  }

});
