/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import style from '../style/App.module.css';

const App = () => (
  <Router>
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
  </Router>
);

export default App;