/**
 * 3D Card Component
 * Interactive 3D card with tilt effect
 */

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import VanillaTilt from 'vanilla-tilt';
import styles from '../style/Card3D.module.css';

const Card3D = ({ children, className = '', glowColor = '#667eea', ...props }) => {
  const tiltRef = useRef(null);

  useEffect(() => {
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.3,
        scale: 1.05,
        perspective: 1000,
      });
    }

    return () => {
      if (tiltRef.current?.vanillaTilt) {
        tiltRef.current.vanillaTilt.destroy();
      }
    };
  }, []);

  return (
    <motion.div
      ref={tiltRef}
      className={`${styles.card3d} ${className}`}
      style={{ '--glow-color': glowColor }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      <div className={styles.cardInner}>
        <div className={styles.cardGlow}></div>
        <div className={styles.cardContent}>
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default Card3D;
