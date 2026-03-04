/**
 * 3D Hero Section
 * Stunning hero with 3D text and animations
 */

import React from 'react';
import { motion } from 'framer-motion';
import styles from '../style/Hero3D.module.css';

const Hero3D = ({ title, subtitle, children }) => {
  const letters = title?.split('') || [];

  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.titleContainer}>
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              className={styles.letter}
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                type: 'spring',
                stiffness: 100,
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </div>

        {subtitle && (
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {children}
          </motion.div>
        )}
      </div>

      {/* Animated rings */}
      <div className={styles.rings}>
        <div className={styles.ring}></div>
        <div className={styles.ring}></div>
        <div className={styles.ring}></div>
      </div>
    </div>
  );
};

export default Hero3D;
