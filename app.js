const express = require('express')
const mongoose = require('mongoose')
const api = require('./app/routes/index.routes')
const db = require('./config/db')
const app = express()

//Setup Express
app.use(express())
app.use(express.json())
app.use(
  express.urlencoded({
    extended: false
  })
)

//MongoDB Connection Options
const opts = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  keepAlive: 1
}

//Setup MongoDB Connection
mongoose
  .connect(db.uri, opts)
  .then(() => {
    console.log('MongoDB Database Connected Successfully')
  })
  .catch(err => {
    throw new Error('Connection Failed!!')
  })

app.use('/', api)

//Start Server
app.listen(process.env.PORT || 7300, () => {
  console.log(`Server Running At ${process.env.PORT || 7300}`)
})
