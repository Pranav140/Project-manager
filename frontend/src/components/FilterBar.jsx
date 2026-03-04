/**
 * Filter Bar Component
 * Modern filtering with animations
 */

import React from 'react';
import { motion } from 'framer-motion';
import { FaFilter } from 'react-icons/fa';
import styles from '../style/FilterBar.module.css';

const FilterBar = ({ filters, activeFilter, onFilterChange }) => {
  return (
    <motion.div
      className={styles.filterContainer}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className={styles.filterIcon}>
        <FaFilter />
      </div>
      <div className={styles.filterButtons}>
        {filters.map((filter, index) => (
          <motion.button
            key={filter.value}
            className={`${styles.filterButton} ${
              activeFilter === filter.value ? styles.active : ''
            }`}
            onClick={() => onFilterChange(filter.value)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            {filter.icon && <span className={styles.buttonIcon}>{filter.icon}</span>}
            {filter.label}
            {filter.count !== undefined && (
              <span className={styles.count}>{filter.count}</span>
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default FilterBar;
