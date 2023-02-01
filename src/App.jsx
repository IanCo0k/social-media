import {useState, useEffect} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


export default function App() {

  const [username, setUsername] = useState('')
  const [desc, setDesc] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const db = firebase.firestore();
    db.collection('users').add({
      name: username,
      desc: desc
    });
    setUsername('');
    setEmail('');
  };

  const firebaseConfig = {
    apiKey: "AIzaSyALmTermsnlmGpQ3qtn-sKJ6e61c6umKMI",
    authDomain: "social-media-d3bb4.firebaseapp.com",
    projectId: "social-media-d3bb4",
    storageBucket: "social-media-d3bb4.appspot.com",
    messagingSenderId: "972015921763",
    appId: "1:972015921763:web:8bc56365f01e4f8f89a656"
  };

  firebase.initializeApp(firebaseConfig);

  const [users, setUsers] = useState([]);

  const ref = firebase.firestore().collection('users');


  useEffect(() => {
    ref.onSnapshot((querySnapshot) => {
      console.log('Users have been loaded:');
      let updatedUsers = [];
      querySnapshot.forEach((doc) => {
        updatedUsers = [...updatedUsers, doc.data()];
      });
      setUsers(updatedUsers);
    });
  }, [])
  
  


  return (
    <>
    <div>
      {users.map((user, index) => {
      return (
        <div key={index}>
          <p>Name: {user.name}</p>
          <p>Description: {user.desc}</p>
        </div>
      );
    })}

    </div>

    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={username} onChange={(event) => setUsername(event.target.value)} />
      <input type="text" placeholder="Description" value={desc} onChange={(event) => setDesc(event.target.value)} />
      <button type="submit">Sign Up</button>
    </form>
    </>
  )
}
