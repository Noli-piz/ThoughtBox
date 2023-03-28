import React, {useState, useCallback, useEffect, useContext} from 'react'
import axios from 'axios';
import { useForm} from 'react-hook-form'
import {AlertContext, ApiContext, LoginContext} from '../context/Context'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';



function CreatePost({forceRefresh, setOpenModal , setModalData}) {

    const { ApiBaseUrl } = useContext(ApiContext);
    const { setAlert } = useContext(AlertContext);
    const { username, accessToken, roles } = useContext(LoginContext);
    const [ showLoading , setShowLoading] = useState(false);
    const [ textCount , setTextCount] = useState(0);


    // Placeholder Animation
    
    const placholderText = [ "Write and share your story here.", "Feeling down? Express your feeling.", "A lot going on in your mind? Share it."]
    const [placeHolder, setNewPlaceHolder] = useState();
  
    // Trigger Placeholder Animation and Radio Button value
    useEffect(() => {
        reset({post: '', hide_username: 'no' });
    }, [1]);
    
    
    const shuffle = useCallback(() => {
        const index = Math.floor(Math.random() * placholderText.length);
        setNewPlaceHolder(placholderText[index]);
    }, []);
  
    useEffect(() => {
        const intervalID = setInterval(shuffle, 2500);
        return () => clearInterval(intervalID);
    }, [shuffle])
    // End of Placeholder Animation
  

    const { register, handleSubmit, reset ,formState: { errors }, } = useForm();
    
  // Insert Post
    const onSubmit = (data) =>{
      if(roles === "guest"){
        setModalData({ 'title' : 'USER NOT LOGIN', 'content' : 'Please login to interact with our website.' });
        return setOpenModal(true);
      }

      setShowLoading(true);
      let hideUsername = data.hide_username === "yes" ? true : false;

      axios.post( ApiBaseUrl + '/posts/' , 
      { 'post' : data.post.trimEnd(), 'hide_username' : hideUsername , 'username' : username },
      { 'headers' : { "accessToken" : accessToken }
      }).then(function (response) {
        
        if(response.data.error){
          setShowLoading(false);
          return setAlert({"action" : "error", "message": "Something went wrong!"});
        }

        setTimeout(() => {
          setTextCount(0); 
          reset({post: '', hide_username: 'no' }); // Reset input from Form
          setAlert({"action" : "success", "message": "Post has been created successfully!"}); // Show and Set Alert Message
          forceRefresh(); // refersh the Data
          setShowLoading(false); 
        }, 2000)
      });
    }


  return (
    <>
        <div class="card">
            <div style={{fontWeight:"bold", fontSize:"15pt", marginBottom:"40px"}}> CREATE POST </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="textStory-container">
                <textarea className="textStory" maxLength="5000" rows="6" placeholder={placeHolder}  {...register('post', { required: true })} onChange={(e)=> { setTextCount(e.target.value.trimEnd().length);} }> </textarea>
                <div style={{backgroundColor:"transparent", position:"absolute", bottom:1, right:1, marginRight:"10px"}}>
                  { textCount } / 5000
                </div>
              </div>  
              {errors.post && <p style={{color:"red", fontStyle:"9pt", margin:"0px 0px 20px 5px"}} >  Please write something!</p>}
            
              <div className="hideUsername-container">
                  <div> Hide Username? </div> 
                  <input type="radio" value="no" name="hide_username" {...register('hide_username')} />
                  <label> No </label> 
                  <input type="radio" value="yes" name="hide_username" style={{marginLeft:"15px"}} {...register('hide_username')}/>
                  <label> Yes </label>
              </div>

              <div  style={{display:"flex", justifyContent:"right", marginTop:"30px"}}>
                <button className="btnClear" type="button" onClick={ ()=> reset({post: '', hide_username: 'no' })}>  Clear  </button>
                <button className="btnPost" type="submit" disabled={showLoading} >  
                  { showLoading ? <AiOutlineLoading3Quarters className="icons refresh"/> : "Post" }   
                </button>
              </div>
            </form>
        </div>
    </>
  )
}

export default CreatePost