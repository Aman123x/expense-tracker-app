import React, { useState } from 'react'
import "./Profile.css"

const Profile = () => {

    const[showEdit,setShowEdit]=useState(true);

    const handleEdit=()=>{
        setShowEdit(false);
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
                <hr/>
            </>:
            <>
                <div>
                    Hello, I am here
                </div>
            </>
        }
    </div>
  )
}

export default Profile