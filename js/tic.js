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
        message: "Easy level, start game or select player"
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
        message: "Medium level, start game or select player"
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
        message: "Impossible level, start game or select player"
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
          show_result(check_win(checkerboard));
          x_turn = !x_turn;
          if (mode !== 3 && result === 3) {
            computer();
          }
        } else {
          this.children[0].children[0].style.visibility = "visible";
          checkerboard[this.id] = 2;
          show_result(check_win(checkerboard));
          x_turn = !x_turn;
          if (mode !== 3 && result === 3) {
            computer();
          }
        }
      }
    });
  });

  function check_win(board) {
    if ((board[0] === 1 && board[1] === 1 && board[2] === 1) || (board[3] === 1 && board[4] === 1 && board[5] === 1) ||
      (board[6] === 1 && board[7] === 1 && board[8] === 1) || (board[0] === 1 && board[3] === 1 && board[6] === 1) ||
      (board[1] === 1 && board[4] === 1 && board[7] === 1) || (board[2] === 1 && board[5] === 1 && board[8] === 1) ||
      (board[0] === 1 && board[4] === 1 && board[8] === 1) || (board[2] === 1 && board[4] === 1 && board[6] === 1)) {
      return 1; // x win
    } else if (
      (board[0] === 2 && board[1] === 2 && board[2] === 2) || (board[3] === 2 && board[4] === 2 && board[5] === 2) ||
      (board[6] === 2 && board[7] === 2 && board[8] === 2) || (board[0] === 2 && board[3] === 2 && board[6] === 2) ||
      (board[1] === 2 && board[4] === 2 && board[7] === 2) || (board[2] === 2 && board[5] === 2 && board[8] === 2) ||
      (board[0] === 2 && board[4] === 2 && board[8] === 2) || (board[2] === 2 && board[4] === 2 && board[6] === 2)
    ) {
      return 2; // y win
    } else if (board.indexOf(0) === -1) {
      return 0; // draw
    } else {
      return 3;
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
      setTimeout(clear_board, 2000);
    }
  }

  // Computer Move
  function computer() {
    if (checkerboard.indexOf(0) !== -1) {
      var computer_move = get_moves();
      var show = document.getElementById(computer_move);
      if (user_first && !x_turn) {
        checkerboard[computer_move] = 2;
        show.children[0].children[0].style.visibility = "visible";
      } else if (!user_first && x_turn) {
        checkerboard[computer_move] = 1;
        show.children[0].children[1].style.visibility = "visible";
      }
      x_turn = !x_turn;
      show_result(check_win(checkerboard));
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
  function get_moves() {
    if (mode === 0) {
      return get_random_move();
    } else if (mode === 1) {
      if (Math.random() < 0.5) {
        return get_random_move();
      } else {
        return get_best_move();
      }
    } else {
      return get_best_move();
    }

    // get random move
    function get_random_move() {
      var avaliable_moves = get_available_positon(checkerboard);
      return avaliable_moves[Math.floor(Math.random() * avaliable_moves.length)];
    }

    // get best move
    function get_best_move() {
      var computer = 0,
        homan = 0;
      if (user_first) {
        computer = 2;
        human = 1;
      } else {
        computer = 1;
        human = 2;
      }
      // best move at beginning
      if (result === 4) {
        var corner = [0, 2, 6, 8];
        return corner[Math.floor(Math.random() * 4)];
      }
      // win move
      if (checkerboard[0] === 0 && ((checkerboard[1] === computer && checkerboard[2] === computer) || (checkerboard[3] === computer && checkerboard[6] === computer) || (checkerboard[4] === computer && checkerboard[8] === computer))) {
        return 0;
      } else if (checkerboard[1] === 0 && ((checkerboard[0] === computer && checkerboard[2] === computer) || (checkerboard[4] === computer && checkerboard[7] === computer))) {
        return 1;
      } else if (checkerboard[2] === 0 && ((checkerboard[0] === computer && checkerboard[1] === computer) || (checkerboard[5] === computer && checkerboard[8] === computer))) {
        return 2;
      } else if (checkerboard[3] === 0 && ((checkerboard[0] === computer && checkerboard[6] === computer) || (checkerboard[4] === computer && checkerboard[5] === computer))) {
        return 3;
      } else if (checkerboard[4] === 0 && ((checkerboard[0] === computer && checkerboard[8] === computer) || (checkerboard[1] === computer && checkerboard[7] === computer) || (checkerboard[2] === computer && checkerboard[6] === computer) || (checkerboard[3] === computer && checkerboard[5] === computer))) {
        return 4;
      } else if (checkerboard[5] === 0 && ((checkerboard[2] === computer && checkerboard[8] === computer) || (checkerboard[3] === computer && checkerboard[4] === computer))) {
        return 5;
      } else if (checkerboard[6] === 0 && ((checkerboard[0] === computer && checkerboard[3] === computer) || (checkerboard[2] === computer && checkerboard[4] === computer) || (checkerboard[7] === computer && checkerboard[8] === computer))) {
        return 6;
      } else if (checkerboard[7] === 0 && ((checkerboard[6] === computer && checkerboard[8] === computer) || (checkerboard[1] === computer && checkerboard[4] === computer))) {
        return 7;
      } else if (checkerboard[8] === 0 && ((checkerboard[0] === computer && checkerboard[4] === computer) || (checkerboard[2] === computer && checkerboard[5] === computer) || (checkerboard[6] === computer && checkerboard[7] === computer))) {
        return 8;
      }
      // block win move
      else if (checkerboard[0] === 0 && ((checkerboard[1] === human && checkerboard[2] === human) || (checkerboard[3] === human && checkerboard[6] === human) || (checkerboard[4] === human && checkerboard[8] === human))) {
        return 0;
      } else if (checkerboard[1] === 0 && ((checkerboard[0] === human && checkerboard[2] === human) || (checkerboard[4] === human && checkerboard[7] === human))) {
        return 1;
      } else if (checkerboard[2] === 0 && ((checkerboard[0] === human && checkerboard[1] === human) || (checkerboard[5] === human && checkerboard[8] === human))) {
        return 2;
      } else if (checkerboard[3] === 0 && ((checkerboard[0] === human && checkerboard[6] === human) || (checkerboard[4] === human && checkerboard[5] === human))) {
        return 3;
      } else if (checkerboard[4] === 0 && ((checkerboard[0] === human && checkerboard[8] === human) || (checkerboard[1] === human && checkerboard[7] === human) || (checkerboard[2] === human && checkerboard[6] === human) || (checkerboard[3] === human && checkerboard[5] === human))) {
        return 4;
      } else if (checkerboard[5] === 0 && ((checkerboard[2] === human && checkerboard[8] === human) || (checkerboard[3] === human && checkerboard[4] === human))) {
        return 5;
      } else if (checkerboard[6] === 0 && ((checkerboard[0] === human && checkerboard[3] === human) || (checkerboard[2] === human && checkerboard[4] === human) || (checkerboard[7] === human && checkerboard[8] === human))) {
        return 6;
      } else if (checkerboard[7] === 0 && ((checkerboard[6] === human && checkerboard[8] === human) || (checkerboard[1] === human && checkerboard[4] === human))) {
        return 7;
      } else if (checkerboard[8] === 0 && ((checkerboard[0] === human && checkerboard[4] === human) || (checkerboard[2] === human && checkerboard[5] === human) || (checkerboard[6] === human && checkerboard[7] === human))) {
        return 8;
      }
      // center
      else if (checkerboard[4] === 0) {
        return 4;
      }
      // choose eage at beginning
      else if (user_first && (same_array(checkerboard, [1, 0, 0, 0, 2, 0, 0, 0, 1]) || same_array(checkerboard, [0, 0, 1, 0, 2, 0, 1, 0, 0]))) {
        var eage = [1, 3, 5, 7];
        return eage[Math.floor(Math.random() * 4)];
      }
      // opposite corner
      else if (!user_first && same_array(checkerboard, [1, 0, 0, 0, 2, 0, 0, 0, 0])) {
        return 8;
      } else if (!user_first && same_array(checkerboard, [0, 0, 1, 0, 2, 0, 0, 0, 0])) {
        return 6;
      } else if (!user_first && same_array(checkerboard, [0, 0, 0, 0, 2, 0, 1, 0, 0])) {
        return 2;
      } else if (!user_first && same_array(checkerboard, [0, 0, 0, 0, 2, 0, 0, 0, 1])) {
        return 0;
      } else if (checkerboard[0] === 0 && (checkerboard[2] === human || checkerboard[6] === human)) {
        return 0;
      } else if (checkerboard[8] === 0 && (checkerboard[2] === human || checkerboard[6] === human)) {
        return 8;
      } else if (checkerboard[2] === 0 && (checkerboard[0] === human || checkerboard[8] === human)) {
        return 2;
      } else if (checkerboard[6] === 0 && (checkerboard[0] === human || checkerboard[8] === human)) {
        return 6;
      }
      // empty corner
      else if (checkerboard[0] === 0) {
        return 0;
      } else if (checkerboard[2] === 0) {
        return 2;
      } else if (checkerboard[6] === 0) {
        return 6;
      } else if (checkerboard[8] === 0) {
        return 8;
      }
      // empty side
      else if (checkerboard[1] === 0) {
        return 1;
      } else if (checkerboard[3] === 0) {
        return 3;
      } else if (checkerboard[7] === 0) {
        return 7;
      } else if (checkerboard[7] === 0) {
        return 7;
      }
    }
  }

  function same_array(a, b) {
    for (var i = a.length; i--;) {
      if (a[i] !== b[i])
        return false;
    }
    return true;
  }
});
