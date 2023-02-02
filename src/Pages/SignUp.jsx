import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import firebase from '../firebase'
import './SignUp.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);


  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      console.log('successfully created');
      setSuccess(true);
    } catch (error) {
      console.error(error);
    }
    setEmail('');
    setPassword('');
  };

  if(success){
    return <Navigate replace to="/" />
  }


  return (
    <div className="container">
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
    </div>
  );
}

export default SignUp;
