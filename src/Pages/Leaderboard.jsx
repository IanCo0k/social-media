import {useState, useEffect} from 'react'
import './Home.css';
import firebase from '../firebase.js';

export default function Leaderboard() {

    const [data, setData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const db = firebase.firestore();
        const userBalanceRef = db.collection('userBalance');
        const snapshot = await userBalanceRef.orderBy('balance', 'desc').get();
        const fetchedData = snapshot.docs.map(doc => ({
          name: doc.id,
          balance: doc.data().balance
        }));
        setData(fetchedData);
        console.log(fetchedData);
      };
  
      fetchData();
    }, []);

  return (
    <div className="home-container">
        <h1>Leaderboard</h1>
      {data.map(item => (
          <p>{item.name} - ${item.balance}</p>
      ))}
    </div>
  )
}
