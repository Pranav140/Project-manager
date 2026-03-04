/**
 * Modern Chart Component
 * Using Recharts for better visualizations
 */

import React from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';
import styles from '../style/ModernChart.module.css';

const COLORS = ['#667eea', '#764ba2', '#4facfe', '#00f2fe', '#f093fb', '#f5576c'];

export const ModernBarChart = ({ data, title }) => {
  return (
    <motion.div
      className={styles.chartContainer}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className={styles.chartTitle}>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <defs>
            <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#667eea" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#764ba2" stopOpacity={0.8}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="name" 
            stroke="rgba(255,255,255,0.7)"
            style={{ fontSize: '0.85rem' }}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.7)"
            style={{ fontSize: '0.85rem' }}
          />
          <Tooltip 
            contentStyle={{
              background: 'rgba(26, 26, 46, 0.95)',
              border: '1px solid rgba(102, 126, 234, 0.5)',
              borderRadius: '12px',
              color: 'white'
            }}
          />
          <Legend wrapperStyle={{ color: 'rgba(255,255,255,0.8)' }} />
          <Bar 
            dataKey="value" 
            fill="url(#colorBar)" 
            radius={[8, 8, 0, 0]}
            animationDuration={1000}
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export const ModernPieChart = ({ data, title }) => {
  return (
    <motion.div
      className={styles.chartContainer}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className={styles.chartTitle}>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            animationDuration={1000}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              background: 'rgba(26, 26, 46, 0.95)',
              border: '1px solid rgba(102, 126, 234, 0.5)',
              borderRadius: '12px',
              color: 'white'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
