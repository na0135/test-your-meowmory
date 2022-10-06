// Audio credit: 
// The audio for button 1 is from: freesound.org, by meku_a: https://freesound.org/people/meku_a/sounds/612806/
// The audio for button 2 is from: freesound.org, by Mike888: https://freesound.org/people/Mike888/sounds/214452/
// Image credit:
// The secret winning gif is from: https://tenor.com/view/birthday-cat-birthday-cake-birthday-hbd-confetti-gif-13622483
// The losing gif is from: https://tenor.com/view/sad-cat-sad-cat-gif-19287788
// From left to right:
// The picture for button 1 is from: https://www.nicepng.com/ourpic/u2q8r5t4u2r5q8e6_funny-cat-png-funny-cat-face-png/
// The picture for button 2 is from: Pixabay, https://pixabay.com/photos/british-shorthair-cat-pet-feline-3401683/
// The picture for button 3 is from: Pixabay, https://pixabay.com/photos/kittens-felines-pets-young-animals-2273598/
// The picture for button 4 is from: Pixabay, https://pixabay.com/photos/animal-cat-domestic-animal-isolated-3296309/
// The picture for button 5 is from: Pixabay, https://pixabay.com/photos/cat-kitten-cute-pet-animals-pair-3269765/
// The picture for button 6 is from: Pixabay, https://pixabay.com/photos/cat-face-close-up-view-eyes-1334970/

// global constants
const cluePauseTime = 500; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence

//Global Variables
var pattern = [2, 2, 4, 3, 2, 1, 2, 4];
var progress = 0; 
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5;
var guessCounter = 0;
var numMistakes;
var interval;
// Time left for user to make guess
var timeLeft;
// Displays actual time passed including time it takes to
// click button and play sound
var actualTime = 0; 
// Time limit in seconds for each turn
var timeForEachProg = [6, 8, 10, 12, 14, 16, 18, 20]
var clueHoldTime; // how long to hold each clue's light/sound

function startGame(){
    // initialize game variables
    clueHoldTime = 1000;
    timeLeft = timeForEachProg[0];
    actualTime = 0;
    progress = 0;
    gamePlaying = true;
    // swap the Start and Stop buttons
    document.getElementById("startBtn").classList.add("hidden");
    document.getElementById("stopBtn").classList.remove("hidden");
    document.getElementById("gameOver").innerHTML = " ";
    document.getElementById("youWon").classList.add("hidden");
    document.getElementById("youLost").classList.add("hidden");
    // Assigns a random pattern to be played
    for (let i = 0; i < 8; i++) {
      pattern[i] = getRandomNums(1, 6);
    }
    numMistakes = 0;
    playClueSequence();
    // Starts the timer
    interval = setInterval(elapseTime, 500);
}

// Generates a random button to be played
function getRandomNums(min, max) {
  let range = max - min;
  return Math.round(Math.random() * range + min);
}

// Ends the game
function stopGame(){
  gamePlaying = false;
  clearInterval(interval);
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  document.getElementById("youWon").classList.add("hidden");
}

// Sound Synthesis Functions
const freqMap = {
  1: 261.6,
  2: 329.6,
  3: 392,
  4: 466.2,
  5: 600,
  6: 567
}

// Plays the sound associated with the button
function playTone(btn,len){ 
  // o.frequency.value = freqMap[btn]
  // g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  playSound(btn - 1);
  context.resume()
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}

function startTone(btn){
  if(!tonePlaying){
    context.resume()
    // o.frequency.value = freqMap[btn]
    // g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    playSound(btn - 1);
    context.resume()
    tonePlaying = true
  }
}

function stopTone(){
  g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
  tonePlaying = false
}

// Page Initialization
// Init Sound Synthesizer
var AudioContext = window.AudioContext || window.webkitAudioContext 
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)

function lightButton(btn){
  document.getElementById("button"+btn).classList.add("lit")
}
function clearButton(btn){
  document.getElementById("button"+btn).classList.remove("lit")
}

function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    playTone(btn,clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
  }
}

// Play the sequence of the buttons
function playClueSequence() {
  // Decrease the clueHoldTime for every turn
  // until the clueHoldTime reaches 100 ms
  clueHoldTime = clueHoldTime - 200;
  if (clueHoldTime < 300) {
    clueHoldTime = 100;
  }
  context.resume()
  guessCounter = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  for(let i=0;i<=progress;i++){ // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue
    delay += clueHoldTime 
    delay += cluePauseTime;
  } 
}

