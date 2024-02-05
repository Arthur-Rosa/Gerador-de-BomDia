const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/contadorDB';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('error', (err) => {
    console.error('Erro na conexão com o Banco:', err);
});

mongoose.connection.once('open', () => {
    console.log('Conexão com o Banco estabelecida com sucesso.');
});

module.exports = mongoose;
