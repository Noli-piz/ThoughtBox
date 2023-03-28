import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const SubMenu = ({ item,iconOnly, activeIndex }) => {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);
  const [selectedPath, setSelectedPath] = useState();

console.log(activeIndex)
  return (
    <>
      <li className= {item.subNav && subnav ? "nav-text has-submodule" : "nav-text" } onClick={item.subNav && showSubnav}>
          <Link to={item.path} title = {item.title} >
            { item.icon }
            { iconOnly && ( <span>{item.title}</span> ) }              
            { item.subNav && subnav  ? item.iconOpened : (item.subNav ? item.iconClosed  : null)}
          </Link>
      </li>

      {subnav && item.subNav.map((item, index) => {
          return (
            <li key={index}  className="nav-text sub-module"  >
              <Link to={item.path} key={index} className= { selectedPath === item.path ? "selected-path" : "" } title = {item.title}>
                {item.icon}
                { iconOnly && ( <span>{item.title}</span> ) }
              </Link>
            </li>
          );
        })}
    </>
  );
};

export default SubMenu;