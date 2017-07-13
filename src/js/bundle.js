// ===== Includes ==================================================
var $ = require('jquery')
const hello = require('./hello/hello.js')

// ===== Document Ready ===================================================
document.addEventListener('DOMContentLoaded', () => {
  let saludo = hello.withName('Miguelo')
  console.log(saludo)
  console.log($ === undefined)
}, false)
