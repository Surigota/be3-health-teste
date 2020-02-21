import React from 'react';
import { Typography, Paper, Grid } from '@material-ui/core';

import styles from './styles';
import RegisterDialog from '../../components/RegisterDialog/index'
import Patient from '../../components/Patients/index'

function Cadastro() {

    const classes = styles();

    return(
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container alignContent={"center"}>
                    <Grid item md={12}>
                        <Typography variant="h4"> Listagem de Pacientes </Typography>
                        <RegisterDialog edit={false}/>
                    </Grid>
                    <Grid item md={12} style={{marginTop: 5}}>
                        <Patient/>
                    </Grid>
                </Grid>   
            </Paper>
        </div>      
    )
}

export default Cadastro;