const express = require('express')
const router = express.Router()
const Task = require('../models/task')

// TASK App Endpoints
router.post('/tasks', async (req, res) => {
    const myTask = new Task(req.body)

    try {
        await myTask.save()
        res.status(201).send(myTask)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find()
        res.status(202).send(tasks)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/tasks/:id', async (req, res) => {
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

router.delete('/tasks/:id', async(req, res)=> {
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

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Payload sent' })
    }


    try {
        const task = await Task.findById(req.params.id)

        updates.forEach((update)=> task[update] = req.body[update] )

        await task.save()

        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send('No data found')
        }
        res.status(202).send(task)
    } catch (error) {
        res.status(500).send('No data found')
    }
})


module.exports = router