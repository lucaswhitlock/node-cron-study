import cron from 'cron';
import mongoose from 'mongoose';
import moment from 'moment';
import dbconf from '../etc/database-config';
import fatoObservado from '../models/fo-schema';
import foStatus from '../models/status-fo-enum';

var job = new cron.CronJob({
    cronTime: '*/30 * * * * *',
    onTick: async () => {
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
                        fatoObservado.findOneAndUpdate({ foStatus: foStatus.EXPIRADO }, { _id: fo._id });
                    }
                    console.log("FO atualizado: " + fo);
                });
            }).catch((err) => {
                console.log(err);
            });
            console.log('Atualizações realizadas com sucesso. \nFinalizando processo.');
            mongoose.disconnect();
            console.log('Processo finalizado.');
        },
        start: true,
        runOnInit: true
});

exports.start = (req, res) => {
    if (job.running) {
        res.status(403).send({
            message: 'O serviço já está em funcionamento!'
        });
    } else {
        console.log('Servico iniciado por usuario');
        job.start();
        if (job.running) {
            res.status(200).send({
                message: 'Serviço iniciado com sucesso.'
            });
        }
    }
};

exports.stop = (req, res) => {
    if (!job.running) {
        res.status(403).send({
            message: 'O serviço já está parado!'
        });
    } else {
        console.log('Servico parado por usuario.');
        job.stop();
        if (!job.running) {
            res.status(200).send({
                message: 'Serviço parado com sucesso.'
            });
        }
    }
};

exports.refresh = (req, res) => {
    res.status(403).send({
        message: {
            sendAt: job.nextDates()
        }
    });
};

function diffDays(day) {
    var today = moment(Date.now());
    return today.diff(moment(day), 'days');
}