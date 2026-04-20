const display = document.getElementById('display');
const memIndicator = document.getElementById('mem-indicator');
let memory = 0;
function addString(val) {
   let current = display.value;
   const operators = ['+', '-', '*', '/'];
   // If pressing an operation consecutively, erase the last operation and add the new one
   if (operators.includes(val) && operators.includes(current.slice(-1))) {
       display.value = current.slice(0, -1) + val;
       return;
   }
   // No repeated decimal points for each operand
   if (val === '.') {
       // If decimal point is pressed right after a decimal point, remove it
       if (current.slice(-1) === '.') {
           display.value = current.slice(0, -1);
           return;
       }
       // Check the current operand to ensure it doesn't already have a decimal
       let parts = current.split(/[+\-*/]/);
       let lastPart = parts[parts.length - 1];
       if (lastPart.includes('.')) {
           return;
       }
   }
   display.value += val;
}
// C button clears the input field (just the current operand)
function clearEntry() {
   let current = display.value;
   let match = current.match(/[+\-*/]?([^+\-*/]*)$/);
   if (match) {
       display.value = current.slice(0, current.length - match[1].length);
   }
}
// AC button resets the calculator completely (memory slot is left as is)
function allClear() {
   display.value = "";
}
// When Equals is pressed, solve the equation in MDAS
function calculate() {
   try {
       if (display.value) {
           // JS eval natively follows MDAS operations
           display.value = eval(display.value);
       }
   } catch (error) {
       display.value = "Error";
   }
}
// --- Memory Functions ---
// Helper function to extract just the current number (not equation)
function getCurrentNumber() {
   let current = display.value;
   let parts = current.split(/[+\-*/]/);
   let lastPart = parts[parts.length - 1];
   return parseFloat(lastPart) || 0;
}
function updateMemIndicator() {
   // Add an indicator that shows if there is a number stored in the memory
   memIndicator.textContent = memory !== 0 ? "M" : "";
}
// M+ button adds the current number to a memory slot
function memoryAdd() {
   memory += getCurrentNumber();
   updateMemIndicator();
}
// M- button subtracts the current number to the memory slot
function memorySubtract() {
   memory -= getCurrentNumber();
   updateMemIndicator();
}
// MR button shows the number in the memory on the input textbox
function memoryRecall() {
   let current = display.value;
   // If the display is empty or ends with an operator, just append the memory
   if (current === "" || ['+', '-', '*', '/'].includes(current.slice(-1))) {
       display.value += memory;
   } else {
       // Replace the current operand with the recalled memory number
       let match = current.match(/[+\-*/]?([^+\-*/]*)$/);
       if (match) {
           display.value = current.slice(0, current.length - match[1].length) + memory;
       }
   }
}
// MC button clears the memory
function memoryClear() {
   memory = 0;
   updateMemIndicator();
}