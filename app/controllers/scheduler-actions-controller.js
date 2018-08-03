import cron from 'cron';

let job = new cron.CronJob({
    cronTime: '* * * * * *',
    onTick: () => {
        console.log('Testando CronJS.');
    }, 
    start: true,
    runOnInit: true
});

exports.start = (req, res) => {
    if (job.isRunning()) {
        res.status(403).send({
            message: 'O serviço já está em funcionamento!'
        });
    }
    job.start();
    res.status(200).send({
        message: 'Serviço startado com sucesso!'
    });
};

exports.stop = (req, res) => {
    if (!job.isRunning()) {
        res.status(403).send({
            message: 'O serviço já está parado!'
        });
    }
    job.stop();
    res.status(200).send({
        message: 'Serviço parado com sucesso!'
    });
};

exports.refresh = (req, res) => {
    res.status(403).send({
        message: {
            sendAt: job.sendAt()
        }
    });
};