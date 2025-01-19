let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  {
    name: "Naanaa Hyraanaa Song",
    artist: "S S Thaman",
    image: "https://naasongs.com.co/wp-content/uploads/2024/11/Game-Changer-naa-songs-download-ram-charan-tej-kaira-advani-s-thaman-game-changer-movie-songs-download.jpg",
    path: "https://mp3teluguwap.net/mp3/2024/Game%20Changer/Game%20Changer/Naanaa%20Hyraanaa.mp3"
  },
  {
    name: "Kissik Song",
    artist: "DSP",
    image: "https://naasongs.com.co/wp-content/uploads/2024/12/Pushpa-2-Naa-Songs-Download-Pushpa-2-songs-allu-arjun-rashmika-mandana-sree-leela-devi-sri-prasad.jpg",
    path: "https://mp3teluguwap.net/mp3/2025/Pushpa%202%20(2024)/Pushpa%202%20(2024)/Kissik.mp3"
  },
  {
    name: "Fire Song",
    artist: "DSP",
    image: "https://naasongs.com.co/wp-content/uploads/2024/11/Kanguva-Songs.jpg",
    path: "https://mp3teluguwap.net/mp3/2024/Kanguva/Kanguva/Fire.mp3"
  },
  {
    name: "Dabidi Dibidi Song",
    artist: "S S Thaman",
    image: "https://naasongs.com.co/wp-content/uploads/2024/12/Daaku-Maharaj-Songs-Download-Daaku-Maharaj-Naa-Songs-Balakrishna-2025.jpg",
    path: "https://mp3teluguwap.net/mp3/2025/Daaku%20Maharaj/Daaku%20Maharaj/Dabidi%20Dibidi.mp3"
  },
  {
    name: "Raa Macha Macha Song",
    artist: "S S Thaman",
    image: "https://naasongs.com.co/wp-content/uploads/2024/11/Game-Changer-naa-songs-download-ram-charan-tej-kaira-advani-s-thaman-game-changer-movie-songs-download.jpg",
    path: "https://mp3teluguwap.net/mp3/2024/Game%20Changer/Game%20Changer/Raa%20Macha%20Macha.mp3",
  },
  {
    name: "Swathi Reddy Song",
    artist: "Bheems",
    image: "https://naasongs.com.co/wp-content/uploads/2024/12/Mad-Square-Songs.jpg",
    path: "https://mp3teluguwap.net/mp3/2024/Mad%20Square/Swathi%20Reddy.mp3",
  },
  {
    name: "Maata Vinali Song",
    artist: "M M Keeravani",
    image: "https://naasongs.com.co/wp-content/uploads/2025/01/Hari-Hara-Veeramallu-SOngs-DOwnload-Pawan-Kalyan-Nidhi-Aggarwal.jpg",
    path: "https://mp3teluguwap.net/mp3/2025/Hari%20Hara%20Veera%20Mallu%20(2025)/Hari%20Hara%20Veera%20Mallu%20(2025)%20-%20HQ/Maata%20Vinaali.mp3",
  },
  {
    name: "Konda Devara Song",
    artist: "S S Thaman",
    image: "https://naasongs.com.co/wp-content/uploads/2024/11/Game-Changer-naa-songs-download-ram-charan-tej-kaira-advani-s-thaman-game-changer-movie-songs-download.jpg",
    path: "https://mp3teluguwap.net/mp3/2024/Game%20Changer/Game%20Changer%20-%20HQ/Konda%20Devara.mp3",
  },
  {
    name: "Subhalekha Rasukunnna Song",
    artist: "S S Thaman",
    image: "https://naasongs.com.co/wp-content/uploads/2018/06/Nayak-2013jpeg-300x300.jpg",
    path: "https://sencloud.online/mp3/Telugu%20Mp3/All/Nayak(2013)/Subhalekha%20Rasukunna-SenSongsMp3.Com.mp3",
  },
  {
    name: "Hey Naayak Song",
    artist: "S S Thaman",
    image: "https://naasongs.com.co/wp-content/uploads/2018/06/Nayak-2013jpeg-300x300.jpg",
    path: "https://sencloud.online/mp3/Telugu%20Mp3/All/Nayak(2013)/Hey%20Naayak-SenSongsMp3.Com.mp3",
  },
];



function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

