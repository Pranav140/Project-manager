/**
 * Voice to Project
 * Revolutionary: Speak your idea, AI creates complete project
 */

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaMicrophone, FaStop, FaMagic, FaDownload } from 'react-icons/fa';
import toast from 'react-hot-toast';
import AIModal from './AIModal';
import styles from '../style/VoiceToProject.module.css';

const VoiceToProject = ({ isOpen, onClose, apiService, onProjectCreated }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [generatedProject, setGeneratedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const recognitionRef = useRef(null);

  const startRecording = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error('Speech recognition not supported in this browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = (event) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcript + ' ';
        } else {
          interim += transcript;
        }
      }

      setTranscription(prev => prev + final || interim);
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      toast.error('Recording error: ' + event.error);
      setIsRecording(false);
    };

    recognitionRef.current.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current.start();
    setIsRecording(true);
    toast.success('Recording started! Speak your project idea...');
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
      toast.success('Recording stopped');
    }
  };

  const generateProject = async () => {
    if (!transcription.trim()) {
      toast.error('Please record or type your project idea first');
      return;
    }

    setLoading(true);
    try {
      const response = await apiService.post('/dna/voice-to-project', {
        transcription: transcription.trim()
      });
      setGeneratedProject(response.data.generatedProject);
      toast.success('Project generated successfully!');
    } catch (error) {
      toast.error('Failed to generate project');
    } finally {
      setLoading(false);
    }
  };

  const downloadSpec = () => {
    if (!generatedProject) return;

    const spec = `# ${generatedProject.name}

## Description
${generatedProject.description}

## Tech Stack
${generatedProject.techStack?.map(tech => `- ${tech}`).join('\n')}

## Features
${generatedProject.features?.map((f, i) => `${i + 1}. ${f}`).join('\n')}

## Architecture
${generatedProject.architecture}

## Database Schema
${generatedProject.database}

## API Endpoints
${generatedProject.apiEndpoints?.map(ep => `- ${ep}`).join('\n')}

## UI Components
${generatedProject.uiComponents?.map(c => `- ${c}`).join('\n')}

## Timeline
${generatedProject.timeline}

## Team
${generatedProject.team}

## Budget
${generatedProject.budget}

## Risks
${generatedProject.risks?.map(r => `- ${r}`).join('\n')}

## Market Analysis
${generatedProject.marketAnalysis}

## Monetization
${generatedProject.monetization}

## MVP Features
${generatedProject.mvpFeatures?.map(f => `- ${f}`).join('\n')}
`;

    const blob = new Blob([spec], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedProject.name.replace(/\s+/g, '-')}-spec.md`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Specification downloaded!');
  };

  return (
    <AIModal isOpen={isOpen} onClose={onClose} title="🎤 Voice to Project" maxWidth="900px">
      <div className={styles.container}>
        <div className={styles.recorder}>
          <motion.button
            className={`${styles.recordButton} ${isRecording ? styles.recording : ''}`}
            onClick={isRecording ? stopRecording : startRecording}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={isRecording ? {
              boxShadow: [
                '0 0 20px rgba(255, 82, 82, 0.5)',
                '0 0 40px rgba(255, 82, 82, 0.8)',
                '0 0 20px rgba(255, 82, 82, 0.5)'
              ]
            } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {isRecording ? <FaStop /> : <FaMicrophone />}
          </motion.button>
          <p className={styles.recordLabel}>
            {isRecording ? 'Recording... Click to stop' : 'Click to start recording'}
          </p>
        </div>

        <div className={styles.transcription}>
          <label>Your Project Idea (or type manually)</label>
          <textarea
            value={transcription}
            onChange={(e) => setTranscription(e.target.value)}
            placeholder="Speak or type your project idea here... e.g., 'I want to build a social media app for pet owners where they can share photos and connect with other pet lovers'"
            rows={6}
            className={styles.textarea}
          />
        </div>

        <button
          onClick={generateProject}
          disabled={loading || !transcription.trim()}
          className={styles.generateButton}
        >
          {loading ? (
            <>
              <div className={styles.spinner}></div> Generating...
            </>
          ) : (
            <>
              <FaMagic /> Generate Complete Project
            </>
          )}
        </button>

        {generatedProject && (
          <motion.div
            className={styles.result}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={styles.resultHeader}>
              <h3>{generatedProject.name}</h3>
              <button onClick={downloadSpec} className={styles.downloadButton}>
                <FaDownload /> Download Spec
              </button>
            </div>

            <p className={styles.description}>{generatedProject.description}</p>

            <div className={styles.grid}>
              <div className={styles.card}>
                <h4>Tech Stack</h4>
                <div className={styles.tags}>
                  {generatedProject.techStack?.map((tech, i) => (
                    <span key={i} className={styles.tag}>{tech}</span>
                  ))}
                </div>
              </div>

              <div className={styles.card}>
                <h4>Timeline</h4>
                <p>{generatedProject.timeline}</p>
              </div>

              <div className={styles.card}>
                <h4>Budget</h4>
                <p>{generatedProject.budget}</p>
              </div>

              <div className={styles.card}>
                <h4>Team</h4>
                <p>{generatedProject.team}</p>
              </div>
            </div>

            <div className={styles.section}>
              <h4>Features</h4>
              <ul>
                {generatedProject.features?.slice(0, 5).map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className={styles.section}>
              <h4>Architecture</h4>
              <p>{generatedProject.architecture}</p>
            </div>

            <div className={styles.section}>
              <h4>MVP Features</h4>
              <ul>
                {generatedProject.mvpFeatures?.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className={styles.section}>
              <h4>Market Analysis</h4>
              <p>{generatedProject.marketAnalysis}</p>
            </div>

            <div className={styles.actions}>
              <button
                onClick={() => onProjectCreated && onProjectCreated(generatedProject)}
                className={styles.createButton}
              >
                Create This Project
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </AIModal>
  );
};

export default VoiceToProject;
