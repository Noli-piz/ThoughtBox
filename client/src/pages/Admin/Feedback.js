import React, {useContext, useState, useEffect, useReducer} from 'react'
import axios from 'axios';
import {ApiContext} from '../../context/Context'
import Moment from 'moment'

function Feedback() {

  const { ApiBaseUrl } = useContext(ApiContext);

  const [update, forceUpdate] = useReducer(x=>x+1,0);
  const [selectedTab, setSelectedTab] = useState("All");
  const [data, setData] = useState([]);
  const [dataClone, setDataClone] = useState([]);
  
  useEffect(()=>{
      axios.get( ApiBaseUrl + '/feedbacks', )
      .then(function (response) {
          setData(response.data)
          setDataClone(response.data)
      })
  },[update])

  const onMarkAsRead = (id, mark )=>{
    axios.put( ApiBaseUrl + '/feedbacks/', {'feedbackId' : id,  'markAsRead' : !mark } )
    .then(function (response) {
      if(response.data.error)
        return alert(response.data.error)

      forceUpdate();
    })
  }
  
  
  const onFilterAll =()=>{
    setData(dataClone);
    setSelectedTab("All");
  }

  const onFilterNotRead =()=>{
    const filterData =  dataClone.filter( (a) => a.mark_as_read === false );
    setData(filterData);
    setSelectedTab("NotRead");
  }

  const onFilterRead =()=>{
    const filterData =  dataClone.filter( (a) => a.mark_as_read === true);
    setData(filterData);
    setSelectedTab("Read");
  }

  return (
    <div className="main" >

      <div style={{padding:"20px", overflowY:"auto", overflowX:"hidden", maxHeight:"88vh"}}>
        <p style={{fontSize:"21pt", marginBottom:"3rem"}}> Feedbacks </p>

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
            return(
                <div style={{ display:"flex", justifyContent:"center"}}>
                <div className="card" style={{maxWidth:"90%"}}>
                  <div>
                    Date Created: { Moment(data.createdAt).format("LL") }
                  </div> <br/>
        
                  <div>
                    Feedback: {data.feedback}
                  </div>
        
                  <div>
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

export default Feedback