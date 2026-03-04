import React from 'react';

const LoadingSpinner = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)'
    }}>
      <div style={{
        position: 'relative',
        width: '80px',
        height: '80px'
      }}>
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          border: '4px solid transparent',
          borderTop: '4px solid #667eea',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          border: '4px solid transparent',
          borderTop: '4px solid #764ba2',
          borderRadius: '50%',
          animation: 'spin 1.5s linear infinite reverse',
          top: '10px',
          left: '10px',
          width: 'calc(100% - 20px)',
          height: 'calc(100% - 20px)'
        }}></div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default LoadingSpinner;
