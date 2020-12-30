const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.includes('password')) {
                throw new Error('Password should not contain password as text')
            }
        }
    },
    age: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

// This is how you define relationship between two models virtually (Not on DB)
// ref refers to the foreign entity/model
//localfield refers to which field from this entity(in this case User) would be used to estabilish relationship
//foreignfield refers to which field from the ref entity is being used for estabilishing relationship
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'ThisIsMySignature')

    user.tokens = user.tokens.concat({ token: token })
    await user.save()
    return token
}

// What we are doing here is re-writing the standard toJSON function which is changing
// the way User model is exposed in all entities; here because of delete password and token
// password and tokens object will not be part of JSON being thrown as response
userSchema.methods.toJSON = function () {
    const user = this

    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.statics.findByCrendentials = async (email, password) => {
    console.log(email)
    const user = await User.findOne({ email: email })
    console.log(user)
    if (!user) {
        throw new Error('Either wrong username or password')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Either wrong username or password')
    }
    return user
}
// Hash the password before save
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    console.log('User: Before save got executed')

    next()
})


// In case a user gets deleted; his or her tasks will also get deleted
userSchema.pre('remove', async function (next) {
    const user = this

    await Task.deleteMany({ owner: user._id })

    next()
})
const User = mongoose.model('User', userSchema)


module.exports = User