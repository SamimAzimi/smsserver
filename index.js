const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const port = process.env.PORT || 4000
const app = express()
require('dotenv/config')
var cors = require('cors');
app.use(cors())
app.use(bodyParser.json())


//DB Connection
mongoose.connect(process.env.DBCONNECTION,
  {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
mongoose.connection
  .once('open', () => {
    console.log('Database is connected')
  }
  )
  .on('error', error => {
    console.log("Error", error)
  })
app.get('/', (req, res) => {
  res.send('I am Alive')
})


// Records API
const Record = require('./routes/records.routes')
app.use('/api', Record)

//login API 
const login = require('./routes/login.routes')
app.use('/login', login)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})