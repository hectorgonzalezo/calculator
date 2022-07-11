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
function operate (operator, num1, num2){
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
