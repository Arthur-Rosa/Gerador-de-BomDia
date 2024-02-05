const mongoose = require('../configs/imageConfig');

const contadorSchema = new mongoose.Schema({
    contagem: Number
});

const Contador = mongoose.model('Contador', contadorSchema);

module.exports = Contador;