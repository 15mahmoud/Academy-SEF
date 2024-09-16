const mongoose = require('mongoose');

const messengerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    message: String,
    isArchived: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
},
    { versionKey: false }
);

const Messenger = mongoose.model('Messenger', messengerSchema);



module.exports = { Messenger };