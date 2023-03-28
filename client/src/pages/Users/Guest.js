import React, {useState, useEffect, useContext,useReducer} from 'react'
import { AiFillHome, AiOutlineHome, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { MdFeedback, MdOutlineFeedback, MdBookmarkBorder, MdBookmark} from 'react-icons/md'
import { BsFilePostFill, BsFilePost } from 'react-icons/bs'
import UserNavbar from '../../components/UserNavbar'
import CreatePost from '../../components/CreatePost'
import axios from 'axios';
import {LoginContext, ApiContext} from '../../context/Context'
import DisplayPost from '../../components/DisplayPost'
import Feedback from '../../components/Feedback'
import Modal from '../../components/Modal'
import { useNavigate } from 'react-router'

function Guest() {
  let navigate = useNavigate();
  const { ApiBaseUrl } = useContext(ApiContext);
  const { setRoles } = useContext(LoginContext);
  const [ selectedNavigation, setSelectedNavigation] = useState("Home");
  const [ refresh, forceRefresh] = useReducer(x=> x +1, 0); // Trigger
  const [ data, setData] = useState([]);
  const [ modalData, setModalData ] = useState({ 'id': 0, 'title' : '', 'content' : '' });
  const [ openModal, setOpenModal ] = useState(false);


  useEffect(() => {
    setRoles('guest');
  }, [1])

  // Get All Post
  useEffect(() => {
    axios.get( ApiBaseUrl + '/posts/guests/').then(function (response) {
      if(response.data.error)
          return alert(response.data.error);

      setData(response.data);
    });

  }, [refresh])


  const onHome = () => {
    document.getElementsByClassName("column2")[0].scrollTo({ 'top': 0});
    setSelectedNavigation("Home"); 
    forceRefresh();
  }

  const onMyPost = () => {
    setSelectedNavigation("MyPosts");
  }

  const onBookmark = () => {
    setSelectedNavigation("Bookmarks");
  }

  return (
    <div style={{maxHeight:"100vh",overflow:"hidden"}}>
    <UserNavbar  />

    <div style={{padding:"4px 10px", display:"flex"}}>

      <div className="column1">
        <button 
          className= { selectedNavigation === "Home" ? "btn-nav active-btn" : "btn-nav"} 
          type="button"
          title="home"
          onClick={()=>{ onHome() }}> 
            { selectedNavigation === "Home" ?  <AiFillHome className="nav-icons" /> : <AiOutlineHome className="nav-icons" /> } 
            <div className="nav-label">  Home  </div> 
        </button>
        
        <button 
          className= { selectedNavigation === "MyPosts" ? "btn-nav active-btn" : "btn-nav"}  
          type="button"  
          title="my posts"
          onClick={()=> { onMyPost()}}> 
            { selectedNavigation === "MyPosts" ?  <BsFilePost className="nav-icons" /> : <BsFilePostFill className="nav-icons" /> } 
            <div className="nav-label">  My Posts  </div>  
        </button>

        <button 
          className= { selectedNavigation === "Bookmarks" ? "btn-nav active-btn" : "btn-nav"}  
          type="button"  
          title="bookmarks"
          onClick={()=>{ onBookmark()}}> 
            { selectedNavigation === "Bookmarks" ?  <MdBookmark className="nav-icons" /> : <MdBookmarkBorder className="nav-icons" /> } 
            <div className="nav-label">  Bookmarks  </div>  
        </button>
        
        <div className="divider"></div>

        <button 
          className= { selectedNavigation === "Feedback" ? "btn-nav active-btn" : "btn-nav"} 
          type="button" 
          title="feedback"
          onClick={()=>setSelectedNavigation("Feedback")}> 
            { selectedNavigation === "Feedback" ?  <MdFeedback className="nav-icons" /> : <MdOutlineFeedback className="nav-icons" /> }  
            <div className="nav-label">  Feedback  </div> 
        </button>

        <div className="terms-container" style={{ marginTop:"auto", marginBottom:"0%"}}> 
          <div style={{marginBottom:"20px"}}> 
            <button className="btnTextOnly" type="button" onClick={()=> navigate('/about')} > About </button> <br/>
            {/* <button className="btnTextOnly" type="button"> Terms & Condition </button> <br/>
            <button className="btnTextOnly" type="button"> Privacy Policy </button> */}
          </div>

          <div> 
            <label style={{color:"gray", fontWeight:"bold"}}>  ©Thought Box 2023  </label>
          </div>
        </div>
      </div>


      <div className="column2">

<br/>
<br/>
        {
          (selectedNavigation === "Home" && <CreatePost forceRefresh={forceRefresh} setModalData={setModalData} setOpenModal={setOpenModal} />)
        }
        {
          (selectedNavigation === "MyPosts" && <h1> My Posts </h1>)
        }
        {
          (selectedNavigation === "Bookmarks" && <h1> Bookmarks </h1>)
        }
        {
          (selectedNavigation === "Feedback" && <Feedback/>)
        }

        <br/>
        <br/>

        {/* Loading */}
        { data.length === 0 && selectedNavigation==="Home" && <AiOutlineLoading3Quarters className="icons refresh"/>}
        { 
          selectedNavigation !== "MyPosts" && selectedNavigation !== "Bookmarks" && selectedNavigation !== "Feedback" &&
          data.map((data)=>{
            return <DisplayPost data={data}  setModalData={setModalData} setOpenModal={setOpenModal}/>
          })
        }

        <div className="mobile-navigation">
          <button 
            className= { selectedNavigation === "Home" ? "btn-nav active-btn" : "btn-nav"} 
            type="button"
            title="home"
            onClick={()=>{ onHome() }}> 
              { selectedNavigation === "Home" ?  <AiFillHome className="nav-icons" /> : <AiOutlineHome className="nav-icons" /> } 
          </button>
          
          <button 
            className= { selectedNavigation === "MyPosts" ? "btn-nav active-btn" : "btn-nav"}  
            type="button"  
            title="my posts"
            onClick={()=> { onMyPost()}}> 
              { selectedNavigation === "MyPosts" ?  <BsFilePost className="nav-icons" /> : <BsFilePostFill className="nav-icons" /> } 
          </button>

          <button 
            className= { selectedNavigation === "Bookmarks" ? "btn-nav active-btn" : "btn-nav"}  
            type="button"  
            title="bookmarks"
            onClick={()=>{ onBookmark()}}> 
              { selectedNavigation === "Bookmarks" ?  <MdBookmark className="nav-icons" /> : <MdBookmarkBorder className="nav-icons" /> }
          </button>

          <button 
            className= { selectedNavigation === "Feedback" ? "btn-nav active-btn" : "btn-nav"} 
            type="button" 
            title="feedback"
            onClick={()=>setSelectedNavigation("Feedback")}> 
              { selectedNavigation === "Feedback" ?  <MdFeedback className="nav-icons" /> : <MdOutlineFeedback className="nav-icons" /> } 
          </button>
        </div>

        <br/>
        <br/>

      </div>

    </div>
    { openModal && <Modal modalData={modalData} openModal={setOpenModal} forceRefresh={forceRefresh} displayBtnLogin={true}  displayBtnCancel={true}/> }
    </div>
  )
}

export default Guest