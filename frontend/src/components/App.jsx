/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import NavBar from './NavBar';
import Home from '../containers/Home';
import StacksList from '../containers/StacksList';
import Profile from '../containers/Profile';
import ProjectDetail from '../containers/ProjectDetail';
import StackDetail from '../containers/StackDetail';
import ProjectsList from '../containers/ProjectsList';
import StackForm from '../containers/StackForm';
import ProjectForm from '../containers/ProjectForm';
import ProfileForm from '../containers/ProfileForm';
import NoPageMatch from './NoPageMatch';
import AIAssistant from './AIAssistant';
import {
  DescriptionGeneratorModal,
  TaskSuggestionsModal,
  ProjectAnalysisModal,
  SmartSearchModal
} from './AIFeatureModals';
import AnimatedGradientMesh from './AnimatedGradientMesh';
import ParticleBackground from './ParticleBackground';
import FloatingShapes from './FloatingShapes';
import { projectAPI } from '../services/api';
import style from '../style/App.module.css';

const App = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects for AI features
    const fetchProjects = async () => {
      try {
        const response = await projectAPI.getAll();
        setProjects(response.data || []);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const handleFeatureSelect = (feature) => {
    setActiveModal(feature);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <Router>
      {/* Stunning Background Effects */}
      <AnimatedGradientMesh />
      <ParticleBackground />
      <FloatingShapes />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(30, 30, 50, 0.95)',
            color: '#fff',
            border: '1px solid rgba(102, 126, 234, 0.3)',
            borderRadius: '10px',
            backdropFilter: 'blur(10px)',
          },
        }}
      />
      
      <NavBar>    
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsList />} />
          <Route path="/stacks" element={<StacksList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/update" element={<ProfileForm />} />
          <Route path="/project/:name" element={<ProjectDetail />} />
          <Route path="/project/:name/update" element={<ProjectForm />} />
          <Route path="/projects/create" element={<ProjectForm />} />
          <Route path="/stacks/create" element={<StackForm />} />
          <Route path="/stack/:name" element={<StackDetail />} />
          <Route path="/stack/:name/update" element={<StackForm />} />
          <Route path="*" element={<NoPageMatch />} />
        </Routes>    
      </NavBar>

      {/* AI Assistant */}
      <AIAssistant onFeatureSelect={handleFeatureSelect} />

      {/* AI Feature Modals */}
      <DescriptionGeneratorModal
        isOpen={activeModal === 'generate-description'}
        onClose={closeModal}
      />
      <TaskSuggestionsModal
        isOpen={activeModal === 'task-suggestions'}
        onClose={closeModal}
        projects={projects}
      />
      <ProjectAnalysisModal
        isOpen={activeModal === 'analyze-project'}
        onClose={closeModal}
        projects={projects}
      />
      <SmartSearchModal
        isOpen={activeModal === 'smart-search'}
        onClose={closeModal}
      />
    </Router>
  );
};

export default App;