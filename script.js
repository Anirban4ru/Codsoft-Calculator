// Fully Working JavaScript (script.js) for Advanced Calculator

const mainDisplay = document.getElementById("mainDisplay").querySelector(".main-text");
const expressionDisplay = document.getElementById("expressionDisplay").querySelector(".expression-text");
const errorDisplay = document.getElementById("errorDisplay").querySelector(".error-text");
const memoryIndicator = document.getElementById("memoryIndicator");

let expression = "";
let memory = 0;
let error = false;

function updateDisplay() {
    expressionDisplay.textContent = expression;
    if (!error) errorDisplay.textContent = "";
}

function evaluateExpression() {
    try {
        const sanitized = expression.replace(/×/g, '*').replace(/÷/g, '/').replace(/√/g, 'Math.sqrt').replace(/π/g, 'Math.PI').replace(/e/g, 'Math.E').replace(/\^/g, '**');
        const result = Function('"use strict";return (' + sanitized + ')')();
        mainDisplay.textContent = result;
        expression = result.toString();
    } catch {
        mainDisplay.textContent = "Error";
        errorDisplay.textContent = "Invalid Expression";
        error = true;
    }
}

function handleInput(action, number = null) {
    if (error && action !== 'all-clear') return;

    switch (action) {
        case "number":
            if (expression === "0") expression = number;
            else expression += number;
            break;

        case "decimal":
            expression += ".";
            break;

        case "add":
            expression += "+";
            break;

        case "subtract":
            expression += "-";
            break;

        case "multiply":
            expression += "×";
            break;

        case "divide":
            expression += "÷";
            break;

        case "modulus":
            expression += "%";
            break;

        case "exponent":
            expression += "^";
            break;

        case "square-root":
            expression += "√(";
            break;

        case "fraction":
            expression = `1/(${expression})`;
            break;

        case "pi":
            expression += "π";
            break;

        case "euler":
            expression += "e";
            break;

        case "sign-toggle":
            if (expression) expression = `-(${expression})`;
            break;

        case "backspace":
            expression = expression.slice(0, -1);
            break;

        case "clear":
            expression = "";
            break;

        case "all-clear":
            expression = "";
            mainDisplay.textContent = "0";
            error = false;
            break;

        case "calculate":
            evaluateExpression();
            return;

        case "open-bracket":
            expression += "(";
            break;

        case "close-bracket":
            expression += ")";
            break;

        case "memory-clear":
            memory = 0;
            memoryIndicator.classList.remove("active");
            break;

        case "memory-recall":
            expression += memory.toString();
            break;

        case "memory-add":
            try {
                memory += parseFloat(mainDisplay.textContent);
                memoryIndicator.classList.add("active");
            } catch {}
            break;

        case "memory-subtract":
            try {
                memory -= parseFloat(mainDisplay.textContent);
                memoryIndicator.classList.add("active");
            } catch {}
            break;
    }

    updateDisplay();
}

document.querySelectorAll(".calc-btn, .control-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const action = btn.getAttribute("data-action");
        const number = btn.getAttribute("data-number");
        if (number !== null) {
            handleInput("number", number);
        } else {
            handleInput(action);
        }
    });
});
