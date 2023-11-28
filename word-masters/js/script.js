let word;
let currentLetter = 0;
let keyStrock = 0;
let lastRowLetter = 0;
let currentWord = "";
let letterArray = [];
let displayLetter;

const rows = 6, columns = 5;

const logo = document.querySelector(".hidden");         // spining object div


function keyPress(value){
    
    let isLetter = checkLetter(value);

    //console.log(keyStrock);
    if (keyStrock == 5) {                       // if at the end of each row
        
        if (value == "Enter") {                 // if user has pressed enter
            console.log(currentLetter);
            console.log(keyStrock);
            if (matched = matchWord()) {        // match the word
                lastRowLetter = currentLetter;
                keyStrock = 0;
            } else {
                return;
            }
        } else if (value == "Backspace") {      // only backspace allowed
            backSpace();
        } else {
            return;
        }
        
    } else if (value == "Backspace" && currentLetter > lastRowLetter) {         // delete last letter
        backSpace();
    } else if (isLetter && currentLetter < 30) {                                // write letter
        addLetter(value);
    }
}

function matchWord(){
    console.log(currentWord);
    for (let i = 0; i < letterArray.length; i++) {
        console.log(`${i}: ${letterArray[i]}`);
        //let block = document.querySelector("#letter-" + i);
        //block.style.backgroundColor = "green";
    }
    currentWord = "";
    return true;
}

function backSpace() {
    currentLetter--;
    keyStrock--;
    displayLetter  = document.querySelector(`#letter-${currentLetter}`);

    displayLetter.innerText = "";
    displayLetter.style.boxShadow = "2px 2px 4px #000000";
    displayLetter.style.backgroundColor = "#FFFFFF";

    currentWord = currentWord.substring(0, currentWord.length - 1);
    letterArray.pop();
}

function addLetter(value) {
    displayLetter  = document.querySelector(`#letter-${currentLetter}`);

    displayLetter.innerText = value.toUpperCase();
    displayLetter.style.boxShadow = "2px 2px 4px #000000 inset";
    displayLetter.style.backgroundColor = "#F0F8FF";
    currentLetter++;
    keyStrock++;

    currentWord += value;
    letterArray.push(value);
}

function checkLetter(letter) {
    return /^[a-zA-ZEnter]$/.test(letter);
}

function getWord() {                // Fetch the word from the API
    let word_of_the_day, word_of_the_day_random;
    
    const word_of_the_day_url = "https://words.dev-apis.com/word-of-the-day";
    const word_of_the_day_random_url = "https://words.dev-apis.com/word-of-the-day?random=1";

    async function fetchWord() {
        // add hiddent log css here
        logo.style.visibility = "display";      // display spining object

        // fetch daily word
        const promise = await fetch(word_of_the_day_url);
        const promiseResponse = await promise.json();
        word_of_the_day = promiseResponse.word;

        /*
        // fetch daily word
        const promise = await fetch(word_of_the_day_random_url);
        const promiseResponse = await promise.json();
        word_of_the_day_random = promiseResponse.word;
        console.log(word_of_the_day_random);
        */

        logo.style.visibility = "hidden";       // hide spining object
        console.log(word_of_the_day);
    }
    
    fetchWord();        // Function call
    return word_of_the_day;
    //return word_of_the_day_random;
}

function init() {           // read key strok from keyboard on body element
    document
        .querySelector("body")
            .addEventListener("keydown", function(event) {
                keyPress(event.key);
            });

    word = getWord();              // fetch the wrod from API
}

init();                     // run javascrip