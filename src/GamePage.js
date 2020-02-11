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
import firebase from 'firebase';
import firebaseApp from './firebase.js';

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

var db = firebase.firestore(firebaseApp);

function GamePage({challengeNumber, grid, solutions, user, toggleLoginPage, toggleChallengePage, toggleGamePage}) {
  const classes = useStyles();
  const [already, setAlready] = useState(false);
  const [isShown, toggleGrid] = useState(false);
  const [input, setInput] = useState(null);
  const [wordInput, setWord] = useState(null);
  const [foundSolutions, setFoundSolutions] = useState([]);
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(updateHighScore(0));
  const [currHighScoreUser, setCurrHighScoreUser] = useState(null);

  var highScoreRef = db.collection('leaderboard').doc(challengeNumber);
  highScoreRef.get().then(function(doc) {
    if (doc.exists) {
        setCurrHighScoreUser(doc.get('name'));
      }
    }).catch(function(error) {
      console.log("Error fetching highscore: ", error);
    });


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
        setFoundSolutions([...foundSolutions, word]);
        setScore(score + word.length);
        setWord('');
      }
      else if (foundSolutions.includes(word)){
        setAlready(true);
        setWord('');
      }
    }
  }

  function updateHighScore(score){
      var currHighScoreRef = db.collection('leaderboard').doc(challengeNumber);
      var currHighScore = null;

      currHighScoreRef.get().then(function(doc) {
        if (doc.exists) {
          currHighScore = doc.get('highscore');
          setHighscore(currHighScore);
          if (score > currHighScore){
            if (doc.get('name') != user.displayName) {
              alert('You are now the new highest ranked player! Your rank has changed!');
            }
            firebase.firestore().collection('leaderboard').doc(challengeNumber)
            .set({name: user.displayName, highscore: score})
            .then(() => {
              console.log("Updated highscore");
              setHighscore(score);
            }).catch((error) => {
              console.error("Error updating highscore: ", error);
            });
          }
        }}).catch(function(error) {
          console.log("Error fetching highscore: ", error);
        });
    }


  return (
    <div className="App">
      <header className="App-header">
        <p></p>
        <button onClick={() => {toggleLoginPage(false); toggleChallengePage(true); toggleGamePage(false)}}>
          Select Challenge
        </button>
        <p></p>
        <Paper className={classes.paper}> GanksThiving : A Boggle Experience </Paper>
        <p></p>
        { isShown ?
          <div>Current Score : {score} </div> : null
        }
        <p></p>
        <div>
          Current High Score: {highscore > score ? highscore : score}
        </div>
        <p></p>
        <div>
          Held by : {currHighScoreUser}
        </div>
        <p></p>
          Current player : {user.displayName}
        <p></p>
        {isShown ? <NestedGrid grid={grid}/> : null}
        <p></p>
        {isShown ? <div> <input value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => (e.key === 'Enter') ?  setWord(input.toLowerCase()) : null}/> </div> : null}
        {checkSolution(wordInput)}
        {already ? <p> Solution already found! </p> : null}
        <p></p>
        {!isShown ?
        <button onClick={() => {toggleGrid(true); setAlready(false); setFoundSolutions([])}}>
          Start Game
        </button>
        :
        <button onClick={() => {toggleGrid(false); setAlready(false); updateHighScore(score)}}>
          End Game
        </button>
        }
        <p></p>
        {isShown ? printFoundSolutions(foundSolutions) : null}
      </header>
    </div>
  );
}

export default GamePage;
