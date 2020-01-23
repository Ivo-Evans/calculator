'use strict'

let expression = "";
const numbers = new Array(10).fill().map((e, i) => String(i));
const operators = ['+', '-', '*', '/', '\\', '**', '%']
const calcButtons = document.getElementById('calculator');
const textBox = document.getElementById('formfield')

textBox.addEventListener('input', manuallyWriteExpression);
calcButtons.addEventListener('click', handleClick);
// TODO: the enter key should trigger resolve. Any other keydown should focus onto textBox

function manuallyWriteExpression() {  
  // this could just be a function expression really
  expression = textBox.value;
  expression = expression.replace(/\\/g, '/'); // regex /// is read as a comment
}

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
  textBox.value = expression;
}

function handleInputTag(event) {
  if (event.id == 'equalsSign') {
    expression = resolve(expression);
    textBox.value = expression;
  }
}