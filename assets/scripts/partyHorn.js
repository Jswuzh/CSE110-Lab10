// partyHorn.js
let partyHorn = false;
const jsConfetti = new JSConfetti();

window.addEventListener('DOMContentLoaded', init);

function init() {
  bindListeners();
  const themeToggle = document.getElementById('theme-toggle');
  const blueTheme = document.getElementById('blue-theme');
  
  if (themeToggle && blueTheme) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      // Store preference in localStorage
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
    
    blueTheme.addEventListener('click', () => {
      document.body.classList.toggle('blue');
      // Store preference in localStorage
      localStorage.setItem('blueTheme', document.body.classList.contains('blue') ? 'true' : 'false');
    });

    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark');
    }
    if (localStorage.getItem('blueTheme') === 'true') {
      document.body.classList.add('blue');
    }
  }
}

function bindListeners() {
  const hornPicker = document.querySelector('#horn-select')
  const volume = document.querySelector('#volume');
  const playSoundBtn = document.querySelector('#expose > button');
  hornPicker.addEventListener('input', selectHorn);
  volume.addEventListener('input', updateVolume);
  playSoundBtn.addEventListener('click', playSound);
}

function selectHorn() {
  const imgElem = document.querySelector('#expose > img');
  const audioElem = document.querySelector('#expose > audio');
  imgElem.setAttribute('src', `assets/images/${this.value}.svg`);
  audioElem.setAttribute('src', `assets/audio/${this.value}.mp3`)
  partyHorn = this.value == 'party-horn' ? true : false;
}

function updateVolume() {
  const volume = Number(this.value);
  const volumeImg = document.querySelector('#volume-controls > img');
  const audioElem = document.querySelector('#expose > audio');
  let volumeLevel = 3;
  switch (true) {
    case (volume == 0):
      volumeLevel = 0;
      break;
    case (volume < 33):
      volumeLevel = 1;
      break;
    case (volume < 67):
      volumeLevel = 2;
      break;
  }
  volumeImg.setAttribute('src', `assets/icons/volume-level-${volumeLevel}.svg`);
  audioElem.volume = volume / 100;
}

function playSound() {
  const audioElem = document.querySelector('#expose > audio');
  if (audioElem.getAttribute('src') == '') return;
  if (partyHorn) setTimeout(() => jsConfetti.addConfetti(), 350);
  audioElem.play();
}
