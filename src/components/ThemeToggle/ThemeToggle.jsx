import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../hooks/useTheme';
import { FaSun, FaMoon } from 'react-icons/fa';

const ToggleContainer = styled.div`
  position: relative;
`;

const ToggleButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.lightText};
  font-size: 1.5rem;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    transition: all 0.3s ease;
    filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.3));
  }
`;

const Tooltip = styled.span`
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.darkBg};
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  z-index: 10;

  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 0 5px 5px 5px;
    border-style: solid;
    border-color: transparent transparent ${({ theme }) => theme.darkBg} transparent;
  }

  ${ToggleButton}:hover + & {
    opacity: 1;
    visibility: visible;
  }
`;

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ToggleContainer>
      <ToggleButton
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? <FaSun /> : <FaMoon />}
      </ToggleButton>
      <Tooltip>{theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}</Tooltip>
    </ToggleContainer>
  );
};

export default ThemeToggle;
