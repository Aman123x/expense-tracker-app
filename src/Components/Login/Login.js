import React, { useState } from 'react'
import "./Login.css"

const Login = (props) => {

    const [inputLogin,setInputLogin]=useState({
        email:"",
        password:""
    })

    function handleLogin(e){
        let key=e.target.name;
        setInputLogin({...inputLogin,[key]:e.target.value});
    }

    function implementLogin(e){
        e.preventDefault();
        verifyData(inputLogin);
        // console.log(inputLogin);
    }
    

    async function verifyData(inputLogin){
        try{
            const response=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_AUTHENTICATION_API_KEY}`,{
                method: "POST",
                body: JSON.stringify({
                    email: inputLogin.email,
                    password: inputLogin.password,
                    returnSecureToken: true,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data=await response.json();
            props.setIdToken(data.idToken);
            localStorage.setItem('token', data.idToken);
            props.handleLogin(true);
            // console.log(data.idToken);
        }
        catch(err){
            alert("Wrong Email or Password");
            console.log(err);
        }
    }

  return (
    <div className='login_parent'>
        <div className='login_child'>
            <h1>Login</h1>
            <form onSubmit={implementLogin} className='login_form'>
                <input type='email' placeholder='Email' 
                name='email' 
                onChange={handleLogin} value={inputLogin.email}
                />

                <input type='password' placeholder='Password' 
                name='password' onChange={handleLogin} value={inputLogin.password}
                />
                <button type='submit'>Login</button>
            </form>
            <p>Forget Password</p>
        </div>
        <button onClick={() => props.toggleForm()}>Have an account? SignUp</button>
    </div>
  )
}

export default Login