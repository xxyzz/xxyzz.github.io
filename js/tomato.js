document.addEventListener("DOMContentLoaded", function() {
    let run = false, timeout = 0, work = true, worktime = 25, shortbreak = 5, longbreak = 30, cycles = 0;
    let interval;
    let workColor = "#f44336";
    let breakColor = "#4caf50";
    let countElement = document.getElementById("time");
    let startButton = document.getElementById("start");
    let optionsDialog = document.querySelector("#optionsDialog");
    let showOptions = document.querySelector("#showOptions");
    let aboutDialog = document.querySelector("#aboutDialog");
    let showAbout = document.querySelectorAll(".showAboutDialog");
    let body = document.getElementsByTagName("body")[0];
    let header = document.getElementsByClassName("mdl-layout__header")[0];

    function updater() {
        if (run && timeout > 0) {
            timeout -= 1000;
            let time = new Date();
            time.setTime(timeout);
            let minutes = time.getMinutes();
            let seconds = time.getSeconds();
            countElement.textContent = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        }

        if (run && timeout <= 0) {
            work = !work;
            if (work) {
                timeout = worktime * 60 * 1000;
                countElement.style.color = workColor;
                body.style.background = workColor;
                header.style.background = workColor;
                countElement.textContent = worktime + ":00";
            } else {
                cycles++;
                document.querySelector(".mdl-badge").setAttribute("data-badge", cycles);
                timeout = cycles % 4 == 0 ? longbreak * 60 * 1000 : shortbreak * 60 * 1000;
                countElement.style.color = breakColor;
                body.style.background = breakColor;
                header.style.background = breakColor;
                countElement.textContent = cycles % 4 == 0 ? longbreak + ":00" : shortbreak + ":00";
            }
            notify();
        }
    }

    function countDown() {
        if (timeout == 0) {
            timeout = worktime * 60 * 1000;
        }

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
        startButton.textContent = "start";
        countElement.textContent = worktime + ":00";
        countElement.style.color = workColor;
        body.style.background = workColor;
        header.style.background = workColor;
        clearInterval(interval);
        work = true;
        run = false;
    }

    // add eventListener to buttons  
    startButton.addEventListener("click", countDown, false);

    document.getElementById("reset").addEventListener("click", resetFunction, false);

    // dialog
    if (!aboutDialog.showModal) {
        dialogPolyfill.registerDialog(aboutDialog);
    }
    if (!optionsDialog.showModal) {
        dialogPolyfill.registerDialog(optionsDialog);
    }
    showOptions.addEventListener("click", function() {
        optionsDialog.showModal();
    });
    for (let showAboutButton of showAbout) {
        showAboutButton.addEventListener("click", function() {
            aboutDialog.showModal();
        });
    }
    aboutDialog.querySelector(".close").addEventListener("click", function() {
        aboutDialog.close();
    });
    optionsDialog.querySelector(".close").addEventListener("click", function() {
        optionsDialog.close();
    });

    document.getElementById("save").addEventListener("click", () => {
        let reg = /^\d+([.]?(\d+)?)?$/;
        let workTimeInput = document.getElementById("workTime").value;
        let shortBreakTimeInput = document.getElementById("shortbreak").value;
        let longBreakTimeInput = document.getElementById("longbreak").value;
        if (reg.test(workTimeInput) && reg.test(shortBreakTimeInput) && reg.test(longBreakTimeInput) && !run && workTimeInput > 0 && shortBreakTimeInput > 0 && longBreakTimeInput > 0) {
            worktime = parseInt(workTimeInput, 10);
            shortbreak = parseInt(shortBreakTimeInput, 10);
            longbreak = parseInt(longBreakTimeInput, 10);
            countElement.textContent = worktime + ":00";
            resetFunction();
            dialog.close();
        }
    });

    // notification
    function requestPermission() {
        Notification.requestPermission();
    }

    requestPermission();

    function notify() {
        if (!("Notification" in window)) {
            alert("This browser does not support system notifications");
        } else if (Notification.permission === "granted" && cycles > 0) {
            let title = work ? "Keep working!" : cycles % 4 == 0 ? "Time for a longer break" : "Time for a short break";
            let options = {
                tag: "notify",
                renotify: true
            };
            let notification = new Notification(title, options);
        } else if (Notification.permission !== "denied") {
            requestPermission();
        }
    }

    // hotkeys
    window.addEventListener("keyup", function(event) {
        if (event.code == "Space" && !optionsDialog.hasAttribute("open") && !aboutDialog.hasAttribute("open")) {
            countDown();
        }
        if (event.code == "KeyR" && !optionsDialog.hasAttribute("open") && !aboutDialog.hasAttribute("open")) {
            resetFunction();
        }
    });

    // close drawer after click
    let layout = document.querySelector(".mdl-layout");
    for (let link of document.querySelectorAll(".navigation__link")) {
        link.addEventListener("click", () => {
            layout.MaterialLayout.toggleDrawer();
        });
    }
});