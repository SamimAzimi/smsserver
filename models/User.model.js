const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const User = Schema({
    "Name": String,
    "ID": String,
    "Password": String,
    "Rights": {
        "Read": Boolean,
        "Write": Boolean,
        "Execute": Boolean
    }
})


module.exports = mongoose.model('UserModel', User)