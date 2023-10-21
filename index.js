let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let progressBar = document.getElementById("progress");
let gif = document.getElementById("gif");
let nowplay = document.getElementById("nowplay");
const audioContext = new AudioContext();
const songsList = [
  { SongName: "Uppongele Godavari", filepath: "songs/1.mp3" },
  { SongName: "Manasa Gelupu", filepath: "songs/2.mp3" },
  { SongName: "Tippulu Tappulu", filepath: "songs/3.mp3" },
  { SongName: "Rama Chakani Sita", filepath: "songs/4.mp3" },
  { SongName: "Andhamgalena", filepath: "songs/5.mp3" },
  { SongName: "Manasa Vacha", filepath: "songs/6.mp3" },
];

const makeAllplays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.add("fa-circle-play");
      element.classList.remove("fa-circle-pause");
    }
  );
};

document.addEventListener("DOMContentLoaded", () => {
  masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
      audioElement.play();
      masterPlay.classList.remove("fa-circle-play");
      masterPlay.classList.add("fa-circle-pause");
      gif.style.opacity = 1;
    } else {
      audioElement.pause();
      masterPlay.classList.remove("fa-circle-pause");
      masterPlay.classList.add("fa-circle-play");
      gif.style.opacity = 0;
      makeAllplays();
    }
  });
});
audioElement.addEventListener("timeupdate", () => {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  progressBar.value = progress;
  if (progress == 100) {
    gif.style.opacity = 0;
  }
});
progressBar.addEventListener("change", () => {
  audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllplays();
      nowplay.innerText = songsList[songIndex + 1].SongName;
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-circle-play");
      e.target.classList.add("fa-circle-pause");
      audioElement.src = `songs/${songIndex + 1}.mp3`;
      audioElement.play();
      masterPlay.classList.remove("fa-circle-play");
      masterPlay.classList.add("fa-circle-pause");
      gif.style.opacity = 1;
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  makeAllplays();
  if (songIndex >= 5) {
    songIndex = 0;
    nowplay.innerText = songsList[songIndex + 1].SongName;
  } else {
    songIndex += 1;
    nowplay.innerText = songsList[songIndex].SongName;
  }

  audioElement.src = `songs/${songIndex + 1}.mp3`;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  gif.style.opacity = 1;
});
document.getElementById("previous").addEventListener("click", () => {
  makeAllplays();
  if (songIndex < 0) {
    songIndex = 0;
    nowplay.innerText = songsList[songIndex + 1].SongName;
  } else {
    songIndex -= 1;
    nowplay.innerText = songsList[songIndex].SongName;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;

  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  gif.style.opacity = 1;
});
