'use strict'

let expression = "";
const numbers = new Array(10).fill().map((e, i) => String(i));
const operators = ['+', '-', '*', '/', '\\', '**', '%']
const calcButtons = document.getElementById('calculator');
const textBox = document.getElementById('formfield');

textBox.addEventListener('input', manuallyWriteExpression); 
document.addEventListener('keydown', () => {textBox.focus()}); // redesign: the top bar shouldn't be input, just <p>, and should be sensitive to keyups Anywhere on the page. This might also give you more control over styling. 
document.addEventListener('keyup', checkEnter); 
calcButtons.addEventListener('click', handleClick);
// TODO: add ( ) . and C buttons. C clears screen


function manuallyWriteExpression() {  
  // this could just be a function expression really
  expression = textBox.value;
  expression = expression.replace(/\\/g, '/'); // the regex /// is read as a comment
}

function checkEnter(event) {
  if (event.key == 'Enter') {
    returnResult();
  }
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
    returnResult();
  }
}

function returnResult() {
  expression = resolve(expression);
  textBox.value = expression;
}