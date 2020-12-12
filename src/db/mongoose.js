const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

// const Task = mongoose.model('Task', {
//     description: {
//         type: String
//     },
//     completed: {
//         type: Boolean
//     }
// })

// const myTask = new Task({
//     description: 'Exercise',
//     completed: false
// })

// myTask.save().then(()=> {
//    console.log(myTask)
// }).catch((error)=> {
//    console.log(error)
// })

const User = mongoose.model('User', {
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
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
    }
})

const newUser = new User({
    name: ' Abhijeet ',
    email: 'Abhijeet@example.com',
    password: 'passab56',
    age: 35
})

newUser.save().then(()=> {
   console.log(newUser)
}).catch((error)=>{
   console.log(error)
})