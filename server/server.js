const cors = require('cors')
const express = require('express')
const session = require('express-session')
const routes = require('./controllers')
const app = express()
const PORT = process.env.PORT || 3001
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: 'http://localhost:5173'
  })
)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 10800 // 3 years
    }
  })
)
app.use('/api', routes)

app.listen(PORT, () => console.log(`Server Running On PORT: ${PORT}`))
