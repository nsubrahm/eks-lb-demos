const express = require('express')

const app = express()

app.get('/hello', (req, res) => {
  res.status(200).json({
    msg: 'OK'
  })
})

app.use('/', (req, res) => {
  res.status(404).json({
    msg: `${req.path} is not supported.`
  })
})

const serverPort = process.env.PORT || 8080
app.listen(serverPort, () => {
  console.log(`Demo service is up at ${serverPort}`)
})
