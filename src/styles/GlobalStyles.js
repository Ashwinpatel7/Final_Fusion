import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  :root {
    --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    --font-mono: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
    --animation-speed: 0.3s;
    --animation-curve: cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: var(--font-primary);
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.textColor};
    transition: background-color var(--animation-speed) var(--animation-curve),
                color var(--animation-speed) var(--animation-curve);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: 0.5em;
    color: ${({ theme }) => theme.textColor};
    transition: color var(--animation-speed) var(--animation-curve);
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.5rem;
  }

  h4 {
    font-size: 1.25rem;
  }

  h5 {
    font-size: 1rem;
  }

  h6 {
    font-size: 0.875rem;
  }

  p {
    margin-bottom: 1rem;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: var(--font-primary);
    font-weight: 500;
    transition: all var(--animation-speed) var(--animation-curve);
    position: relative;
    overflow: hidden;
  }

  input, textarea, select {
    font-family: var(--font-primary);
    font-size: inherit;
    outline: none;
    border: 1px solid ${({ theme }) => theme.borderColor};
    border-radius: 4px;
    padding: 0.75rem 1rem;
    background-color: ${({ theme }) => theme.inputBg};
    color: ${({ theme }) => theme.textColor};
    transition: all var(--animation-speed) var(--animation-curve);

    &:focus {
      border-color: ${({ theme }) => theme.primary};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.primaryOpacity};
    }

    &::placeholder {
      color: ${({ theme }) => theme.secondary};
      opacity: 0.7;
    }
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.primary};
    transition: color var(--animation-speed) var(--animation-curve);

    &:hover {
      text-decoration: underline;
    }
  }

  code {
    font-family: var(--font-mono);
    background-color: ${({ theme }) => theme.primaryOpacity};
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-size: 0.9em;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.secondary};
    border-radius: 10px;
    border: 2px solid ${({ theme }) => theme.background};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.primary};
  }

  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }

  /* Selection */
  ::selection {
    background-color: ${({ theme }) => theme.primary};
    color: white;
  }
`;

export default GlobalStyles;
