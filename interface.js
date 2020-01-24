'use strict'

let expression = "";
let history = [];
let historyLocation = history.length;
const numbers = new Array(10).fill().map((e, i) => String(i));
const operators = ['+', '-', '*', '/', '\\', '**', '%']
const calcButtons = document.getElementById('calculator');
const textBox = document.getElementById('formfield');

textBox.addEventListener('input', manuallyWriteExpression); 
document.addEventListener('keydown', () => {textBox.focus()}); // redesign: the top bar shouldn't be input, just <p>, and should be sensitive to keyups Anywhere on the page. This might also give you more control over styling. 
document.addEventListener('keyup', checkForSpecialKeys); 
calcButtons.addEventListener('click', handleClick);
// TODO: add ( ) . and C buttons. C clears screen


function manuallyWriteExpression() {  
  // this could just be a function expression really
  expression = textBox.value;
  expression = expression.replace(/\\/g, '/'); // the regex /// is read as a comment
}

function checkForSpecialKeys(event) {
  if (event.key == 'Enter') {
    returnResult('new');
  } else if (event.key == 'ArrowUp') {
    if (historyLocation > 0) {historyLocation--};
    expression = history[historyLocation]; // this functionality is used twice here and used in return result - a clear use-case for currying
    textBox.value = expression;
  } else if (event.key == 'ArrowDown') {
    if (historyLocation < history.length - 1) {historyLocation++};
    expression = history[historyLocation];
    textBox.value = expression;
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
    returnResult('new');
  }
}

function returnResult(flag) { // instead of flag you could use currying...
  history.push(expression);
  expression = resolve(expression);
  textBox.value = expression;
}