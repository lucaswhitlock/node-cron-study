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
};

exports.stop = (req, res) => {
    if (!job.isRunning()) {
        res.status(403).send({
            message: 'O serviço já está parado!'
        });
    }
};

exports.refresh = (req, res) => {
    res.status(403).send({
        message: {
            lastDates: job.lastDates(),
            nextDates: job.nextDates()
        }
    });
};