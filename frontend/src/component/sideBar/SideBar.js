import React from 'react'
import { Link } from 'react-router-dom';
import './sideBar.css';
import { FaGithubSquare,FaLinkedin} from "react-icons/fa";


function SideBar() {
  // console.log("Side bar");
  return (
    <div className='sidebar'>
      {/* Section for logo */}
      <div className='logo'>
        <h1><span>HYPERLEAFY</span></h1>
      </div>
      <div className='nav'>
        {/* Section for nav options */}
        <nav>
          <ul>
            <li><Link to="/">About</Link></li>
            <li><Link to="/skill">Skills</Link></li>
            <li><Link to="/project">Projects</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
      <div className='social'>
      <div className='icon'><FaLinkedin size={40}/></div>
      <div className='icon'><FaGithubSquare size={40}/></div>
      <div className='icon'><FaLinkedin size={40}/></div>
      {/* <FaSquareXTwitter /> */}
      </div>
    </div>

  )
}

export default SideBar;