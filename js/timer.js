const displaySeleTime = document.querySelectorAll(".timer-content-data");
const timerDataWrapper = document.querySelectorAll(
  ".timer-content-data-wrapper"
);
let rotationClockDays = 180;
let rotationClockHours = 180;
let rotationClockMinutes = 180;
let rotationClockSeconds = 180;

(function seleTimer() {
  const nextFinDays = 2 - (~~(new Date().getTime() / 1000 / 60 / 60 / 24) % 3);
  const finDate = new Date();
  finDate.setDate(finDate.getDate() + nextFinDays);
  finDate.setHours(23);
  finDate.setMinutes(59);
  finDate.setSeconds(59);
  let diff = finDate.getTime() - new Date().getTime();
  let seconds = Math.round((diff / 1000) % 60);
  let minutes = ~~((diff / 1000 / 60) % 60);
  let hours = ~~((diff / 1000 / 60 / 60) % 24);
  let days = ~~(diff / 1000 / 60 / 60 / 24);
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (days < 10) {
    days = "0" + days;
  }

  if (displaySeleTime[0].innerText > hours) {
    timerDataWrapper[0].style.transform =
      "rotateX(" + rotationClockDays + "deg)";
    displaySeleTime[0].style.transform =
      "rotateX(" + rotationClockDays + "deg)";
    timerDataWrapper[1].style.transform =
      "rotateX(" + rotationClockHours + "deg)";
    displaySeleTime[1].style.transform =
      "rotateX(" + rotationClockHours + "deg)";
    timerDataWrapper[2].style.transform =
      "rotateX(" + rotationClockMinutes + "deg)";
    displaySeleTime[2].style.transform =
      "rotateX(" + rotationClockMinutes + "deg)";
    rotationClockDays += 180;
  }
  displaySeleTime[0].innerText = days;

  if (displaySeleTime[1].innerText > hours) {
    timerDataWrapper[1].style.transform =
      "rotateX(" + rotationClockHours + "deg)";
    displaySeleTime[1].style.transform =
      "rotateX(" + rotationClockHours + "deg)";
    timerDataWrapper[2].style.transform =
      "rotateX(" + rotationClockMinutes + "deg)";
    displaySeleTime[2].style.transform =
      "rotateX(" + rotationClockMinutes + "deg)";
    rotationClockHours += 180;
  }
  displaySeleTime[1].innerText = hours;

  if (displaySeleTime[2].innerText > minutes) {
    timerDataWrapper[2].style.transform =
      "rotateX(" + rotationClockMinutes + "deg)";
    displaySeleTime[2].style.transform =
      "rotateX(" + rotationClockMinutes + "deg)";
    rotationClockMinutes += 180;
  }
  displaySeleTime[2].innerText = minutes;

  displaySeleTime[3].innerText = seconds;
  if (displaySeleTime[3].innerText == seconds) {
    timerDataWrapper[3].style.transform =
      "rotateX(" + rotationClockSeconds + "deg)";
    displaySeleTime[3].style.transform =
      "rotateX(" + rotationClockSeconds + "deg)";
    rotationClockSeconds += 180;
  }
  setTimeout(seleTimer, 1000);
})();
