## Calculator project

This is a calculator made in vanilla JavaScript, HTML and CSS. 

Find it here: ivo-evans.github.io/calculator/

It operates to twelve significant digits, and it accepts both keyboard and mouse input.

It should be scalable for different sizes - simply change maxCharacters in calculator-interface.js and adjust the CSS and HTML accordingly.

The calculator respects the standard order of operations, rather than going left to right. Thus it first prioritises parentheses, then exponents, multiplication, division, addition and subtraction. It does this by scanning the input string for tokens, including parenthetical substrings. If it finds any parentheses, it recurses one layer, and only once there are none does it start evaluating the expression, returning a result in-place until the expression is simple - there are no parentheses - at which point it resolves the whole thing. 

For these purposes I found the Map object really useful. As you can probably imagine, there is a lot of shared behaviour between the mathematical operations. I factored that behaviour out into two functions, scanner() and clean(), and a try-catch block which needed to be repeated for every operation. I then recorded each math function to the Map object. A Map object is like an ordinary object, but the order of insertion is saved (thus letting me respect the order of operations). scanner() takes a search-term and a function to call once it gets the search term. I gave the search terms, .e.g '+', to the Map object as keys, and the callback functions to the Map object as values. I then iterated over the Map object with forEach, calling scanner and doing a try-catch every time. I found it quite a saisfying solution. It is far less clunky than an array of arrays. 