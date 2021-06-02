/*
import './App.css';
import Button from '@material-ui/core/Button'

     <div className="App">
      <header className="App-header">
        <h1>Projeto Karangos</h1>
        <Button variant="contained" color="primary">
          Clique Aqui!
        </Button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
  </div> */

import TopBar from './ui/TopBar';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import FooterBar from './ui/FooterBar';
import { Box } from '@material-ui/core';
import yellow from '@material-ui/core/colors/yellow';
import pink from '@material-ui/core/colors/pink';
import KarangosList from './routed/KarangosList2';
import KarangosForm from './routed/KarangosForm';
import PessoaForm from './routed/PessoaForm';
import PessoaList from './routed/PessoaList';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: yellow[500],
    },
    secondary: {
      main: pink[500],
    },
  },
});

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',  // 100% da altura da área visível
    paddingBotton: '42px' // Para que o conteúdo não fique escondido atrás de rooter
  },
  routed: {
    padding: '25px',
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily
  }
}));

function Main() {
  const classes = useStyles();
  return(
    <Box className={classes.box}>
      <BrowserRouter>
        <TopBar  />
        <Box id='routed' className={classes.routed}>
          <Switch>
            <Route path='/list'>
              <KarangosList/>
            </Route>
            <Route path='/new'>
              <KarangosForm />
            </Route>
            {/* :id é um parâmetro (nomes de parâmetros começa com dois pontos) */}
            <Route path='/edit/:id'>
              <KarangosForm />
            </Route>
            <Route path='/listaPessoas'>
              <PessoaList />
            </Route>
            <Route path='/newPessoa'>
              <PessoaForm />
            </Route>
          </Switch>
        </Box>
        <FooterBar />
      </BrowserRouter>
    </Box>
  )
}

function App() {
  return (
    <ThemeProvider theme={theme} >
      <Main />
    </ThemeProvider>
  );
}

export default App;
