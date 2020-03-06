const mongoose = require('mongoose');
const schema = mongoose.schema;

const UserSchema = new schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
