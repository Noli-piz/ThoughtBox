//rfce
import React from 'react'
import { useNavigate } from 'react-router-dom'


function NoResult() {
    let navigate = useNavigate();
    let imgSrc = "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=826&t=st=1677581276~exp=1677581876~hmac=b48280dd7c4c0772668eba591c26690b06115bae8b02826bc598d28a811d029e";
    
  return (
    <div style={{display:"flex", alignItems:"center", height:"100vh", justifyContent:"center"}} >
        <div style={{display:"flex", flexDirection:"column" , alignItems:"center", }}>
            <img src={imgSrc} style={{width:"500px",height:"500px"}} />
            <p style={{fontSize:"35pt", fontWeight:"bolder",color:"red"}} > Page Not Found! </p>
            <button onClick={()=>{ navigate(-1) }} style={{fontSize:"15pt",padding:"15px 35px", borderRadius:"50px", border:"none", backgroundColor:"blue", color:"white"}}  > GO BACK </button>
        </div>
    </div>
  )
}

export default NoResult