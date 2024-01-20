import React, { useState } from 'react'
import "./SignUp.css";

const SignUp = () => {

    const[inputData,setInputData]=useState({
        email:"",
        password:"",
        confirmPass:""
    })

    function handleData(e){
        let key=e.target.name;
        setInputData({...inputData,[key]:e.target.value});
    }

    function passMatch(){
        return inputData.password===inputData.confirmPass;
    }

    function handleSubmit(e){
        e.preventDefault();
        if(!passMatch()){
            alert("Password do not match");
            return;
        }
        console.log(inputData);
    }


  return (
    <div className='SignUp'>
        <div className='SignUp_Child'>
            <h1>SignUp</h1>
            <form onSubmit={handleSubmit} className='SignUp_form'>
                <input type='Email' placeholder='Email' name='email'
                    onChange={handleData} value={inputData.email} required
                />

                <input type='Password' placeholder='Password'
                name='password'
                onChange={handleData} value={inputData.password} required
                />

                <input type='Password' placeholder='Confirm Password'
                    name='confirmPass'
                    onChange={handleData} value={inputData.confirmPass} required
                />

                <button type='submit'>Sign Up</button>
            </form>
        </div>
        <button>Have an account?Login</button>
    </div>
  )
}

export default SignUp