import React, { useState, useEffect } from 'react';
import firebase from '../firebase'
import './SignUp.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log('successfully created');
    } catch (error) {
      console.error(error);
    }
    setEmail('');
    setPassword('');
  };


  return (
    <form onSubmit={handleSignUp}>
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password"
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUp;
