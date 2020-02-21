const express = require('express');
const cors = require('cors');
const bd = require('./bdConn');

const app = express();

app.use(cors(), express.json());
 
app.get('/pacientes', (req, res) => {

    bd.fetchAll().then(data => {
        res.send(data);
    })    
})

app.get('/convenios', (req, res) => {

    bd.fetchConv().then(data => {
        res.send(data);
    })  
})

app.get('/paciente/:id', (req, res) => {

    let id = req.params.id;
    console.log(id);
    bd.fetch(id).then(data => {
        res.send(data);
    })  
})

app.get('/convenio/:id', (req, res) => {

    let id = req.params.id;
    console.log(id);
    bd.fetchConvById(id).then(data => {
        res.send(data);
    })  
})

app.post('/paciente', (req, res) => {

    let clientJson = req.body.patient;
    console.log(clientJson)
    bd.insert(clientJson).then(data => {
        res.send(data);
    }) ;
})

app.put('/paciente/:id', (req, res) => {

    let id = req.params.id;
    let clientJson = req.body;
    bd.update(id, clientJson).then(data => {
        res.send(data);
    })  
})
 
app.listen(3001, function() {
    console.log('Escutando em http://192.168.0.22:3001');
});
