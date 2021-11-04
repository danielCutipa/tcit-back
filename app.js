require('dotenv').config()
const express = require('express')
const cors = require('cors')
const db = require('./models')

const app = express()

var corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(express.json())

db.sequelize.sync({ force: false }).then(() => {
  console.log('Drop and Resync with { force: false }')
})

require('./routes/post')(app)

// set port, listen for requests
console.log('PORT', process.env.PORT)
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
