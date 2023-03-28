import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineClose,MdRefresh } from 'react-icons/md';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import axios from 'axios';
import {ApiContext, AlertContext, LoginContext} from '../context/Context'


function Modal({ modalData, openModal, forceRefresh, displayBtnCancel, displayBtnDelete, displayBtnOk, displayBtnLogin, displayBtnLogout}) {

    let navigate = useNavigate();
  const { roles, setRoles, setAccessToken, setShowAdminNavigation } = useContext(LoginContext);
    const { setAlert } = useContext(AlertContext);
    const { ApiBaseUrl } = useContext(ApiContext);

    const [showLoading , setShowLoading] = useState(false);
    const [showAlertModal , setShowAlertModal] = useState(false);
    const [display , setDisplay] = useState("block");

    const modalStyle = {
        "display" : "block",
        "position": "fixed", 
        "z-index": "2", 
        "padding-top": "100px",
        "left": "0",
        "top": "0",
        "width": "100%", 
        "height": "100%", 
        "overflow": "auto", 
        "background-color": "rgba(0,0,0,0.4)",
    };
    
    const modalContentStyle = {
        "display" : "flex",
        "flex-direction":"column",
        "background-color": "white",
        "margin": "auto",
        "padding": "20px 10px",
        "border": "1px solid #fffff",
        "width": "fit-content",
        "height": "fit-content",
    };

    const onDelete = ()=>{
        setShowLoading(true);
        axios.get( ApiBaseUrl + '/posts/delete' , { params : { 'id' : modalData.id }}).then(function (response) {
            
            if(response.data.error){
                setShowLoading(false);
                return alert(response.data.error);
            }

            setTimeout(() => {
                setShowAlertModal(true);
            }, 1000)

            setTimeout(() => {
                setAlert({"action": "success" , "message" : "Post has been deleted successfully!"});
                forceRefresh();
                openModal(false);
            }, 2500)
        });
    }

    const onLogout =()=>{
        localStorage.removeItem("accessToken");
        setAccessToken('');
        setShowAdminNavigation(false);
        navigate("/")
        setAlert({"action" : "success", "message": "Log Out Success!"}); // Show and Set Alert Message
    
        if(roles==="user"){
          localStorage.removeItem("roles");
          setRoles('');
        }
      }

return (
    <>
    <div style={modalStyle} >

        <div className="modal" style={modalContentStyle} >
            <div style={{display:"flex", justifyContent:"space-between", margin:"20px 10px 40px 10px"}}>
                <div style={{fontWeight:"bold", fontSize:"15pt"}} > {modalData.title} </div>
                <MdOutlineClose className="icons post" style={{marginRight:"0px"}} onClick={()=> {openModal(false)} }/> 
            </div>

            <div style={{fontSize:"15pt", margin:"0px 20px 15px 10px", fontFamily : "Arial"}} > {modalData.content} </div>

            <div style={{display:"flex", justifyContent:"right", marginTop:"30px"}} >

                {
                    displayBtnCancel &&
                    <button className="btnCancel" type="button" style={{marginLeft:"10px"}} onClick={()=> { openModal(false)}} > Cancel </button>
                }

                { displayBtnDelete &&
                    <button className="btnDelete" type="button" onClick={()=> { onDelete()}} disabled={showLoading} >  
                    { showLoading ? <AiOutlineLoading3Quarters className="icons refresh"/> : "Delete" }   
                    </button>
                }
                
                { displayBtnOk &&
                    <button className="btnOk" type="button" onClick={()=> { openModal(false) }} disabled={showLoading} >  
                        { showLoading ? <AiOutlineLoading3Quarters className="icons refresh"/> : "Ok" }   
                    </button>
                }

                { displayBtnLogin &&
                    <button className="btnLogin" type="button" style={{width:"fit-content", padding:"10px 20px"}} onClick={()=> { navigate("/login") }} >  
                        Log In 
                    </button>
                }

                { displayBtnLogout &&
                    <button className="btnLogin" type="button" style={{width:"fit-content", padding:"10px 20px"}} onClick={()=> { onLogout() }} >  
                        Log Out 
                    </button>
                }


            </div>
        </div>
    </div>
    </>
  )
}

export default Modal