const express = require('express')
const app = express()
const cors = require('cors')

const ENV = require('dotenv')
ENV.config()

const port = Number(process.env.PORT) || 3000;

const indexRouter = require('./routes/index')
const dotaApiRouter = require('./routes/dotaApi')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/', indexRouter)
app.use('/dota', dotaApiRouter)

app.listen(port, () => {
  console.log('SERVER IS ON AND IS LISTENING TO', port)
})
