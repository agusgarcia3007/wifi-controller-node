const express = require('express')
const router = express.Router()
const wifi = require('node-wifi')
const {
  getNetworks,
  getMyNetwork,
  connect,
  disconnect
} = require('../controllers')

wifi.init({
  debug: true,
  iface: null
})

router.get('/networks', (req, res) => {
  getNetworks(req, res)
})

router.get('/mynetwork', (req, res) => {
  getMyNetwork(req, res)
})

router.post('/connect', (req, res) => {
  connect(req, res)
})

router.post('/disconnect', (req, res) => {
  disconnect(req, res)
})

module.exports = router
