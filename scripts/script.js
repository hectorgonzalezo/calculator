//basic operator functions
function add (a, b) {
    return a + b
};

function subtract (a,b) {
    return a - b
};

function sum (arr) {
    return arr.reduce((a,b) => a + b, 0)
};

function multiply(a, b) {
    return a * b
};

function divide(a, b) {
    return a / b
}

const power = function(a, b) {
    return a ** b
};

const factorial = function(num) {
    let result = 1;
    for (let i = 1; i <= num; i++) {
        result *= i
    }
    return result
};

//function that takes two numbers and an operator
//and calls the relevant function from above
// String Int Int -> Int
function operate (operator, stringNum1, stringNum2){
    //convert to integers
    let num1 = parseInt(stringNum1);
    let num2 = parseInt(stringNum2)
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2)
        case '/':
            return divide(num1, num2)
        default:
            break   
    }
}


const numberButtons = document.querySelectorAll('.number-button')
const operatorButtons = document.querySelectorAll('.operator-button')
const display = document.querySelector('#display')
const equalsButton = document.querySelector('#equals-button')
let displayValue = ''
let previousNumber = 0
let currentOperator = ''
let operatorJustPressed = false
let equalsJustP

//updates display when clicking on number buttons
function populateDisplay (number) {
//limit the number of digits to 10, and stop adding zeroes at first
    if (displayValue.length <= 10 && !(number == '0' && displayValue == '')) {
    if(operatorJustPressed){//if an operator is pressed clear the display
        displayValue = number
        operatorJustPressed = false;
    } else {
    displayValue += number
    }
    display.innerText = displayValue
    }
};

//adds previous function to number buttons
numberButtons.forEach(button=> {
    button.addEventListener('click', (e) => populateDisplay(e.target.innerText))
});



//store number when pressing an operator
//and save which operator has been used
operatorButtons.forEach(button => {
    button.addEventListener('click', (e) => {

        operatorJustPressed = true;

        if (currentOperator != ''){//string together operations
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
    let result = operate(currentOperator, previousNumber, displayValue)
    displayResult(result)
    }
})

function displayResult(result) {
    let numberLength = result.toString().length;
    let numberDecimalLength = Math.floor(result).toString.length;
    if (numberLength >= 10){//round long numbers
        result = result.toFixed(10-numberDecimalLength-1);
    };

    displayValue = result;
    display.innerText = result;
    currentOperator = ''//restart operator to string together several operations
    operatorJustPressed = true
}

