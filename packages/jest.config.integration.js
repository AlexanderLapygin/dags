var config = require('./jest.config')
config.testRegex = 'ispec\\.js$' //Overriding testRegex option
console.log('RUNNING INTEGRATION TESTS')
module.exports = config
