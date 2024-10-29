import React, {useEffect, useState} from 'react';
import '../styles/project.css';
import SideBar from '../component/navbar/navbar';

const ProjectPage = () => {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch('https://portfolio-iqx4.onrender.com/api/projects')
            .then((response) => response.json())
            .then((data) => setProjects(data))
            .catch((error) => console.error('Error fetching projects:', error));
    }, []);

    return (
        <div className="project-wrapper">
            <SideBar />
            <div className="project-mainbox">
                <div className='project-hero'><h1>Project Showcase</h1></div>
                
                <div className="project-list">
                    {projects.map((project) => (
                        <div className="project-item" key={project.id}>
                            <div className="project-item-title">
                                <h2>{project.title}</h2>
                            </div>
                            <div className="project-item-content">
                                <h2>{project.title}</h2>
                                <p>{project.description}</p>
                                <a href={project.link} target="_blank" rel="noopener noreferrer">See Repository</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectPage;
