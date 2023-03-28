//rfce
import React, {useState } from 'react'
import thoughtBox from '../../assets/ThoughtBox.png'


function Terms() {
    
  return (
    <div style={{display:"flex", height:"100vh", alignItems:"center" , justifyContent:"center", backgroundColor:"whitesmoke"}} >
      <div>
        <div style={{fontSize:"32pt"}}> Terms and Condition </div>
        <div style={{fontSize:"10pt"}}> Last Updated : March 12, 2023 </div>
        <br/>
        <br/>
        <div style={{fontSize:"18pt"}}>  
         We only collect "Username" and "Password"  
        </div>
      </div>
      <div style={{position:"fixed", bottom:"20px", opacity:".5"}}>
          <img className="nav-logo" src={thoughtBox} />
      </div>
    </div>
  )
}

export default Terms