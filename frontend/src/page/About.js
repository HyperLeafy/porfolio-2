import React from 'react';
import SideBar from '../component/navbar/navbar';
import '../styles/about.css';
import ParticleEffect from '../component/background/particle_effect_2';

function About(){
    return (
    <div className='about-wrapper'>
        <SideBar />
        <div className='about-main-body'>
            <div className='about-canvas-container'>
                <ParticleEffect />
            </div>
            <div className='about-box-text'>
            <p>
            Hello! I'am a <span>software developer</span> with a knack for innovation 
            and painting my ideas on the canvas of code. Here's my story:
            After venturing through my electrical and electronics engineering, I found my groove in coding,
            while tinkering around robotics, crafting code to make them dance. In my free time you'll
            find me with a paintbrush in hand, transforming ideas into vibrant strokes on canvases.
            Join me on this coding odyssey where every project and line of code tells a tale.
            From the logic of software to the artistry of design, I'm on a perpetual quest to 
            explore and create. Let's dive into this ever-evolving digital universe together! 
            </p>
            </div>
        </div>
    </div>
  );
}

export default About;