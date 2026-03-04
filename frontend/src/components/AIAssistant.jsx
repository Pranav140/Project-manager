/**
 * AI Assistant Component
 * Floating AI assistant button with features
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaMagic, FaLightbulb, FaChartLine, FaSearch } from 'react-icons/fa';
import toast from 'react-hot-toast';
import styles from '../style/AIAssistant.module.css';

const AIAssistant = ({ onFeatureSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const features = [
    {
      icon: <FaMagic />,
      title: 'Generate Description',
      description: 'AI-powered project descriptions',
      action: 'generate-description',
      color: '#667eea'
    },
    {
      icon: <FaLightbulb />,
      title: 'Task Suggestions',
      description: 'Smart task recommendations',
      action: 'task-suggestions',
      color: '#4facfe'
    },
    {
      icon: <FaChartLine />,
      title: 'Project Analysis',
      description: 'Complexity & insights',
      action: 'analyze-project',
      color: '#f093fb'
    },
    {
      icon: <FaSearch />,
      title: 'Smart Search',
      description: 'AI-enhanced search',
      action: 'smart-search',
      color: '#00f2fe'
    }
  ];

  const handleFeatureClick = (feature) => {
    toast.success(`Opening ${feature.title}...`);
    onFeatureSelect(feature.action);
    setIsOpen(false);
  };

  return (
    <>
      {/* AI Assistant Button */}
      <motion.button
        className={styles.aiButton}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: isOpen 
            ? '0 0 30px rgba(102, 126, 234, 0.6)'
            : '0 0 20px rgba(102, 126, 234, 0.4)'
        }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <FaTimes /> : <FaRobot />}
        </motion.div>
      </motion.button>

      {/* AI Features Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.aiMenu}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.menuHeader}>
              <FaRobot className={styles.headerIcon} />
              <h3>AI Assistant</h3>
              <p>Choose an AI-powered feature</p>
            </div>

            <div className={styles.featuresList}>
              {features.map((feature, index) => (
                <motion.div
                  key={feature.action}
                  className={styles.featureCard}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, x: 5 }}
                  onClick={() => handleFeatureClick(feature)}
                  style={{ borderLeft: `4px solid ${feature.color}` }}
                >
                  <div 
                    className={styles.featureIcon}
                    style={{ background: `${feature.color}20`, color: feature.color }}
                  >
                    {feature.icon}
                  </div>
                  <div className={styles.featureContent}>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className={styles.menuFooter}>
              <span className={styles.badge}>
                <span className={styles.pulse}></span>
                Powered by Google Gemini AI
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
