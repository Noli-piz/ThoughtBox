//rfce
import React, {useState } from 'react'
import speakerBox from '../../assets/ThoughtBox.png'
import { AiFillHeart } from 'react-icons/ai'

function Share() {

    const data = useState(
        {
            "username": "nowls",
            "hide_username": false,
            "post" : "if you are reading this im probably dead.",
            "createdAt" : "Feb 27, 2020 - 10:20 PM"
        }
    )
    
  return (
    <div style={{display:"flex", height:"100vh", alignItems:"center" , justifyContent:"center", backgroundColor:"whitesmoke"}} >
        
        <div className="card" style={{width:"50%",maxHeight:"50%"}}>
            <div style={{display:"flex", justifyContent:"space-between", marginBottom:"30px"}}>
                <div>
                    <label 
                        style={ data[0].hide_username ? {fontWeight:"bold", fontSize:"15pt", color :"#F1BBD5" } : {fontWeight:"bold", fontSize:"15pt" }}> 
                        { data[0].hide_username ? '• hidden_username •' : '@ '+ data[0].username}
                    </label> <br/>
                    
                    <label style={{fontWeight:"normal", fontSize:"12px", marginLeft:"0px"  }}> {data[0].createdAt} </label>
                </div>

                <img src={speakerBox} style={{width:"auto", height:"20px", opacity:".1"}} alt="img" /> 
            </div>

            <br/>

            <textarea 
                rows={(data[0].post.match(/\n/g) || '').length + 1} 
                value={data[0].post} 
                style={{ overflow:"hidden", width:"100%", height:"auto", fontSize:"25pt", border:"none", resize:"none", outline: "none"}} 
                readOnly
            />

            <AiFillHeart  className="icons-heart" style={{marginTop:"45px", color:"red"}} title="Heart"/> 
        </div>
    </div>
  )
}

export default Share