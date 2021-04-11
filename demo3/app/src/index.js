const fs = require('fs')
const https = require('https')
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

const httpsServer = https.createServer({
  key: fs.readFileSync("/etc/certs/tls.key"),
  cert: fs.readFileSync("/etc/certs/tls.crt")
}, app)

const serverPort = process.env.PORT || 443
httpsServer.listen(serverPort, () => {
  console.log(`Demo service up at ${serverPort}`)
})