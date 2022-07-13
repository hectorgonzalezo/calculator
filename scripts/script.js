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

function power(a, b) {
    return a ** b
};


//function that takes two numbers and an operator
//and calls the relevant function from above
// String Int Int -> Int
function operate(operator, stringNum1, stringNum2) {
    //convert to Floats
    let num1 = parseFloat(stringNum1);
    let num2 = parseFloat(stringNum2)
    console.log(operator)
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
                display.innerText = "Can't divide by zero!";
                return "Can't divide by zero!"
            } else {
                return divide(num1, num2)
            }
        case '**':
            return power(num1, num2)
        case '^':
            return power(num1, num2)
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

const maximumDisplayLength = 16

//updates display when clicking on number or "." buttons
function populateDisplay(number) {
    //limit the number of digits to 10, and stop adding zeroes at first
    if (displayValue.toString().length <= maximumDisplayLength && !(number == '0' && displayValue == '')) {
        if (operatorJustPressed) {//if an operator is pressed clear the display
            displayValue = number;
            operatorJustPressed = false;
        } else if (equalsJustPressed) {
            displayValue = number;
        } else {
            displayValue += number
        }    
        equalsJustPressed = false;
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
    currentOperator = '';//restart operator to string together several operations
    operatorJustPressed = true;
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

function callOperateFromButton(operator) {

    operatorJustPressed = true;

    if (currentOperator != '') {//string together operations
        let result = operate(currentOperator, previousNumber, displayValue)
        displayResult(result)
    }
    previousNumber = displayValue;
    currentOperator = operator;
}

function callEquals () {
if (currentOperator != '') {//so that equals only works once
    let result = operate(currentOperator, previousNumber, displayValue);
    //if user didn't try to divide by 0
    if (result != "Can't Divide by 0!") {
        displayResult(result);
    };
    equalsJustPressed = true;
}
}

function callDelete () {
    if (displayValue.length > 1) {
        displayValue = displayValue.substring(0, displayValue.length - 1);
        display.innerText = displayValue;
    } else if (displayValue.length == 1) {
        displayValue = ''
        display.innerText = displayValue;
    }
}


//adds previous function to number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', (e) => populateDisplay(e.target.innerText));
    equalsJustPressed = false;
});



//store number when pressing an operator
//and save which operator has been used
operatorButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        callOperateFromButton(e.target.innerText)
    })
});



//use operate function with '=' button
equalsButton.addEventListener('click', (e) => callEquals())


//wipe data with "clear" button
clearButton.addEventListener('click', (e) => clearData())


//add a dot to result, but only if there no previous dot
// 35.55 not 35.55.5.5
dotButton.addEventListener('click', (e) => {
    //if there's a button in display
    if (!displayValue.includes('.')) {
        populateDisplay('.')
    }
})

//delete button erases last number in display
deleteButton.addEventListener('click', (e) => callDelete())



//keyboard support
//listen to every keystroke on keyboard
//Equals can be called either with "=" key or enter.
//Delete with backspace
//clear with letter "c"
//numbers and operators work as intended
document.addEventListener('keydown', (e) => {
    const key = e.key;
    console.log(key)
    switch (true) {
        case /\d/.test(key)://if pressing a digit
            populateDisplay(key)
            break
        case key == '.':
            dotButton.click()
            break
        //if pressing an operator
        case /[+-]/.test(key) || key == '*' || key == "/" || key == "^":
            callOperateFromButton(key)
            break
        case /=/.test(key) || key == 'Enter':
            callEquals()
            break
        case key == 'Backspace':
            callDelete();
            break;
        case key == 'c':
            clearData();
            break;
        default:
            break
    }
})
//if its a number or operator, press that button

