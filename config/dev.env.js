var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  HOST: '"http://localhost:8080"',
  NODE_ENV: '"development"',
  API_URL: '"http://localhost:4000"',
  ASSETS_URL: '"http://localhost:3000"'
})
