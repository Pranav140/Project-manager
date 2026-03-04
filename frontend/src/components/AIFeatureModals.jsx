/**
 * AI Feature Modals
 * Individual modals for each AI feature
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMagic, FaLightbulb, FaChartLine, FaSearch, FaSpinner } from 'react-icons/fa';
import toast from 'react-hot-toast';
import AIModal from './AIModal';
import { aiAPI } from '../services/api';
import styles from '../style/AIFeatureModals.module.css';

// Description Generator Modal
export const DescriptionGeneratorModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ projectName: '', techStack: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!formData.projectName || !formData.techStack) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const techStackArray = formData.techStack.split(',').map(s => s.trim());
      const response = await aiAPI.generateDescription({
        projectName: formData.projectName,
        techStack: techStackArray
      });
      setResult(response.data.description);
      toast.success('Description generated!');
    } catch (error) {
      toast.error('Failed to generate description');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    toast.success('Copied to clipboard!');
  };

  return (
    <AIModal isOpen={isOpen} onClose={onClose} title="AI Description Generator">
      <div className={styles.formGroup}>
        <label>Project Name</label>
        <input
          type="text"
          placeholder="e.g., TaskMaster Pro"
          value={formData.projectName}
          onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Tech Stack (comma-separated)</label>
        <input
          type="text"
          placeholder="e.g., React, Node.js, MongoDB"
          value={formData.techStack}
          onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
          className={styles.input}
        />
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className={styles.generateButton}
      >
        {loading ? (
          <>
            <FaSpinner className={styles.spinner} /> Generating...
          </>
        ) : (
          <>
            <FaMagic /> Generate Description
          </>
        )}
      </button>

      {result && (
        <motion.div
          className={styles.result}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h4>Generated Description:</h4>
          <p>{result}</p>
          <button onClick={handleCopy} className={styles.copyButton}>
            Copy to Clipboard
          </button>
        </motion.div>
      )}
    </AIModal>
  );
};

// Task Suggestions Modal
export const TaskSuggestionsModal = ({ isOpen, onClose, projects }) => {
  const [selectedProject, setSelectedProject] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!selectedProject) {
      toast.error('Please select a project');
      return;
    }

    const project = projects.find(p => p._id === selectedProject);
    if (!project) return;

    setLoading(true);
    try {
      const response = await aiAPI.generateTaskSuggestions({
        projectName: project.name,
        projectDescription: project.description,
        currentStatus: project.status
      });
      setTasks(response.data.tasks);
      toast.success('Tasks generated!');
    } catch (error) {
      toast.error('Failed to generate tasks');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AIModal isOpen={isOpen} onClose={onClose} title="AI Task Suggestions">
      <div className={styles.formGroup}>
        <label>Select Project</label>
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className={styles.select}
        >
          <option value="">Choose a project...</option>
          {projects?.map(project => (
            <option key={project._id} value={project._id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className={styles.generateButton}
      >
        {loading ? (
          <>
            <FaSpinner className={styles.spinner} /> Generating...
          </>
        ) : (
          <>
            <FaLightbulb /> Generate Tasks
          </>
        )}
      </button>

      {tasks.length > 0 && (
        <motion.div
          className={styles.tasksList}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h4>Suggested Tasks:</h4>
          {tasks.map((task, index) => (
            <motion.div
              key={index}
              className={styles.taskCard}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={styles.taskHeader}>
                <span className={`${styles.priority} ${styles[task.priority.toLowerCase()]}`}>
                  {task.priority}
                </span>
              </div>
              <p>{task.task}</p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AIModal>
  );
};

// Project Analysis Modal
export const ProjectAnalysisModal = ({ isOpen, onClose, projects }) => {
  const [selectedProject, setSelectedProject] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!selectedProject) {
      toast.error('Please select a project');
      return;
    }

    setLoading(true);
    try {
      const response = await aiAPI.analyzeProject(selectedProject);
      setAnalysis(response.data.analysis);
      toast.success('Analysis complete!');
    } catch (error) {
      toast.error('Failed to analyze project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AIModal isOpen={isOpen} onClose={onClose} title="AI Project Analysis" maxWidth="800px">
      <div className={styles.formGroup}>
        <label>Select Project</label>
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className={styles.select}
        >
          <option value="">Choose a project...</option>
          {projects?.map(project => (
            <option key={project._id} value={project._id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className={styles.generateButton}
      >
        {loading ? (
          <>
            <FaSpinner className={styles.spinner} /> Analyzing...
          </>
        ) : (
          <>
            <FaChartLine /> Analyze Project
          </>
        )}
      </button>

      {analysis && (
        <motion.div
          className={styles.analysisResult}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className={styles.analysisGrid}>
            <div className={styles.analysisCard}>
              <h4>Complexity</h4>
              <p className={styles.highlight}>{analysis.complexity}</p>
            </div>
            <div className={styles.analysisCard}>
              <h4>Estimated Time</h4>
              <p>{analysis.estimatedTime}</p>
            </div>
            <div className={styles.analysisCard}>
              <h4>Market Score</h4>
              <p className={styles.highlight}>{analysis.marketScore}/10</p>
            </div>
          </div>

          <div className={styles.section}>
            <h4>Challenges</h4>
            <ul>
              {analysis.challenges?.map((challenge, i) => (
                <li key={i}>{challenge}</li>
              ))}
            </ul>
          </div>

          <div className={styles.section}>
            <h4>Improvements</h4>
            <ul>
              {analysis.improvements?.map((improvement, i) => (
                <li key={i}>{improvement}</li>
              ))}
            </ul>
          </div>

          <div className={styles.section}>
            <h4>Summary</h4>
            <p>{analysis.summary}</p>
          </div>
        </motion.div>
      )}
    </AIModal>
  );
};

// Smart Search Modal
export const SmartSearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      toast.error('Please enter a search query');
      return;
    }

    setLoading(true);
    try {
      const response = await aiAPI.smartSearch(query);
      setResults(response.data.results);
      toast.success(`Found ${response.data.count} results`);
    } catch (error) {
      toast.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AIModal isOpen={isOpen} onClose={onClose} title="AI Smart Search" maxWidth="800px">
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search projects with AI..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className={styles.searchInput}
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className={styles.searchButton}
        >
          {loading ? <FaSpinner className={styles.spinner} /> : <FaSearch />}
        </button>
      </div>

      {results.length > 0 && (
        <motion.div
          className={styles.searchResults}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {results.map((result, index) => (
            <motion.div
              key={result._id}
              className={styles.searchResultCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={styles.resultHeader}>
                <h4>{result.name}</h4>
                <span className={styles.relevanceScore}>
                  {result.aiRelevanceScore}% match
                </span>
              </div>
              <p>{result.description}</p>
              <div className={styles.aiReason}>
                <FaLightbulb /> {result.aiReason}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AIModal>
  );
};
