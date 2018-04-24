// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // Es6 obj destruction

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    
    console.log('Connect to MongoDb server');
    const db = client.db('TodoApp');

    // Change Todo to complete true
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID("5adfafa98f892b2bc9de763e")
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    // Update User name and age
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID("5adf9e346bb06d1ce47585c0")
    },{
        $set: {name: 'Miguel'},
        $inc:{age: 1}
    }, {
        returnOriginal: false
    }).then((res) => {
        console.log(res);
    });

    client.close();
});