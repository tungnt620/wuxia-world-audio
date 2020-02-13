const { API_CODE_SUCCESS } = require('../constants')

function getResponse ({ code = API_CODE_SUCCESS, data = null, error = '' } = {}) {
  return {
    code,
    data,
    error
  }
}

module.exports = {
  getResponse
}
