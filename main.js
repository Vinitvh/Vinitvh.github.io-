const synth = window.speechSynthesis;

// DOM selections
const text_form = document.querySelector("form");
const text_input = document.querySelector("#text-input");
const rate = document.querySelector("#rate");
const rate_value = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitch_value = document.querySelector("#pitch-value");
const voice_select = document.querySelector("#voice-select");

let voices = [];

const getSpeech = () => {
  voices = synth.getVoices();

  voices.forEach(voice => {
    const option = document.createElement("option");
    option.textContent = voice.name + "(" + voice.lang + ")";
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);

    voice_select.appendChild(option);
  });
};
getSpeech();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getSpeech;
}

text_form.addEventListener("submit", e => {
  e.preventDefault();

  const utterThis = new SpeechSynthesisUtterance(text_input.value);
  const selectedOption = voice_select.selectedOptions[0].getAttribute(
    "data-name"
  );
  for (i = 0; i < voices.length; i++) {
    if (voices[i].name === selectedOption) {
      utterThis.voice = voices[i];
    }
  }
  utterThis.rate = rate.value;
  utterThis.pitch = pitch.value;

  synth.speak(utterThis);
  text_input.blur();
});

rate.addEventListener("change", e => (rate_value.textContent = rate.value));
pitch.addEventListener("change", e => (pitch_value.textContent = pitch.value));
