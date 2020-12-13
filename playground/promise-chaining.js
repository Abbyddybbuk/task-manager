require('../src/db/mongoose')

const User = require('../src/models/user')

// User.findByIdAndUpdate('5fd4f484cc4bb934e0349eb3', { age: 34 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 34 })
// }).then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age: age })
    const count = await User.countDocuments({ age: age })
    return { user: user, count: count }
}

updateAgeAndCount('5fd4f484cc4bb934e0349eb3', 32).then((resultObject)=>{
  console.log('Updated User: ' + resultObject.user)
  console.log('Total number of records as per supplied age: ' + resultObject.count)
})