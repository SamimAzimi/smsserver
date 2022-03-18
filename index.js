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

// GET API
const get = require('./routes/get.routes')
app.use('/api', get)

// POST API
const post = require('./routes/post.routes')
app.use('/api', post)

//login API 
const login = require('./routes/login.routes')
app.use('/login', login)



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})