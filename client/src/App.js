import './App.css';
import React, { useEffect, useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {LoginContext, ApiContext, AlertContext} from './context/Context'

import Navbar from './components/Navbar.js'
import AdminLogin from './pages/Admin/Login'
import AdminHome from './pages/Admin/Home'
import AdminAdministrator from './pages/Admin/Administrator'
import AdminAccount from './pages/Admin/Accounts'
import AdminFeedback from './pages/Admin/Feedback'
import AdminReport from './pages/Admin/Reports'
import Home from './pages/Users/Home.js'
import Register from './pages/Users/Register.js'
import LoginUser from './pages/Users/LoginUser';
import NoResult from './pages/Users/NoResult';
import Guest from './pages/Users/Guest';
import About from './pages/Users/About';
import AlertModal from './components/AlertModal';

function App() {
  const [alert, setAlert] = useState({"action" : '' , 'message' : ''});
  const [roles, setRoles] = useState();
  const [showAdminNavigation, setShowAdminNavigation] = useState(false);
  const [username, setUsername] = useState();
  const [accessToken, setAccessToken] = useState();

  useEffect (()=>{
    const access = localStorage.getItem("accessToken");
    if(access){
      setAccessToken(access);
      setUsername(localStorage.getItem("username"));
      setRoles(localStorage.getItem("roles"));
    }
  },[1])

  // Removed Left Margin
  document.documentElement.style.setProperty('--left', '0px');

  let s = "http://192.168.43.166:3002";
  let s2 = process.env.REACT_APP_API_BASE_URL;

  return (
    <div className="App">

      <ApiContext.Provider value={{"ApiBaseUrl" : process.env.REACT_APP_API_BASE_URL}} >
        <LoginContext.Provider value={{ username, setUsername, roles, setRoles ,accessToken, setAccessToken, showAdminNavigation , setShowAdminNavigation }} >
          <AlertContext.Provider value={{ alert, setAlert}} >

          <BrowserRouter>
            { 
              roles === "admin" && showAdminNavigation && <Navbar/>
            }
            
            <Routes>
              {
                // User is redirected here if remembered
                roles === "user" &&
                <>
                  <Route path="/" element={ <Home/>} />
                  <Route path="/home" element={ <Home/>} />
                </>
              }

              { 
                // Admin is redirected here if remembered
                roles === "admin" &&
                <>
                  { accessToken.length === 0 ?
                    <Route path="/" element={ <AdminLogin />} /> :
                    <Route path="/" element={ <AdminHome/>} />
                  }

                  <Route path="/admin/home" element={ <AdminHome/>} />
                  <Route path="/admin/administrator" element={ <AdminAdministrator/>} />
                  <Route path="/admin/accounts" element={ <AdminAccount/>} />
                  <Route path="/admin/reports" element={ <AdminReport/>} />
                  <Route path="/admin/feedback" element={ <AdminFeedback/>} />
                </>
              }

              {
                // if Access Token is not found this Routes only available
                !accessToken &&
                <>
                  <Route path="/" element={ <Guest/>} />
                  <Route path="/register" element={ <Register/>} />
                  <Route path="/admin/login" element={ <AdminLogin/>} />
                  <Route path="/login" element={ <LoginUser/>} />
                </>              
              }

              <Route path="/guest" element={ <Guest/>} />
              <Route path="/about" element={ <About/>} />
              <Route path="*" element={ <NoResult/>} />
              
            </Routes>
          </BrowserRouter>
    
              <AlertModal/>
          </AlertContext.Provider>
        </LoginContext.Provider>
      </ApiContext.Provider>

    </div>
  );
}

export default App;
