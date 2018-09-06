import axios from 'axios';
import config from '../etc/api-config';
import status from '../models/status-fo-enum';

const api = () => {
    return axios.create({
        baseURL: config.api,
        timeout: 30000
    });
};

export default {
    getFOs() {
        return api().get("/fos/novos");
    },
    updateFO(id, fo) {
        return api().put("/fos/" + id, fo);
    }
};