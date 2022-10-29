const wifi = require('node-wifi')

wifi.init({
  debug: true,
  iface: null
})

const getNetworks = (req, res) => {
  try {
    wifi.scan((error, networks) => {
      if (!networks) res.status(500).send('an error occurred 13', error)
      res.send(networks)
    })
  } catch (error) {
    res.status(500).send('an error occurred 17', error)
  }
}

const getMyNetwork = (req, res) => {
  try {
    wifi.getCurrentConnections((error, currentConnections) => {
      if (error) res.status(500).send('an error occurred 24', error)
      res.send(currentConnections)
    })
  } catch (error) {
    res.status(500).send('an error occurred 28', error)
  }
}

const connect = (req, res) => {
  try {
    const { ssid, password } = req.body
    wifi.connect({ ssid, password }, (error) => {
      if (error) res.status(500).send(error)
      res.send('Connected')
    })
  } catch (error) {
    res.status(500).send('an error occurred 40', error)
  }
}

const disconnect = (req, res) => {
  if (!req.body) res.status(400).send('Invalid Parameters')
  if (process.platform === 'darwin')
    res.status(500).send('Not supported on Mac OS')

  try {
    const ssid = req.body
    wifi.disconnect(ssid, (error) => {
      if (error) res.json({ error })
      res.send('Disconnected')
    })
  } catch (error) {
    res.status(500).send('an error occurred 56', error)
  }
}

module.exports = { getNetworks, getMyNetwork, connect, disconnect }
