const sql = require('mssql');

// configs da conexão com o banco
const conf = {
    user: 'natan.castelhano',
    password: 'ProcSeletivo#2020',
    server: 'db_sql.be3.co',
    port: 1515,
    database: 'DB8765',
}

// criando nova 
const pool = new sql.ConnectionPool(conf);

pool.on('error', err => {
    console.log(err);
})

async function fetchAllClients() {
   
    const conn = pool.connect();
    await conn;
    try {
        let request = pool.request();
        let query = 'SELECT * FROM Clientes';

        let result = await request.query(query);
        (await conn).close();
        return result.recordset;
        
    } catch (err) {
        console.error('SQL error', err)
    }
}

async function fetchAllConv(){

    const conn = pool.connect();
    await conn;
    try {
        let request = pool.request();
        let query = 'SELECT * FROM Convenios';

        let result = await request.query(query);
        (await conn).close();
        return result.recordset;
        
    } catch (err) {
        console.error('SQL error', err)
    }
}

fetchConvId(1);

async function fetchConvId(id){

    const conn = pool.connect();
    await conn;
    try {
        let request = pool.request(id);
        let query = `SELECT * FROM Convenios WHERE ID_Convenio = ${id}`;

        let result = await request.query(query);
        (await conn).close();
        return result.recordset;
        
    } catch (err) {
        console.error('SQL error', err)
    }
}

// busca um cliente específico através do prontuario
async function fetchClient(pront){

    const conn = pool.connect();
    await conn;
    try {
        let request = pool.request();
        let query = `SELECT * FROM Clientes WHERE Prontuario = ${pront};`;

        let result = await request.query(query);
        (await conn).close();
        return result.recordset;
        
    } catch (err) {
        console.error('SQL error', err)
    }
}

// cliente info teste
var cliente = {
    Nome: 'xesque',
    Sobrenome: 'jhonson',
    Dt_Nasc: '2018-06-26',
    RG: '',
    CPF: '',
    Sexo: 0,
    Fone_Res: '',
    Email: '',
    ID_Convenio: 3,
    N_Carteirinha: '',
    Celular: '',
    Nome_Mae: ''
}

var cliente2 = {
Nome: 'Natan',
  Sobrenome: 'Castelhano',
  Dt_Nasc: '26/04/1999',
  Sexo: 1,
  RG: '53.984.555-3',
  CPF: '476.042.018-55',
  Nome_Mae: 'Aparecida',
  Email: 'email@email',
  Fone_Res: '(11) 3782-9917',
  Celular: '(11) 99975-6375',
  ID_Convenio: 7,
  N_Carteirinha: '321654987'
}

//insertClient(cliente2);

// função de persistencia no banco
async function insertClient(c) {

    const conn = pool.connect();
    await conn;
    try {
        let request = pool.request();
        let subQueryCPF = c.CPF === '' ? '' : `IF NOT EXISTS (SELECT * FROM Clientes WHERE CPF = '${c.CPF}')` ;
        let subQueryConv = c.ID_Convenio === '' ? null : c.ID_Convenio ;
        let query = ` ${subQueryCPF}
        INSERT INTO Clientes (Nome, Sobrenome, Dt_Nasc, RG, CPF, Sexo, Fone_Res, Email, ID_Convenio, N_Carteirinha, Celular, Nome_Mae)
        VALUES ('${c.Nome}', '${c.Sobrenome}', '${c.Dt_Nasc}', '${c.RG}', '${c.CPF}', ${c.Sexo}, '${c.Fone_Res}', '${c.Email}', ${subQueryConv}, '${c.N_Carteirinha}', '${c.Celular}', '${c.Nome_Mae}');`;

        let result = await request.query(query);
        (await conn).close();
        return result;
        
    } catch (err) {
        console.error('SQL error', err)
    }

}

async function editClient(pront, c) {
    console.log(c)
    const conn = pool.connect();
    await conn;
    try {
        let request = pool.request();
        let subQueryConv = c.ID_Convenio === '' ? null : c.ID_Convenio ;
        let query = `UPDATE Clientes
        SET Nome='${c.Nome}', Sobrenome='${c.Sobrenome}', Dt_Nasc='${c.Dt_Nasc}', RG='${c.RG}', CPF='${c.CPF}', Sexo=${c.Sexo}, Fone_Res='${c.Fone_Res}', Email='${c.Email}', ID_Convenio=${subQueryConv}, N_Carteirinha='${c.N_Carteirinha}', Celular='${c.Celular}', Nome_Mae='${c.Nome_Mae}'
        WHERE Prontuario= ${pront};`

        let result = await request.query(query);
        (await conn).close();
        return result;
        
    } catch (err) {
        console.error('SQL error', err)
    }
}
 
module.exports = {
    fetchAll: fetchAllClients,
    fetchConv: fetchAllConv,
    fetchConvById: fetchConvId,
    fetch: fetchClient,
    insert: insertClient,
    update: editClient,
}