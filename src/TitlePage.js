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
import GamePage from './GamePage.js';
import LoginPage from './LoginPage.js';
import ChallengePage from './ChallengePage.js';

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

function TitlePage() {
  const [isLoginPage, toggleLoginPage] = useState(true);
  const [isChallengePage, toggleChallengePage] = useState(false);
  const [isGamePage, toggleGamePage] = useState(false);
  const [user, setUser] = useState(null);
  const [grid, setGrid] = useState(null);
  const [solutions, setSolutions] = useState([]);
  const [challengeNumber, setChallengeNumber] = useState('0');

  // if already logged in set user to auth.current user

  return (
    <div className="App">
      <header className="App-header">
        <p></p>
        <LoginButton setUser={setUser} user={user} toggleLoginPage={toggleLoginPage} toggleChallengePage={toggleChallengePage} toggleGamePage={toggleGamePage}/>
        <p></p>
        {isLoginPage && !isChallengePage && !isGamePage ? <LoginPage/> : null}
        {isGamePage && !isChallengePage && !isLoginPage ? <GamePage challengeNumber={challengeNumber} solutions={solutions} grid={grid} user={user} toggleLoginPage={(state) => toggleLoginPage(state)} toggleChallengePage={(state) => toggleChallengePage(state)} toggleGamePage={(state) => toggleGamePage(state)}/> : null}
        {isChallengePage && !isGamePage && !isLoginPage ? <ChallengePage user={user} setChallengeNumber={(challengeNumber) => setChallengeNumber(challengeNumber)} setSolutions={(solutions) => setSolutions(solutions)} setGrid={(grid) => setGrid(grid)} toggleLoginPage={(state) => toggleLoginPage(state)} toggleChallengePage={(state) => toggleChallengePage(state)} toggleGamePage={(state) => toggleGamePage(state)}/> : null}
      </header>
    </div>
  );
}

export default TitlePage;
