const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoriaSchema = new Schema({
    nome: { type: String, required: true },
    fotoUrl: { type: String },
    created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Categoria', CategoriaSchema);