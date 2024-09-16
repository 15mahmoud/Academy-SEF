const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    subscribedAt: { type: Date, default: Date.now },
}, {
    versionKey: false
});

const Newsletter = mongoose.model('Newsletter', newsletterSchema);

module.exports = {
    Newsletter
}