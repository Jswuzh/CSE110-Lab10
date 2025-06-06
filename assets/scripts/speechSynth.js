// speechSynth.js

const synth = window.speechSynthesis;
let voices;

window.addEventListener('DOMContentLoaded', init);

function init() {
  setTimeout(() => populateVoices(), 50);
  bindListeners();
  const themeToggle = document.getElementById('theme-toggle');
  const blueTheme = document.getElementById('blue-theme');
  
  if (themeToggle && blueTheme) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
    });
    
    blueTheme.addEventListener('click', () => {
      document.body.classList.toggle('blue');
    });
  const rateControl = document.getElementById('rate');
  const rateValue = document.getElementById('rate-value');
  
  if (rateControl && rateValue) {
    rateControl.addEventListener('input', () => {
      rateValue.textContent = `${rateControl.value}x`;
    });
  }
}

function populateVoices() {
  const voiceSelect = document.querySelector('#voice-select');
  voices = synth.getVoices();
  voices.forEach(voice => {
    const option = document.createElement('option');
    option.innerHTML = `${voice.name} (${voice.lang})`;
    option.setAttribute('value', `${voice.name} (${voice.lang})`);
    option.setAttribute('data-index', voiceSelect.children.length - 1)
    voiceSelect.appendChild(option);
  });
}

function bindListeners() {
  const talkBtn = document.querySelector('#explore > button');
  const textarea = document.querySelector('#explore > textarea');

  talkBtn.addEventListener('click', () => {
    let textToSpeak = textarea.value;
    let utterThis = new SpeechSynthesisUtterance(textToSpeak);
    utterThis.voice = voices[getOptionIndex()];
    const rateControl = document.getElementById('rate');
    utterThis.rate = parseFloat(rateControl?.value || 1);
    synth.speak(utterThis);
    openMouth();
  })
}

function getOptionIndex() {
  const voiceSelect = document.querySelector('#voice-select');
  const option = voiceSelect.options[voiceSelect.selectedIndex];
  return option.getAttribute('data-index');
}

function openMouth() {
  let face = document.querySelector('#explore > img');
  face.setAttribute('src', 'assets/images/smiling-open.png');
  setTimeout(() => {
    if (synth.speaking) {
      openMouth();
    } else {
      face.setAttribute('src', 'assets/images/smiling.png');
    }
  }, 100);
}
