const express = require('express')
const cors = require('cors')
const routes = require('./src/routes')
require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use('/api', routes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} ✨`)
})
