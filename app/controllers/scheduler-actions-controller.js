import cron from 'cron';
import * as jobService from '../services/job-service';

var job = new cron.CronJob({
    cronTime: '*/30 * * * * *',
    onTick: jobService.execute(),
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