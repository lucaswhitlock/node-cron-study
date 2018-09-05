import mongoose from 'mongoose';
import dbconf from '../etc/database-config';
import fatoObservado from '../models/fo-schema';
import foStatus from '../models/status-fo-enum';

var execute = async function () {
    console.log('Tentando realizar a conexão na base de dados...');
    mongoose.connect(dbconf.URL_LOCAL, {
        useNewUrlParser: true
    }).then(() => {
        console.log('Conectado.');
    }).catch((err) => {
        console.log('Erro: ' + err);
    });
    console.log('Buscando FOs respondidos...')
    let fo = await fatoObservado.find({
        foStatus: foStatus.RESPONDIDO
    }).then((fo) => {
        console.log('FO encontrado: ' + fo);
    }).catch((err) => {
        console.log(err);
    });
    console.log('Desconectando da base de dados...');
    mongoose.disconnect();
    console.log('Desconectado');
}

export default execute;