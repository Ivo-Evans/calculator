console.group('integration tests')
console.group('resolve')
test('operations on two integers', (assert) => {
  assert.equal('10', resolve('5 + 5'), 'add two integers')
  assert.equal('0', resolve('5 - 5'), 'subtracts two integers')
  assert.equal('25' , resolve('5 * 5'), 'multiplies two integers')
  assert.equal('1' , resolve('5 / 5'), 'Divides two integers')
  assert.equal('3125', resolve('5 ** 5'), 'exponentiates two integers')
  assert.equal('1', resolve('21 % 5'), 'finds remainder from two integers')
})

// floats

// minus numbers unrelated to parentheses

test('order of operations (PEMDAS)', (assert) => {
  assert.equal('0.5', resolve('1 - 2 ** (1 - 2)'), 'brackets higher precedence than exponents')
  assert.equal('20', resolve('5 * 2 ** 2'), 'exponents higher precedence than multiplication')
  assert.equal('1.25', resolve('5 / 2 ** 2'), 'exponents higher precedence than division')
  assert.equal('23', resolve('5 + 2 * 9'), 'multiplication higher precedence than addition')
  assert.equal('-13', resolve('5 - 2 * 9'), 'multiplication higher precedence than subtraction')
  assert.equal('9.5', resolve('5 + 9 / 2'), 'division higher than precedence addition')
  assert.equal('0.5', resolve('5 - 9 / 2'), 'division higher than precedence subtraction')
  // handles mod right - not included because this isn't a feature, although it could be
})

test('Parentheses and minus numbers', (assert) => {
  // you can negate an entire parenthetical expression
  // a parenthesis which is negated and yields a negative number is converted back into a positive number
})

test('Error messages', (assert) => {
  assert.equal('Error', resolve('1/ 0'), 'Division by zero')
  assert.equal('Error', resolve('4 + '), 'Operands with only one operator')
  assert.equal('Error', resolve('4 + ()'), 'not fooled by empty parentheses')
  assert.equal('Error', resolve('4 + () 4'), 'Empty parentheses force an error')
})
console.groupEnd('resolve')
console.groupEnd('integration tests')