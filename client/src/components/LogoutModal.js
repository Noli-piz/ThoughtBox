import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './UserNavbar.css'
import { LoginContext} from '../context/Context'
import Modal from './Modal';
import { SlLogout, SlInfo } from 'react-icons/sl'

function LogoutModal() {
  let navigate = useNavigate();
  const { username} = useContext(LoginContext);
  const [ modalData, setModalData ] = useState({ 'id': 0, 'title' : '', 'content' : '' });

  const [openModal, setOpenModal] = useState();

  const onLogout =()=>{
    setModalData({'title' : 'LOG OUT', 'content' : 'Are you sure you want to log out?' });
    setOpenModal(true);
  }

  return (
    <>
      <div class="logout-card">
        <p className="logout-username" > Hello, { username } </p> 
        <div class="divider"></div>
        <button className="btnAbout" type="button" onClick={()=> { navigate("/about")} } >  <SlInfo style={{marginRight:"10px"}} />  About </button>
        {/* <button className="btnTerms" type="button" > Terms & Condition </button>
        <button className="btnPrivacy" type="button" > Privacy Policy </button> */}
        {/* <br/><br/>
        <div class="divider"></div> */}
        <button className="btnLogout" type="button" onClick={()=> onLogout()} > <SlLogout style={{marginRight:"10px"}} /> Log Out </button>
      </div>

      { openModal && <Modal modalData={modalData} openModal={setOpenModal} displayBtnLogout={true} /> }
    </>
  )
}

export default LogoutModal