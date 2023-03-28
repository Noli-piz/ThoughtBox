import React, {useState, useCallback, useEffect, useContext} from 'react'
import axios from 'axios';
import { useForm} from 'react-hook-form'
import {AlertContext, ApiContext, LoginContext} from '../context/Context'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { MdOutlineClose,MdRefresh } from 'react-icons/md';


function ReportsModal({ data, forceRefresh, setShowReportPostModal}) {

  
    const { ApiBaseUrl } = useContext(ApiContext);
    const { setAlert } = useContext(AlertContext);
    const { username, accessToken } = useContext(LoginContext);
    const [ showLoading , setShowLoading] = useState(false);
    const [ showError , setShowError] = useState(false);

    const [problemTags, setProblemTags] = useState([
      { 'id' : 1 , 'text' : 'Inappropriate/ Foul Language' , 'selected' : false}, 
      { 'id' : 2 , 'text' : 'Gibberish text' , 'selected' : false}, 
      { 'id' : 3 , 'text' : 'Harassment' , 'selected' : false}, 
      { 'id' : 4 , 'text' : 'Hate Speech' , 'selected' : false}, 
      { 'id' : 5 , 'text' : 'Others' , 'selected' : false} ]);

    const { register, handleSubmit, reset ,formState: { errors }, } = useForm();

    const onSelectProblemTags = (index) =>{
      const problemTagsClone = [...problemTags];
      problemTagsClone[index].selected = !problemTagsClone[index].selected;

      setProblemTags(problemTagsClone);
    }

    const onReset = () =>{
      const problemTagsClone = [...problemTags];
      for(let i =0 ; i < problemTags.length ; i++){
        problemTagsClone[i].selected = false;
      }

      setProblemTags(problemTagsClone);
      reset({feedback: ''})
    }
    
  // Send Reports
    const onSubmit = (newData) =>{
      

      // Get all the selected Problem Tags
      const filterProblemTag = problemTags.filter(t => t.selected === true); 

      //Check if user select a Tag
      if(!filterProblemTag.length) return setShowError(true);

      setShowLoading(true);
      // convert Problem Tags into flat String data
      const stringProblemTag = filterProblemTag.reduce((acc, curr) => `${acc}${curr.text} , ` ,'')


      axios.post( ApiBaseUrl + '/reports' , 
      { 'problem' : stringProblemTag, 'additionalInfo' : newData.additionalInfo, 'username' : username, 'postId' : data.id  },
      { 'headers' : { "accessToken" : accessToken }
      }).then(function (response) {
        
        if(response.data.error){
          setShowLoading(false);
          return setAlert({"action" : "error", "message": "Something went wrong!"});
        }

        setTimeout(() => {
          reset({feedback: ''});
          setShowLoading(false);
          forceRefresh();
          setShowReportPostModal(false);
          setAlert({"action" : "success", "message": "Report successfully submitted!"}); // Show and Set Alert Message
        }, 2000)
      });
    }


    const onClose = ()=>{
      setShowReportPostModal(false);
    }


  return (
    <>
        <div class="card">
        <div style={{display:"flex", justifyContent:"space-between", margin:"20px 10px 40px 0px"}}>
          <div style={{fontWeight:"bold", fontSize:"15pt"}}> Report Post </div>
          <MdOutlineClose className="icons post" style={{marginLeft:"auto"}} onClick={()=> { onClose() } }/>
        </div>

            <form onSubmit={handleSubmit(onSubmit)}>

              <p className="report-text">
                Please identify the problem.
              </p>

              <div>
                {
                  problemTags.map((tags,index)=>{
                    return <button className= {tags.selected ? "btn-tag" : "btn-tag selected"} type="button"  onClick={()=>{ onSelectProblemTags(index); setShowError(false) }}> {tags.text} </button>
                  })
                }
              </div>
              { showError &&  <div style={{color:"red", fontSize:"10pt", margin:"10px 0px 20px 5px"}} >  Please select atleast 1 problem! </div>}


            <br/>
            { problemTags[problemTags.length-1].selected &&
              <>  
                <p className="report-text">
                  Please input for additional information.
                </p>

                <div className="textStory-container">
                  <textarea className="textStory" rows="6"  {...register('additionalInfo', { required: problemTags[problemTags.length-1].selected ? true : false })} > </textarea>           
                </div>  
                {errors.feedback && <p style={{color:"red", fontStyle:"9pt", margin:"0px 0px 20px 5px"}} >  Please type something!</p>}
              </>              
            }


              <div  style={{display:"flex", justifyContent:"right", marginTop:"30px"}}>
                <button className="btnClear" type="button" onClick={ ()=> onReset() }>  Clear  </button>
                <button className="btnPost" type="submit" >  
                  { showLoading ? <AiOutlineLoading3Quarters className="icons refresh"/> : "Submit" }   
                </button>
              </div>
            </form>
        </div>

    </>
  )
}

export default ReportsModal