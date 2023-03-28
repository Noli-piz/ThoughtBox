import React, { useEffect,useContext } from 'react';
import { LoginContext} from '../../context/Context';
import { FaUsers } from 'react-icons/fa'

function Home() {
  const { username, roles, setRoles, setAccessToken, setShowAdminNavigation } = useContext(LoginContext);

  useEffect(()=>{
    setShowAdminNavigation(true);
  }, [1])

  
  return (
    <div className="main">
    <div style={{padding:"50px"}}>
        <div className="dashboard-container">
            <div className="dashboard-card">
              <FaUsers size="90px" color="blue" />
              <div className="dashboard-txt1"> 0 </div>
              <div className="dashboard-txt2">Total Users </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Home