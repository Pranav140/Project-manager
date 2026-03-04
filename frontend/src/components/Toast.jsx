/**
 * Toast Notification Component
 * Modern toast notifications using react-hot-toast
 */

import { Toaster } from 'react-hot-toast';

const Toast = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 4000,
        style: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
          padding: '16px',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
        },
        success: {
          duration: 3000,
          style: {
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#4facfe',
          },
        },
        error: {
          duration: 4000,
          style: {
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#f5576c',
          },
        },
      }}
    />
  );
};

export default Toast;
