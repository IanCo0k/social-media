import { useState } from "react";
import firebase from '../firebase';
import { Navigate } from "react-router-dom";

export default function Home() {

  const [signOut, setSignOut] = useState(false);

  const handleSignOut = () => {
    firebase.auth().signOut();
    setSignOut(true);
  };

  if(signOut){
    return <Navigate replate to='/'/>
  }

  return (
    <div>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}
