//letters 
const letters = "abcdefghijklmnopqrstuvwxyz";

//get Array from letters
let lettersArray = Array.from(letters);

// select letters container 
let lettersContainer = document.querySelector(".letters");

// generate letters 
lettersArray.forEach(letter => {
    //create span
    let span = document.createElement("span");

    // create letter Next Node
    let tehLetter = document.createTextNode(letter);

    //append The letter to span
    span.appendChild(tehLetter);

    // add class to span
    span.className = 'letter-box';

    // append span to the letter container
    lettersContainer.appendChild(span);
});

// object of words + categories
const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"], 
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
}

// get random property
let allKeys = Object.keys(words);

// Random Number Depend On Key Length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

// Category
let randomPropName = allKeys[randomPropNumber];

// Category Words 
let randomPropValue = words[randomPropName];

// Random Number Depend On Words length
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// The Chosen Word
let randomValueValue = randomPropValue[randomValueNumber];

// set category info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Select Letters-guess Element
let letterGuessContainer = document.querySelector(".letter-guess");

// Convert Chosen Word To Array
let lettersAndSpaces = Array.from(randomValueValue);

// Create Spans Depended On Words 
lettersAndSpaces.forEach(letter => { 
    
    // Create Empty Span
    let emptySpan = document.createElement("span");

    // If Letter Is Space 
    if (letter === " ") {
        // Add Class To The Span
        emptySpan.className = "with-space";
    }

    //Append Span To The LetterGuessContainer
    letterGuessContainer.appendChild(emptySpan);
});
// Select Guess Spans 
let guessSpans = document.querySelectorAll(".letter-guess span");

// set wrong attempts
let wrongAttempts = 0;

// select the draw element
let theDraw = document.querySelector(".hangman-draw");

// Handel Clicked On Letters
document.addEventListener("click", (e) => {
    // Set Teh Chose Status
    let theStatus = false;
    if (e.target.className === "letter-box") {
        e.target.classList.add("clicked");
        // Get Clicked Letter
        let theClickedLetter = e.target.innerHTML.toLowerCase();
        // the Chosen word
        let theChosenWord = Array.from(randomValueValue.toLowerCase());
        theChosenWord.forEach((wordLetter, wordIndex) => { 
            // if the clicked 
            if (theClickedLetter === wordLetter) {
                // set status to correct
                theStatus = true;
                // Loop On All Guess Spans 
                guessSpans.forEach((span, spanIndex) => {
                    if (wordIndex === spanIndex) {
                        span.innerHTML = theClickedLetter;
                    }
                });
            }
        });
        // Outside Loop
        
        //if letter is wrong 
        if (theStatus !== true) {
            // increase the wrong attempts
            wrongAttempts++;
            // add wrong on the draw element
            theDraw.classList.add(`wrong-${wrongAttempts}`);
            
            // play fail sound
            document.getElementById("fail").play();
            if (wrongAttempts === 8) {
                endGame();
                lettersContainer.classList.add("finished");
            }
        } else {
            // play success sound
            document.getElementById("success").play();
        }
    }
});
// End Game Function
function endGame() { 

    // Create Popup  Div
    let div = document.createElement("div");

    // Create Text 
    let divText = document.createTextNode(`Game Over , The Word IS ${randomValueValue}`);

    // Append Text to div
    div.appendChild(divText);

    // Add Class On Div
    div.className = "popup";
    
    // Append To The Body
    document.body.appendChild(div);

}
function endGameSuccess() {
    // Create Popup  Div
    let divSuccess = document.createElement("div");
    // Create Text
    let divSuccessText = document.createTextNode(`You Win, The Word IS ${randomValueValue}`);
    // Append Text to div
    divSuccess.appendChild(divSuccessText);
    // Add Class On Div
    divSuccess.className = "popup-success";
        // Append To The Body
    document.body.appendChild(divSuccess);
}