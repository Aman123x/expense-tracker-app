import React, { useEffect, useState } from 'react'
import "./Profile.css"

const Profile = (props) => {

    const[showEdit,setShowEdit]=useState(true);
    const[profileName,setProfileName]=useState("");
    const[profileImage,setProfileImage]=useState("");
    const[btn,setBtn]=useState(null);

    const handleEdit=()=>{
        setShowEdit(false);
    }

    async function handleUpdate(){
        setBtn({profileName,profileImage});
        setProfileName("");
        setProfileImage("");
        await callingEditApi(btn);
        // console.log(btn);

        gettingDataFromServer();
    }

    useEffect(()=>{
        gettingDataFromServer()
    },[])

    async function gettingDataFromServer(){
        try{
            const response=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_AUTHENTICATION_API_KEY}`,{
                method: "POST",
                body: JSON.stringify({
                    idToken:localStorage.getItem('token'),
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data=await response.json();
            if (data.users && data.users.length > 0) {
                setProfileName(data.users[0].displayName);
                setProfileImage(data.users[0].photoUrl);
                console.log("User Data:", data.users[0]);
                
            } else {
                console.log("No user data found");
            }
        }
        catch(err){
            console.log(err);
        }
    }

    async function callingEditApi(btn){
        try{
            const response=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_AUTHENTICATION_API_KEY}`,{
                method: "POST",
                body: JSON.stringify({
                    idToken:localStorage.getItem('token'),
                    displayName: profileName,
                    photoUrl: profileImage,
                    returnSecureToken: true,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            console.log(data);
        }
        catch(err){
            console.log(err);
        }
    }
    async function handleVerifyMail(){
        const response=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_AUTHENTICATION_API_KEY}`,{
            method: "POST",
            body: JSON.stringify({
                requestType:"VERIFY_EMAIL",
                idToken:localStorage.getItem('token'),
            }),
        });
        const data=await response.json();
        console.log(data);
    }

  return (
    <div>
        {
            showEdit?
            <>
                <div className='profile_parent'>
                    <p>Welcome to Expense Tracker!!!</p>
                    <p>Your Profile is incomplete. <span onClick={handleEdit}>Complete Now</span></p> 
                </div>
                <button onClick={handleVerifyMail}>Verify Email</button>
                <hr/>
            </>:
            <>
                <div>
                    <div className='profile_parent'>
                        <p>Winner never quite, Quitters never win.</p>
                        <p>Your Profile is <strong>64%</strong> completed. A complete Profile has higher chances of landing a job.   <span>Complete Now</span></p>
                    </div><hr/>
                    <div className='upload_parent'>
                        <div className='upload_parent_child1'>
                            <h1>Contact Details</h1>
                            <button>Cancel</button>
                        </div>
                        <div className='upload_parent_child2'>

                            <label><i className="fa-brands fa-github size-icon"></i> Full Name: </label>
                            <input type='text' onChange={(e)=>setProfileName(e.target.value)} value={profileName}/>

                            <label><i className="fa-solid fa-globe size-icon"></i> Profile Photo URL: </label>
                            <input type='text' onChange={(e)=>setProfileImage(e.target.value)} value={profileImage}/>

                        </div>
                        <button onClick={handleUpdate}>Update</button><hr/>
                    </div>
                </div>
            </>
        }
    </div>
  )
}

export default Profile