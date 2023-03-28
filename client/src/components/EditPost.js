import React, { useEffect, useContext, useState} from 'react'
import axios from 'axios';
import { useForm} from 'react-hook-form'
import {ApiContext, AlertContext, LoginContext} from '../context/Context'
import { MdOutlineClose,MdRefresh } from 'react-icons/md';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';


function EditPost({ data , openEditPost, forceRefresh}) {

  const { ApiBaseUrl } = useContext(ApiContext);
  const { accessToken } = useContext(LoginContext);
  const { setAlert } = useContext(AlertContext);
  const [ showLoading , setShowLoading] = useState(false);
  

  useEffect(() => {
    reset({post: data.post, hide_username: data.hide_username ? 'yes' : 'no' });
  }, [1]);

  const { register, handleSubmit, reset ,formState: { errors }, } = useForm();

    
  // // Update Post
    const onSubmit = (newData) =>{
      setShowLoading(true); 

      let hideUsername = newData.hide_username === "yes" ? true : false;
      
      axios.post( ApiBaseUrl +'/posts/update' , 
      { 'post' : newData.post, 'hide_username' : hideUsername , 'id' : data.id }, 
      {
        headers :{ accessToken: accessToken}
      }).then(function (response) {
          if(response.data.error){
            setShowLoading(false); 
            return setAlert({"action" : "success", "message": "Something went wrong!"});
          }

        setTimeout(() => {
          openEditPost(false);
          forceRefresh();
          setAlert({"action" : "success", "message": "Post has been updated successfully."}); // Show and Set Alert Message
          setShowLoading(false); 
        }, 2000);
      });
    }


  return (
    <>
      <div class="card">
      <div style={{display:"flex", justifyContent:"space-between", margin:"20px 10px 40px 0px"}}>
        <div style={{fontWeight:"bold", fontSize:"15pt"}}> EDIT POST </div>
        <MdOutlineClose className="icons post" style={{marginLeft:"auto"}} onClick={()=> { openEditPost(false) } }/>
      </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="textStory-container">
            <textarea className="textStory" rows="6" {...register('post', { required: true })} > </textarea> 
          </div>
          {errors.post && <p style={{color:"red", fontStyle:"9pt", margin:"0px 0px 20px 5px"}} >  Please write something!</p>}
        
          <div className="hideUsername-container">
              <div> Hide Username? </div>
              <input type="radio" value="no" name="hide_username" style={{marginLeft:"0px"}}  {...register('hide_username')} />
              <label> No </label> 
              <input type="radio" value="yes" name="hide_username" style={{marginLeft:"25px"}} {...register('hide_username')}/>
              <label> Yes </label>
          </div>

          <div style={{display:"flex", justifyContent:"right", marginTop:"50px"}} >
            <button className="btnClear" type="button" onClick={ ()=> {openEditPost(false)} }>  Cancel  </button>
            <button className="btnUpdate" type="submit" disabled={showLoading} >
              { showLoading ? <AiOutlineLoading3Quarters className="icons refresh"/> : "Update" }   
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default EditPost