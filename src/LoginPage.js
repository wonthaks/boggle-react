import React, {useState} from 'react';
import './App.css';
import LoginButton from './LoginButton.js';
import NestedGrid from './Grid.js';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import RandomGrid from './BoilerPlate.js';
import BasicTextFields from './BasicTextFields.js';
import findAllSolutions from './boggle_solver.js';
import words from './full-wordlist.json';
import { makeStyles } from '@material-ui/core/styles';
import VirtualizedList from './List.js';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    fontSize: '30px',
    textAlign: 'center',
    alignItems: 'center',
    border:'1px solid black',
    color: theme.palette.text.secondary,
  },
  solutionDisplay: {
    overflowY: 'scroll',
    border:'1px solid black',
    width:'250px',
    height:'250px',
  }
}));

function LoginPage({user, toggleLoginPage, toggleChallengePage, toggleGamePage, setUser}) {
  const classes = useStyles();

  return (
    <div className="App">
      <header className="App-header">
        <p></p>
        <Paper className={classes.paper}> GanksThiving : A Boggle Experience </Paper>
        <p></p>
      </header>
    </div>
  );
}

export default LoginPage;
