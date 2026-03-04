/**
 * Morphing Blob
 * Animated SVG blob that morphs between shapes
 */

import React from 'react';
import { motion } from 'framer-motion';
import styles from '../style/MorphingBlob.module.css';

const MorphingBlob = ({ color = '#667eea', size = 400 }) => {
  const paths = [
    "M60,-65.7C75.9,-54.3,85.7,-32.7,87.4,-10.4C89.1,11.9,82.7,34.9,69.8,51.4C56.9,67.9,37.5,77.9,17.4,82.6C-2.7,87.3,-23.5,86.7,-40.8,77.4C-58.1,68.1,-71.9,50.1,-77.3,30.4C-82.7,10.7,-79.7,-10.7,-71.4,-28.9C-63.1,-47.1,-49.5,-62.1,-33.3,-73.2C-17.1,-84.3,0.6,-91.5,18.8,-88.9C37,-86.3,45,-73.1,60,-65.7Z",
    "M54.5,-63.2C69.3,-52.1,79.3,-32.5,81.8,-12.2C84.3,8.1,79.3,29.1,67.8,44.8C56.3,60.5,38.3,70.9,19.4,75.8C0.5,80.7,-19.3,80.1,-36.5,72.4C-53.7,64.7,-68.3,49.9,-75.4,32.2C-82.5,14.5,-82.1,-6.1,-75.3,-24.3C-68.5,-42.5,-55.3,-58.3,-39.8,-69.1C-24.3,-79.9,-6.5,-85.7,10.3,-87.5C27.1,-89.3,39.7,-74.3,54.5,-63.2Z",
    "M49.3,-58.8C62.9,-47.3,72.7,-29.4,75.4,-10.2C78.1,9,73.7,29.5,62.8,44.8C51.9,60.1,34.5,70.2,15.9,74.8C-2.7,79.4,-22.5,78.5,-39.1,70.4C-55.7,62.3,-69.1,47,-74.8,29.2C-80.5,11.4,-78.5,-8.9,-70.9,-25.7C-63.3,-42.5,-50.1,-55.8,-35.3,-67C-20.5,-78.2,-4.1,-87.3,11.3,-89.5C26.7,-91.7,35.7,-70.3,49.3,-58.8Z",
  ];

  return (
    <div className={styles.container} style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: color, stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: color, stopOpacity: 0.3 }} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <motion.path
          fill="url(#blobGradient)"
          filter="url(#glow)"
          animate={{
            d: paths,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          transform="translate(100 100)"
        />
      </svg>
    </div>
  );
};

export default MorphingBlob;
