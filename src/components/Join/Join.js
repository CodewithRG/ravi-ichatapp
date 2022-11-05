import React, { useEffect, useState } from 'react'
import './join.css'
import chatLogo from '../../images/logo.jfif'
// import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
let user;
const Join = () => {

    const [name, setName] = useState("");
    // const navigate = useNavigate();

    const setUser = (e)=>{
        user = name;
        // console.log(user,name)
    }
    
    useEffect(() => {
     
      console.log("oll..")
    }, []);
    
  return (
    <div className='joinPage' >
        <div className='joinContainer' >
            <img src={chatLogo} alt="" />
            <h1>JOIN CHAT ROOM</h1>
                <input type="text" placeholder='Type Your Name'  required onChange={(e)=>setName(e.target.value)} /> <br/>
                <Link onClick={(e)=>!name?e.preventDefault():null} to="/chatroom" ><button onClick={setUser()} >JOIN</button></Link>
        </div>
    </div>
  )
}

export default Join;
export {user}
