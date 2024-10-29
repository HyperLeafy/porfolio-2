import React from 'react'
import {Route, Routes} from "react-router-dom";
// import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Home from './page/Home';
import About from './page/About';
import Project from './page/Projects'
import Contact from './page/Contact';
function App() {
  console.log("Loading app");
  return (
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/about" element={<About/>} />
            <Route path="/project" element={<Project />} />
            <Route path="/contact" element={<Contact />} />  
          </Routes>
    );
}

export default App;