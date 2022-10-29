const express = require('express')
const router = express.Router()
const wifi = require('node-wifi')

wifi.init({
  debug: true,
  iface: null
})

router.get('/networks', (req, res) => {
  try {
    wifi.scan((error, networks) => {
      if (!networks) throw new Error('No networks found')
      if (error) res.json({ error })
      res.send(networks)
    })
  } catch (error) {
    res.json({ error })
  }
})

router.get('/mynetwork', (req, res) => {
  try {
    wifi.getCurrentConnections((error, currentConnections) => {
      if (error) res.json({ error })
      res.send(currentConnections)
    })
  } catch (error) {
    res.json({ error })
  }
})

router.post('/connect', (req, res) => {
  try {
    const { ssid, password } = req.body
    wifi.connect({ ssid, password }, (error) => {
      if (error) res.json({ error })
      res.send('Connected')
    })
  } catch (error) {
    res.json({ error })
  }
})

router.post('/disconnect', (req, res) => {
  if (!req.body) res.json({ error: 'No body provided' })
  if (process.platform === 'darwin')
    res.send('Disconnecting is not supported on macOS')

  try {
    const ssid = req.body
    wifi.disconnect(ssid, (error) => {
      if (error) res.json({ error })
      res.send('Disconnected')
    })
  } catch (error) {
    res.json({ error })
  }
})

module.exports = router
