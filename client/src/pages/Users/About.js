//rfce
import React, {useState } from 'react'
import thoughtBox from '../../assets/ThoughtBox.png'

function About() {
    
  return (
    <div style={{display:"flex", height:"100vh", alignItems:"center" , justifyContent:"center", backgroundColor:"whitesmoke"}} >
      <div>
        <div style={{fontSize:"32pt"}}> Our Mission </div>
        <br/>
        <div style={{fontSize:"22pt"}}>  
          Enable people to express and share their thoughts.
        </div>
      </div>
      <div style={{position:"fixed", bottom:"20px", opacity:".5"}}>
          <img className="nav-logo" src={thoughtBox} />
      </div>
    </div>
  )
}

export default About