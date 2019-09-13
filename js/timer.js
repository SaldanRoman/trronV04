let nextTime = 38;
let finDate = new Date(2019, 8, 14, 19,nextTime,0);
(function seleTimer() {


  let diff = finDate.getTime() - new Date().getTime();
  let seconds = Math.floor((diff / 1000) % 60);
  let minutes = Math.floor((diff / 1000 / 60) % 60);
  let hours = Math.floor((diff / 1000 / 60 / 60) % 24);
  let days = Math.floor(diff / 1000 / 60 / 60 / 24);
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (days < 10) {
    days = `0${days}`;
  }
  const displaySeleTime = document.querySelectorAll(".timer-content-data");
  displaySeleTime[0].innerText = days;
  displaySeleTime[1].innerText = hours;
  displaySeleTime[2].innerText = minutes;
  displaySeleTime[3].innerText = seconds;
  //displaySeleTime.innerText =
  //days + ":" + hours + ":" + minutes + ":" + seconds;
  setTimeout(seleTimer, 1000);
})();
