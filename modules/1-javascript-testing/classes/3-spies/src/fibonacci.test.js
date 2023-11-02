const { createSandbox } = require('sinon');
const Fibonacci = require('./fibonacci');
const sinon = createSandbox()
const assert = require('assert')

;(async() => {
  {
    const fibonacci = new Fibonacci
    const spy = sinon.spy(
    fibonacci,
      fibonacci.execute.name
    )
  
    for(const sequence of fibonacci.execute(3)) {}
    const expectedCallCount = 4
    assert.strictEqual(spy.callCount, expectedCallCount)
  }

  {
    const fibonacci = new Fibonacci
    const spy = sinon.spy(
    fibonacci,
      fibonacci.execute.name
    )
  
    const results = [...fibonacci.execute(5)]

    const expectedCallCount = 6
    assert.strictEqual(spy.callCount, expectedCallCount)
    const { args } = spy.getCall(2)
    const expectedParams = [3, 1, 2]
    assert.deepStrictEqual(args, expectedParams, "the arrays are not equals")

    const expectedResults = [0, 1, 1, 2, 3]
    assert.deepStrictEqual(results, expectedResults, "the arrays are not equals")
  }
})()
