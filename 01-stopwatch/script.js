const minutesLabel = document.getElementById("minutes");
const secondsLabel = document.getElementById("seconds");
const millisecondsLabel = document.getElementById("milliseconds");
const startButton = document.getElementById("startBtn");
const stopButton = document.getElementById("stopBtn");
const pauseButton = document.getElementById("pauseBtn");
const resetButton = document.getElementById("resetBtn");
let totalMilliseconds = 0;
let interval;

function start() {
  interval = setInterval(() => {
    totalMilliseconds += 10;
    const time = new Date(totalMilliseconds);
    minutesLabel.innerHTML = time.getUTCMinutes().toString().padStart(2, "0");
    secondsLabel.innerHTML = time.getUTCSeconds().toString().padStart(2, "0");
    millisecondsLabel.innerHTML = time
      .getUTCMilliseconds()
      .toString()
      .padStart(3, "0");
  }, 10);
}

function stop() {
  clearInterval(interval);
}

function pause() {
  clearInterval(interval);
}

function reset() {
  clearInterval(interval);
  totalMilliseconds = 0;
  minutesLabel.innerHTML = "00";
  secondsLabel.innerHTML = "00";
  millisecondsLabel.innerHTML = "00";
}

startButton.addEventListener("click", start);
stopButton.addEventListener("click", stop);
pauseButton.addEventListener("click", pause);
resetButton.addEventListener("click", reset);

const lapTimer = document.getElementById("lapList");

function lap() {
  const lapTime = document.createElement("li");
  const lapLabel = document.createElement("span");
  lapLabel.innerHTML = "Lap " + (lapTimer.childElementCount + 1);
  lapTime.appendChild(lapLabel);

  const timeSpan = document.createElement("span");
  timeSpan.innerHTML = ` ${minutesLabel.innerHTML}:${secondsLabel.innerHTML}:${millisecondsLabel.innerHTML}`;
  lapTime.appendChild(timeSpan);

  lapTimer.appendChild(lapTime);
}

const lapButton = document.getElementById("lapBtn");
lapButton.addEventListener("click", lap);

const clearButton = document.getElementById("clearBtn");
clearButton.addEventListener("click", () => {
  lapTimer.innerHTML = "";
});
