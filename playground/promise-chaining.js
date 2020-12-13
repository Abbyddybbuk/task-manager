require('../src/db/mongoose')

const User = require('../src/models/user')

User.findByIdAndUpdate('5fd4f484cc4bb934e0349eb3', { age: 34 }).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 34 })
}).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})