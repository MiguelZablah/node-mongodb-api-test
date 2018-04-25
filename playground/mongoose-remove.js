const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Remove all content from Todo collection
Todo.remove({}).then((results) => {
    console.log(results);
});

Todo.findOneAndRemove({text: "text here"}).then((todo) => {
    console.log(todo);
});

Todo.findByIdAndRemove('1231asd123asd').then((todo) => {
    console.log(todo);
});