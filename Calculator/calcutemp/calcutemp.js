const display = document.getElementById('display');

function appendValue(value) {
    display.value = display.value + value;
}

function clearDisplay() {
    display.value = "";
}

function calculate() {
    try {

        const expression = display.value;
        if (/[^0-9+\-*/.]/.test(expression)) {
            display.value = "Error";
            return;
        }
        const result = Function('"use strict"; return (' + expression + ')')();
        display.value = result;
    } catch (e) {
        display.value = "Error";
    }
}
