/**
 * Project DNA Visualizer
 * Revolutionary feature: Visual DNA strand for each project
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDna, FaHeartbeat, FaClock, FaNetworkWired, FaMicrophone, FaFire } from 'react-icons/fa';
import toast from 'react-hot-toast';
import AIModal from './AIModal';
import styles from '../style/ProjectDNA.module.css';

const ProjectDNAVisualizer = ({ isOpen, onClose, project, apiService }) => {
  const [activeTab, setActiveTab] = useState('dna');
  const [dnaData, setDnaData] = useState(null);
  const [timelineData, setTimelineData] = useState(null);
  const [healthData, setHealthData] = useState(null);
  const [viralData, setViralData] = useState(null);
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: 'dna', label: 'DNA Code', icon: <FaDna /> },
    { id: 'timeline', label: 'Time Travel', icon: <FaClock /> },
    { id: 'health', label: 'Health Monitor', icon: <FaHeartbeat /> },
    { id: 'viral', label: 'Viral Potential', icon: <FaFire /> }
  ];

  useEffect(() => {
    if (isOpen && project) {
      loadData(activeTab);
    }
  }, [isOpen, project, activeTab]);

  const loadData = async (tab) => {
    setLoading(true);
    try {
      switch (tab) {
        case 'dna':
          if (!dnaData) {
            const response = await apiService.get(`/dna/generate/${project._id}`);
            setDnaData(response.data.dna);
          }
          break;
        case 'timeline':
          if (!timelineData) {
            const response = await apiService.get(`/dna/time-travel/${project._id}`);
            setTimelineData(response.data.timeline);
          }
          break;
        case 'health':
          const healthResponse = await apiService.get(`/dna/health/${project._id}`);
          setHealthData(healthResponse.data.health);
          break;
        case 'viral':
          if (!viralData) {
            const response = await apiService.get(`/dna/viral-potential/${project._id}`);
            setViralData(response.data.prediction);
          }
          break;
      }
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AIModal isOpen={isOpen} onClose={onClose} title={`Project DNA: ${project?.name}`} maxWidth="900px">
      <div className={styles.container}>
        {/* Tabs */}
        <div className={styles.tabs}>
          {tabs.map(tab => (
            <motion.button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              className={styles.loading}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className={styles.spinner}></div>
              <p>Analyzing project DNA...</p>
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              className={styles.content}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {activeTab === 'dna' && dnaData && <DNAView data={dnaData} />}
              {activeTab === 'timeline' && timelineData && <TimelineView data={timelineData} />}
              {activeTab === 'health' && healthData && <HealthView data={healthData} />}
              {activeTab === 'viral' && viralData && <ViralView data={viralData} />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AIModal>
  );
};

// DNA View Component
const DNAView = ({ data }) => (
  <div className={styles.dnaView}>
    <div className={styles.dnaStrand}>
      <h3>🧬 Genetic Code</h3>
      <div className={styles.sequence}>
        {data.dnaSequence.split('').map((base, i) => (
          <motion.span
            key={i}
            className={styles.base}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: i * 0.05 }}
            style={{
              background: data.visualPattern[i]?.color || '#667eea'
            }}
          >
            {base}
          </motion.span>
        ))}
      </div>
    </div>

    <div className={styles.signature}>
      <p className={styles.quote}>"{data.uniqueSignature}"</p>
    </div>

    <div className={styles.traits}>
      <h4>Genetic Traits</h4>
      <div className={styles.traitsList}>
        {data.geneticTraits?.map((trait, i) => (
          <motion.div
            key={i}
            className={styles.trait}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            ✨ {trait}
          </motion.div>
        ))}
      </div>
    </div>

    <div className={styles.stats}>
      <div className={styles.statCard}>
        <h4>Evolution Stage</h4>
        <p className={styles.highlight}>{data.evolutionStage}</p>
      </div>
      <div className={styles.statCard}>
        <h4>Health Score</h4>
        <p className={styles.highlight}>{data.healthScore}/100</p>
      </div>
    </div>

    <div className={styles.section}>
      <h4>Dominant Genes</h4>
      <ul>
        {data.dominantGenes?.map((gene, i) => <li key={i}>{gene}</li>)}
      </ul>
    </div>

    <div className={styles.section}>
      <h4>Mutation Potential</h4>
      <ul>
        {data.mutationPotential?.map((mutation, i) => <li key={i}>{mutation}</li>)}
      </ul>
    </div>
  </div>
);

