const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Testing id on db collection todos
var id = '5ae0b081959b08383877e2b811';

// Check if id is valid
// if(!ObjectID.isValid(id)){
//     console.log('Id is not valid');
// }

// Quer find all that mache id
// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos: ', todos);
// });

// Query find first one
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo: ', todo);
// });

// Query find by id with validations
// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo by id: ', todo);
// }).catch((e) => console.log(e));

User.findById('5ae098c0ea70ac3178d2b079').then((user) => {
    if (!user) {
        return console.log('Id not found');
    }
    console.log('User by id: ', user);
}).catch((e) => console.log(e));