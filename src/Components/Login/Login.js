import React, { useState } from 'react'
import "./Login.css"
import { ThreeCircles } from 'react-loader-spinner';

const Login = (props) => {

    const [inputLogin,setInputLogin]=useState({
        email:"",
        password:""
    })

    const [forgetPass,setForgetPass]=useState(false);
    const [forgetEmail,setForgetEmail]=useState("");
    const [waiting,setWaiting]=useState(false);

    function handleLogin(e){
        let key=e.target.name;
        setInputLogin({...inputLogin,[key]:e.target.value});
    }

    function implementLogin(e){
        e.preventDefault();
        verifyData();
        // console.log(inputLogin);
    }
    

    async function verifyData(){
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
            console.log("Hello from login");
        }
        catch(err){
            alert("Wrong Email or Password");
            console.log(err);
        }
    }

    function handlePassword(){
        setForgetPass(true);
    }

    async function handleSendLink(){
        setWaiting(true);
        try{
            const response=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_AUTHENTICATION_API_KEY}`,{
                method: "POST",
                body: JSON.stringify({
                    requestType: "PASSWORD_RESET",
                    email: forgetEmail,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data=await response.json();
            setWaiting(false);
            console.log(data);
        }
        catch(err){
            console.log(err);
        }
    }

  return (
    <div className='login_parent'>
        <>
            {   !forgetPass &&
                <div className='login_child'>
                    <h1>Login</h1>
                    <form onSubmit={implementLogin} className='login_form'>
                        <input type='email' placeholder='Email' 
                        name='email' required
                        onChange={handleLogin} value={inputLogin.email}
                        />
        
                        <input type='password' placeholder='Password' required
                        name='password' onChange={handleLogin} value={inputLogin.password}
                        />
                        <button type='submit'>Login</button>
                    </form>
                    <p onClick={handlePassword}>Forget Password</p>
                </div>
            }
        </>
        <>
        {
            forgetPass && 
            <div>
                {
                    !waiting ?
                    <>
                        <p>Enter the email which you have registered.</p>
                        <input type='email' placeholder='Email' 
                            onChange={(e)=>setForgetEmail(e.target.value)}
                            value={forgetEmail}
                        />
                        <button onClick={handleSendLink}>Send Link</button>
                    </>:
                    <ThreeCircles
                        visible={true}
                        height="100"
                        width="100"
                        color="#4fa94d"
                        ariaLabel="three-circles-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                }
            </div>
        }
        </>

        <button onClick={() => props.toggleForm()}>Have an account? SignUp</button>
    </div>
  )
}

export default Login