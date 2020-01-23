// add event listener for calculator div. Check where event bubbles up to. 
//If it is a button, see if the button is =. 
  // If the button is not =, add the item's id onto string called equation. Add with spaces surrounding operators but not numbers. 
  // if the button is =, equation = eval(equation)
  // either way, write equation to the value property of formfield, so that users can see it updating.


// a more advanced version would use mouse input to add numbers to the equation var, write that var to formfield, and then, when = is pressed, Read that formfield, record the value back to equation, and then write eval(equation) onto the formfield. That way, you could also edit the formfield with your own text and it would still be evaluated, and you could go back and edit equations typed with the onscreen buttons. 

function resolve(string) {
  return eval(string)
}