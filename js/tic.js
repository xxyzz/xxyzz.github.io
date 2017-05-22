document.addEventListener('DOMContentLoaded', function() {
  var single_mode = true;
  var x_player = true;
  var x_point = 0;
  var o_point = 0;
  var checkerboard = [
    0, 0, 0, 0, 0, 0, 0, 0, 0
  ];

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
    document.getElementById('mode-toast').MaterialSnackbar.showSnackbar(data);
  });

  document.getElementById('restart').addEventListener('click', function() {
    single_mode = true;
    x_player = true;
    x_point = 0;
    o_point = 0;
    checkerboard = [
      0, 0, 0, 0, 0, 0, 0, 0, 0
    ];
    var pieces = document.getElementsByClassName('pieces');
    for (var i = 0; i < pieces.length; i++) {
      pieces[i].style.visibility = "hidden";
    }
    data = {
      message: "Restart game"
    };
    document.getElementById('restart-toast').MaterialSnackbar.showSnackbar(data);
    document.getElementById('mode').childNodes[1].textContent = "person";
    document.getElementById('x').childNodes[3].textContent = "-";
    document.getElementById('o').childNodes[3].textContent = "-";
  });

  var grids = document.getElementsByClassName('grid');
  Array.prototype.forEach.call(grids, function(grid) {
    grid.addEventListener('click', function() {
      if (checkerboard[this.id] === 0) {
        if (x_player) {
          this.children[0].children[1].style.visibility = "visible";
          checkerboard[this.id] = 1;
        } else {
          this.children[0].children[0].style.visibility = "visible";
          checkerboard[this.id] = 2;
        }
      }
    });
  });

document.getElementById('o').addEventListener('click', function() {
  if (single_mode) {
    x_player = false;
  }
});

});
