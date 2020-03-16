function test(description, callback) {
  const assertions = {
    equal: (expected, actual, message) => {
      expected === actual
        ? console.info(`Pass: ${message}`)
        : console.error(`Expected ${typeof expected} ${expected}, got ${typeof actual} ${actual}.
        
        ${message}`);
    },
    notEqual: (expected, actual, message) => {
      expected !== actual
        ? console.info(`Pass: ${message}`)
        : console.error(`Expected ${typeof expected} ${expected}, got ${typeof actual} ${actual}.
        
        ${message}`);
    }
  };

  console.group(description);
  callback(assertions);
  console.groupEnd(description);
}

// test('testing the test', (assertions) => {
//   assertions.equal(2, 2, 'two twos');
//   assertions.equal(2, '2', 'mixed data-types');
//   assertions.notEqual(2, 2, 'two twos');
//   assertions.notEqual(2, '2', 'mixed data-types');
//   })