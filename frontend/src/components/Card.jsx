/**
 * Modern Card Component
 * Reusable card with animations
 */

import React from 'react';
import { motion } from 'framer-motion';
import styles from '../style/Card.module.css';

const Card = ({ 
  children, 
  className = '', 
  hover = true,
  delay = 0,
  onClick 
}) => {
  return (
    <motion.div
      className={`${styles.card} ${hover ? styles.hoverable : ''} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={hover ? { y: -8, scale: 1.02 } : {}}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Card;
