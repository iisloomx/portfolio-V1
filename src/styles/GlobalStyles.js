import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    /* Light theme */
    --primary: #4f46e5;
    --primary-light: #818cf8;
    --primary-rgb: 79, 70, 229;
    --accent: #06b6d4;
    --background: #ffffff;
    --card-bg: #ffffff;
    --card-border: #e2e8f0;
    --text: #1e293b;
    --text-secondary: #475569;
    --shadow: rgba(0, 0, 0, 0.1);
  }

  :root.dark-theme {
    --primary: #818cf8;
    --primary-light: #4f46e5;
    --primary-rgb: 129, 140, 248;
    --accent: #22d3ee;
    --background: #0f172a;
    --card-bg: #1e293b;
    --card-border: #334155;
    --text: #f1f5f9;
    --text-secondary: #cbd5e1;
    --shadow: rgba(0, 0, 0, 0.3);
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
    transition: all 0.3s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
    color: var(--text);
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
  }

  button {
    border: none;
    outline: none;
    background: none;
    font-family: inherit;
    cursor: pointer;
  }

  /* Scrollbar Styles */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--background);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--primary-light);
  }
`;
