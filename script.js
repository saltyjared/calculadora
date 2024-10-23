function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, operation) {
    return operation(a, b);
}

const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const equalButton = document.querySelector('.equal');
const clearButton = document.querySelector('.clear');
const negateButton = document.querySelector('.negate');
const percentButton = document.querySelector('.percent');

let displayValue = 0;

function appendDisplay(num) {
    display.textContent += num;
    displayValue = display.textContent;
    return displayValue;
}


function clearDisplay() {
    display.textContent = ''
}

function negateDisplay() {
    if (display.textContent[0] === '-') {
        display.textContent[0] = ''
    } else {
        display.textContent[0] = '-'
    }
}

numberButtons.forEach((button) => {
    button.addEventListener('click', () => appendDisplay(button.textContent));
})

clearButton.addEventListener('click', () => clearDisplay());

negateButton.addEventListener('click', () => negateDisplay());

equalButton.addEventListener('click', () => {

})
