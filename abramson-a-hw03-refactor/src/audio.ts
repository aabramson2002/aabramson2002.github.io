import { DEFAULTS } from "./enums/audio-defaults.enum";

// 1 - our WebAudio context, **we will export and make this public at the bottom of the file**
let audioCtx:AudioContext;

// **These are "private" properties - these will NOT be visible outside of this module (i.e. file)**
// 2 - WebAudio nodes that are part of our WebAudio audio routing graph
let element:HTMLAudioElement, sourceNode:AudioNode, biquadFilter:BiquadFilterNode, lowShelfBiquadFilter:BiquadFilterNode, analyserNode:AnalyserNode, gainNode:GainNode;

// **Next are "public" methods - we are going to export all of these at the bottom of this file**
const setUpWebAudio = (filePath:string) => {
    // 1 - The || is because WebAudio has not been standardized across browsers yet
    audioCtx = new AudioContext();

    // 2 - this creates an <audio> element
    element = new Audio();

    // 3 - have it point at a sound file
    loadSoundFile(filePath);

    // 4 - create an a source node that points at the <audio> element
    sourceNode = audioCtx.createMediaElementSource(element);

    // 5 - create an analyser node
    // note the UK spelling of "Analyser"
    analyserNode = audioCtx.createAnalyser();

    /*
    // 6
    We will request DEFAULTS.numSamples number of samples or "bins" spaced equally 
    across the sound spectrum.
    
    If DEFAULTS.numSamples (fftSize) is 256, then the first bin is 0 Hz, the second is 172 Hz, 
    the third is 344Hz, and so on. Each bin contains a number between 0-255 representing 
    the amplitude of that frequency.
    */

    // fft stands for Fast Fourier Transform
    analyserNode.fftSize = DEFAULTS.numSamples;

    // create biquad filter nodes
    biquadFilter = audioCtx.createBiquadFilter();
    biquadFilter.type = "highshelf";

    lowShelfBiquadFilter = audioCtx.createBiquadFilter();
    lowShelfBiquadFilter.type = "lowshelf";

    // 7 - create a gain (volume) node
    gainNode = audioCtx.createGain();
    gainNode.gain.value = DEFAULTS.gain;

    // 8 - connect the nodes - we now have an audio graph
    sourceNode.connect(biquadFilter);
    biquadFilter.connect(lowShelfBiquadFilter);
    lowShelfBiquadFilter.connect(analyserNode);
    analyserNode.connect(gainNode);
    gainNode.connect(audioCtx.destination);
}

const loadSoundFile = (filePath:string) => {
    element.src = filePath;
}

const playCurrentSound = () => {
    element.play();
}

const pauseCurrentSound = () => {
    element.pause();
}

const setVolume = (value: string | number) => {
    value = Number(value); // make sure that it's a Number rather than a String
    gainNode.gain.value = value;
}

//turns on/off the treble
const toggleHighshelf = (on:boolean) => {
    if (on) {
        biquadFilter.frequency.setValueAtTime(1000, audioCtx.currentTime);
        biquadFilter.gain.setValueAtTime(25, audioCtx.currentTime);
    } else {
        biquadFilter.gain.setValueAtTime(0, audioCtx.currentTime);
    }
}

//turns on/off the bass
const toggleLowshelf = (on:boolean) => {
    if (on) {
        lowShelfBiquadFilter.frequency.setValueAtTime(1000, audioCtx.currentTime);
        lowShelfBiquadFilter.gain.setValueAtTime(15, audioCtx.currentTime);
    } else {
        lowShelfBiquadFilter.gain.setValueAtTime(0, audioCtx.currentTime);
    }
}

export { audioCtx, setUpWebAudio, playCurrentSound, pauseCurrentSound, loadSoundFile, setVolume, toggleHighshelf, toggleLowshelf, analyserNode };