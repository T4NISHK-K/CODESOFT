// DOM Elements
const previousOperand = document.getElementById('previous-operand');
const currentOperand = document.getElementById('current-operand');
const themeToggle = document.querySelector('.theme-toggle');

// Calculator state
let calculator = {
    currentOperand: '20,810',
    previousOperand: '4,900 + 15,910',
    operation: undefined,
    resetScreen: false
};

// Initialize theme from local storage or default to light
let isDarkTheme = localStorage.getItem('darkTheme') === 'true';
if (isDarkTheme) {
    document.body.classList.add('dark-theme');
}

// Toggle between themes
function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('darkTheme', isDarkTheme);
}

// Format number with commas
function formatNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    
    let integerDisplay;
    if (isNaN(integerDigits)) {
        integerDisplay = '';
    } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    
    if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
    } else {
        return integerDisplay;
    }
}

// Update the display
function updateDisplay() {
    currentOperand.innerText = calculator.currentOperand;
    
    if (calculator.operation != null) {
        previousOperand.innerText = `${calculator.previousOperand} ${calculator.operation}`;
    } else {
        previousOperand.innerText = calculator.previousOperand;
    }
}

// Append a number to the current operand
function appendNumber(number) {
    // If we just performed a calculation, reset the screen
    if (calculator.resetScreen) {
        calculator.currentOperand = '';
        calculator.resetScreen = false;
    }
    
    // Don't allow multiple decimal points
    if (number === '.' && calculator.currentOperand.includes('.')) return;
    
    // Replace the initial 0 unless it's a decimal point
    if (calculator.currentOperand === '0' && number !== '.') {
        calculator.currentOperand = number;
    } else {
        // Remove commas before adding new digit
        let currentWithoutCommas = calculator.currentOperand.replace(/,/g, '');
        currentWithoutCommas += number;
        calculator.currentOperand = formatNumber(currentWithoutCommas);
    }
    
    updateDisplay();
}

// Append an operator
function appendOperator(op) {
    // Don't allow operator if current operand is empty
    if (calculator.currentOperand === '') return;
    
    // If we already have an operation, compute the result first
    if (calculator.operation !== undefined) {
        calculate();
    }
    
    // Set the operation and move current to previous
    calculator.operation = op;
    calculator.previousOperand = calculator.currentOperand;
    calculator.currentOperand = '';
    
    updateDisplay();
}

// Clear the display
function clearDisplay() {
    calculator.currentOperand = '0';
    calculator.previousOperand = '';
    calculator.operation = undefined;
    updateDisplay();
}

// Toggle sign (+/-)
function toggleSign() {
    let currentWithoutCommas = calculator.currentOperand.replace(/,/g, '');
    
    if (currentWithoutCommas === '0') return;
    
    if (currentWithoutCommas.startsWith('-')) {
        calculator.currentOperand = formatNumber(currentWithoutCommas.substring(1));
    } else {
        calculator.currentOperand = '-' + formatNumber(currentWithoutCommas);
    }
    
    updateDisplay();
}

// Calculate percentage
function calculatePercent() {
    let currentWithoutCommas = calculator.currentOperand.replace(/,/g, '');
    
    const current = parseFloat(currentWithoutCommas);
    if (isNaN(current)) return;
    
    calculator.currentOperand = formatNumber(current / 100);
    updateDisplay();
}

// Perform the calculation
function calculate() {
    // Convert strings to numbers (remove commas first)
    const prevWithoutCommas = calculator.previousOperand.replace(/,/g, '');
    const currentWithoutCommas = calculator.currentOperand.replace(/,/g, '');
    
    const prev = parseFloat(prevWithoutCommas);
    const current = parseFloat(currentWithoutCommas);
    
    // Check if both operands are valid numbers
    if (isNaN(prev) || isNaN(current)) return;
    
    let result;
    
    // Perform the calculation based on the operation
    switch (calculator.operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            if (current === 0) {
                alert('Cannot divide by zero!');
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    // Update the calculator state
    calculator.currentOperand = formatNumber(result);
    calculator.operation = undefined;
    calculator.previousOperand = '';
    calculator.resetScreen = true;
    
    updateDisplay();
}

// Initialize the display
updateDisplay();

// Add event listener for theme toggle
themeToggle.addEventListener('click', toggleTheme);