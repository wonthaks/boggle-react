import React, {useState} from 'react';
import './App.css';
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

let grid = RandomGrid();


function App() {
  const [gameStart, toggleGame] = useState(true);
  const classes = useStyles();
  const [solutions, setSolutions] = useState([]);
  const [already, setAlready] = useState(false);
  const [remaining, setRemaining] = useState([]);

  function printRemainingSolutions(solutions){
    let solutions_list = [];
    for (let element_index in solutions){
      solutions_list.push(
        <Grid item xs='auto' xl='auto' direction='column'>
          <Paper className={classes.paper}>{solutions[element_index]}</Paper>
        </Grid>
      )
    }

    grid = RandomGrid();

    return (<div><p>You had {solutions_list.length} words left!</p>
      <div className={classes.solutionDisplay}> {solutions_list} </div></div>);
  }

  function printFoundSolutions(foundSolutions){
    let solutions_list = [];
    for (let element_index in foundSolutions){
      solutions_list.push(
        <Grid item xs='auto' xl='auto' direction='column'>
          <Paper className={classes.paper}>{foundSolutions[element_index]}</Paper>
        </Grid>
      )
    }

    return (<div><p>You have {solutions_list.length} words so far!</p>
      <div className={classes.solutionDisplay}> {solutions_list} </div></div>);
  }

  function checkSolution(word){
    if (solutions.includes(word)){
      setAlready(false);
      if (!foundSolutions.includes(word)){
        addSolutions([...foundSolutions, word]);
        setWord('');
      }
      else if (foundSolutions.includes(word)){
        setAlready(true);
        setWord('');
      }
    }
  }

  const [isShown, toggleGrid] = useState(false);
  const [input, setInput] = useState('');
  const [wordInput, setWord] = useState('');
  const [foundSolutions, addSolutions] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <Paper className={classes.paper}> GanksThiving : A Boggle Experience </Paper>
        <p></p>
        {isShown ? <NestedGrid grid={grid}/> : null}
        <p></p>
        {isShown ? <div> <input value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => (e.key === 'Enter') ?  setWord(input.toLowerCase()) : null}/> </div> : null}
        {checkSolution(wordInput)}
        {already ? <p> Solution already found! </p> : null}
        <p></p>
        <button onClick={() => {toggleGrid(!isShown); toggleGame(false); setAlready(false); setSolutions(findAllSolutions(grid, words.words))}}>
          {isShown ? 'End Game' : 'Start Game'}
        </button>
        <p></p>
        <button onClick={() => addSolutions([])}>
          Clear found words list
        </button>
        <p></p>
        {isShown ? printFoundSolutions(foundSolutions) : null}
        <p></p>
        {(!gameStart && !isShown) ? printRemainingSolutions(solutions.filter((element) => !foundSolutions.includes(element))) : null}
        <p></p>
      </header>
    </div>
  );
}

export default App;
