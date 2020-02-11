import React from 'react';
import firebase from 'firebase';

function LoginButton({setUser, user, toggleLoginPage, toggleChallengePage, toggleGamePage}) {

  function logIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      console.log(result.user);
      setUser(result.user);
    }).catch(function(error) {
      console.log(error);
   });
 }

 function logOut() {
   firebase.auth().signOut().then(function(result) {
     setUser(null);
   }).catch(function(error){
     console.log(error);
   });
 }

  function guestLogIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      console.log(result.user);
      setUser(result.user);
    }).catch(function(error) {
      console.log(error);
   });
  }

  return (
    <div>
    {user != null ?
    <button onClick={() => {toggleLoginPage(true); toggleChallengePage(false); toggleGamePage(false); logOut()}}>
      Log out
    </button> :
    <button onClick={() => {toggleLoginPage(false); toggleChallengePage(true); toggleGamePage(false); logIn()}}>
      Log In
    </button>
    }
    </div>
)
}

export default LoginButton;