// Timeline View Component
const TimelineView = ({ data }) => (
  <div className={styles.timelineView}>
    <div className={styles.timelineSection}>
      <h3>⏮️ Past Version (2 years ago)</h3>
      <p>{data.pastVersion}</p>
    </div>

    <div className={styles.timelineSection}>
      <h3>📍 Present Analysis</h3>
      <p>{data.presentAnalysis}</p>
    </div>

    <div className={styles.futures}>
      <h3>🔮 Possible Futures</h3>
      {data.futureTimelines?.map((future, i) => (
        <motion.div
          key={i}
          className={styles.futureCard}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.2 }}
        >
          <div className={styles.futureHeader}>
            <span className={styles.timeline}>{future.timeline}</span>
            <span className={`${styles.scenario} ${styles[future.scenario.toLowerCase()]}`}>
              {future.scenario}
            </span>
          </div>
          <h4>Features</h4>
          <ul>
            {future.features?.slice(0, 3).map((feature, j) => <li key={j}>{feature}</li>)}
          </ul>
          <p><strong>Market Position:</strong> {future.marketPosition}</p>
        </motion.div>
      ))}
    </div>

    <div className={styles.recommendation}>
      <h4>🎯 Recommended Path</h4>
      <p>{data.recommendedPath}</p>
    </div>
  </div>
);

// Health View Component
const HealthView = ({ data }) => (
  <div className={styles.healthView}>
    <div className={styles.healthScore}>
      <motion.div
        className={styles.scoreCircle}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#333" strokeWidth="8" />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={data.overallHealth > 70 ? '#4caf50' : data.overallHealth > 40 ? '#ffc107' : '#ff5252'}
            strokeWidth="8"
            strokeDasharray={`${data.overallHealth * 2.83} 283`}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            initial={{ strokeDasharray: '0 283' }}
            animate={{ strokeDasharray: `${data.overallHealth * 2.83} 283` }}
            transition={{ duration: 1.5 }}
          />
        </svg>
        <div className={styles.scoreText}>
          <span className={styles.scoreNumber}>{data.overallHealth}</span>
          <span className={styles.scoreLabel}>Health</span>
        </div>
      </motion.div>
      <p className={styles.diagnosis}>{data.diagnosis}</p>
    </div>

    <div className={styles.vitalSigns}>
      <h4>Vital Signs</h4>
      {Object.entries(data.vitalSigns || {}).map(([key, value]) => (
        <div key={key} className={styles.vitalSign}>
          <span className={styles.vitalLabel}>{key}</span>
          <div className={styles.vitalBar}>
            <motion.div
              className={styles.vitalFill}
              initial={{ width: 0 }}
              animate={{ width: `${value}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{
                background: value > 70 ? '#4caf50' : value > 40 ? '#ffc107' : '#ff5252'
              }}
            />
          </div>
          <span className={styles.vitalValue}>{value}</span>
        </div>
      ))}
    </div>

    {data.urgentActions?.length > 0 && (
      <div className={styles.urgent}>
        <h4>🚨 Urgent Actions</h4>
        <ul>
          {data.urgentActions.map((action, i) => <li key={i}>{action}</li>)}
        </ul>
      </div>
    )}

    <div className={styles.prescription}>
      <h4>💊 Prescription</h4>
      <ol>
        {data.prescription?.map((item, i) => <li key={i}>{item}</li>)}
      </ol>
    </div>
  </div>
);

// Viral View Component
const ViralView = ({ data }) => (
  <div className={styles.viralView}>
    <div className={styles.viralScore}>
      <motion.div
        className={styles.fireAnimation}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
      >
        🔥
      </motion.div>
      <h3>Viral Score: {data.viralScore}/100</h3>
      <p className={styles.prediction}>
        Predicted GitHub Stars: <strong>{data.githubStarsPrediction}</strong>
      </p>
      <p className={styles.prediction}>
        Predicted Forks: <strong>{data.forksPrediction}</strong>
      </p>
    </div>

    <div className={styles.factors}>
      <h4>🚀 Viral Factors</h4>
      <ul>
        {data.viralFactors?.map((factor, i) => <li key={i}>{factor}</li>)}
      </ul>
    </div>

    <div className={styles.improvements}>
      <h4>📈 Improvements for Virality</h4>
      <ol>
        {data.improvementsForVirality?.map((improvement, i) => <li key={i}>{improvement}</li>)}
      </ol>
    </div>

    <div className={styles.marketing}>
      <h4>📣 Marketing Strategy</h4>
      <p>{data.marketingStrategy}</p>
    </div>

    <div className={styles.audience}>
      <h4>🎯 Target Audience</h4>
      <p>{data.targetAudience}</p>
    </div>
  </div>
);

export default ProjectDNAVisualizer;
