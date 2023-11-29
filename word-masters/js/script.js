const rows = 6, columns = 5;
const logo = document.querySelector(".hidden");         // spining object div
const btnContainer = document.querySelector(".btn-container");      // button container to play again
const btn = document.querySelector(".btn");
const header = document.querySelector("#heading");
const head = document.querySelector("#head");


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

        /*
        // fetch daily word
        const promise = await fetch(word_of_the_day_url);
        const promiseResponse = await promise.json();
        word_of_the_day = promiseResponse.word;
        word = word_of_the_day;
        console.log(word);
        */
        
        // fetch daily word
        const promise = await fetch(word_of_the_day_random_url);
        const promiseResponse = await promise.json();
        word_of_the_day_random = promiseResponse.word;
        word = word_of_the_day_random;
        //console.log(word);
        

        logo.style.visibility = "hidden";       // hide spining object
            

    async function keyPress(value){

        //console.log(`current row num: ${currentRowNum}`);

        let isLetter = checkLetter(value);

        //console.log(keyStrock);
        if (keyStrock == 5) {                       // if at the end of each row
            
            if (value == "Enter") {                 // if user has pressed enter
                
                //console.log(currentWord);
                //console.log(`current row num: ${currentRowNum}`);
                //console.log(".row-" + currentRowNum + " > *");

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
                        storage = findChars(word, currentWord);     // check for common characters

                        //console.log(`currentLetter: ${currentLetter}`);
                        
                        //console.log(`storage length ${storage.length}`);
                        //console.log(`storage array: ${storage}`);
                        colorChars(word, storage);           // Color the charecters
                        
                        // do some css here *********************************
                        if(currentRowNum == 6) {
                            header.innerHTML = "Oops! You lost the game";
                            header.classList.add("lost");
                            btn.style.backgroundColor = "red";

                            const span = document.createElement("span");
                            const spanText = word;
                            const spanContent = document.createTextNode(spanText);
                            span.appendChild(spanContent);

                            console.log(span);
                            
                            const p = document.createElement("p");
                            const message = "The correct answer was - ";
                            const content = document.createTextNode(message);
                            p.appendChild(content);
                            p.appendChild(span);
                            head.appendChild(p);

                            btnContainer.style.visibility = "visible";
                        }
                        // allow to re-enter into current row following two statements
                        lastRowLetter = currentLetter;
                        keyStrock = 0;
                    } else {
                        // do some css here for wrong  *****************************
                        makeWrongStyle();
                        
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
                    
                    // do some css here *************************************
                    //alert("Congratulations! You won the game.");
                    header.innerHTML = "Congratulations! You won the game";
                    header.classList.add("won");
                    btnContainer.style.visibility = "visible";
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

    function makeWrongStyle() {             // css style to show wrong word
        for(let i = currentLetter - 1; i >= (currentLetter - 5); i--){
            let letter = document.querySelector("#letter-" + i);
            
            letter.classList.add("wrong");
        }
    }

    function removeWrongStyle() {           // remove css style for wrong word if exists
        for(let i = currentLetter - 1; i >= (currentLetter - 5); i--){
            let letter = document.querySelector("#letter-" + i);
            
            if (letter.classList.contains("wrong"))
                letter.classList.remove("wrong");
            else
                return;
        }
    }

    function colorChars(str, arr) {             // colour the charectors accordingly
        let letter;
        let leftLocations = [0,1,2,3,4];

        for (let i = 0; i < arr.length; i++) {
            let arrIndex = arr[i][0];       
            let arrChar = arr[i][1];

            if (str.charAt(arrIndex) === arrChar) {         // if char at right position make it green
                letter = document.querySelector("#letter-" + ((currentLetter - 5) + arrIndex));
                letter.style.backgroundColor = "green";
            } else {
                letter = document           // if char is in string but wrong position make it orange
                    .querySelector("#letter-" + ((currentLetter - 5) + arrIndex));
                letter.style.backgroundColor = "orange";
            }
            
            // 
            for (let j = 0; j < leftLocations.length; j++) {
                //console.log(`j: ${j}`);
                //console.log(`leftLocation: ${leftLocations[j]}`);
                if(leftLocations[j] === arrIndex) {
                    //console.log(`Deleting: ${j}`);
                    delete leftLocations[j];
                    //spliceArray = leftLocations.splice(j);
                } 
            }
        }

        colorGray(leftLocations);       // Make color Gray the charechter icons
       
    }

    function colorGray(leftLocations) {     
        
        for (let i = 0; i < leftLocations.length; i++) {    // 
            if (leftLocations[i] === i) {
                //console.log(`toGray: ${i}`);
                let letter = document           // if char is in string but wrong position make it orange
                    .querySelector("#letter-" + ((currentLetter - 5) + i));
                letter.style.backgroundColor = "gray";
            }
        }

    }
    function findChars(str1, str2) {        // find common charecters in both string with location
        
        let chars = [];
        let commonChars = "";

        for(let i = 0; i < str1.length; i++) {
            if (commonChars.indexOf(str1[i]) === -1) {      // current word char is not in commonChar
                for (let j = 0; j < str2.length; j++) {
                    if (str2.substring(j, j + 1) == str1[i]) {
                        chars.push([j, str2[j]]);
                        commonChars += str2[j];
                    }
                }
            }
        }

        return chars;
    }

    function matchWord(){
        if (currentWord == word){        // if matched return true
            currentWord = "";
            return true;
        }
        return false;                    // else return false
    }

    function backSpace() {
        removeWrongStyle();             // remove wrong color style if exists

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