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
    if (b === 0) {
        return 'Error'
    }
    
    return a / b;
}

const operations = {
    'add': add,
    'subtract': subtract,
    'multiply': multiply,
    'divide': divide
};

const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const equalButton = document.querySelector('.equal');
const clearButton = document.querySelector('.clear');
const negateButton = document.querySelector('.negate');
const percentButton = document.querySelector('.percent');

let number1 = 0;
let number2 = 0;
let operation = null;
let operationPressed = false;
let equalsPressed = false;

const MAX_DISPLAY_LENGTH = 8;

function appendDisplay(num) {
    if (operationPressed || equalsPressed) {
        operationPressed = false;
        equalsPressed = false;
        display.textContent = '';
    }

    if (display.textContent.length < MAX_DISPLAY_LENGTH) {
        if (num === '.' && display.textContent.includes('.')) {
            return;
        }
        display.textContent += num;
    }
}

function pressOperation(oper) {
    number1 = parseFloat(display.textContent);
    const operationName = oper.split(' ')
        .find(name => operations.hasOwnProperty(name));
    operation = operations[operationName];
    operationPressed = true;
} 

function clearDisplay() {
    display.textContent = '';
    number1 = 0;
    number2 = 0;
    operation = null;
    operationPressed = false;
} 

function negateNumber() {
    if (display.textContent) {
        display.textContent = (-parseFloat(display.textContent)).toString();
    }
}

function percentNumber() {
    if (display.textContent) {
        display.textContent = (parseFloat(display.textContent) / 100).toString();
    }
}

function getDecimalPlaces(num) {
    const decimals = num.toString().split('.')[1];
    return decimals ? decimals.length : 0;
}

function operate() {
    if (!operation) return;
    number2 = parseFloat(display.textContent);
    const num1DecPlaces = getDecimalPlaces(number1);
    const num2DecPlaces = getDecimalPlaces(number2);
    const result = operation(number1, number2).toFixed(Math.max(num1DecPlaces, num2DecPlaces));
    display.textContent = result;
    number1 = result;
    operation = null;
    equalsPressed = true;
}

numberButtons.forEach((button) => {
    button.addEventListener('click', () => appendDisplay(button.textContent));
})

clearButton.addEventListener('click', clearDisplay);

operationButtons.forEach((button) => {
    button.addEventListener('click', () => pressOperation(button.className));
})

negateButton.addEventListener('click', negateNumber);

percentButton.addEventListener('click', percentNumber);

equalButton.addEventListener('click', operate);

function updateTime() {
    const timeDiv = document.querySelector('.time');
    const now = new Date();
    
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    // Format in 12-hour time with AM/PM
    let displayHours = hours % 12;
    displayHours = displayHours ? displayHours : 12; // Convert 0 to 12
    
    timeDiv.textContent = `${displayHours}:${minutes}`;
}

updateTime();
setInterval(updateTime, 1000);

// To-do: add keyboard support