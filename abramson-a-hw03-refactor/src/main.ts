/*
  main.js is primarily responsible for hooking up the UI to the rest of the application 
  and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!

import * as utils from './utils';
import * as audio from './audio';
import * as canvas from './canvas';
import { DEFAULTS } from './enums/main-defaults.enum';
//import { DrawParams } from './interfaces/drawParams.interface';

const drawParams = {
  showGradient: true,
  showBars: true,
  showCircles: true,
  showTriangles: false,
  showNoise: false,
  showInvert: false,
};

const init = () => {
  audio.setUpWebAudio(DEFAULTS.sound1);

  console.log("init called");
  console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);
  let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
  setupUI(canvasElement);
  canvas.setupCanvas(canvasElement, audio.analyserNode);
  loop();
}

const setupUI = (canvasElement:HTMLCanvasElement) => {
  // A - hookup fullscreen button
  const fsButton = document.querySelector("#btn-fs") as HTMLButtonElement;

  // add .onclick event to button
  fsButton.onclick = () => {
    console.log("goFullscreen() called");
    utils.goFullscreen(canvasElement);
  };

  // B - hookup play button
  const playButton = document.querySelector("#btn-play") as HTMLButtonElement;

  // add .onclick event to play button
  playButton.onclick = e => {
    console.log(`audioCtx.state before = ${audio.audioCtx.state}`);

    const target = e.target as HTMLInputElement;

    // check if context is in suspended state (autoplay policy)
    if (audio.audioCtx.state == "suspended") {
      audio.audioCtx.resume();
    }
    console.log(`audioCtx.state after = ${audio.audioCtx.state}`);
    //if the track is paused, play it
    if (target.dataset.playing == "no") {
      audio.playCurrentSound();
      target.dataset.playing = "yes"; //CSS sets text to "Pause"
    }
    //if the track is playing, pause it
    else {
      audio.pauseCurrentSound();
      target.dataset.playing = "no"; //CSS sets text to "Play"
    }
  };

  // C - hookup volume slider and label
  let volumeSlider = document.querySelector("#slider-volume") as HTMLInputElement;
  let volumeLabel = document.querySelector("#label-volume") as HTMLElement;

  // add .oninput event to slider
  volumeSlider.oninput = e => {
    const target = e.target as HTMLInputElement;
    //set gain
    audio.setVolume(target.value);
    //update value of label to match value of the slider
    volumeLabel.innerHTML = String(Math.round((+target.value / 2 * 100)));
  };

  //set value of label to match the initial value of the slider
  volumeSlider.dispatchEvent(new Event("input"));

  // D - hookup track <select>
  let trackSelect = document.querySelector("#select-track") as HTMLSelectElement;
  //add .onchange event to <select>
  trackSelect.onchange = e => {
    const target = e.target as HTMLInputElement;
    audio.loadSoundFile(target.value);
    //pause current track if it's playing
    if (playButton.dataset.playing == "yes") {
      playButton.dispatchEvent(new MouseEvent("click"));
    }
  };

  //checkboxes
  let gradientCB = document.querySelector("#cb-gradient") as HTMLInputElement;
  let barsCB = document.querySelector("#cb-bars") as HTMLInputElement;
  let circlesCB = document.querySelector("#cb-circles") as HTMLInputElement;
  let noiseCB = document.querySelector("#cb-noise") as HTMLInputElement;
  let invertCB = document.querySelector("#cb-invert") as HTMLInputElement;
  let trianglesCB = document.querySelector("#cb-triangles") as HTMLInputElement;
  let highshelfCB = document.querySelector("#cb-highshelf") as HTMLInputElement;
  let lowshelfCB = document.querySelector("#cb-lowshelf") as HTMLInputElement;

  //initial true values
  gradientCB.checked = true;
  barsCB.checked = true;
  circlesCB.checked = true;

  //toggles canvas/audio effects every time a checkbox is checked
  gradientCB.onchange = () => {
    drawParams.showGradient = gradientCB.checked;
  };

  barsCB.onchange = () => {
    drawParams.showBars = barsCB.checked;
  };

  circlesCB.onchange = () => {
    drawParams.showCircles = circlesCB.checked;
  };

  noiseCB.onchange = () => {
    drawParams.showNoise = noiseCB.checked;
  };

  invertCB.onchange = () => {
    drawParams.showInvert = invertCB.checked;
  };

  trianglesCB.onchange = () => {
    drawParams.showTriangles = trianglesCB.checked;
  };

  highshelfCB.onchange = () => {
    audio.toggleHighshelf(highshelfCB.checked);
  };

  lowshelfCB.onchange = () => {
    audio.toggleLowshelf(lowshelfCB.checked);
  };

  //initial highshelf/lowshelf declaration
  audio.toggleHighshelf(highshelfCB.checked);
  audio.toggleLowshelf(lowshelfCB.checked);

} // end setupUI

const loop = () => {
  /* NOTE: This is temporary testing code that we will delete in Part II */
  setTimeout(loop, 1000 / 60);
  canvas.draw(drawParams);
}

export { init };