import React, { useState } from "react";
import { Link } from "react-router-dom";
import generateKey from "../helpers/generateKey";
import navbar from '../style/Navbar.module.css';

const NavBar = ({ children }) => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [stacksOpen, setStacksOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  const toggleProjects = () => {
    setProjectsOpen(!projectsOpen);
  };

  const toggleStacks = () => {
    setStacksOpen(!stacksOpen);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        boxShadow: '0 2px 15px rgba(0, 0, 0, 0.3)'
      }}>
        <Link className="navbar-brand" to="/" style={{
          fontWeight: '700',
          fontSize: '1.4rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Project Management Tool
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleSidebar}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>    
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <button 
                type="button" 
                className="btn btn-dark" 
                onClick={toggleSidebar}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'white'
                }}
              >
                <i className="fas fa-align-left" />
              </button>
            </li>          
          </ul>
          <div className="navbar-nav dropdown dropleft">
            <Link 
              className="nav-link" 
              to="/profile"
              style={{ color: 'rgba(255, 255, 255, 0.9)' }}
            >
              <i className="fas fa-user-circle mr-2"></i>
              Profile
            </Link>
          </div>
        </div>
      </nav>
      
      <div className={navbar.wrapper}>
        <nav 
          id={navbar.sidebar} 
          className={`bg-dark ${sidebarActive ? navbar.active : ''}`}
          style={{ 
            marginLeft: sidebarActive ? '-250px' : '0',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
        > 
          <div className={navbar.sidebarheader}>
            <h3>Project Management</h3>
          </div>

          <ul className={`list-unstyled ${navbar.components} navbar-nav`}>
            <p>
              <Link
                key={generateKey('home')}
                to='/'
                onClick={() => setSidebarActive(false)}
              >
                <i className="fas fa-home mr-2"></i>
                Dashboard
              </Link>
            </p>
            
            <li>
              <a 
                href="#projectsSubmenu" 
                onClick={(e) => {
                  e.preventDefault();
                  toggleProjects();
                }}
                className="dropdown-toggle"
                aria-expanded={projectsOpen}
              >
                <i className="fas fa-project-diagram mr-2"></i>
                Projects
              </a>
              <ul 
                className={`list-unstyled nav-item ${projectsOpen ? 'show' : 'collapse'}`}
                id="projectsSubmenu"
                style={{
                  maxHeight: projectsOpen ? '500px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease'
                }}
              >                  
                <li>
                  <Link
                    to='/projects'
                    onClick={() => setSidebarActive(false)}
                  >
                    <i className="fas fa-list mr-2"></i>
                    My Projects
                  </Link>
                </li>
                <li>
                  <Link
                    to='/projects/create'
                    onClick={() => setSidebarActive(false)}
                  >
                    <i className="fas fa-plus-circle mr-2"></i>
                    Create Project
                  </Link>
                </li>
              </ul>
            </li>
            
            <li>
              <a 
                href="#stacksSubmenu" 
                onClick={(e) => {
                  e.preventDefault();
                  toggleStacks();
                }}
                className="dropdown-toggle"
                aria-expanded={stacksOpen}
              >
                <i className="fas fa-layer-group mr-2"></i>
                Stacks
              </a>
              <ul 
                className={`list-unstyled ${stacksOpen ? 'show' : 'collapse'}`}
                id="stacksSubmenu"
                style={{
                  maxHeight: stacksOpen ? '500px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease'
                }}
              >
                <li>
                  <Link
                    to='/stacks'
                    onClick={() => setSidebarActive(false)}
                  >
                    <i className="fas fa-list mr-2"></i>
                    All Stacks
                  </Link>
                </li>                  
                <li>
                  <Link
                    to='/stacks/create'
                    onClick={() => setSidebarActive(false)}
                  >
                    <i className="fas fa-plus-circle mr-2"></i>
                    Create Stack
                  </Link>
                </li>
              </ul>
            </li>
            
            <li>
              <Link to="/profile" onClick={() => setSidebarActive(false)}>
                <i className="fas fa-user mr-2"></i>
                Profile
              </Link>
            </li>
          </ul>
        </nav>
        
        <div id={navbar.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
