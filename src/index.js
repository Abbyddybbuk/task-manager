const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
// to get the input payload json
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Listening to port' + port)
})

