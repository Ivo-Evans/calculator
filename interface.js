'use strict'

const calcButtons = document.getElementById('calculator');
calcButtons.addEventListener('click', handleClick);

function handleClick(e) {
  let event = e.target;
  if (event.tagName !== "BUTTON" && event.tagName !== "INPUT") {
    return;
  }
}