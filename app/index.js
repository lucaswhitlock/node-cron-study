//frameworks
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

//rotas
import scheduler from './routes/scheduler-actions-route';

let port = process.env.PORT || 3000;

var server = express();

server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(bodyParser.json());
server.use(cors());

server.get("/", (req, res) => {
    res.status(200).send({
        message: 'Bem vindo ao serviço de scheduling para o app CMCG'
    });
});

server.use(scheduler);
server.listen(port);