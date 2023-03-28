import React, { useState, useContext } from 'react'
import './UserNavbar.css'
import { useNavigate } from 'react-router-dom';
import {CgProfile } from 'react-icons/cg'
import thoughtBox from '../assets/ThoughtBox.png'
import LogoutModal from './LogoutModal';
import {LoginContext} from '../context/Context'

function UserNavbar() {

  const { roles } = useContext(LoginContext)

  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  return (
    <>

        <div className='userNavbar' >
            <img className="nav-logo" src={thoughtBox} onClick={()=> navigate("/")} />

            { 
              roles === "guest" ? 
                <button className="btnLogin" style={{width:"fit-content", padding:"12px 20px"}} onClick={()=>{navigate("/login")}} > Log In </button> : 
                <CgProfile alt="profile" className="profilePic" onClick={()=> setShowLogout(!showLogout)}/>
            }
            
        </div>

        { showLogout && <LogoutModal/>}

    </>
  )
}

export default UserNavbar