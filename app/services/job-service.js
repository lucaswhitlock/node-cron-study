import mongoose from 'mongoose';
import moment from 'moment';
import dbconf from '../etc/database-config';
import fatoObservado from '../models/fo-schema';
import foStatus from '../models/status-fo-enum';

const execute = async () => {
    console.log('Tentando realizar a conexão na base de dados...');
    await mongoose.connect(dbconf.URL_LOCAL).then(() => {
        console.log('Conectado.');
    }).catch((err) => {
        console.log('Erro: ' + err);
    });
    console.log('Buscando FOs respondidos...')
    let fo = await fatoObservado.find({
        foStatus: foStatus.ABERTO
    }).then((fos) => {
        console.log('[' + fos.length + '] FOs encontrados.');
        console.log('Iniciando atualizacao dos FOs...');
        fos.forEach((fo) => {
            console.log('Atualizando FO com id: [' + fo._id + ']');
            console.log('Diferença de dias até hoje: ' + diffDays(fo.createdAt));
            if (diffDays(fo.createdAt) > 2) {
                fatoObservado.findOneAndUpdate({
                    foStatus: foStatus.EXPIRADO
                }, {
                    _id: fo._id
                });
            }
            console.log("FO atualizado: " + fo);
        });
    }).catch((err) => {
        console.log(err);
    });
    console.log('Atualizações realizadas com sucesso. \nFinalizando processo.');
    mongoose.disconnect();
    console.log('Processo finalizado.');
}

function diffDays(day) {
    var today = moment(Date.now());
    return today.diff(moment(day), 'days');
}

export { execute };