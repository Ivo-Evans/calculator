"use strict";

let expression = "";
let history = [];
let historyLocation = history.length;
const numbers = new Array(10).fill().map((e, i) => String(i));
const operators = ["+", "-", "*", "/", "\\", "**", "%"];
const calcButtons = document.getElementById("calculator");
const textBox = document.getElementById("formfield");
const historyBox = document.getElementById("history")

textBox.addEventListener("input", manuallyWriteExpression);
document.addEventListener("keydown", () => {textBox.focus()});
document.addEventListener("keyup", checkForSpecialKeys);
calcButtons.addEventListener("click", handleClick);

function manuallyWriteExpression() {
  // this could just be a function expression really
  expression = textBox.value;
  expression = expression.replace(/\\/g, "/");
}

function checkForSpecialKeys(event) {
  if (event.key == "Enter") {
    returnResult();
  } else if (event.key.toLowerCase() == 'c') {
    textBox.value = expression = "";
  } else if (event.key == "ArrowUp") {
    traverseHistory(-1)
  } else if (event.key == "ArrowDown") {
    traverseHistory(1);
  }
}

function traverseHistory(direction) {
 let end = history.length - 1;
  if ((historyLocation > 0 && direction < 0) || (historyLocation < end && direction > 0)) {
    historyLocation += direction;
    jumpToHistory();
    updateHistoryBar();
  }
}

function handleClick(e) {
  let event = e.target;
  if (event.tagName == "BUTTON") {
    if (event.innerText == "C") {
      textBox.value = expression = "";
    } else if (event.innerText == "=") {
      returnResult();
    } else {
      addToExpression(event);
    }
  }
}

function addToExpression(event) {
  let choice = event.innerText;
  if (numbers.includes(choice)) {
    expression += choice;
  } else if (operators.includes(choice)) {
    expression += ` ${choice} `;
  } else if (choice == "(") {
    expression += `${choice} `;
  } else if (choice == ")") {
    expression += ` ${choice}`;
  }
  textBox.value = expression;
}

function returnResult() {
  history.push(expression);
  historyLocation = history.length - 1;
  updateHistoryBar();
  expression = String(resolve(expression)).slice(0, textBox.maxLength);
  textBox.value = expression;
}

function jumpToHistory() {
  if (history.length > 0) {
    expression = history[historyLocation];
    textBox.value = expression;  
  }
}

function updateHistoryBar() { 
  if (history.length > 0 && history[historyLocation] !== undefined) {
    historyBox.innerText = `[${historyLocation + 1}] ${history[historyLocation]}`;  
  }
}


// TODO: implement swipe navigation for history browsing
// TDOD: implement opacity change on keydown and removal on keyup, as well as disallowal of bad characters. In other words, rework the keyboard input system. 