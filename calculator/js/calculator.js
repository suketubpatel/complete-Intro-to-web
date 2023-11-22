let display = document.querySelector(".display");
let result = null;
let arr = [];

let toDisplay = display.innerText;

let allButtons = document.querySelector(".all-buttons");

// Read if number clicked or signs clicked and call according function.
allButtons.addEventListener("click", function(event) {
    let currentValue = event.target.innerText;

    if(isNaN(currentValue)) {
        if (currentValue == "←" && (toDisplay.length >= 1)) {
            toDisplay = toDisplay.slice(0, -1);
            display.innerText = toDisplay;
        } else if (currentValue == "←" && (toDisplay.length == 0)) {
            toDisplay = 0;
            display.innerText = toDisplay;
        } else {
                    isNotNum(currentValue);
        }
    } else {
        isNum(currentValue);
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
    //console.log(`tempValue: ${tempValue}`);

    arr.push(tempValue);

    display.innerText = 0;

    if(sign != "=") {
        if (sign == "C"){
            console.log("in c");
            toDisplay = 0;
            tempValue = 0;
            result = null;
            arr = [];
        } else {
            arr.push(sign);
        }
    } else {
        calculate();
        display.innerText = result;
        arr = [];
    }
    
    toDisplay = 0;
}

function calculate() {
    let oldVal;
    if (result == null) {
        oldVal = arr[0];
    } else {
        oldVal = result;
    }

    let oldSign = arr[1];

    //console.log(oldSign);

    for(let i = 2; i < arr.length; i++) {
        //console.log(arr[i]);
        let val;
        let sign;

        if((i % 2) == 0) {
            val = arr[i];
        }

        if((i % 2) == 1) {
            sign = arr[i];
        }

        if(oldSign == "+") {
            oldVal += val;
        } else if(oldSign == "-") {
            oldVal -= val;
        } else if(oldSign == "x") {
            oldVal *= val;
        } else if(oldSign == "÷") {
            oldVal /= val;
        }


        oldSign = sign;
    }

    result = oldVal;
    console.log("Result: " + result);
    //console.log("Array length: " + arr.length);
}