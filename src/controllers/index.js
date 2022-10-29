const wifi = require('node-wifi')

wifi.init({
  debug: true,
  iface: null
})

const getNetworks = (req, res) => {
  try {
    wifi.scan((error, networks) => {
      if (!networks) throw new Error('No networks found')
      res.send(networks)
    })
  } catch (error) {
    res.send('an error occurred 15', error)
  }
}

const getMyNetwork = (req, res) => {
  try {
    wifi.getCurrentConnections((error, currentConnections) => {
      if (error) res.send('an error occurred 22', error)
      res.send(currentConnections)
    })
  } catch (error) {
    res.send('an error occurred 26', error)
  }
}

const connect = (req, res) => {
  try {
    const { ssid, password } = req.body
    wifi.connect({ ssid, password }, (error) => {
      if (error) res.send('an error occurred 34', error)
      res.send('Connected')
    })
  } catch (error) {
    res.send('an error occurred 38', error)
  }
}

const disconnect = (req, res) => {
  if (!req.body) res.status(400).send('Invalid Parameters')
  if (process.platform === 'darwin')
    res.send('Disconnecting is not supported on macOS')

  try {
    const ssid = req.body
    wifi.disconnect(ssid, (error) => {
      if (error) res.json({ error })
      res.send('Disconnected')
    })
  } catch (error) {
    res.send('an error occurred 54', error)
    throw new Error(error)
  }
}

module.exports = { getNetworks, getMyNetwork, connect, disconnect }
