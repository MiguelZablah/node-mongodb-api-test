const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

// User Schema created
var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    tokens: [{
        access: {
            type: String,
            require: true
        },
        token: {
            type: String,
            require: true
        }
    }]
});

// Instance Method for json
userSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

// Instance Method, use normal function to use this
userSchema.methods.generateAuthToken = function() {
    var user = this;
    var access = "auth";
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
    user.tokens = user.tokens.concat([{access, token}]);

    return user.save().then(() => {
        return token;
    });
};

// Model Method to find by token
userSchema.statics.findByToken = function(token) {
    var User = this;
    var decoded;

    try{
        decoded = jwt.verify(token, 'abc123');
    }catch(e){
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

// Model Method to check if user exist with email and pass validation
userSchema.statics.findByCredentials = function(email, password) {
    var User = this;

    return User.findOne({email}).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (err) {
                    return reject();
                }
                return resolve(user);
            });
        })
    });

};

// Mideleware for save
userSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    }else{
        next();
    }
});

// Created a User Model
var User = mongoose.model('User', userSchema);

module.exports = {User};