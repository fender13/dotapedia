const express = require('express')
const app = express()
const cors = require('cors')

const ENV = require('dotenv')
ENV.config()

const port = Number(process.env.PORT)

const indexRouter = require('./routes/index')
const liveRouter = require('./routes/liveStream')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/', indexRouter)
app.use('/live', liveRouter)

app.listen(port, () => {
  console.log('SERVER IS ON AND IS LISTEN TO', port)
})
