test('operations on two integers', (assert) => {
  assert.equal('10', resolve('5 + 5'), 'add two integers')
  assert.equal('0', resolve('5 - 5'), 'subtracts two integers')
  assert.equal('25' , resolve('5 * 5'), 'multiplies two integers')
  assert.equal('1' , resolve('5 / 5'), 'Divides two integers')
  assert.equal('3125', resolve('5 ** 5'), 'exponentiates two integers')
  assert.equal('1', resolve('21 % 5'), 'finds remainder from two integers')
})

test('Error messages', (assert) => {
  assert.equal('Error', resolve('1/ 0'), 'Division by zero')
  assert.equal('Error', resolve('4 + '), 'Operands with only one operator')
  assert.equal('Error', resolve('4 + ()'), 'not fooled by empty parentheses')
  assert.equal('Error', resolve('4 + () 4'), 'Empty parentheses force an error')
})