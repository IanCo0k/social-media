import { useState, useEffect } from "react";
import firebase from '../firebase';
import { Navigate } from "react-router-dom";
import './Home.css';

export default function Home() {

  const [signOut, setSignOut] = useState(false);
  const [name, setName] = useState('');
  const [balance, setBalance] = useState();
  const [user, setUser] = useState('');

  const handleSignOut = () => {
    firebase.auth().signOut();
    setSignOut(true);
  };

  function getRandomInt() {
    return Math.floor(Math.random() * (5000 - 5 + 1) + 5);
  }

  useEffect(() => {

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setName(user.displayName);
      }

      firebase.firestore()
        .collection("firstTime")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc.data().first) {
            firebase.firestore()
              .collection("firstTime")
              .doc(user.uid)
              .set({ first: false }, { merge: true })

              let tempBalance = getRandomInt();

            firebase.firestore()
                    .collection('userBalance')
                    .doc(user.uid)
                    .set({balance: tempBalance})

            setBalance(tempBalance);
          } else{
            firebase.firestore()
                    .collection('userBalance')
                    .doc(user.uid)
                    .get()
                    .then((doc) => {
                      setBalance(doc.data().balance);
                    })
          }
        })
        .catch((error) => {
          console.error("Error retrieving or setting document:", error);
        });

      console.log(user);
    });
  }, [])



  if(signOut){
    return <Navigate replate to='/'/>
  }

  return (
    <div>
      <h1>Hello, {name}</h1>
      <h1>You have a balance of: {balance}</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}
