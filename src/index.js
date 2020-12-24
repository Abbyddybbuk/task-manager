const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

// app.use((req, res, next) => {
//     console.log('This middleware by express needs to be declared above other routers')
//     if (req.method === 'GET') {
//         res.send('GET requests are not allowed')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     console.log('This middleware by express needs to be declared above other routers')
//     res.status(503).send('Site under maintenance')
// })

// to get the input payload json
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Listening to port' + port)
})



const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const myFunction = async () => {

    // const token = jwt.sign({ _id: 'Abhijeet@123' }, 'ThisIsMySignature', { expiresIn: '1 day' })
    // console.log(token)

    // const decipheredToken = jwt.verify(token, 'ThisIsMySignature')
    // console.log(decipheredToken)
    // const password = 'Test@12345'
    // const hashedPassword = await bcrypt.hash(password, 8)

    // console.log(password)
    // console.log(hashedPassword)

    // const isMatch = await bcrypt.compare('Test@12345', hashedPassword)
    // console.log(isMatch)
}

myFunction()

const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
    const task = await Task.findById('5fe3897726b84363a80e455b')
    // In order to fetch the complete details of the owner from User model, you just have to define ref: 'User' in your task model
    // now use populate method to get details from User model
    await task.populate('owner').execPopulate()
    console.log(task)

    const user = await User.findById('5fe418dfe2a8cb3ff0a959c7')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

main()