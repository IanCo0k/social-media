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
  const [noName, setNoName] = useState(false);

  const [lines, setLines] = useState([]);

  const handleSignOut = () => {
    firebase.auth().signOut();
    setSignOut(true);
  };

  function getRandomInt() {
    return Math.floor(Math.random() * (5000 - 5 + 1) + 5);
  }

  async function getLines() {
    const snapshot = await firebase.firestore().collection('Lines').get()
    return Promise.resolve(snapshot.docs.map(doc => doc.data()));
}

  useEffect(() => {

    async function fetchLines() {
      const lines = await getLines();
      setLines(lines);
      console.log(lines);
    }

    fetchLines();

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        if(user.displayName == null){
          setNoName(true);
        } else{
          setName(user.displayName)
        }
      }

      firebase.firestore()
        .collection("firstTime")
        .doc(user.displayName)
        .get()
        .then((doc) => {

          if(!doc.exists){
            firebase.firestore()
                    .collection('firstTime')
                    .doc(user.displayName)
                    .set({first: true})

            let temp = getRandomInt();

            firebase.firestore()
                    .collection('userBalance')
                    .doc(user.displayName)
                    .set({balance: temp})
            
            setBalance(temp);
          } else{
            firebase.firestore()
                    .collection('userBalance')
                    .doc(user.displayName)
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

  const updateName = async (event) => {
    event.preventDefault();

    try {
      user.updateProfile({
        displayName: name
      })
      console.log('successfully created');
      setNoName(false);
    } catch (error) {
      console.error(error);
    }
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

        <form onSubmit={updateName} className={noName ? '' : 'hide'}>
          <input
            type="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Name"
          />
          <button type='submit'>Submit</button>
        </form>
        
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  )
}
