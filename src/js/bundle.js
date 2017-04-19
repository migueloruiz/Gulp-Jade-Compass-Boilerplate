// ===== Includes ==================================================
var hello = require('./hello/hello.js')

// ===== Document Ready ===================================================
document.addEventListener('DOMContentLoaded', () => {
  let saludo = hello.withName('Miguelo')
  console.log(saludo)
}, false)
