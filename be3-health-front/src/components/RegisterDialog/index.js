import React, { useState, useRef } from 'react';
import { 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    Grid,
    IconButton,
} from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { Form } from '@unform/web';
import InputMask from 'react-input-mask';
import moment from 'moment'

import { getHPlan, getPatient, editPatient, regPatient} from '../../Axios/Request'
import styles from './styles'
import { Input }  from './Inputs'
import Select from './Selector';

function RegisterDialog({ edit, pront }) {
  // handle modal state
  const [open, setOpen] = useState(false);
  const [conv, setConv] = useState([]);

  const formRef = useRef(null);

  const [prontuario, setProntuario] = useState('');
  const [paciente, setPaciente] = useState({});

  const convenio = async () => {
    let tempConv = await getHPlan();
    let conv =  [];

    tempConv.map(data => {
      let obj = { 
        value : data.ID_Convenio,
        label: `${data.Empresa}`
       };

       conv.push(obj);
    })

    setConv(conv);
  } 

  const getPaciente = async (p) => {
    let tempP = await getPatient(p)
    setProntuario(p);
    // parsing iso date to DD/MM/YYYY
    let tempDt = moment(tempP[0].Dt_Nasc).add(1,'d');
    tempDt = tempDt.format('DD/MM/YYYY')
    tempP[0].Dt_Nasc = tempDt;

    // fetchin convenios again 
    let tempConv = await getHPlan();
    let conv =  [];

    tempConv.map(data => {
      let obj = { 
        value : data.ID_Convenio,
        label: `${data.Empresa}`
       };

       conv.push(obj);
    })
  
    handleClickOpen();

    setPaciente(tempP[0]);
    //Setting select component value from db
    setSelectedGenre(tempP[0].Sexo === 1 ? genre[1] : genre[0])
    //Setting select component value from db
    setSelectedConv(conv.find(c => c.value === tempP[0].ID_Convenio))
    
    formRef.current.setData({
      Prontuario: tempP[0].Prontuario,
      Nome: tempP[0].Nome,
      Sobrenome: tempP[0].Sobrenome,
      Dt_Nasc: tempP[0].Dt_Nasc,
      RG: tempP[0].RG,
      CPF: tempP[0].CPF,
      Fone_Res: tempP[0].Fone_Res,
      Email: tempP[0].Email,
      Celular: tempP[0].Celular,
      Nome_Mae: tempP[0].Nome_Mae,
      N_Carteirinha: tempP[0].N_Carteirinha
    })    
    
  }
  
  const genre = [
    { value: 0, label: "Feminino" },
    { value: 1, label: "Masculino" },
  ]
  
  const handleClickOpen = () => {
    convenio();
    setOpen(true);
    
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (data) => {
    // parsing date for db
    let date = moment(data.Dt_Nasc, 'DD/MM/YYYY');
    data.Dt_Nasc = date.format('YYYY-MM-DD');
     
    if(edit){
      data.Sexo = data.Sexo === "" ? paciente.Sexo : selectedGenre.value;
      data.ID_Convenio = data.ID_Convenio === null ? paciente.ID_Convenio : selectedConv.value;
      let response = await editPatient(data.Prontuario, data)

    }
    else {
      let response = await regPatient(data)
   
    }
    
    handleClose();
    window.location.reload();
  }

  const [selectedGenre, setSelectedGenre] = useState(paciente.Sexo);
  const handleGenreChange = selectedGenre => {
    setSelectedGenre(selectedGenre);
    console.log(selectedGenre)
  }

  const [selectedConv, setSelectedConv] = useState(paciente.Sexo);
  const handleConvChange = selectedConv => {
    setSelectedConv(selectedConv);
    console.log(selectedConv)
  }

  const classes = styles();

  return (
    <div>
      {/* checks if user will edit the patient */}
      {(edit === true ?
        <IconButton onClick={() => {getPaciente(pront)} } > 
          <EditRoundedIcon /> 
        </IconButton>
      : /* else */
        <Button
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<PersonAddIcon />}
            onClick={handleClickOpen}
        >
            Cadastrar Paciente
        </Button>
      )}      
      <Dialog
        open={open}
        onClose={handleClose}
        disableBackdropClick
      >
        <DialogTitle style={{paddingBottom: '0px'}}>
          {(edit === true ? 'Editar Paciente' : 'Cadastrar Novo Paciente')}
        </DialogTitle>
        <Form onSubmit={handleSubmit} ref={formRef}/* initialData={paciente} */>
          <DialogContent>     
            <Grid container className={classes.root}>
              {(prontuario === '' ? null : 
                <Grid item sm={12}>
                <Input label="Prontuario" name="Prontuario" disabled/>
                </Grid>
              )}
              
              <Grid item sm={6} xs={12}>
                <Input label="Nome" name="Nome" required/>
              </Grid>
                
              <Grid item sm={6} xs={12}>
                <Input label="Sobrenome" name="Sobrenome" required/>  
              </Grid>
    
              <Grid item sm={6} xs={12}>
                <InputMask mask={(edit === true ? "" : "99/99/9999")}>
                  {() => <Input label="Data de Nascimento" name="Dt_Nasc"/>}
                </InputMask>
              </Grid>

              <Grid item sm={6} xs={12}  >
                <Select label="Genero" name="Sexo" 
                options={genre} 
                value={selectedGenre}
                onChange={handleGenreChange}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <InputMask mask={(edit === true ? "" : "99.999.999-9")}>
                  {() => <Input label="RG" name="RG"/> }
                </InputMask>    
              </Grid>

              <Grid item sm={6} xs={12}>
                <InputMask mask={(edit === true ? "" : "999.999.999-99")}>
                  {() => <Input label="CPF" name="CPF"/>}
                </InputMask>
                
              </Grid>

              <Grid item sm={6} xs={12}>
                <Input label="Nome da Mãe" name="Nome_Mae"/>
              </Grid>

              <Grid item sm={6} xs={12}>
                <Input label="Email" name="Email"/>
              </Grid> 

              <Grid item sm={6} xs={12}>
                <InputMask mask={(edit === true ? "" : "(99) 9999-9999")}>
                  {() => <Input label="Telefone Fixo" name="Fone_Res"/>}
                </InputMask>
              </Grid>

              <Grid item sm={6} xs={12}>
                <InputMask mask={(edit === true ? "" : "(99) 99999-9999")}>
                  {() => <Input label="Celular" name="Celular" required/>}
                </InputMask>
              </Grid>

              <Grid item sm={6} xs={12}>
                <Select name="ID_Convenio" label="Convenio" 
                options={conv}
                value={selectedConv}
                onChange={handleConvChange}
                />
                
              </Grid>

              <Grid item sm={6} xs={12}>
                <Input label="Carteirinha do Convenio" name="N_Carteirinha"/>
              </Grid>

            </Grid>      
          </DialogContent>
          <DialogActions>
            <Grid container>
              <Grid item sm={12} xs={12} align={'center'}>
                <Button onClick={handleClose} color="primary">
                  Cancelar
                </Button>
                <Button type="submit" color="primary">
                 {(edit === true ? 'Editar' : 'Cadastrar')} 
                </Button>
              </Grid>  
            </Grid>
          </DialogActions>
        </Form>   
      </Dialog>
    </div>
  );
}

export default RegisterDialog;