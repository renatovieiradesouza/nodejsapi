const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    created: { type: Date, default: Date.now }
});

//Pre save para encriptar senha
//Não use função de seta (arrow function) nesse caso, pois o this trabalha de maneira de diferente e não deria certo para esse objetivo
UserSchema.pre('save', async function (next) { 
    let user = this;
    //Valida se teve modificação no campo password, caso não ele continua sem encriptar
    if(!user.isModified('password')) return next();

    //Se passar, ele vai usar o bcrypt
    user.password = await bcrypt.hash(user.password, 10);
    return next();
});

module.exports = mongoose.model('User', UserSchema);