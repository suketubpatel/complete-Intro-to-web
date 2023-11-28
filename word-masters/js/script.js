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
            //console.log(currentLetter);
            //console.log(keyStrock);
            let wordMatched = matchWord();
            if (wordMatched) {                  // match the word
                lastRowLetter = currentLetter;
                keyStrock = 0;
                // do some css to make row green ********************

                // pass message you won the game
                alert("you won the game");
            } else {
                let isWord = isValidWord();          // check if it is a possible word
                if (isWord) {                // if word is valid
                    letterPossition();
                } else {
                    console.log("not a valid word");
                    // Do some css here **************************
                    return;         // do nothing 
                }
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

function letterPossition() {            // check the valid letters and its possitions

}

function matchWord(){
    console.log("inside");
    console.log(`currentWord: ${currentWord}`);
    console.log(`word: ${word}`);

    if (currentWord == word){
        console.log("same?: " + currentWord === word);
        return true;
    } else {
        return false;
    }
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

function isValidWord() {         // Check if current word is a valid word
    let wordObjectResponce;

    //console.log(validateWord);
    async function checkWord() {

        logo.style.visibility = "display";      // display spining object

        const res = await fetch("https://words.dev-apis.com/validate-word", {
            method: "POST",
            body: JSON.stringify({word: currentWord}),
        });
        wordObjectResponce = await res.json();

        logo.style.visibility = "hidden";       // hide spining object

        return wordObjectResponce.validWord;        // return if workd is valid or not
    }

    checkWord();            // check if word is valid with API data
}

function getWord() {                // Fetch the word from the API
    let word_of_the_day, word_of_the_day_random;
    
    const word_of_the_day_url = "https://words.dev-apis.com/word-of-the-day";
    const word_of_the_day_random_url = "https://words.dev-apis.com/word-of-the-day?random=1";

    async function fetchWord() {
        
        logo.style.visibility = "display";      // display spining object

        // fetch daily word
        const promise = await fetch(word_of_the_day_url);
        const promiseResponse = await promise.json();
        word_of_the_day = promiseResponse.word;
        word = word_of_the_day;
        console.log(`today's word: ${word_of_the_day}`);


        /*
        // fetch daily word
        const promise = await fetch(word_of_the_day_random_url);
        const promiseResponse = await promise.json();
        word_of_the_day_random = promiseResponse.word;
        console.log(word_of_the_day_random);
        word = word_of_the_day_random;
        console.log(`today's word: ${word_of_the_day_random}`);
        */

        logo.style.visibility = "hidden";       // hide spining object
    }
    
    fetchWord();        // Function call
    console.log(`today's word: ${word_of_the_day}`);
    //return word_of_the_day_random;
}

function init() {           // read key strok from keyboard on body element
    document
        .querySelector("body")
            .addEventListener("keydown", function(event) {
                keyPress(event.key);
            });

    getWord();              // fetch the wrod from API
    console.log(`word: ${word}`);
}

init();                     // run javascrip