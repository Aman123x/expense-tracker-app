import './App.css';
import SignUp from './Components/SignUp/SignUp';
import Login from './Components/Login/Login';
import { useState } from 'react';
import Profile from './Components/ProfilePage/Profile';


function App() {

  const [showLogin,setShowLogin]=useState(false);
  const [isLogin,setIsLogin]=useState(false);

  const toggleForm=()=>{
    setShowLogin(!showLogin);
  }

  const handleLogin=()=>{
    setIsLogin(true);
  }

  return (
    <div>
      {isLogin ? (
        <Profile />
      ) : showLogin ? (
        <Login toggleForm={toggleForm} handleLogin={handleLogin} />
      ) : (
        <SignUp toggleForm={toggleForm} />
      )}
    </div>
  );
}

export default App;
