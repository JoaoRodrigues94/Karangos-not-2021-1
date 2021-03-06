import { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import InputMask from 'react-input-mask'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory, useParams } from 'react-router-dom';
import ConfirmDialog from '../ui/ConfirmDialog';

const useStyles = makeStyles(() => ({
  form: {
    maxWidth: '80%',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    '& .MuiFormControl-root': {
      minWidth: '200px',
      maxWidth: '500px',
      marginBottom: '24px',
    }
  },
  toolbar: {
    marginTop: '36px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around'
  },
  checkbox: {
    alignItems: 'center'
  }
}))

const formatChars = {
  'A': '[A-Za-z]',
  '0': '[0-9]',
}

//  máscaras
const cpfMask = '000.000.000-00';
const rgMask = '00.000.000-0';
const ufMask = 'AA';
const telefoneMask = '(00)00000-0000';

export default function PessoaForm() {
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
    email: ''
  })

  const [snackState, setSnackState] = useState({
    open: false,
    severity: 'success',
    message: 'Cliente salvo com sucesso'  
  })

  const [btnSendState, setBtnSendState] = useState({
    disabled: false,
    label: 'Enviar'
  })

  const [error, setError] = useState({
    nome: '',
    cpf: '',
    rg: '',
    logradouro: '',
    num_imovel: '',
    bairro: '',
    municipio: '',
    uf: '',
    telefone: '',
    email: ''
  })

  const [isModified, setIsModified] = useState(false)

  const [dialogOpen, setDialogOpen] = useState(false)

  const [title, setTitle] = useState('Cadastrar Novo Cliente')

  const history = useHistory()
  const params = useParams()

  useEffect(() => {
    if(params.id) {
      setTitle('Editar Informações de Cliente')
      getData(params.id)
    }
  }, [])

  async function getData(id) {
    try {
      let response = await axios.get(`https://api.faustocintra.com.br/clientes/${id}`)
      setPessoa(response.data)    
    }
    catch(error) {
      setSnackState({
        open: true,
        severity: 'error',
        message: 'Não foi possível carregar os dados para edição.'
      })
    }
  } 

  function handleInputChange(event, property) {
    
    const pessoaTemp = {...pessoa}

    if(event.target.id) property = event.target.id

    if(property === 'uf') {
      pessoaTemp[property] = event.target.value.toUpperCase()
    }
    else {
      pessoaTemp[property] = event.target.value
    }
    setPessoa(pessoaTemp)
    setIsModified(true)   
    validate(pessoaTemp)     
  }

  function validate(data) {

    const errorTemp = {
      nome: '',
      cpf: '',
      rg: '',
      logradouro: '',
      num_imovel: '',
      bairro: '',
      municipio: '',
      uf: '',
      telefone: '',
      email: ''
    }
    let isValid = true

    // Validação do campo nome
    if(data.nome.trim() === '') {
      errorTemp.nome = 'O NOME deve ser preenchido!'
      isValid = false
    }

    // Validação do campo cpf
    if(data.cpf.trim() === '' || data.cpf.includes('_')) {
      errorTemp.cpf = 'O CPF deve ser preenchido!'
      isValid = false
    }

    // Validação do campo rg
    if(data.rg.trim() === '' || data.rg.includes('_')) {
      errorTemp.rg = 'O RG deve ser preenchido!'
      isValid = false
    }

    // Validação do campo logradouro
    if(data.logradouro.trim() === '') {
      errorTemp.logradouro = 'O LOGRADOURO deve ser preenchido!'
      isValid = false
    }

    // Validação do campo num_imovel
    if(data.num_imovel.trim() === '') {
      errorTemp.num_imovel = 'O Número deve ser preenchido!'
      isValid = false
    }

    // Validação do campo bairro
    if(data.bairro.trim() === '') {
      errorTemp.bairro = 'O BAIRRO deve ser preenchido!'
      isValid = false
    }

    // Validação do campo municipio
    if(data.municipio.trim() === '') {
      errorTemp.municipio = 'O MUNICÍPIO deve ser preenchido!'
      isValid = false
    }

    // Validação do campo uf
    if(data.uf.trim() === '') {
      errorTemp.uf = 'O UF deve ser preenchido!'
      isValid = false
    }

    // Validação do campo telefone
    if(data.telefone.trim() === '') {
      errorTemp.telefone = 'O TELEFONE deve ser preenchido!'
      isValid = false
    }    

    // Validação do campo email
    if(data.email.trim() === '') {
      errorTemp.email = 'O E-mail deve ser preenchido!'
      isValid = false
    }        

    setError(errorTemp)
    return isValid

  }

  async function saveData() {
    try {
      setBtnSendState({disabled: true, label: 'Enviando...'})

      if(params.id) await axios.put(`https://api.faustocintra.com.br/clientes/${params.id}`, pessoa)
      else await axios.post('https://api.faustocintra.com.br/clientes', pessoa)
      
      setSnackState({
        open: true,
        severity: 'success',
        message: 'Cliente salvo com sucesso!'  
      })
      
    }
    catch(error) {
      setSnackState({
        open: true,
        severity: 'error',
        message: 'ERRO: ' + error.message  
      })  
    }
    setBtnSendState({disabled: false, label: 'Enviar'})
  }

  function handleSubmit(event) {
    
    event.preventDefault() 

    if(validate(pessoa)) saveData()
    
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  function handleSnackClose(reason) {
    if(reason === 'clickaway') return
    setSnackState({...snackState, open: false}) 

    history.push('/listaPessoas')  
  }

  function handleDialogClose(result) {
    setDialogOpen(false)

    if(result) history.push('/listaPessoas')
  }

  function handleGoBack() {
    if(isModified) setDialogOpen(true)
    else history.push('/listaPessoas')
  }

  return (
    <>
      <ConfirmDialog isOpen={dialogOpen} onClose={handleDialogClose}>
        Há dados não salvos. Deseja realmente voltar?
      </ConfirmDialog>

      <Snackbar open={snackState.open} autoHideDuration={6000} onClose={handleSnackClose}>
        <Alert onClose={handleSnackClose} severity={snackState.severity}>
          {snackState.message}
        </Alert>
      </Snackbar>
      
      <h1>{title}</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        
        <TextField 
          id="nome" 
          label="Nome" 
          variant="filled" 
          value={pessoa.nome} 
          onChange={handleInputChange} 
          fullWidth
          required
          error={error.nome !== ''}
          helperText={error.nome} 
        />
        
        <InputMask 
          formatChars={formatChars} 
          mask={cpfMask} 
          id="cpf" 
          onChange={event => handleInputChange(event, 'cpf')} 
          value={pessoa.cpf}
        >
          {() => <TextField 
            label="CPF" 
            variant="filled" 
            fullWidth 
            required
            error={error.cpf !== ''}
            helperText={error.cpf} 
          />}
        </InputMask>

        <InputMask 
          formatChars={formatChars} 
          mask={rgMask} 
          id="rg" 
          onChange={event => handleInputChange(event, 'rg')} 
          value={pessoa.rg}
        >
          {() => <TextField 
            label="RG" 
            variant="filled" 
            fullWidth 
            required
            error={error.rg !== ''}
            helperText={error.rg} 
          />}
        </InputMask>

        <TextField 
          id="logradouro" 
          label="Logradouro" 
          variant="filled" 
          value={pessoa.logradouro} 
          onChange={handleInputChange} 
          fullWidth
          required
          error={error.logradouro !== ''}
          helperText={error.logradouro} 
        />

        <TextField 
          id="num_imovel" 
          label="Número do Imóvel" 
          variant="filled" 
          value={pessoa.num_imovel} 
          onChange={handleInputChange} 
          fullWidth 
          required
          error={error.num_imovel !== ''}
          helperText={error.num_imovel} 
        />

        <TextField 
          id="complemento" 
          label="Complemento" 
          variant="filled" 
          value={pessoa.complemento} 
          onChange={handleInputChange} 
          fullWidth 
        />

        <TextField 
          id="bairro" 
          label="Bairro" 
          variant="filled" 
          value={pessoa.bairro} 
          onChange={handleInputChange} 
          fullWidth
          required
          error={error.bairro !== ''}
          helperText={error.bairro} 
        />

        <TextField 
          id="municipio" 
          label="Município" 
          variant="filled" 
          value={pessoa.municipio} 
          onChange={handleInputChange} 
          fullWidth
          required
          error={error.municipio !== ''}
          helperText={error.municipio} 
        />

        <InputMask 
          formatChars={formatChars} 
          mask={ufMask} 
          id="uf" 
          onChange={event => handleInputChange(event, 'uf')} 
          value={pessoa.uf}
        >
          {() => <TextField 
            label="UF" 
            variant="filled" 
            fullWidth 
            required
            error={error.uf !== ''}
            helperText={error.uf} 
          />}
        </InputMask> 

        <InputMask 
          formatChars={formatChars} 
          mask={telefoneMask} 
          id="telefone" 
          onChange={event => handleInputChange(event, 'telefone')} 
          value={pessoa.telefone}
        >
          {() => <TextField 
            label="Telefone" 
            variant="filled" 
            fullWidth 
            required
            error={error.telefone !== ''}
            helperText={error.telefone} 
          />}
        </InputMask>   

        <TextField 
          id="email" 
          label="E-mail" 
          variant="filled" 
          value={pessoa.email} 
          onChange={handleInputChange} 
          fullWidth
          required
          error={error.email !== ''}
          helperText={error.email} 
        />              

        <Toolbar className={classes.toolbar}>
          <Button 
            variant="contained" 
            color="secondary" 
            type="submit"
            disabled={btnSendState.disabled}
          >
              {btnSendState.label}
          </Button>
          <Button variant="contained" onClick={handleGoBack}>
            Voltar
          </Button>
        </Toolbar>
            
        {/* <div>{JSON.stringify(karango)}<br />currentId: {currentId}</div> */}
      </form>    
    </>
  )
}