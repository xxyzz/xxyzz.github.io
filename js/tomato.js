document.addEventListener("DOMContentLoaded", function() {
    var run = false, timeout = 0, currentTime = 0, endTime = 0, work = true, reset = false, worktime = 25, breaktime = 5;
    var countElement = document.getElementById("time");
    var startButton = document.getElementById("start");

    var updater = function() {
        if (run && currentTime < endTime) {
            currentTime += 1000;
            timeout -= 1000;
            var time = new Date();
            time.setTime(timeout);
            console.log(timeout);
            var minutes = time.getMinutes();
            var seconds = time.getSeconds();
            countElement.textContent = (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        }

        if (run && currentTime >= endTime) {
            work = !work;
            notify();
            timeout = work ? worktime * 60 * 1000 : breaktime * 60 * 1000;
            countElement.style.color = work ? "#f44336" : "#4caf50";
            currentTime = (new Date()).getTime();
            endTime = currentTime + timeout;
        }
    };

    function countDown() {
        if (timeout == currentTime == endTime == 0) {
            timeout = worktime * 60 * 1000;
        }

        if (reset) {
            resetFunction();
            clearInterval(updater);
            updater = null;
            reset = false;
        }

        currentTime = (new Date()).getTime();
        endTime = currentTime + timeout;

        if (run) {
            run = false;
            clearInterval(updater);
            updater = null;
            startButton.textContent = "resume";
        } else {
            run = true;
            setInterval(updater, 1000);
            startButton.textContent = "pause";
            notify();
        }
    }

    function resetFunction() {
        timeout = worktime * 60 * 1000;
        currentTime = (new Date()).getTime();
        endTime = currentTime + timeout;
        startButton.textContent = "start";
        countElement.textContent = worktime + ":00";
        countElement.style.color = "#f44336";
        work = true;
        reset = true;
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
        if (reg.test(workTimeInput) && reg.test(restTimeInput) && !run) {
            worktime = parseInt(workTimeInput, 10);
            breaktime = parseInt(restTimeInput, 10);
            countElement.textContent = worktime + ":00";
            resetFunction();
        }
        dialog.close();
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