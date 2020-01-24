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
document.addEventListener("keydown", () => {
  textBox.focus();
}); // redesign: the top bar shouldn't be input, just <p>, and should be sensitive to keyups Anywhere on the page. This might also give you more control over styling. Problem: this will register, e.g. backspace as a string.
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
  } else if (event.key == "ArrowUp") {
    if (historyLocation > 0) {
      historyLocation--;
    }
    jumpToHistory();
    updateHistoryBar();
  } else if (event.key == "ArrowDown") {
    if (historyLocation < history.length - 1) {
      historyLocation++;
    }
    jumpToHistory();
    updateHistoryBar();
  }
}

function handleClick(e) {
  let event = e.target;
  if (event.tagName == "BUTTON") {
    event.id == "C"
      ? (textBox.value = expression = "")
      : addToExpression(event);
  } else if (event.tagName == "INPUT") {
    handleInputTag(event);
  } else {
    return;
  }
}

function addToExpression(event) {
  let choice = event.id;
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

function handleInputTag(event) {
  if (event.id == "equalsSign") {
    returnResult();
  }
}

function returnResult() {
  // instead of flag you could use currying...
  history.push(expression);
  historyLocation = history.length - 1;
  expression = resolve(expression);
  textBox.value = expression;
  updateHistoryBar();
}

function jumpToHistory() {
  if (history.length > 0) {
    expression = history[historyLocation];
    textBox.value = expression;  
  }
}

function updateHistoryBar() {
  if (history.length > 0) {
    historyBox.innerText = `[${historyLocation + 1}] ${history[historyLocation]}`;  
  }
}