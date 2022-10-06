

Link to project: https://glitch.com/edit/#!/illustrious-wary-pancreas
Live site: https://illustrious-wary-pancreas.glitch.me

Functionalities

* [X] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [X] "Start" button toggles between "Start" and "Stop" when clicked. 
* [X] Game buttons each light up and play a sound when clicked. 
* [X] Computer plays back sequence of clues including sound and visual cue for each button
* [X] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [X] User wins the game after guessing a complete pattern
* [X] User loses the game after an incorrect guess

Extra functionalities

* [X] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [ ] Buttons use a pitch (frequency) other than the ones in the tutorial
* [X] More than 4 functional game buttons
* [X] Playback speeds up on each turn
* [X] Computer picks a different pattern each time the game is played
* [X] Player only loses after 3 mistakes (instead of on the first mistake)
* [X] Game button appearance change goes beyond color (e.g. add an image)
* [X] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [X] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [X] Displays a secret celebratory GIF that only pops up when the user wins and one that only pops up when the user loses
- [X] User gets additional time for each turn

## Video Walkthrough (GIF)

This gif shows a complete game where the user wins all rounds, it shows the time limit for every round, and the secret winning gif. During every turn the player has more time added to the limit.
![](https://i.imgur.com/1dGfjt7.gif)
This gif shows the player losing the game after 3 tries and the losing message.
![](https://i.imgur.com/nC49vSS.gif)
![](gif3-link-here)
![](gif4-link-here)

## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 
- Hiding images: https://www.thesitewizard.com/css/hide-images-on-mobile-website.shtml#:~:text=The%20trick%20to%20hiding%20any,it%20from%20the%20document%20flow.
- Hiding images: https://www.w3schools.com/css/css_display_visibility.asp
- setInterval: https://developer.mozilla.org/en-US/docs/Web/API/setInterval
- clearInterval: https://developer.mozilla.org/en-US/docs/Web/API/clearInterval
- Local vs global variables: https://www.w3schools.com/js/js_scope.asp
- Math.random: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
- Math.round: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
- setTimeout: https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
- Audio: https://support.glitch.com/t/can-you-upload-music-to-glitch/34413/7
- Colors: https://www.w3.org/wiki/CSS/Properties/color/keywords
- innerHTML: https://www.w3schools.com/jsref/prop_html_innerhtml.asp
- Asynchronous functions: https://stackoverflow.com/questions/51007636/how-javascript-single-threaded-and-asynchronous
- Break: https://www.w3schools.com/tags/tag_br.asp 
- The audio for button 1 is from: freesound.org, by meku_a: https://freesound.org/people/meku_a/sounds/612806/
- The audio for button 2 is from: freesound.org, by Mike888: https://freesound.org/people/Mike888/sounds/214452/
- The secret winning gif is from: https://tenor.com/view/birthday-cat-birthday-cake-birthday-hbd-confetti-gif-13622483
- The losing gif is from: https://tenor.com/view/sad-cat-sad-cat-gif-19287788
- The picture for button 1 is from: https://www.nicepng.com/ourpic/u2q8r5t4u2r5q8e6_funny-cat-png-funny-cat-face-png/
- The picture for button 2 is from: Pixabay, https://pixabay.com/photos/british-shorthair-cat-pet-feline-3401683/
- The picture for button 3 is from: Pixabay, https://pixabay.com/photos/kittens-felines-pets-young-animals-2273598/
- The picture for button 4 is from: Pixabay, https://pixabay.com/photos/animal-cat-domestic-animal-isolated-3296309/
- The picture for button 5 is from: Pixabay, https://pixabay.com/photos/cat-kitten-cute-pet-animals-pair-3269765/
- The picture for button 6 is from: Pixabay, https://pixabay.com/photos/cat-face-close-up-view-eyes-1334970/


2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 

The most challenging part of this project was implementing the timer. I have mostly been working with C and Java, so it was a new learning experience to see how some functions JavaScript executed asynchronously. Initially, I thought that setInterval would not be executed until playSequence() was done executing within startGame(). This sequential execution is what I am familiar with. I wanted the timer to start only after all of the buttons had been pressed for the player, but I noticed that my startInterval call was being executed as soon as playSequence() began.

After researching more about how setTimeout and setInterval worked, reading different documentation about the functions and stack overflow posts, and placing different alert and console.log() statements to test what order the statements were being executed in, I realized that the program will continue executing code even after setInterval or setTimeout is called (at least until the given time has elapsed - at that point, it will then execute the given function passed in).

In order to solve this, I traced the code backwards starting from playSequence to find out what was causing this, and by examining the code more closely I realized that playSequence() also calls setTimeout, which is what I believe caused my timer to start going off at the same time. First I pseudocoded and sketched out my plan out because planning code before writing it out really helps me figure out where the potential problems could be. After experimenting with different solutions, I thought of a solution that would not change the order of execution of the setTimeout and setInterval calls, but instead work with it. I decided to have a variable that tracks "actual" time, which is hidden from the user and starts as soon as the game starts. After the actual time equals the delay time of holding the button and playing the sound, I start the player’s timer and decrement one second for the player every other call to elapseTime. This addresses the setInterval timer starting before playSequence finished its playback and “allows” the buttons to play before the player’s timer is displayed.


3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 

After reading about web-safe fonts, I was wondering whether this game itself would work well on another device like a phone, or another web browser. Because there are so many different browsers and devices that people want to view webpages on, how can web developers create and design web pages that are accessible and user friendly to as many people as possible? 

After trying to come up with a good theme and design for my game, I realized that I would have to add a lot more elements to make the game engaging for the user, also I had a large section that explained how the game worked, but then I realized this would probably lose the attention of the reader fast. How can web developers design and create websites that immediately catch the attention of the user and help them digest the large amount of information that is presented to them? 

Also, how do web developers organize user data such as emails and passwords, while protecting this data and preventing it from being leaked or compromised by buggy or malicious programs? While I wasn’t able to implement it I also thought about how I could make this a multiplayer game - given an invite code, a group of people could compete with each other by finishing the game as fast as possible. What tools do web developers use to make live web services that connect people online from all over the world to their website or game? Finally, what other languages and tools besides HTML and CSS can be used to create webpages? In what situations would you want to use other languages like Ruby or PHP over CSS and HTML? 
What are its downsides?


4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 

If I had a few more hours to work on this project, I would work more on the design of the game, such as adding more details to the timer. For example, as the timer approaches 5 seconds, I would want to turn the text red and animate the timer by having it pulsate to give it more impact. I would also change the design of the timer, making it have the shape of an hourglass. I would also want to add elevator music or some other audio while the timer is counting down to ease the player’s stress. I would also like to customize the cursor on the webpage to match the theme of my game (a hand to pet the cats). I also wanted to treat the images themselves as buttons, rather than embedding them into the button. 

While trying to come up with a solution for the timer, I read about Promises in Javascript. While I did not have time to try this implementation, I would want to use it to improve my implementation of the timer to have more control over the ordering of the execution of asynchronous functions, because my timer “hides” this issue from the player. I would also try to make my code more generalized and have less hard-coded numbers so that this game could be customized more easily by others, or to make it easier if I build on this project in the future.






## License

    Copyright na0135

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
