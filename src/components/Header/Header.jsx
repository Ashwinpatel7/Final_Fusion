import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import Logo from '../Logo/Logo';
import Settings from '../Settings';
import {
  FaGithub,
  FaQuestionCircle,
  FaInfoCircle,
  FaHome,
  FaLanguage,
  FaHistory,
  FaBookmark,
  FaTrophy,
  FaCog
} from 'react-icons/fa';
import { GITHUB_URL } from '../../utils/constants';

const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.headerBg};
  color: white;
  padding: 0.75rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.headerBorder};
  position: relative;
  z-index: 10;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 0.75rem;
    flex-wrap: wrap;
  }
`;

const LogoContainer = styled(Link)`
  text-decoration: none;
  color: white;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.02);
    text-decoration: none;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }
`;

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    gap: 0.3rem;
  }

  @media (max-width: 480px) {
    gap: 0.2rem;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    gap: 0.3rem;
  }

  @media (max-width: 480px) {
    gap: 0.2rem;
    margin-left: auto;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  position: relative;
  font-size: 0.9rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
    text-decoration: none;
    color: white;
    transform: translateY(-2px);
  }

  &.active {
    color: white;
    font-weight: 600;
    background-color: rgba(255, 255, 255, 0.2);

    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 2px;
      background-color: white;
      border-radius: 2px;
      box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
    }
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.6rem;
    font-size: 0.85rem;
    gap: 0.3rem;
  }

  @media (max-width: 480px) {
    padding: 0.3rem 0.5rem;
    font-size: 0.8rem;

    span {
      display: none;
    }
  }
`;

const HeaderButton = styled.button`
  background: transparent;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
    color: white;
    transform: translateY(-2px);
  }

  @media (max-width: 576px) {
    font-size: 0;
    padding: 0.5rem;
  }
`;

const Tooltip = styled.span`
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.darkBg};
  color: ${({ theme }) => theme.lightText};
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  font-size: 0.75rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  z-index: 10;
  box-shadow: ${({ theme }) => theme.boxShadow};

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

  ${HeaderButton}:hover & {
    opacity: 1;
    visibility: visible;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  color: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Header = () => {
  const location = useLocation();
  const [showSettings, setShowSettings] = useState(false);

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const handleGithubClick = () => {
    window.open(GITHUB_URL, '_blank', 'noopener,noreferrer');
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo />
      </LogoContainer>

      <NavContainer>
        <NavLink to="/" className={isActive('/') ? 'active' : ''}>
          <FaHome />
          Home
        </NavLink>

        <NavLink to="/translate" className={isActive('/translate') ? 'active' : ''}>
          <FaLanguage />
          Translate
        </NavLink>

        <NavLink to="/history" className={isActive('/history') ? 'active' : ''}>
          <FaHistory />
          History
        </NavLink>

        <NavLink to="/saved" className={isActive('/saved') ? 'active' : ''}>
          <FaBookmark />
          Saved
        </NavLink>

        <NavLink to="/achievements" className={isActive('/achievements') ? 'active' : ''}>
          <FaTrophy />
          Achievements
        </NavLink>
      </NavContainer>

      <ControlsContainer>
        <NavLink to="/help" aria-label="Help">
          <FaQuestionCircle size={18} />
          <span>Help</span>
        </NavLink>

        <NavLink to="/about" aria-label="About">
          <FaInfoCircle size={18} />
          <span>About</span>
        </NavLink>

        <HeaderButton
          onClick={toggleSettings}
          aria-label="Settings"
        >
          <FaCog size={18} />
          <span>Settings</span>
          <Tooltip>Open Settings</Tooltip>
        </HeaderButton>

        <HeaderButton
          onClick={handleGithubClick}
          aria-label="Visit GitHub repository"
        >
          <FaGithub size={18} />
          <span>GitHub</span>
          <Tooltip>View on GitHub</Tooltip>
        </HeaderButton>

        <ThemeToggle />
      </ControlsContainer>

      {showSettings && <Settings onClose={toggleSettings} />}
    </HeaderContainer>
  );
};

export default Header;
