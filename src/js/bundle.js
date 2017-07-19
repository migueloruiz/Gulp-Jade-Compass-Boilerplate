// ===== Includes ==================================================
const $ = window.jQuery
const hello = require('./hello/hello.js')

// ===== Document Ready ===================================================
document.addEventListener('DOMContentLoaded', () => {
  let saludo = hello.withName('Miguelo')
  console.log(saludo)
  console.log($)
}, false)
