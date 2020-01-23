'use strict'

let expression = "";
const numbers = new Array(10).fill().map((e, i) => String(i));
const operators = ['+', '-', '*', '/', '\\', '**', '%']
const calcButtons = document.getElementById('calculator');
calcButtons.addEventListener('click', handleClick);

function handleClick(e) {
  let event = e.target;
  if (event.tagName == "BUTTON") {
    addToExpression(event);
  } else if (event.tagName == "INPUT") {
    handleInputTag(event);
  } else {
    return
  }
}

function addToExpression(event) {
  let choice = event.id;
  if (numbers.includes(choice)) {
    expression += choice;
  } else if (operators.includes(choice)) {
    expression += ` ${choice} `;
  } else if (choice == '(') {
    expression += `${choice} `;
  } else if (choice == ')') {
    expression += ` ${choice}`;
  }
}