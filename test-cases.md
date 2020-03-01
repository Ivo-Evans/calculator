These are test cases I should have written. Having them would have seriously improved maintainability.

# simple arithmetic

- adds two integers
- subtracts two integers
- multiplies two integers
- divides two integers

- adds two floats with requisite precision
- subtracts two floats with requisite precision
- multiplies two floats with requisite precision
- divides two floats with requisite precision

- respects order of operations

- handles numbers more accurately internally than externally - complex problems do not get increasingly imprecise

- detects minus numbers at the beginning of the equation
- detects minus numbers after an operator

- Displays error message for division by 0
- Displays error message for incomplete equations, like 4 +


# handles parentheses

- empty parentheses throw an error
- you can negate an entire parenthetical expression
- parenthesis matching is greedy, and nested parenthetical expressions work as expected
- a parenthesis which yields a minus number, and is then negated, converts back into a positive number


# the parser

- the parser ignores whitespace
- the parser ignores non-number or operator characters
- the parser detects exponents