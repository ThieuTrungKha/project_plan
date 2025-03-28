const { default: mongoose } = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    photoUrl: {
        type: String,

    },
    updateAt: {
        type: Date,
        default: Date.now
    },
},)

const UserModel = mongoose.model('users', UserSchema)

module.exports = UserModel