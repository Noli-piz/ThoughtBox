import React, { useState, useEffect, useContext } from 'react'
import ReactTableTemplate from '../../components/TableTemplate/ReactTableTemplate'
import axios from 'axios';
import GlobalFilter from '../../components/TableTemplate/GlobalFilter';
import {ApiContext} from '../../context/Context'
import { adminsColumn } from '../../components/TableTemplate/react-column'

function Administrator() {
  const { ApiBaseUrl } = useContext(ApiContext);


  const [data, setData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState([]);
  
  useEffect(()=>{
      axios.get( ApiBaseUrl + '/admins', )
      .then(function (response) {
          console.log(response.data);
          setData(response.data)
      })
  },[])

  

  return (
    <div className="main">
    <div style={{padding:"20px 20px",  overflowX:"auto", overflowY:"none"}}>
      <p style={{fontSize:"21pt", marginBottom:"3rem"}}> Manage Admins </p>
        <GlobalFilter filter={searchKeyword} setFilter={setSearchKeyword} />
        <ReactTableTemplate columns={adminsColumn}  data={data} globalFilter={searchKeyword} />
    </div>
    </div>
  )
}

export default Administrator