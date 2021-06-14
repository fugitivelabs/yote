// https://github.com/lorenwest/node-config
const config = require('config')


const express = require('express')
const app = express()
const port = 3030

app.get('/', (req, res) => {
  console.log(config.get('database'))
  res.send('Hello World!')
})

app.get('/error', (req, res, next) => {
  next(new Error('hello world error'))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})