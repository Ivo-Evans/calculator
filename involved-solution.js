// resolve('(2**3) ** 2 * 2 / 2')

function resolve(string) {
  console.log('resolve called with ' + string);
  let equation = parse(string);
  equation = parentheses(equation);
  // i could add an upscale function here, to make everything ten million times bigger (and thereby eliminate imprecision up to 8 decimal places), and then add a downscale function at the end, to make everything ten million times smaller, convert to strings, and cut out any unwanted characters. I mean (100 * 10000000) ** (2 * 10000000) might be a bit of a yikes equation for the computer....
  equation = exponents(equation);
  equation = multiplication(equation);
  equation = division(equation);
  equation = addition(equation);
  equation = subtraction(equation);
  equation = remainder(equation);
  console.log("current value of resolve: " + equation);
  return equation;
}

function parse(string) {
  console.log('parse called with ' + string);
  let rv = string.match(/\(.*\)|[0-9.]+|\*{2}|[-+*/%]/g);
  console.log('parse returns ' + rv);
  return rv;
/* 
so what's going on here? Parse scans the input string and creates an array with four kinds of values, separated and prioritised by alternators:
1) First it looks for any sub-expressions within brackets. It works for nested brackets (i.e. matches according to the outside layer of brackets only) - I'm not sure why, maybe because regex is 'greedy'
2) second it looks for any substrings of 1 or more number characters
3) third it looks for any exponent signs ** - two * symbols
4) fifth it looks for single-digits of any other operators
So if you feed it 5+-9*9**2*(9-2) you will get ["5", "+", "-", "9", "*", "9", "**", "2", "*", "(9-2)"]  
*/
}

function parentheses(equation) {
  console.log('parentheses called with ' + equation);
 equation = equation.map(element => {
   return element[0] == '(' ? resolve(element.slice(1, element.length - 1)) : element;
  });
  console.log('parentheses returns ' + equation);
  return equation;
}

function exponents(equation) {
  console.log('exponents called with ' + equation)
  // console.log(equation);
  while (equation.includes("**")) {
    let location = equation.indexOf("**");
    equation.splice(location - 1, 3, (Number(equation[location - 1]) ** Number(equation[location + 1])));
  }
  console.log('exponents returns ' + equation)
  return equation;
}

function multiplication(equation) {
  console.log('multiplication called with ' + equation)
  while (equation.includes("*")) {
    let location = equation.indexOf("*");
    equation.splice(location -1, 3, (Number(equation[location - 1]) * Number(equation[location + 1])))
  }
  return equation;
}

function division(equation) {
  console.log('division called with ' + equation)
  while (equation.includes("/")) {
    let location = equation.indexOf("/");
    equation.splice(location -1, 3, (Number(equation[location - 1]) / Number(equation[location + 1])))
  }
  return equation;
}

function addition(equation) {
  console.log('addition called with ' + equation)
  while (equation.includes("+")) {
    let location = equation.indexOf("+");
    equation.splice(location -1, 3, (Number(equation[location - 1]) + Number(equation[location + 1])))
  }
  return equation;  
}

function subtraction(equation) {
  console.log('subtraction called with ' + equation)
  while (equation.includes("-")) {
    let location = equation.indexOf("-");
    equation.splice(location -1, 3, (Number(equation[location - 1]) - Number(equation[location + 1])))
  }
  return equation;
}

function remainder(equation) {
  console.log('remainder called with ' + equation)
  while (equation.includes("%")) {
    let location = equation.indexOf("%");
    equation.splice(location -1, 3, (Number(equation[location - 1]) % Number(equation[location + 1])))
  }
  return equation;
}