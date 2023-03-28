import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import {ApiContext, LoginContext} from '../context/Context'
import { AiFillHeart , AiOutlineHeart, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { MdMoreVert, MdBookmarkBorder, MdBookmark, MdDoDisturb } from 'react-icons/md'
import { TbMessageReport } from 'react-icons/tb'
import TextareaAutosize from 'react-textarea-autosize';
import moment from 'moment'


function DisplayPost({data, forceRefresh, setOpenEditPost, setSelectedData, setModalData, setOpenModal, setShowReportPostModal }) {

    const { ApiBaseUrl } = useContext(ApiContext);
    const { username, roles } = useContext(LoginContext);

    
    const onBookmark = (id) => {
      if(roles === "guest"){
        setModalData({ 'title' : 'USER NOT LOGIN', 'content' : 'Please login to interact with our website.' });
        return setOpenModal(true);
      }

      axios.post(ApiBaseUrl + '/bookmarks' , 
      { 'username' : username,  'postId' : id }
      ).then(function (response) {
        if(response.data.error)
            return alert(response.data.error);
  
        forceRefresh();
     });
    }
  
    const onRemoveBookmark = (id) => {
      axios.get( ApiBaseUrl + '/bookmarks/delete' , { params : { 'bookmarkedId' : id }}).then(function (response) {
        if(response.data.error)
            return alert(response.data.error);
  
        forceRefresh();
      });
    }
  
    const onLike = (id) => {
      if(roles === "guest"){
        setModalData({ 'title' : 'USER NOT LOGIN', 'content' : 'Please login to interact with our website.' });
        return setOpenModal(true);
      }

      axios.post( ApiBaseUrl + '/likes' , { 'username' : username , 'postId' : id }).then(function (response) {
        if(response.data.error)
            return alert(response.data.error);
  
        forceRefresh();
     });
    }
  
    const onRemoveLike = (id) => {
      axios.get( ApiBaseUrl + '/likes/delete' , { params : {'likedId' : id }}).then(function (response) {
        if(response.data.error)
            return alert(response.data.error);
  
        forceRefresh();
     });
    }
  
  
    const onDelete = (id) => {
      setModalData({ 'id': id, 'title' : 'DELETE POST', 'content' : 'Are you sure you want to delete this post?' });
      setOpenModal(true);
    }
  
    const onReport = (id) => {
      if(roles === "guest"){
        setModalData({ 'title' : 'USER NOT LOGIN', 'content' : 'Please login to interact with our website.' });
        return setOpenModal(true);
      }

      // alert(id);
      setSelectedData({'id' : id});
      setShowReportPostModal(true);
    }
  
    const onEdit = (data) => {
      if(roles === "guest"){
        setModalData({ 'title' : 'USER NOT LOGIN', 'content' : 'Please login to interact with our website.' });
        return setOpenModal(true);
      }

      setSelectedData(data);
      setOpenEditPost(true);
    }


    

  return (
    <>
      <div className="card">
        <div className="header">
          <div style={{marginBottom:"20px"}} >
            <label style={ data.hide_username ? {fontWeight:"bold", fontSize:"12pt", color :"#F1BBD5" } : {fontWeight:"bold", fontSize:"12pt", color :"black" }}> { data.hide_username ? '• hidden_username •' : '@ '+ data.username} </label> <br/>
            <label style={{fontWeight:"normal", fontSize:"12px", marginLeft:"0px"  }}> { moment(data.createdAt).format("MMM d, YYYY - hh:mm A")} </label>
          </div>

          <div className="icon-container">
            { data.username === username ? <AiOutlineEdit className="icons post" onClick={()=> onEdit(data) } title="Edit" /> : ''}
            { data.username === username ? <AiOutlineDelete className="icons post" onClick={()=> onDelete(data.id) } title="Delete" /> : '' }
            { data.is_bookmarked ? <MdBookmark className="icons post" onClick={()=> onRemoveBookmark(data.id_bookmark)  } title="Remove Bookmark" /> : <MdBookmarkBorder className="icons post" onClick={()=> onBookmark(data.id) } title="Bookmark" />}
            <TbMessageReport className="icons post" onClick={()=> onReport(data.id) } title="Report" />
          </div>
          
          <div className="icon-container2" >
            { data.is_bookmarked ? <MdBookmark className="icons post" onClick={()=> onRemoveBookmark(data.id_bookmark)  } title="Remove Bookmark" /> : <MdBookmarkBorder className="icons post" onClick={()=> onBookmark(data.id) } title="Bookmark" />}

            <div className="dropup">
                <MdMoreVert className="icons post more" />
                <div class="dropup-content">
                  <button type="button" onClick={()=>onEdit(data)} > Edit </button>
                  <button type="button" onClick={()=>onDelete(data.id)} > Delete </button>
                  <button type="button" onClick={()=>onReport(data.id)} > Report </button>
                </div>
            </div>
          </div>

        </div>

        <TextareaAutosize 
          value={data.post.trimEnd()}
          readOnly
          style={{overflow:"hidden", width:"100%", height:"fit-content", fontSize:"12pt", border:"none", resize:"none", outline: "none"}} />
        

        <div style={{marginTop:"35px", display:"flex", alignItems:"center"}}  >
            { 
              data.is_liked ? 
              <AiFillHeart className="icons-heart" title="Unheart" onClick={()=>onRemoveLike(data.id_like)}/> :
              <AiOutlineHeart  className="icons-heart" title="Heart" onClick={()=>onLike(data.id)}/>
            }
            { data.like_count }
        </div>
      </div>
    </>
  )
}

export default DisplayPost