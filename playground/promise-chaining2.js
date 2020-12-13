require('../src/db/mongoose')

const Task = require('../src/models/task')

Task.findByIdAndDelete('5fd483b161293323b0750a8f').then((task)=>{
    console.log(task)
    return Task.find({completed: false})
}).then((tasks)=>{
    console.log(tasks)
    return Task.countDocuments({completed: false})
}).then((result)=>{
    console.log('NUMBER OF INCOMPLETE TASKS: ' + result)
}).catch((error)=>{
    console.log(error)
})