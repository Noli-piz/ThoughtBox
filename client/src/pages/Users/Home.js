import React, {useState, useEffect, useContext,useReducer} from 'react'
import { AiFillHome, AiOutlineHome, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { MdFeedback, MdOutlineFeedback, MdBookmarkBorder, MdBookmark} from 'react-icons/md'
import { BsFilePostFill, BsFilePost } from 'react-icons/bs'
import UserNavbar from '../../components/UserNavbar'
import CreatePost from '../../components/CreatePost'
import Modal from '../../components/Modal'
import axios from 'axios';
import EditPost from '../../components/EditPost'
import {LoginContext, ApiContext} from '../../context/Context'
import DisplayPost from '../../components/DisplayPost'
import ModalContainer from '../../components/ModalContainer'
import Feedback from '../../components/Feedback'
import ReportsModal from '../../components/ReportsModal'


function Home() {

  const { ApiBaseUrl } = useContext(ApiContext);
  const { username } = useContext(LoginContext);

  const [ selectedNavigation, setSelectedNavigation] = useState("Home");

  const [ refresh, forceRefresh] = useReducer(x=> x +1, 0); // Trigger

  const [ modalData, setModalData ] = useState({ id: 0, 'title' : '', 'content' : '' }); 
  const [ openModal, setOpenModal ] = useState(false);

  // Modals
  const [ showEditPostModal, setShowEditPostModal ] = useState(false);
  const [ showReportPostModal, setShowReportPostModal ] = useState(false);

  const [ data, setData] = useState([]);
  const [ dataClone, setDataClone] = useState([]);
  const [ selectedData, setSelectedData] = useState([]);


  // Get All Post
  useEffect(() => {
    axios.get( ApiBaseUrl + '/posts/', {params: {'username' : username} }).then(function (response) {
      if(response.data.error)
          return alert(response.data.error);

      if(selectedNavigation === "Home"){
        setData(response.data);
      }else if(selectedNavigation === "MyPosts"){
        const filterData =  response.data.filter( (a) => a.username.includes(username));
        setData(filterData);
      }else if(selectedNavigation === "Bookmarks"){
        const filterData =  response.data.filter( (a) => a.is_bookmarked === 1 );
        setData(filterData);
      }

      setDataClone(response.data);
    });

  }, [refresh])


  const onHome = () => {
    document.getElementsByClassName("column2")[0].scrollTo({ 'top': 0});
    setSelectedNavigation("Home"); 
    forceRefresh();
  }

  const onMyPost = () => {
    document.getElementsByClassName("column2")[0].scrollTo({ 'top': 0}); 
    setSelectedNavigation("MyPosts");
    const filterData =  dataClone.filter( (a) => a.username.includes(username));
    setData(filterData);
  }

  const onBookmark = () => {
    setSelectedNavigation("Bookmarks");
    document.getElementsByClassName("column2")[0].scrollTo({ 'top': 0}); 
    const filterData =  dataClone.filter( (a) => a.is_bookmarked === 1 );
    setData(filterData);
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
            <button className="btnTextOnly" type="button"> About </button> <br/>
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
          (selectedNavigation === "Home" && <CreatePost forceRefresh={forceRefresh}/>)
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

        { dataClone.length === 0 && selectedNavigation==="Home" && <AiOutlineLoading3Quarters className="icons refresh"/>}
        <div className="display-post-container" style={{width:"100%", marginLeft:"-40px"}}>

        { 
          selectedNavigation !== "Feedback" &&
          data.map((data)=>{
            return (
              <DisplayPost 
                data={data} 
                setOpenEditPost={setShowEditPostModal} 
                setShowReportPostModal={setShowReportPostModal} 
                forceRefresh={forceRefresh}  
                setSelectedData={setSelectedData}  
                setModalData={setModalData} 
                setOpenModal={setOpenModal}/>
            )
          })
        }
        </div>


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
        <br/>
        
      </div>
    </div>

    { openModal && <Modal modalData={modalData} openModal={setOpenModal} forceRefresh={forceRefresh} displayBtnCancel={true} displayBtnDelete={true} /> }
    { showEditPostModal && <ModalContainer component={<EditPost data={selectedData} openEditPost={setShowEditPostModal} forceRefresh={forceRefresh}/> } /> }
    { showReportPostModal && <ModalContainer component={<ReportsModal data={selectedData} setShowReportPostModal={setShowReportPostModal} forceRefresh={forceRefresh} /> } /> }

    </div>
  )
}

export default Home