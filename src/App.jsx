import {useState, useEffect} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


  const App = () => {

    const firebaseConfig = {
      apiKey: "AIzaSyALmTermsnlmGpQ3qtn-sKJ6e61c6umKMI",
      authDomain: "social-media-d3bb4.firebaseapp.com",
      projectId: "social-media-d3bb4",
      storageBucket: "social-media-d3bb4.appspot.com",
      messagingSenderId: "972015921763",
      appId: "1:972015921763:web:8bc56365f01e4f8f89a656"
    };
  
    firebase.initializeApp(firebaseConfig);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const [user, setUser] = useState(null);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        console.log(user);
      } else {
        setUser(null);
      }
    });
  
    const handleSignIn = async (e) => {
      e.preventDefault();
  
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log('successfully logged in')
      } catch (error) {
        setError(error.message);
      }
    };
  
    return (
      <div>
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

      {user ? (
        <p>Signed in as {user.email}</p>
      ) : (
        <p>Not signed in</p>
      )}
      </div>
    );
  };
  
  export default App;


  
  



