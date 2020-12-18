const express = require('express')
require('./db/mongoose')

const User = require('./models/user')
const Task = require('./models/task')

const app = express()

// to get the input payload json
app.use(express.json())

const port = process.env.PORT || 3000

// User App Endpoints
app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get('/users', async (req, res) => {

    try {
        const users = await User.find()
        res.status(202).send(users)
    } catch (error) {
        res.status(500).send()
    }
})

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send('No data found')
        }

        res.status(202).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send('No data found to be deleted')
        }
        res.status(202).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Payload sent' })
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!user) {
            return res.status(404).send()
        }
        res.status(202).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})


// TASK App Endpoints
app.post('/tasks', async (req, res) => {
    const myTask = new Task(req.body)

    try {
        await myTask.save()
        res.status(201).send(myTask)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find()
        res.status(202).send(tasks)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send('No data found')
        }
        res.status(202).send(task)
    } catch (error) {
        res.status(500).send('No data found')
    }
})

app.delete('/tasks/:id', async(req, res)=> {
    try {
      const task = await Task.findByIdAndDelete(req.params.id)

      if (!task) {
          return res.status(404).send('No data found to be deleted')
      }

      res.status(202).send(task)
    } catch(error) {
       res.status(500).send('Internal Server Error')
    }
})

app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Payload sent' })
    }


    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send('No data found')
        }
        res.status(202).send(task)
    } catch (error) {
        res.status(500).send('No data found')
    }
})

app.listen(port, () => {
    console.log('Listening to port' + port)
})