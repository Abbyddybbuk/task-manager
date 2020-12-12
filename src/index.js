const express = require('express')
require('./db/mongoose')

const User = require('./models/user')
const Task = require('./models/task')

const app = express()
app.use(express.json())

const port = process.env.PORT || 3000

// User App Endpoints
app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.status(201).send(user)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

app.get('/users', (req, res) => {
    User.find().then((users) => {
        res.status(202).send(users)
    }).catch((error) => {
        res.status(500).send
    })
})

app.get('/users/:id', (req, res) => {
    const _id = req.params.id

    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send('No data found')
        }

        res.status(202).send(user)
    }).catch((error) => {
        res.status(500).send()
    })
})


// TASK App Endpoints
app.post('/tasks', (req, res) => {
    const myTask = new Task(req.body)

    myTask.save().then(() => {
        res.status(201).send(myTask)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

app.get('/tasks', (req, res) => {
    Task.find().then((tasks) => {
        res.status(202).send(tasks)
    }).catch((error) => {
        res.status(500).send('No data found')
    })
})

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id

    Task.findById(_id).then((task) => {
        if (!task) {
            return res.status(404).send('No data found')
        }

        res.status(202).send(task)
    }).catch((error) => {
        res.status(500).send('No data found')
    })
})

app.listen(port, () => {
    console.log('Listening to port' + port)
})