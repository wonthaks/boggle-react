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

var db = firebase.firestore(firebaseApp);

function ChallengePage({user, setChallengeNumber, setSolutions, setGrid, toggleLoginPage, toggleChallengePage, toggleGamePage}) {
  const classes = useStyles();
  const [isLoaded, loadChallenges] = useState(false);
  
  function fetchGrid(id){
      var docRef = db.collection('challenges').doc(id);

      docRef.get().then(function(doc) {
        if (doc.exists) {
          console.log("Document data: ", doc.data());
          var extractedGrid = [[],[],[],[],[]];
          var arrElements = doc.get('letters').split(" ");
          var gridRow = -1;
          for (var index = 0; index < arrElements.length; index++){
            if (index % 5 == 0){
              gridRow += 1;
            }
            extractedGrid[gridRow][index % 5] = arrElements[index];
          }
          setGrid(extractedGrid);
          var solutions = findAllSolutions(extractedGrid, words.words);
          console.log(solutions);
          setSolutions(solutions);
        } else {
          console.log("No such document found");
        }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
  }
  return (
    <div className="App">
      <header className="App-header">
        <p></p>
        <button fontSize='30px' onClick={() => loadChallenges(!isLoaded)}>
          Load Challenges
        </button>
        <p></p>
        {isLoaded ?
          <div>
        <p></p>
        <button onClick={() => {fetchGrid('0'); setChallengeNumber('0'); toggleLoginPage(false); toggleChallengePage(false); toggleGamePage(true)}}>
          Challenge 1
        </button>
        <p></p>
        <button onClick={() => {fetchGrid('1'); setChallengeNumber('1'); toggleLoginPage(false); toggleChallengePage(false); toggleGamePage(true)}}>
          Challenge 2
        </button>
        <p></p>
        <button onClick={() => {fetchGrid('2'); setChallengeNumber('2'); toggleLoginPage(false); toggleChallengePage(false); toggleGamePage(true)}}>
          Challenge 3
        </button>
        <p></p>
        <button onClick={() => {fetchGrid('3'); setChallengeNumber('3'); toggleLoginPage(false); toggleChallengePage(false); toggleGamePage(true)}}>
          Challenge 4
        </button>
        <p></p>
        <button onClick={() => {fetchGrid('4'); setChallengeNumber('4'); toggleLoginPage(false); toggleChallengePage(false); toggleGamePage(true)}}>
          Challenge 5
        </button>
        <p></p> </div> : null
        }
      </header>
    </div>
  );
}

export default ChallengePage;
