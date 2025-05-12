import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    /* Light theme */
    --primary: #4f46e5;
    --primary-light: #818cf8;
    --primary-dark: #3730a3;
    --primary-rgb: 79, 70, 229;
    
    --accent: #06b6d4;
    --accent-light: #22d3ee;
    --accent-dark: #0891b2;
    --accent-rgb: 6, 182, 212;
    
    --success: #10b981;
    --success-rgb: 16, 185, 129;
    
    --warning: #f59e0b;
    --warning-rgb: 245, 158, 11;
    
    --danger: #ef4444;
    --danger-rgb: 239, 68, 68;
    
    --background: #ffffff;
    --background-secondary: #f8fafc;
    --background-rgb: 255, 255, 255;
    
    --card-bg: rgba(255, 255, 255, 0.7);
    --card-border: #e2e8f0;
    --glass-border: rgba(255, 255, 255, 0.5);
    
    --text: #1e293b;
    --text-rgb: 30, 41, 59;
    --text-secondary: #475569;
    
    --shadow: rgba(0, 0, 0, 0.1);
    --shadow-strong: rgba(0, 0, 0, 0.15);
    
    --scrollbar-size: 8px;
    --max-width: 1200px;
    --border-radius: 12px;
    --border-radius-lg: 16px;
    
    --transition-fast: 0.2s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    --font-weight-extrabold: 800;
    
    --box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
    --box-shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
    --box-shadow-colored: 0 10px 25px -5px rgba(var(--primary-rgb), 0.2), 0 8px 10px -6px rgba(var(--primary-rgb), 0.1);
  }

  :root.dark-theme {
    --primary: #818cf8;
    --primary-light: #a5b4fc;
    --primary-dark: #4f46e5;
    --primary-rgb: 129, 140, 248;
    
    --accent: #22d3ee;
    --accent-light: #67e8f9;
    --accent-dark: #06b6d4;
    --accent-rgb: 34, 211, 238;
    
    --success: #34d399;
    --success-rgb: 52, 211, 153;
    
    --warning: #fbbf24;
    --warning-rgb: 251, 191, 36;
    
    --danger: #f87171;
    --danger-rgb: 248, 113, 113;
    
    --background: #0f172a;
    --background-secondary: #1e293b;
    --background-rgb: 15, 23, 42;
    
    --card-bg: rgba(30, 41, 59, 0.8);
    --card-border: #334155;
    --glass-border: rgba(51, 65, 85, 0.5);
    
    --text: #f1f5f9;
    --text-rgb: 241, 245, 249;
    --text-secondary: #cbd5e1;
    
    --shadow: rgba(0, 0, 0, 0.3);
    --shadow-strong: rgba(0, 0, 0, 0.5);
    
    --box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2);
    --box-shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2);
    --box-shadow-colored: 0 10px 25px -5px rgba(var(--primary-rgb), 0.3), 0 8px 10px -6px rgba(var(--primary-rgb), 0.2);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: var(--background);
    color: var(--text);
    line-height: 1.6;
    transition: all var(--transition-normal);
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: var(--font-weight-bold);
    line-height: 1.2;
    color: var(--text);
    margin-bottom: 1rem;
  }

  h1 {
    font-size: clamp(2.5rem, 8vw, 5rem);
    font-weight: var(--font-weight-extrabold);
  }

  h2 {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: var(--font-weight-bold);
  }

  h3 {
    font-size: clamp(1.5rem, 3vw, 2rem);
  }

  p {
    margin-bottom: 1.5rem;
    color: var(--text-secondary);
  }

  /* Glassmorphism Card Styles */
  .glass-card {
    background: var(--card-bg);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid var(--glass-border);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    transition: all var(--transition-normal);
  }

  .glass-card:hover {
    box-shadow: var(--box-shadow-lg);
    border-color: var(--primary);
  }

  /* Override vertical timeline styles */
  .vertical-timeline.vertical-timeline--animate {
    background: transparent !important;
  }

  .vertical-timeline-element--work .vertical-timeline-element-content {
    background: transparent !important;
    box-shadow: none !important;
  }

  .vertical-timeline::before {
    background: var(--card-border) !important;
  }

  .vertical-timeline-element-content {
    background: transparent !important;
    box-shadow: none !important;
  }

  .vertical-timeline-element-content-arrow {
    display: none !important;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  a:hover {
    color: var(--primary);
  }

  button {
    border: none;
    outline: none;
    background: none;
    font-family: inherit;
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  /* Animation utilities */
  .fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .slide-up {
    animation: slideUp 0.5s ease-in-out;
  }

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  /* Scrollbar Styles */
  ::-webkit-scrollbar {
    width: var(--scrollbar-size);
  }

  ::-webkit-scrollbar-track {
    background: var(--background);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: calc(var(--scrollbar-size) / 2);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--primary-light);
  }

  /* Selection color */
  ::selection {
    background: var(--primary);
    color: white;
  }
`;
