import React, { useState, useEffect } from 'react';
import { 
  TableContainer,
  Table, Paper, 
  TableHead, 
  TableCell, 
  TableBody, 
  TableRow } 
from '@material-ui/core';
import RegisterDialog from '../../components/RegisterDialog/index'

import { getPatients } from '../../Axios/Request'
import styles from './styles'

function Patients(){
    const [patients, setPatients] = useState([]);
 
    useEffect(() => {
      let pacientes = async () => {
        setPatients(await getPatients())
      } 
      pacientes();
    }, [])
 
    const classes = styles();

    return(
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell>Prontuario</TableCell>  
              <TableCell>Nome</TableCell>
              <TableCell>Sobrenome</TableCell>
              <TableCell>Data Nasc.</TableCell>
              <TableCell>RG</TableCell>
              <TableCell>CPF</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map(paciente => (
              <TableRow key={paciente.Prontuario}>
                <TableCell component="th" scope="row">
                  {paciente.Prontuario}
                </TableCell>
                <TableCell>{paciente.Prontuario}</TableCell>
                <TableCell>{paciente.Nome}</TableCell>
                <TableCell>{paciente.Sobrenome}</TableCell>
                <TableCell>{paciente.RG}</TableCell>
                <TableCell>{paciente.CPF}</TableCell>
                <TableCell>
                  <RegisterDialog edit={true} pront={paciente.Prontuario}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        
        
    );
}

export default Patients;