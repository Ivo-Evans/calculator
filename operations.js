// TODO: redesign this system. It current doesn't do well (at all) with two-element arrays. There is also the question of how you are going to deal with minus numbers

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
  console.log('multiplication returns ' + equation);
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
