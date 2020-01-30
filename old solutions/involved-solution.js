// resolve('(2**3) ** 2 * 2 / 2')

// NOTE: this doesn't know how to handle minus numbers.

function resolve(string) {
  // the current contents of this should be calculate; resolve should call calculate with a try-catch. And parentheses should also call calculate.
  console.log("resolve called with " + string);
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
  console.log("parse called with " + string);
  let rv = string.match(/\(.*\)|[0-9.]+|\*{2}|[-+*/%]/g);
  console.log("parse returns " + rv);
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
  console.log("parentheses called with " + equation);
  equation = equation.map(element => {
    return element[0] == "("
      ? resolve(element.slice(1, element.length - 1))
      : element;
  });
  console.log("parentheses returns " + equation);
  return equation;
}

function exponents(equation) {
  console.log("exponents called with " + equation);
  // console.log(equation);
  while (equation.includes("**")) {
    let location = equation.indexOf("**");
    equation.splice(
      location - 1,
      3,
      Number(equation[location - 1]) ** Number(equation[location + 1])
    );
  }
   console.log("exponents returns " + equation);
  return equation;
}

function multiplication(equation) {
  console.log("multiplication called with " + equation);
  while (equation.includes("*")) {
    let location = equation.indexOf("*");
    equation.splice(
      location - 1,
      3,
      Number(equation[location - 1]) * Number(equation[location + 1])
    );
  }
  return equation;
}

function division(equation) {
  console.log("division called with " + equation);
  while (equation.includes("/")) {
    let location = equation.indexOf("/");
    equation.splice(
      location - 1,
      3,
      Number(equation[location - 1]) / Number(equation[location + 1])
    );
  }
  return equation;
}

function addition(equation) {
  console.log("addition called with " + equation);
  while (equation.includes("+")) {
    let location = equation.indexOf("+");
    equation.splice(
      location - 1,
      3,
      Number(equation[location - 1]) + Number(equation[location + 1])
    );
  }
  return equation;
}

function subtraction(equation) {
  console.log("subtraction called with " + equation);
  while (equation.includes("-")) {
    let location = equation.indexOf("-");
    equation.splice(
      location - 1,
      3,
      Number(equation[location - 1]) - Number(equation[location + 1])
    );
  }
  return equation;
}

function remainder(equation) {
  console.log("remainder called with " + equation);
  while (equation.includes("%")) {
    let location = equation.indexOf("%");
    equation.splice(
      location - 1,
      3,
      Number(equation[location - 1]) % Number(equation[location + 1])
    );
  }
  return equation;
}

/* if you think about it, the arithmetic functions are quite inefficient since they need to: 
- use includes to check for at least one **
- iterate through the array to find the index of it
- splice the results in
- do that an UNDLISCLOSED number of times, discretely each time
As far as I know, each of the three functions above are n**2. So what's a better solution? Maybe I could make seven functions:
looper
exponents
multiplication
addition 
etc

looper would take two arguments, one the sign to search for while it loops and the other the actual arithmetic functions (because they're values themselves). Then looper would use a for-loop to go through the equation-array, returning a new version. Because it would go through only once, we wouldn't need to use includes() an we wouldn't need to use indexOf() - we'd just have access to each index. We would, still, need to use splice, but what can you do. Also we should add try-catch blocks so that, if the calculator failed to multiply, e.g. as in the expression 5 * *, it returned an array. Finally we should put all of these functions inside an object, and loop through them. You can use a Map object to store the functions by their signs, and then insert the key and the value as arguments given to looper. 

So, given a map object which assigned function expressions to operator-strings, we could use resolve like so

function resolve(string) {
  let equation = parse(string);
  equation = parentheses(equation);
  operators.forEach((operation, operator) => {
    try {
      equation = looper(operator, operation);
      // if (equation == NaN) { // or something like that...
        equation = 'Error';
        return;
      }
    } 
    catch {
      equation = 'Error';
      return;
    }
  })
}

function looper(searchterm, function) {
  // basically: loop through, doing arithmetic operations in-place
  // consider replacing empty numbers with undefined, then doing a run-through at the end to get rid of any undefined values (so as not to disrupt indexes for the first stage)
}

*/
