document.addEventListener("DOMContentLoaded", function() {
    var run = false, timeout = 0, currentTime = 0, work = true, worktime = 25, breaktime = 5;
    var interval;
    var workColor = "#f44336";
    var breakColor = "#4caf50";
    var countElement = document.getElementById("time");
    var startButton = document.getElementById("start");

    function updater() {
        if (run && timeout > 0 ) {
            currentTime += 1000;
            timeout -= 1000;
            var time = new Date();
            time.setTime(timeout);
            var minutes = time.getMinutes();
            var seconds = time.getSeconds();
            countElement.textContent = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        }

        if (run && timeout <= 0) {
            work = !work;
            notify();
            timeout = work ? worktime * 60 * 1000 : breaktime * 60 * 1000;
            countElement.style.color = work ? workColor : breakColor;
            document.getElementsByTagName("body")[0].style.background = work ? workColor : breakColor;
            document.getElementsByClassName("mdl-layout__header")[0].style.background = work ? workColor : breakColor;
            currentTime = (new Date()).getTime();
        }
    }

    function countDown() {
        if (timeout == 0 && currentTime == 0) {
            timeout = worktime * 60 * 1000;
        }

        currentTime = (new Date()).getTime();

        if (run) {
            run = false;
            clearInterval(interval);
            startButton.textContent = "resume";
        } else {
            run = true;
            interval = setInterval(updater, 1000);
            startButton.textContent = "pause";
            notify();
        }
    }

    function resetFunction() {
        timeout = worktime * 60 * 1000;
        currentTime = (new Date()).getTime();
        startButton.textContent = "start";
        countElement.textContent = worktime + ":00";
        countElement.style.color = workColor;
        document.getElementsByTagName("body")[0].style.background = workColor;
        document.getElementsByClassName("mdl-layout__header")[0].style.background = workColor;
        clearInterval(interval);
        work = true;
        run = false;
    }

    startButton.addEventListener("click", countDown, false);

    document.getElementById("reset").addEventListener("click", resetFunction, false);

    var dialog = document.querySelector("#dialog");
    var showDialogButton = document.querySelector("#show-dialog");
    if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    showDialogButton.addEventListener("click", function() {
        dialog.showModal();
    });
    dialog.querySelector(".close").addEventListener("click", function() {
        dialog.close();
    });

    document.getElementById("save").addEventListener("click", () => {
        let reg = /^\d+([.]?(\d+)?)?$/;
        let workTimeInput = document.getElementById("workTime").value;
        let restTimeInput = document.getElementById("restTime").value;
        if (reg.test(workTimeInput) && reg.test(restTimeInput) && !run && workTimeInput > 0 && restTimeInput > 0) {
            worktime = parseInt(workTimeInput, 10);
            breaktime = parseInt(restTimeInput, 10);
            countElement.textContent = worktime + ":00";
            resetFunction();
            dialog.close();
        }
    });

    function requestPermission() {
        Notification.requestPermission();
    }

    requestPermission();

    function notify() {
        if (!("Notification" in window)) {
            alert("This browser does not support system notifications");
        } else if (Notification.permission === "granted") {
            var title = work ? "Keep working!" : "Time for a break";
            var options = {
                tag: "notify",
                renotify: true
            };
            var notification = new Notification(title, options);
        } else if (Notification.permission !== "denied") {
            requestPermission();
        }
    }
});