let initialValue = 0;
let newValue = 0;
let operandCounter = 0;
let currentOperation = '';
let previousResult = 0;
let isOperationSelected = false;
let value;

const numberKeys = document.querySelectorAll('.number-keys');
const operatorKeys = document.querySelectorAll('.operator-keys');

const calculator = {
    add: (a, b) => a + b,
    sub: (a, b) => a - b,
    mul: (a, b) => a * b,
    div: (a, b) => a / b,
};

const createOperation = (initialValue) => {
    let leftOperand = initialValue;

    const evalOperandPair = (operation, rightOperand) => {
        switch (operation) {
            case 'add':
                leftOperand = calculator.add(parseInt(leftOperand), parseInt(rightOperand));
                break;
            case 'sub':
                leftOperand = calculator.sub(leftOperand, rightOperand);
                break;
            case 'mul':
                leftOperand = calculator.mul(leftOperand, rightOperand);
                break;
            case 'div':
                leftOperand = calculator.div(leftOperand, rightOperand);
                break;
        }

        return leftOperand;
    };

    return evalOperandPair;
};

const appendOperand = (value, key) => value += key;

const displayNumbers = () => {
}

numberKeys.forEach((key) => {
    key.addEventListener('click', () => {
        const keyID = key.textContent;

        if (isOperationSelected == false) {
            initialValue = appendOperand(initialValue, keyID);
        } else {
            newValue = appendOperand(newValue, keyID);
        }
    });
});

operatorKeys.forEach((key) => {
    key.addEventListener('click', () => {
        if (operandCounter === 0) {
            value = createOperation(initialValue);
            isOperationSelected = true;
            operandCounter++;
        } else {
            // Apply the previous operation and store the result
            previousResult = value(currentOperation, newValue);
            console.log(previousResult);
        }

        // Set the new operation for the next set of operands
        switch (key.textContent) {
            case '+':
                currentOperation = 'add';
                break;
            case '-':
                currentOperation = 'sub';
                break;
            case '*':
                currentOperation = 'mul';
                break;
            case '/':
                currentOperation = 'div';
                break;
        }

        // Reset newValue for the next set of operands
        newValue = 0;
    });
});
