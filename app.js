const express = require('express')
const uploadRouter = require('./routers/upload')
const app = express()

app.use(express.static('public'))

app.use(uploadRouter)

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})