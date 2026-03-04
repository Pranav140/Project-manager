/**
 * Floating 3D Shapes
 * Animated geometric shapes floating in background
 */

import React from 'react';
import { motion } from 'framer-motion';
import styles from '../style/FloatingShapes.module.css';

const FloatingShapes = () => {
  const shapes = [
    { type: 'cube', delay: 0, duration: 20 },
    { type: 'sphere', delay: 2, duration: 25 },
    { type: 'pyramid', delay: 4, duration: 22 },
    { type: 'torus', delay: 6, duration: 28 },
    { type: 'octahedron', delay: 8, duration: 24 },
  ];

  return (
    <div className={styles.container}>
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`${styles.shape} ${styles[shape.type]}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
            rotateX: [0, 360],
            rotateY: [0, 360],
            rotateZ: [0, 360],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div className={styles.shapeInner}></div>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingShapes;
