import axios from 'axios';

const Datacredito_API_BASE_URL = "http://localhost:8093/api/Datacreditos";

class Servicio {

    getDatacreditos(){
        return axios.get(Datacredito_API_BASE_URL);
    }

    createDatacredito(Datacredito){
        return axios.post(Datacredito_API_BASE_URL, Datacredito);
    }

    getDatacreditoById(DatacreditoId){
        return axios.get(Datacredito_API_BASE_URL + '/' + DatacreditoId);
    }

    updateDatacredito(Datacredito, DatacreditoId){
        return axios.put(Datacredito_API_BASE_URL + '/' + DatacreditoId, Datacredito);
    }

    deleteDatacredito(DatacreditoId){
        return axios.delete(Datacredito_API_BASE_URL + '/' + DatacreditoId);
    }
}

export default new Servicio()