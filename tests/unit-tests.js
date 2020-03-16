test('operations on two integers', (assert) => {
  assert.equal('10', resolve('5 + 5'), 'add two integers')
  assert.equal('0', resolve('5 - 5'), 'subtracts two integers')
  assert.equal('25' , resolve('5 * 5'), 'multiplies two integers')
  assert.equal('1' , resolve('5 / 5'))
  assert.equal('3125', resolve('5 ** 5'), 'exponentiates two integers')
  assert.equal('1', resolve('21 % 5'), 'finds remainder from two integers')
})