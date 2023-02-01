import { Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';

export default function App() {
  return (
    <div>
        <Routes>
            <Route exact path='/' element={<SignIn/>}/>
            <Route path='/sign-up' element={<SignUp/>}/>
            <Route path='/home' element={<Home/>}/>
        </Routes>
    </div>
  )
}
