const express = require('express')
const router = express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')
// TASK App Endpoints
router.post('/tasks', auth, async (req, res) => {
    const myTask = new Task({
        ...req.body,// ... this is an es6 operator which is copying the req body to task object
        owner: req.user._id
    })

    try {
        await myTask.save()
        res.status(201).send(myTask)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/tasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find({owner: req.user._id})
        // await req.user.populate('tasks').execPopulate()
        //res.send(req.user.tasks)
        res.status(202).send(tasks)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({_id: _id, owner: req.user._id})
        if (!task) {
            return res.status(404).send('No data found')
        }
        res.status(202).send(task)
    } catch (error) {
        res.status(500).send('No data found')
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        // const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})

        if (!task) {
            return res.status(404).send('No data found to be deleted')
        }

        res.status(202).send(task)
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Payload sent' })
    }


    try {
        // const task = await Task.findById(req.params.id)
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})

        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send('No data found')
        }

        updates.forEach((update) => task[update] = req.body[update])

        await task.save()        
        res.status(202).send(task)
    } catch (error) {
        res.status(500).send('No data found')
    }
})


module.exports = router