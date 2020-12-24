const express = require('express')
const router = express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
// User App Endpoints
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

//configure multer for user avatar
const userUpload = multer({
    dest: 'avatars'
})

router.post('/users/me/avatar', userUpload.single('avatar'), (req, res) => {
    res.send()
})


router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCrendentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        //user response being rewritten via toJSON() method written in user.js from models
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        console.log('************LOGOUT BEING EXECUTED*******')
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token)
        await req.user.save()
        res.status(202).send('Logged out successfully')
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async(req, res) => {
    try {
        req.user.tokens = []
        console.log(req.user.tokens)
        await req.user.save()
        res.status(202).send('Logged out of all sessions')
    } catch (error) {
        res.status(500).send()
    }
 })

router.get('/users/me', auth, async (req, res) => {
    // try {
    //     const users = await User.find()
    //     res.status(202).send(users)
    // } catch (error) {
    //     res.status(500).send()
    // }
    res.status(202).send(req.user)

})

// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id

//     try {
//         const user = await User.findById(_id)
//         if (!user) {
//             return res.status(404).send('No data found')
//         }

//         res.status(202).send(user)
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })

router.delete('/users/me', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)//req.user coming from auth
        // if (!user) {
        //     return res.status(404).send('No data found to be deleted')
        // }
        await req.user.remove()
        res.status(202).send(req.user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Payload sent' })
    }

    try {

        // const user = await User.findById(req.user._id)//user coming from auth middleware

        updates.forEach((update) => req.user[update] = req.body[update])

        await req.user.save()
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        res.status(202).send(req.user)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router