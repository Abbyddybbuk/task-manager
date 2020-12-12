const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true,
    useCreateIndex: true
})


const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const myTask = new Task({
    description: 'Exercise',
    completed: false
})

myTask.save().then(()=> {
   console.log(myTask)
}).catch((error)=> {
   console.log(error)
})