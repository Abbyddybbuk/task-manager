// MongoDB Operations
const { MongoClient, ObjectID } = require('mongodb')

const id = new ObjectID();
console.log(id)

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to the database')
    }

    const db = client.db(databaseName)

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Nodejs course',
    //         completed: false
    //     }, {
    //         description: 'Docker course',
    //         completed: false
    //     }, {
    //         description: 'Astro-physics course',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Data could not be inserted')
    //     }

    //     console.log(result.ops)
    // })

    // findOne returns the first entry
    // db.collection('users').findOne({ age: 38, name: 'Naomi'}, (error, user)=> {
    //     if (error) {
    //         return console.log('Could not fetch a record')
    //     }

    //     console.log(user)
    // })

    // // Search by ObjectID requires passing ID with new Object
    // db.collection('users').findOne({ _id: new ObjectID("5fb26fc502bfcf664cf58b70") }, (error, user) => {
    //     if (error) {
    //         return console.log('Could not fetch a record')
    //     }

    //     console.log(user)
    // })

    // // find returns a cursor so that you can read the response accordingly
    // db.collection('users').find({ age: 38 }).toArray((error, users) => {
    //     console.log(users)
    // })

    // db.collection('users').find({ age: 38 }).count((error, count) => {
    //     console.log(count)
    // })

    // db.collection('tasks').findOne({_id: new ObjectID("5fb27a0101a7dd2f547ab175")}, (error, task)=>{
    //      if (error) {
    //          return console.log('Could not find data')
    //      }
    //      console.log(task)
    // })

    // db.collection('tasks').find({ completed: false}).toArray((error, tasks)=> {
    //     console.log(tasks)
    // })

    // db.collection('users').updateOne({
    //     _id: new ObjectID("5fb26eda69a3ad4da4f5b2f2")
    // }, {
    //     $set: {
    //         name: 'Ankur'
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
    // db.collection('users').updateOne({
    //     _id: new ObjectID("5fb26eda69a3ad4da4f5b2f2")
    // }, {
    //     $inc: {
    //         age: -1
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('users').deleteMany({
    //     age: 37
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    db.collection('tasks').deleteMany({
        description: 'Nodejs course'
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

})