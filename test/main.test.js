 /* global describe it */

var chai = require('chai')
var assert = chai.assert

var hello = require('../src/js/hello/hello.js')

describe('Test Hello', function () {
  it('Saludo con Null', function () {
    var saludo = hello.withName()
    assert.equal(saludo, '')
  })

  it('Saludo con String', function () {
    var saludo = hello.withName('Miguelo')
    assert.equal(saludo, 'Hey Miguelo, whast up?')
  })
})
