const express = require('express')
const router = express.Router()
const wifi = require('node-wifi')

wifi.init({
  debug: true,
  iface: null
})

router.get('/networks', (req, res) => {
  wifi.scan((error, networks) => {
    if (!networks) res.status(500).send(error)
    res.send(networks)
  })
})

router.get('/mynetwork', (req, res) => {
  wifi.getCurrentConnections((error, currentConnections) => {
    if (error) res.status(500).send(error)
    res.send(currentConnections)
  })
})

router.post('/connect', (req, res) => {
  const { ssid, password } = req.body
  wifi.connect({ ssid, password }, (error) => {
    if (error) res.status(500).send(error)
    res.send('Connected')
  })
})

router.post('/disconnect', (req, res) => {
  if (!req.body) res.status(400).send('Invalid Parameters')
  if (process.platform === 'darwin')
    res.status(500).send('Not supported on Mac OS')

  const ssid = req.body
  wifi.disconnect(ssid, (error) => {
    if (error) res.json({ error })
    res.send('Disconnected')
  })
})

module.exports = router
