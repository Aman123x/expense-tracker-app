import React, { useState } from 'react'
import "./Login.css"

const Login = () => {

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
        console.log(inputLogin);
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
        <button>Have an account? SignUp</button>
    </div>
  )
}

export default Login