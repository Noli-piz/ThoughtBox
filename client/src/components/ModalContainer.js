import React, { useState, useContext } from 'react';

function ModalContainer( { component } ) {

    const modalStyle = {
        "display" : "block",
        "position": "fixed", 
        "z-index": "2", 
        "padding-top": "100px",
        "left": "0",
        "top": "0",
        "width": "100vw", 
        "height": "100vh", 
        "overflow": "hidden", 
        "background-color": "rgba(0,0,0,0.4)",
    };
    
    const modalContentStyle = {
        "display" : "flex",
        "background-color": "transparent",
        "margin": "auto",
        "border": "1px solid #fffff",
        "width": "700px",
        "height": "fit-content",
        "border-radius":"20px",
    };


return (
    <>
    <div style={modalStyle} >
        <div className="modal" style={modalContentStyle} >
            { component }
        </div>
    </div>
    </>
  )
}

export default ModalContainer