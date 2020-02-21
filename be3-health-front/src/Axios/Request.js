const axios = require('axios')
// trocar para o ip local
axios.defaults.baseURL = 'http://localhost:3001';

async function getPatients(){
    try {
        let res = await axios.get('/pacientes');
        return res.data;

    }   catch (error) {
        console.error(error);
    }
}

async function getPatient(pront){
    try {
        let res = await axios.get(`/paciente/${pront}`);
        return res.data;

    }   catch (error) {
        console.error(error);
    }
}

async function getHealthPlan(){
    try {
        let res = await axios.get('/convenios');
        return res.data;

    }   catch (error) {
        console.error(error);
    }
}

//getHealthPlanById(1)

async function getHealthPlanById(id){
    try {
        let res = await axios.get(`convenio/${id}`);
        console.log(res.data);
        return res.data;

    }   catch (error) {
        console.error(error);
    }
}

async function registerPatient(patient){
    try {
        let res = await axios.post('/paciente', {patient})
        return res.status;

    } catch (error) {
        console.error(error);
    }
}

async function editPatient(pront, patient){
    try {
        let res = await axios.put(`/paciente/${pront}`, patient)
        return res.status;
    }
    catch (error) {
        console.error(error);
    }
}

module.exports = {
    getPatients: getPatients,
    getPatient: getPatient,
    getHPlan: getHealthPlan,
    getHPlanId: getHealthPlanById,
    regPatient: registerPatient,
    editPatient: editPatient,
}