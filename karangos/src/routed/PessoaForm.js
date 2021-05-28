import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputMask from 'react-input-mask';
import { Toolbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = makeStyles(() => ({
  form: {
    maxWidth: '80%',
    margin: ' auto',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    '& .MuiFormControl-root':{
      minWidth: '200px',
      maxWidth: '500px',
      marginBottom: '24px'
    }
  },
  toolbar: {
    margintTop: '36px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around'
  },
  checkebox: {
    alignItems: 'center'
  }
}))

const formatChars = {
  'A': '[A-Za-z]',
  '0': '[0-9]',
}

// Máscaras para CPF e Uf.
const CPFMask = '000.000.000-00';
const NumMask = '0000';
const UfMask = 'AA';
const TelefoneMask = '(00) 0000-0000'

// Máscara para CPF: '000.000.000-00'
// Máscara par CNPJ: '00.000.000/0000-00'

export default function PessoasForm() {
  const classes = useStyles()

  const [pessoa, setPessoa] = useState({
    id: null,
    nome: '',
    cpf: '',
    rg: '',
    logradouro: '',
    num_imovel: '',
    complemento: '',
    bairro: '',
    municipio: '',
    uf: '',
    telefone: '',
    email: '',
  })
  const [currentId, setCurrentId] = useState(); // utilizado apenas para debug
  //const [importadoChecked, setImportadoChecked] = useState()

  function handleInputChange(event, property) {

    // Se houver Id no event.target, ele será p nome da propriedade
    // senão, usaremos o valor do segundo parâmetro
    if(event.target.id) property = event.target.id 

    if(property === 'uf'){
      setPessoa({...pessoa, [property]: event.target.value.toUpperCase()})
    }
    else{
      setCurrentId(event.target.id)
      setPessoa({...pessoa, [property]: event.target.value})
    }
  }

  async function saveData(){
    try{
      await axios.post('https://api.faustocintra.com.br/clientes', pessoa)
      alert('Dados do Cliente salvos com sucesso!')
      // A FAZER: retornar à página de listagem
    }
    catch(error) {
      alert('ERRO: ' + error.message)
    }
  }

  function handleSubmit(event){

    event.preventDefault() // Evita o recarregamento da página

    saveData()
  }

  return (
    <>
      <h1>Cadastrar Novo Cliente</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        
        <TextField id="nome" label="Nome" variant="filled" value={pessoa.nome} onChange={handleInputChange} fullWidth />

        <InputMask formatChars={formatChars} mask={CPFMask} 
        id="cpf" onChange={event => handleInputChange(event, 'cpf')} 
        value={pessoa.cpf}>
          {() => <TextField label="CPF" variant="filled" fullWidth />}
        </InputMask>    

        <TextField id="rg" label="rg" variant="filled" value={pessoa.rg} onChange={handleInputChange} fullWidth />

        <TextField id="logradouro" label="Logradouro" variant="filled" value={pessoa.logradouro} onChange={handleInputChange} fullWidth />

        <InputMask formatChars={formatChars} mask={NumMask} 
        id="num_imovel" onChange={event => handleInputChange(event, 'num_imovel')} 
        value={pessoa.num_imovel}>
          {() => <TextField label="n°" variant="filled" fullWidth />}
        </InputMask>  

        <TextField id="complemento" label="Complemento" variant="filled" value={pessoa.complemento} onChange={handleInputChange} fullWidth />

        <TextField id="bairro" label="Bairro" variant="filled" value={pessoa.bairro} onChange={handleInputChange} fullWidth />

        <TextField id="municipio" label="Município" variant="filled" value={pessoa.municipio} onChange={handleInputChange} fullWidth />

        <InputMask formatChars={formatChars} mask={UfMask} 
        id="uf" onChange={event => handleInputChange(event, 'uf')} 
        value={pessoa.uf}>
          {() => <TextField label="UF" variant="filled" fullWidth />}
        </InputMask>  

        <InputMask formatChars={formatChars} mask={TelefoneMask} 
        id="telefone" onChange={event => handleInputChange(event, 'telefone')} 
        value={pessoa.telefone}>
          {() => <TextField label="Telefone" variant="filled" fullWidth />}
        </InputMask>  

        <TextField id="email" label="E-Mail" variant="filled" value={pessoa.email} onChange={handleInputChange} fullWidth />

        <Toolbar className={classes.toolbar}>
          <Button variant="contained" color="secondary" type='submit'>Enviar</Button> 
          <Button variant="contained" >Voltar</Button>   
        </Toolbar>  

        <div>{JSON.stringify(pessoa)}<br/>currentId: {currentId}</div>
      </form>
    </>
  )
}