var hello = {
  withName: (name) => {
    return _gettering(name)
  }
}
module.exports = hello

function _gettering (name) {
  if (name === null || name === undefined) return ''
  // if (name === null) return ''
  return `Hey ${name}, whast up?`
}
