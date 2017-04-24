document.addEventListener('DOMContentLoaded', function() {
  var buttons = document.getElementsByTagName('button');

  function calculate(formula) {
    re = /^[-]?\d*([.]\d*)?([-+/*]\d*([.]\d*)?)*$/g;
    if (re.test(formula)) {
      if (formula.length <= 17) {
        var answer = document.getElementsByClassName("answer")[0].textContent = eval(formula).toFixed(2);
        if (answer.toString().length <= 13) {
          document.getElementsByClassName("answer")[0].textContent = answer;
        } else {
          error();
        }
      } else {
        error();
      }
    } else {
      error();
    }

    function error() {
      document.getElementsByClassName("formula")[0].textContent = "";
      document.getElementsByClassName("answer")[0].textContent = "Error";
    }

  }

  var myFunction = function() {
    var attr = this.getAttribute("value");
    switch (attr) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "+":
      case "-":
      case "*":
      case "/":
      case ".":
        document.getElementsByClassName("formula")[0].textContent += attr;
        break;
      case "ac":
        document.getElementsByClassName("answer")[0].textContent = "";
        document.getElementsByClassName("formula")[0].textContent = "";
        break;
      case "ce":
        document.getElementsByClassName("formula")[0].textContent = document.getElementsByClassName("formula")[0].textContent.slice(0, -1);
        break;
      case "=":
        calculate(document.getElementsByClassName("formula")[0].textContent);
        break;
    }
  };
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", myFunction, false);
  }
});
