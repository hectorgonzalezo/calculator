//basic operator functions
function add(a, b) {
    return a + b
};

function subtract(a, b) {
    return a - b
};

function sum(arr) {
    return arr.reduce((a, b) => a + b, 0)
};

function multiply(a, b) {
    return a * b
};

function divide(a, b) {
    return a / b
}

const power = function (a, b) {
    return a ** b
};

const factorial = function (num) {
    let result = 1;
    for (let i = 1; i <= num; i++) {
        result *= i
    }
    return result
};

//function that takes two numbers and an operator
//and calls the relevant function from above
// String Int Int -> Int
function operate(operator, stringNum1, stringNum2) {
    //convert to Floats
    let num1 = parseFloat(stringNum1);
    let num2 = parseFloat(stringNum2)
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2)
        case '/':
            //if user is trying to dive by 0
            if (stringNum1 == '0' || stringNum2 == '0') {
                currentOperator = '';//so that equals doesn't try to display result
                display.innerText = "Cant divide by zero!";
                return 'divide by 0'
            } else {
                return divide(num1, num2)
            }
        default:
            break
    }
}


const numberButtons = document.querySelectorAll('.number-button')
const operatorButtons = document.querySelectorAll('.operator-button')
const display = document.querySelector('#display')
const equalsButton = document.querySelector('#equals-button')
const clearButton = document.querySelector('#clear-button')
const deleteButton = document.querySelector('#delete-button')
const dotButton = document.querySelector('#dot-button')

//initializes values used by functions
let displayValue = '';
let previousNumber = 0;
let currentOperator = '';
let operatorJustPressed = false;
let equalsJustPressed = false;

const maximumDisplayLength = 15

//updates display when clicking on number or "." buttons
function populateDisplay(number) {
    //limit the number of digits to 10, and stop adding zeroes at first
    if (displayValue.toString().length <= maximumDisplayLength && !(number == '0' && displayValue == '')) {
        if (operatorJustPressed) {//if an operator is pressed clear the display
            displayValue = number;
            operatorJustPressed = false;
        } else if (equalsJustPressed) {
            displayValue = number;
            equalsJustPressed = false;
        } else {
            displayValue += number
        }
        display.innerText = displayValue

    }
};

//Updates display when clicking on operator or "=" buttons
function displayResult(result) {
    //round long numbers, limit to 10 digits
    let numberLength = result.toString().length;
    let numberDecimalLength = Math.floor(result).toString.length;
    if (numberLength >= maximumDisplayLength) {
        result = result.toFixed(maximumDisplayLength - numberDecimalLength - 1);
    };
    //display result
    displayValue = result;
    display.innerText = result;
    currentOperator = ''//restart operator to string together several operations
    operatorJustPressed = true
}

//reinitialize values used by calculator functions
function clearData() {
    displayValue = '';
    previousNumber = 0;
    currentOperator = '';
    operatorJustPressed = false;
    equalsJustPressed = false;

    displayResult('')
}


//adds previous function to number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', (e) => populateDisplay(e.target.innerText))
});



//store number when pressing an operator
//and save which operator has been used
operatorButtons.forEach(button => {
    button.addEventListener('click', (e) => {

        operatorJustPressed = true;

        if (currentOperator != '') {//string together operations
            let result = operate(currentOperator, previousNumber, displayValue)
            displayResult(result)
        }
        previousNumber = displayValue;
        currentOperator = e.target.innerText;
    })
});


//use operate function with '=' button
equalsButton.addEventListener('click', (e) => {
    if (currentOperator != '') {//so that equals only works once
        let result = operate(currentOperator, previousNumber, displayValue);
        //if user didn't try to divide by 0
        if (result != 'divide by 0') {
            displayResult(result);
        };
        equalsJustPressed = true;
    }
})


//wipe data with "clear" button
clearButton.addEventListener('click', (e) => clearData())


//add a dot to result, but only if there no previous dot
// 35.55 not 35.55.5.5
dotButton.addEventListener('click', (e) => {
    //if there's a button in display
    if (!displayValue.includes('.')) {
        populateDisplay(e.target.innerText)
    }
})