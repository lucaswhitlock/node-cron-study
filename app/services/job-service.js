import moment from 'moment';
import apiService from './api-service';
import foStatus from '../models/status-fo-enum';

const execute = async () => {
    console.log('Iniciando serviço. \nBuscando por FOs abertos...');
    try {
        fos = await apiService.getFOs();
        console.log(fos.length + ' FOs encontrados.');
        fos.array.forEach(fo => {
            if (diffDays(fo) > 2) {
                console.log('Atualizando FO: ' + fo._id);
                fo.tipoFO = foStatus.EXPIRADO;
                apiService.updateFO(fo._id, fo);
                console.log('Atualizado com sucesso!')
            }
        });
        console.log('Processo de atualização finalizado.');
    } catch (error) {
        console.log(error.message);
    }
}

function diffDays(day) {
    var today = moment(Date.now());
    return today.diff(moment(day), 'days');
}

export {
    execute
};