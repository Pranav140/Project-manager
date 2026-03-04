/* eslint-disable array-callback-return */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";
import LoadingSpinner from '../components/LoadingSpinner';
import { AllCall } from '../helpers/apiCalls';
import style from '../style/ProjectsList.module.css';

const ProjectsList = (props) => {
  const {projectsList, getAllProjects} = props;
  const [infoProjects, setInfoProjects] = useState([])

  useEffect(() => {
    (async () => {
      try {  
       const data =  await getAllProjects('projects');
       setInfoProjects(data);
      } catch (error) {
        console.log(error)
      }           
    })();
  }, [getAllProjects]);

  return infoProjects.length === 0 ? <LoadingSpinner /> : (
    <main role="main" style={{background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)', minHeight: '100vh'}}>

      <section className={`jumbotron text-center ${style.jumbo}`}>
        <div className="container">
          <h1 className="jumbotron-heading">All My Projects</h1>
          <p className="lead text-white">Explore my portfolio of projects! Each one represents a unique challenge and creative solution.</p>
        </div>
      </section>
    
      <div className="album py-5" style={{background: 'transparent'}}>
        <div className="container">
    
          <div className="row">
            {infoProjects.map((project, index) => (
              <div className="col-md-4 mb-4" key={project._id} style={{animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`}}>
                <div className="card h-100 border-0" style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 15px 50px rgba(102, 126, 234, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)';
                }}>
                  <div style={{position: 'relative', overflow: 'hidden', height: '225px'}}>
                    <img 
                      className="card-img-top" 
                      alt={project.name}
                      style={{
                        height: "225px", 
                        width: "100%", 
                        objectFit: "cover",
                        transition: 'transform 0.4s ease'
                      }} 
                      src={project.image ? project.image : 'http://localhost:8000/public/images/placeholder.png'}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: project.status === 'Production' ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' : 
                                  project.status === 'Development' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' :
                                  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: 'white',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
                    }}>
                      {project.status}
                    </div>
                  </div>
                  <div className="card-body" style={{color: 'white'}}>
                    <h5 className="card-text" style={{
                      fontWeight: '700',
                      fontSize: '1.25rem',
                      marginBottom: '1rem',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>{project.name}</h5>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <Link 
                          className="btn btn-sm"
                          style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '20px',
                            padding: '8px 20px',
                            fontWeight: '600',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.4)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                          id="list-home-list"
                          data-toggle="list"
                          role="tab"
                          aria-controls="home"
                          to={{
                            pathname: `/project/${project.name}`,
                            state: {
                              id: project._id,
                            },
                          }}
                        >
                          Learn More
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer" style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: 'none',
                    padding: '1rem'
                  }}>
                    {project.stack.map(stack=>(
                      <Link
                        key={stack._id}
                        to={{
                        pathname: `/stack/${stack.name}`,
                        state: {
                          id: stack._id,
                        },
                      }}
                        className="badge badge-pill mr-1 mb-1"
                        style={{
                          background: 'rgba(102, 126, 234, 0.2)',
                          color: '#667eea',
                          border: '1px solid rgba(102, 126, 234, 0.5)',
                          padding: '6px 12px',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                          e.currentTarget.style.color = 'white';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(102, 126, 234, 0.2)';
                          e.currentTarget.style.color = '#667eea';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                        id="list-home-list"
                        data-toggle="list"
                        role="tab"
                        aria-controls="home"
                      >
                        {stack.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div> 
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

ProjectsList.propTypes = {
  projects: PropTypes.shape({
    error: PropTypes.object,
    pending: PropTypes.bool,
    projectsList: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  getAllProjects: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  projects: {
    error: state.projects.error,
    projectsList: state.projects.projectsList,
    pending: state.projects.pending,
  },
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllProjects: AllCall,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);
