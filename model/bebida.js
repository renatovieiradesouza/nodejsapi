const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BebidaSchema = new Schema({
    nome: { type: String, required: true, lowercase: true },
    codigo: { type: String, required: true, lowercase: true },
    qtd: { type: String, required: true },
    valor: { type: String, required: true },
    tamanho: { type: String, required: true, lowercase: true },
    foto: { type: String, required: true, lowercase: true },
    categoriaId: { type: String, required: true }
});

module.exports = mongoose.model('Bebida', BebidaSchema);