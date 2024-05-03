const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    age: {
        type: Number,
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String
    }
}, { versionKey: false });

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
