/**
 * Animated Gradient Mesh
 * Beautiful morphing gradient background
 */

import React from 'react';
import styles from '../style/AnimatedGradientMesh.module.css';

const AnimatedGradientMesh = () => {
  return (
    <div className={styles.meshContainer}>
      <div className={styles.gradient1}></div>
      <div className={styles.gradient2}></div>
      <div className={styles.gradient3}></div>
      <div className={styles.gradient4}></div>
      <div className={styles.gradient5}></div>
      <div className={styles.noise}></div>
    </div>
  );
};

export default AnimatedGradientMesh;
