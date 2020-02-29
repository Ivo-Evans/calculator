"use strict";

let expression = "";
let history = [];
let historyLocation = history.length;
let swipeStart;
let pressedKeys = [];

const calculator = document.getElementById("calculator");
const buttons = Array.from(calculator.querySelectorAll("button"));
const textBox = document.getElementById("formfield");
const historyBox = document.getElementById("history");

const validCharacters = buttons.map(b => b.innerText);
const numbers = new Array(10).fill().map((e, i) => String(i));
const operators = ["+", "-", "*", "/", "\\", "**", "%"];
const maxCharacters = 12;

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);
calculator.addEventListener("click", handleClick);
calculator.addEventListener("touchstart", logY);
calculator.addEventListener("touchend", handleSwipe);


function handleKeyDown(event) {
  let key = event.key;
  if (key === "Enter") {
    returnResult();
    addOpacity("=")
  } else if (key === "ArrowUp") {
    traverseHistory(-1);
  } else if (key === "ArrowDown") {
    traverseHistory(1);
  } else if (key.toLowerCase() === "c") {
    textBox.value = expression = "";
    addOpacity("C");
  } else if (validCharacters.includes(key)) {
    addOpacity(key);
    pressedKeys.push(key);
  }
}

function addOpacity(innerText) {
  buttons.find(b => b.innerText === innerText).classList.add("pressed-button");
}

//TODO: keypressing is frustrating right now. Keys should appear on screen on keydown, not keyup, but only if they're in numbers or operators. 

function handleKeyUp(event) {
  let key = event.key;
  buttons.forEach(button => button.classList.remove("pressed-button"));
  if (pressedKeys.includes(key)) {
    addToExpression(key);
  }
  if (key === "Backspace") {
    textBox.value = expression = expression.substring(0, expression.length - 1);
  }
}

function traverseHistory(direction) {
  let end = history.length - 1;
  if (
    (historyLocation > 0 && direction < 0) ||
    (historyLocation < end && direction > 0)
  ) {
    historyLocation += direction;
    jumpToHistory();
    updateHistoryBar();
  }
}

function handleClick(e) {
  let event = e.target;
  if (event.tagName === "BUTTON") {
    if (event.innerText === "C") {
      textBox.value = expression = "";
    } else if (event.innerText === "=") {
      returnResult();
    } else {
      addToExpression(event.innerText);
    }
  }
}

function addToExpression(choice) {
  if (expression.length >= maxCharacters) { return };
  if (numbers.includes(choice)) {
    expression += choice;
  } else if (operators.includes(choice)) {
    if (choice === "*" && expression[expression.length - 2] === "*") { 
      // if trying to make * into **
      expression = expression.substring(0, expression.length - 1) + `${choice} `;
    } else {
      expression += ` ${choice} `;
    }
  } else if (choice === "(") {
    expression += `${choice} `;
  } else if (choice === ")") {
    expression += ` ${choice}`;
  }
  textBox.value = expression;
}

function returnResult() {
  history.push(expression);
  historyLocation = history.length - 1;
  updateHistoryBar();
  expression = String(resolve(expression)).slice(0, maxCharacters);
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
    historyBox.innerText = `[${historyLocation + 1}] ${
      history[historyLocation]
    }`;
  }
}

function logY(e) {
  swipeStart = e.touches[0].pageY;
}

function handleSwipe(e) {
  let swipe = e.changedTouches[0].pageY - swipeStart;
  let minimumSwipe = 10;

  if (swipe > minimumSwipe) {
    traverseHistory(1);
  } else if (swipe < -minimumSwipe) {
    traverseHistory(-1);
  }

  swipeStart = null;
}
