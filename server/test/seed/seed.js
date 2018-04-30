const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

// Create Seed for db Users
const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
    _id: userOneId,
    email: 'miguel@gmail.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id:userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
    }]
},{
    _id: userTwoId,
    email: 'juan@gmail.com',
    password: 'userTwoPass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id:userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
    }]
}];

// Create Seed for db Todos
const todos = [{
        _id: new ObjectID(),
        text: "First test todo",
        _creator: userOneId
    }, {
        _id: new ObjectID(),
        text: "Second test todo",
        completed: true,
        completedAt: 333,
        _creator: userTwoId
}];

// Delete all content in collection Todo in db, then populate Todos
const populateTodos = (done) => {
    // Wipe collection todos in db
    Todo.remove({}).then(() => {
        // Insert seed to db
        Todo.insertMany(todos);
    }).then(() => done());
};

// Delete all content in collection User in db, then populate Users
const populateUsers = (done) => {
    User.remove({}).then(() => {
        userOne = new User(users[0]).save();
        userTwo = new User(users[1]).save();

        return Promise.all([userOne,userTwo]);
    }).then(() => done());
};


module.exports = {todos, populateTodos, users, populateUsers};