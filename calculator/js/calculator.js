let display = document.querySelector(".display");
let result = null;
let arr = [];

let toDisplay = display.innerText;

let allButtons = document.querySelector(".all-buttons");

// Read if number clicked or signs clicked and call according function.
allButtons.addEventListener("click", function(event) {
    let currentValue = event.target.innerText;

    if(isNaN(currentValue)) {   // if sign is clicked
        if (currentValue == "←" && (toDisplay.length >= 1)) {   // When ← clicked and can errese
            toDisplay = toDisplay.slice(0, -1);
            display.innerText = toDisplay;
        } else if (currentValue == "←" && (toDisplay.length == 0)) {    // When ← clicked with zero length
            toDisplay = 0;
            display.innerText = toDisplay;
        } else {
                isNotNum(currentValue);     // Accepet the display value for futher calculation
        }
    } else {
        isNum(currentValue);        // if numeric key is pressed
    }
});

function isNum(num) {       // if it is number display in display
    if(toDisplay == "0" && num == 0){
        // Do nothing
    } else {
        if(toDisplay == "0"){
            toDisplay = num;
        } else {
            toDisplay += num;
        }
    }
    
    display.innerText = toDisplay;
}


function isNotNum(sign) {

    let tempValue = parseInt(toDisplay);      // Read current display value as integer

    arr.push(tempValue);        // push display value to array

    display.innerText = 0;

    if(sign != "=") {
        if (sign == "C"){       // To clear every thing
            console.log("in c");
            toDisplay = 0;
            tempValue = 0;
            result = null;
            arr = [];
        } else {
            arr.push(sign);     // else push sign to array
        }
    } else {
        calculate();            // Calculation logic
        display.innerText = result;     // Display result
        arr = [];               // Clear array
    }
    
    toDisplay = 0;      
}

function calculate() {
    let oldVal;
    if (result == null) {
        oldVal = arr[0];        // get first array value into oldvalue
    } else {
        oldVal = result;        // get result as old value
    }

    let oldSign = arr[1];       // get the last pressed sign to perform calucation on

    for(let i = 2; i < arr.length; i++) {   // Start loop at position 2 because 0 and 1 is read
        let val;
        let sign;

        if((i % 2) == 0) {      // read the numbers from array
            val = arr[i];
        }

        if((i % 2) == 1) {      // read the signs from array
            sign = arr[i];
        }

        if(oldSign == "+") {            // calculation based on older sign
            oldVal += val;
        } else if(oldSign == "-") {
            oldVal -= val;
        } else if(oldSign == "x") {
            oldVal *= val;
        } else if(oldSign == "÷") {
            oldVal /= val;
        }


        oldSign = sign;             // current sign as older sign
    }

    result = oldVal;                // old value to result
}