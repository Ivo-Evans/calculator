const operations = [exponents, multiplication, division, addition, subtraction, remainder];

function resolve(string) {
  let equation = parse(string);
  if (equation) {
    equation = parentheses(equation);

    operations.forEach(operation => {
      equation = operation(equation);
        try {
          equation = operation(equation)
          console.log('try succeeded');
          if (equation.includes(NaN)) {
            console.log('return includes NaN')
            equation = 'Error';
            return;
          }
      }
      catch {
        return 'Error'
      }
    })
  }

  return equation;
}

function parse(string) {
  // console.log("parse called with " + string);
  let rv = string.match(/\(.*\)|[0-9.]+|\*{2}|[-+*/%]/g);
  // console.log("parse returns " + rv);
  return rv;
  /* 
so what's going on here? Parse scans the input string and creates an array with four kinds of values, separated and prioritised by alternators:
1) First it looks for any sub-expressions within brackets. It works for nested brackets (i.e. matches according to the outside layer of brackets only) - I'm not sure why, maybe because regex is 'greedy'
2) second it looks for any substrings of 1 or more number characters
3) third it looks for any exponent signs **, i.e. two consecutive * symbols
4) fifth it looks for single-digits of any other operators

So if you feed it 5+-92*9**2*(9-2) you will get ["5", "+", "-", "92", "*", "9", "**", "2", "*", "(9-2)"]  
*/
}

function parentheses(equation) {
  // console.log("parentheses called with " + equation);
  // console.log(equation)
  equation = equation.map(element => {
    return element[0] == "("
      ? resolve(element.slice(1, element.length - 1))
      : element;
  });
  // console.log("parentheses returns " + equation);
  return equation;
}
