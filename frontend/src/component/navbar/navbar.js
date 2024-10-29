import React from 'react'
import { Link } from 'react-router-dom';
import './navbar.css';
// import { FaGithubSquare,FaLinkedin} from "react-icons/fa";
// import { useState } from 'react';

function SideBar() {
  // console.log("Side bar");

  return (
    <div className='navbar'>
      {/* Section for logo */}
  
        <div className='logo'>
        <Link to="/">
          <h1><span>HYPERLEAFY</span></h1>
        </Link>
        </div>

      <div className='nav'>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/project">Projects</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </div>

  )
}

export default SideBar;