// MongoDB Operations
// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient

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

       db.collection('users').insertOne({
           _id: id,
           name: 'Naomi',
           age: 38
       }, (error, result) => {
           if (error) {
               return console.log('Unable to insert a record')
           }

           console.log(result.ops)
       })

    //    db.collection('users').insertMany([
    //        {
    //            name: 'Max Pareira',
    //            age: 39
    //        },{
    //            name: 'Noman Gonsalves',
    //            age: 23
    //        }
    //    ], (error, result) => {
    //        if (error) {
    //            return console.log('Data could not be inserted')
    //        }

    //        console.log(result.ops)
    //    })

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
})