// The player lost, so end the game
function loseGame(){
  stopGame();
  alert("Game Over. You lost.");
  document.getElementById("youLost").classList.remove("hidden");
  document.getElementById("timer").innerHTML = "Better luck next time!";
}

// Alert the player that they have won
function winGame(){
  stopGame();
  document.getElementById("youWon").classList.remove("hidden");
  alert("Yay! You won!");
}

// Handles the player's guess
function guess(btn){ 
  console.log("user guessed: " + btn);
  if(!gamePlaying){
    return;
  }
  // Player guessed before time limit is up
  // Reset the timer
  if (guessCounter == progress) {
    clearInterval(interval);
    timeLeft = timeForEachProg[progress + 1];
    actualTime = 0;
    document.getElementById("timer").innerHTML = "	٩(｡•́‿•̀｡)۶";
  } 
  // If incorrect guess and out of tries
  // end game, else let user try again
  if (btn != pattern[guessCounter]) {
      numMistakes = numMistakes + 1;
      if (numMistakes >= 3) {
        loseGame();
      } else {
        tryAgain();
      }
      return;
  } else { // Guess is correct, user 
    // needs to finish guessing sequence
    if (guessCounter < progress) {
      guessCounter = guessCounter + 1;
      return;
    } // Continue the sequence
    if (progress < pattern.length - 1) {
      progress = progress + 1;
      playClueSequence();
      interval = setInterval(elapseTime, 500);
      return;
    } // The sequence is finished and all guesses are correct
    if (guessCounter == progress && progress == pattern.length - 1) {
      winGame();
      return;
    }
  }    
}

// Let player try again if they have made less than 3 mistakes
function tryAgain() {
  clearInterval(interval);
  actualTime = 0;
  document.getElementById("timer").innerHTML = "٩(｡•́‿•̀｡)۶";
  let triesLeft = 3 - numMistakes;
  timeLeft = timeForEachProg[progress];
  alert("Oops! Try again. You have " + triesLeft + " tries left.");
  playClueSequence();  
  interval = setInterval(elapseTime, 500);
}

// Stop the game if user is out of time
function outOfTime() {
   alert("You're out of time!");
   stopGame();
}

// Function that tracks the timer of each turn
function elapseTime() {
  // Actual time tracks seconds that have passed
  // since the first clue has been played
  actualTime = actualTime + 500;
  // Delays the display of the timer for each turn
  // until the sound has been played
  if (actualTime >= ((progress + 1) * (cluePauseTime + clueHoldTime))) {
    timeLeft = timeLeft - 0.5;
    // Display the time left if 
    // it's a whole number (aka every 1000 miliseconds)
    if (timeLeft % 1 == 0) {
      document.getElementById("timer").innerHTML = "Time left: " + timeLeft + "s";
    }
    if (timeLeft == 0) {
      document.getElementById("timer").innerHTML = "Time left: " + timeLeft + "s";
      document.getElementById("gameOver").innerHTML = "Time's up!";
      stopGame();
    } else {
      return;
    }
  }
}

// Audios for each button
const audio1 = new Audio("https://cdn.glitch.global/a8342e45-98e9-4034-b924-c71b6f3fbc21/612806-meku-a-cat-piano-note-c-2_SmyDVd01.wav?v=1648535318874");
const audio2 = new Audio("https://cdn.glitch.global/a8342e45-98e9-4034-b924-c71b6f3fbc21/NO2214452-mike888-cat-piano-1_VwK5r09j.wav?v=1648536244068");
const audio3 = new Audio("https://cdn.glitch.global/a8342e45-98e9-4034-b924-c71b6f3fbc21/NO3214452-mike888-cat-piano-1_2P4vEjbF.wav?v=1648536476194");
const audio4 = new Audio("https://cdn.glitch.global/a8342e45-98e9-4034-b924-c71b6f3fbc21/NO4214452-mike888-cat-piano-1_aQV08jwC.wav?v=1648537010559");
const audio5 = new Audio("https://cdn.glitch.global/a8342e45-98e9-4034-b924-c71b6f3fbc21/NO5214452-mike888-cat-piano-1_ibOhAkwj.wav?v=1648537400941");
const audio6 = new Audio("https://cdn.glitch.global/a8342e45-98e9-4034-b924-c71b6f3fbc21/NO6214452-mike888-cat-piano-1_nEz9XY0a.wav?v=1648537471876");
var audioArray = [audio1, audio2, audio3, audio4, audio5, audio6];
// Plays the audio
function playSound(audio) {
  audioArray[audio].play();
}
