import React, {useState, useCallback, useEffect, useContext} from 'react'
import axios from 'axios';
import { useForm} from 'react-hook-form'
import {ApiContext, LoginContext} from '../context/Context'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'


function Feedback({forceRefresh}) {

    const { ApiBaseUrl } = useContext(ApiContext);
    const { username, accessToken } = useContext(LoginContext);
    const [showLoading , setShowLoading] = useState(false);
    const [showGratitude , setShowGratitude] = useState(false);

    const { register, handleSubmit, reset ,formState: { errors }, } = useForm();

    
  // Send Feedback
    const onSubmit = (data) =>{
      setShowLoading(true);

      axios.post( ApiBaseUrl + '/feedbacks' , 
      { 'feedback' : data.feedback },
      { 'headers' : { "accessToken" : accessToken }
      }).then(function (response) {
        
        if(response.data.error){
          setShowLoading(false);
          return alert(response.data.error);
        }

          setTimeout(() => {
            reset({feedback: ''});
            setShowLoading(false);
            setShowGratitude(true)
            forceRefresh();
        }, 2000)
      });
    }


  return (
    <>
        <div class="card">
            <div style={{fontWeight:"bold", fontSize:"15pt", marginBottom:"20px"}}> FEEDBACK </div>

            <form onSubmit={handleSubmit(onSubmit)}>

              <p className="feedback-text">
                Hello, please leave any feedback to help us improve our website. Don't worry, your information will never be shared.
              </p>

              <div className="textStory-container">
                <textarea className="textStory" rows="6"  {...register('feedback', { required: true } )} > </textarea>           
              </div>  
              {errors.feedback && <p style={{color:"red", fontStyle:"9pt", margin:"0px 0px 20px 5px"}} >  Please write something!</p>}
            

              <div  style={{display:"flex", justifyContent:"right", marginTop:"30px"}}>
                <button className="btnClear" type="button" onClick={ ()=> reset({feedback: ''})}>  Clear  </button>
                <button className="btnPost" type="submit" disabled={showLoading} >  
                  { showLoading ? <AiOutlineLoading3Quarters className="icons refresh"/> : "Send" }   
                </button>
              </div>
            </form>
        </div>

       
        {
          showGratitude &&  <div> Thank you for the feedback. </div> 
        }
      
    </>
  )
}

export default Feedback