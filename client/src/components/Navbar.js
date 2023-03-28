import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { TbLayoutSidebarLeftExpand ,TbLayoutSidebarRightExpand } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import './Navbar.css';
import { IconContext } from 'react-icons';
import {CgProfile } from 'react-icons/cg'
import LogoutModal from './LogoutModal';

function Navbar() {
  const [showLogout, setShowLogout] = useState(false);

  const [sidebar, setSidebar] = useState(false);
  const [iconOnly, setShowIconOnly] = useState(true);

  const showSidebar = () => setSidebar(!sidebar);
  const showIconOnly = () => setShowIconOnly(!iconOnly);

  if(sidebar && iconOnly){
    document.documentElement.style.setProperty('--left', '250px')
  }
  else if(sidebar && !iconOnly){
    document.documentElement.style.setProperty('--left', '80px')
  }
  else{
    document.documentElement.style.setProperty('--left', '0px')
  }

  return (
    <>
      <div className="main">
      <IconContext.Provider value={{ color: 'white' , size: '24px' }} >
        <div className='navbar'>
            <FaIcons.FaBars onClick={showSidebar}  className="menu-bars" />
            <CgProfile className="profilePic" onClick={()=> setShowLogout(!showLogout)} style={{marginRight:"20px"}}/>
        </div>
        
        <nav className={sidebar ? (iconOnly ? "nav-menu active" : "nav-menu active collapse") : "nav-menu"}>
          <ul className="nav-menu-items" >
            <li className="navbar-toggle" >
              <Link to='#' className= "menu-bars" onClick={showSidebar}>
                {/* <AiIcons.AiOutlineClose /> */}
              </Link>
            </li>
            

            { SidebarData.map((item, index) => {
              return <SubMenu key={index} item={item} iconOnly={iconOnly} activeIndex={index} onClick={showSidebar} />;
            })}

            <div className="icon-only" onClick={showIconOnly} >
              { iconOnly ? ( <TbLayoutSidebarRightExpand title="collapse" /> ) : ( <TbLayoutSidebarLeftExpand title="expand"/> )}
            </div>
          </ul>
        </nav>
      </IconContext.Provider>
      </div>
      { showLogout && <LogoutModal/>}
    </>
  );
}

export default Navbar;