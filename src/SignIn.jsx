import {useState, useEffect} from 'react';
import firebase from './firebase';
import { Navigate } from 'react-router-dom';
import './SignIn.css';


  const SignIn = () => {

    const [success, setSuccess] = useState(false);

    const handleSignIn = async (e) => {
      e.preventDefault();
      console.log('is this even working');
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log('successfully logged in')
        setSuccess(true);
      } catch (error) {
        setError(error.message);
      }
    };



    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const [user, setUser] = useState(null);

    

    useEffect(() => {
      console.log('page loaded')
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
        }
      });
    }, []);

    if(success){
      return <Navigate replace to="/home" />
    }
  
    return (
      <div className='container'>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
        
        {error && <p>{error}</p>}
      </form>

      <a href="/#/sign-up">Don't have an account? Sign up.</a>
      </div>
    );
  };
  
  export default SignIn;


  
  



