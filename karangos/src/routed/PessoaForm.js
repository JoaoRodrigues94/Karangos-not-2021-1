import { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

export default function KarangosForm() {

  const [pessoa, setPessoa] = useState({
    id: null,
    nome: '',
    rg: '',
    logradouro: '',
    num_imovel: 0,
    complemento: '',
    bairro: '',
    municipio: '',
    uf: '',
    telefone: '',
    email: ''
  })

  function handleInputChange(event) {
    // Quando o nome de uma propriedade de um objeto aparece entre [],
    // isso se chama "propriedade calculada". O nome da propriedade vai
    // corresponder à avaliação da expressão entre os colchetes
    setPessoa({...pessoa, [event.target.id]: event.target.value})
  }

  return (
    <>
      <h1>Cadastrar Novo Karango</h1>
      <form>
        
        <TextField id="nome" label="Nome" variant="filled" value={pessoa.nome} onChange={handleInputChange} />
        
        <TextField id="rg" label="R.G." variant="filled" value={pessoa.rg} onChange={handleInputChange} />

        <TextField id="logradouro" label="Logradouro" variant="filled" value={pessoa.logradouro} onChange={handleInputChange} />
             
        <div>{JSON.stringify(pessoa)}</div>
      </form>
    </>
  )
}