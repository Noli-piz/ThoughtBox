import React,{useEffect, useState, useContext, useReducer} from 'react'
import axios from 'axios';
import {ApiContext} from '../../context/Context'
import Moment from 'moment'
import { AiFillHeart , AiOutlineHeart, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'

function Reports() {

  const [data, setData] = useState([]);
  const [update, forceUpdate] = useReducer(x=>x+1,0);
  const { ApiBaseUrl } = useContext(ApiContext);
  const [selectedTab, setSelectedTab] = useState("All");
  const [dataClone, setDataClone] = useState([]);
  

  useEffect(()=>{
      axios.get( ApiBaseUrl + '/reports', )
      .then(function (response) {
          const filterData =  response.data.filter( (a) => a.post_deleted === 0);
          setData(filterData);
          setDataClone(filterData);
      })
  },[update])


  const onFilterAll =()=>{
    setData(dataClone);
    setSelectedTab("All");
  }

  const onFilterNotRead =()=>{
    const filterData =  dataClone.filter( (a) => a.mark_as_read );
    setData(filterData);
    setSelectedTab("NotRead");
  }

  const onFilterRead =()=>{
    const filterData =  dataClone.filter( (a) => !a.mark_as_read );
    setData(filterData);
    setSelectedTab("Read");
  }

  const onDeletePost = (id )=>{
    if(!window.confirm("Are you sure you want to delete?"))
        return;

    axios.get( ApiBaseUrl + '/posts/delete', 
    {
      params : { 'id' : id } 

    }).then(function (response) {
      if(response.data.error)
        return alert(response.data.error)

      forceUpdate();
    })
  }


  const onMarkAsRead = (id, mark )=>{
    axios.put( ApiBaseUrl + '/reports/', {'reportId' : id,  'markAsRead' : !mark } )
    .then(function (response) {
      if(response.data.error)
        return alert(response.data.error)

      forceUpdate();
    })
  }


  return (
    <div className="main">
      <div style={{padding:"20px",overflowY:"auto", overflowX:"hidden", maxHeight:"88vh"}}>
        <p style={{fontSize:"21pt", marginBottom:"3rem"}}> Reports </p>

        <div className="tab-text-container"> 
          <button 
            className= { selectedTab ==="All" ? "tab-text selected" : "tab-text"} 
            onClick={onFilterAll} > All </button>
          
          <button 
            className= { selectedTab ==="NotRead" ? "tab-text selected" : "tab-text"} 
            onClick={onFilterNotRead} > Not Read </button>
         
          <button 
            className= { selectedTab ==="Read" ? "tab-text selected" : "tab-text"} 
            onClick={onFilterRead} > Read </button>
        </div>

        {
          data.map((data)=>{
            return (
              <div style={{ display:"flex", justifyContent:"center"}}>
                <div className="card" style={{maxWidth:"90%"}}>
                  <p style={{fontSize:"15pt", fontWeight:"bold"}}> Report Information </p>
                  <div style={{lineHeight:"2"}}> 
                    <div > { Moment(data.report_date).format("LL") } </div> 
                    <div> Reported by: <span style={{fontWeight:"bold"}}>  @ {data.reporter} </span> </div>
                    <div> Problem: { data.problem } </div> 
                    <div className={data.additional_info ? "" : "display_none"} > Additional Information: { data.additional_info } </div>
                  </div>

                  <div className="card" style={{width:"auto", margin:"20px 0px"}}>
                  <div> @ {data.username} </div>
                  <div style={{fontSize:"10pt"}}> { Moment(data.createdAt).format("LL - hh:mm a") } </div> <br/>
                  <div> { data.post } </div>
                    
                  <div style={{marginTop:"35px", display:"flex", alignItems:"center"}}  >
                        <AiFillHeart className="icons-heart" title="Unheart" /> 
                  </div>
                  </div>

                  <div className="button-container-report">
                    <button className="btnDeletePost-report" onClick={()=>onDeletePost(data.id_post)}> Delete Post </button>
                    <button className= { data.mark_as_read ? "btnMarkAsRead" : "btnMarkAsUnRead" } onClick={()=> onMarkAsRead(data.id, data.mark_as_read) }> { data.mark_as_read ? 'Mark as Unread' : 'Mark as Read' } </button>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Reports