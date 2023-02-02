import { useState, useEffect } from "react";
import firebase from '../firebase';
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRankingStar } from "@fortawesome/free-solid-svg-icons";
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

          if(!doc.exists){
            firebase.firestore()
                    .collection('firstTime')
                    .doc(user.uid)
                    .set({first: true})

            let temp = getRandomInt();

            firebase.firestore()
                    .collection('userBalance')
                    .doc(user.uid)
                    .set({balance: temp})
            
            setBalance(temp);
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
    return <Navigate replace to='/'/>
  }

  return (

    <div className="home-container">
      <div className="balance">
        <div>${balance}</div>
      </div>
      <a href="/#/leaderboard">
        <div className="leaderboard">
          <FontAwesomeIcon icon={faRankingStar} />
        </div>
      </a>
      <div className="logo"><h1>Cookbook</h1></div>
      <div className="home-content">
        <h1>Hello, {name}</h1>
        
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  )
}
