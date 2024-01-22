import { useState,useEffect } from 'react';
import SignUp from './Components/SignUp/SignUp';
import Login from './Components/Login/Login';
import Profile from './Components/ProfilePage/Profile';
import './App.css';


function App() {

  const [showLogin,setShowLogin]=useState(false);
  const [isLogin,setIsLogin]=useState(false);
  const[idToken,setIdToken]=useState("");

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      setIdToken(localToken);
      setIsLogin(true);
    }
  }, []);

  const toggleForm=()=>{
    setShowLogin(!showLogin);
  }

  const handleLogin=()=>{
    setIsLogin(true);
  }

  return (
    <div>
      {isLogin ? (
        <Profile idToken={idToken}/>
      ) : showLogin ? (
        <Login toggleForm={toggleForm} handleLogin={handleLogin} setIdToken={setIdToken} />
      ) : (
        <SignUp toggleForm={toggleForm} />
      )}
    </div>
  );
}

export default App;
