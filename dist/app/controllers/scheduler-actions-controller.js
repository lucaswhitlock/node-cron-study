var _this = this;

import cron from 'cron';

let job = new cron.CronJob({
    cronTime: new Date(),
    onTick: () => {
        console.log('Testando Scheduler');
    },
    start: true,
    timeZone: 'Brazil/Manaus'
});

exports.start = (req, res) => {
    if (_this.job.isRunning()) {
        res.status(403).send({
            message: 'O serviço já está em funcionamento!'
        });
    }
};

exports.stop = (req, res) => {
    if (!_this.job.isRunning()) {
        res.status(403).send({
            message: 'O serviço já está parado!'
        });
    }
};

exports.refresh = (req, res) => {
    res.status(403).send({
        message: {
            lastDates: _this.job.lastDates(),
            nextDates: _this.job.nextDates()
        }
    });
};