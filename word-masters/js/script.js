const rows = 6, columns = 5;
const logo = document.querySelector(".hidden");         // spining object div
const btn = document.querySelector(".btn-container");      // button to play again


async function init() {           // read key strok from keyboard on body element
    
let word;
let currentLetter = 0;
let keyStrock = 0;
let lastRowLetter = 0;
let currentWord = "";
let letterArray = [];
let displayLetter;
let currentRowNum = 1;
let currentRow;

    document
    .querySelector("body")
        .addEventListener("keydown", function(event) {
            keyPress(event.key);
        });

    let word_of_the_day, word_of_the_day_random;
    const word_of_the_day_url = "https://words.dev-apis.com/word-of-the-day";
    const word_of_the_day_random_url = "https://words.dev-apis.com/word-of-the-day?random=1";

        logo.style.visibility = "display";      // display spining object

        // fetch daily word
        const promise = await fetch(word_of_the_day_url);
        const promiseResponse = await promise.json();
        word_of_the_day = promiseResponse.word;
        word = word_of_the_day;
        console.log(word);

        /*
        // fetch daily word
        const promise = await fetch(word_of_the_day_random_url);
        const promiseResponse = await promise.json();
        word_of_the_day_random = promiseResponse.word;
        word = word_of_the_day_random;
        console.log(word);
        */

        logo.style.visibility = "hidden";       // hide spining object
            

    async function keyPress(value){
        
        logo.style.visibility = "display";      // display spining object

        console.log(`current row num: ${currentRowNum}`);

        let isLetter = checkLetter(value);

        //console.log(keyStrock);
        if (keyStrock == 5) {                       // if at the end of each row
            
            if (value == "Enter") {                 // if user has pressed enter
                
                console.log(currentWord);
                console.log(`current row num: ${currentRowNum}`);
                console.log(".row-" + currentRowNum + " > *");

                currentRow = document.querySelector(".row-" + currentRowNum);     // css to current row

                if (!matchWord()) {        // matched the word
                    
                    const res = await fetch("https://words.dev-apis.com/validate-word", {
                        method: "POST",
                        body: JSON.stringify({word: currentWord}),
                    });
                    let responce = await res.json();


                    let isValidWord = responce.validWord;       // read the validword value

                    if(isValidWord) {
                        let storage = [];

                        console.log(`currentLetter: ${currentLetter}`);

                        for (let i = 0; i < word.length; i++) {
                            const char = word[i];       // get current charecter from word

                            if(currentWord.includes(char)) {
                                console.log("i: " + i);
                                storage.push([currentWord.indexOf(char), char]);
                            }
                        }

                        for (let i = 0; i < storage.length; i++) {
                            console.log(storage[i][0] + " " + storage[i][1]);
                            const char = currentWord[i];

                            let letter;
                            if (char == storage[i][1]) {
                                letter = document.querySelector("#letter-" + ((currentLetter - 5) + i));
                                letter.style.backgroundColor = "orange";
                            } else {
                                letter = document
                                    .querySelector("#letter-" + ((currentLetter - 5) + storage[i][0]));
                                letter.style.backgroundColor = "gray";
                            }
                        }

                        if(currentRowNum == 6) {
                            alert("Oops! You lost the game.");
                            btn.style.visibility = "visible";
                        }
                        // allow to re-enter into current row following two statements
                        lastRowLetter = currentLetter;
                        keyStrock = 0;
                    } else {
                        return;     // do nothing
                    }

                    currentWord = "";       // clear the current word

                    currentRowNum++;        // increase the number of current row

                    
                    return;
                } else {
                    
                    // Colour the letters green to show this row is correct and matched
                    if(currentRow.className.indexOf("row-" + currentRowNum) > -1) {
                        
                        for(let i = currentLetter - 1; i >= (currentLetter - 5); i--){
                            let letter = document.querySelector("#letter-" + i);
                            letter.style.backgroundColor = "green";
                            letter.style.color = "white";
                        }
                    }
                    
                    alert("Congratulations! You won the game.");
                    btn.style.visibility = "visible";
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
        
        logo.style.visibility = "hidden";       // hide spining object
    }

    
    function matchWord(){
        if (currentWord == word){        // if matched return true
            currentWord = "";
            return true;
        }
        return false;                    // else return false
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
}

init();                     // run javascrip

function playAgain(){       // replay the game
    console.log("Clicked");
    location.reload(true);
}