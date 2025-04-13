import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import Logo from '../Logo/Logo';
import {
  FaGithub,
  FaQuestionCircle,
  FaInfoCircle,
  FaHome,
  FaLanguage,
  FaHistory,
  FaBookmark
} from 'react-icons/fa';
import { GITHUB_URL } from '../../utils/constants';

const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.headerBg};
  color: white;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 10;
`;

const LogoContainer = styled(Link)`
  text-decoration: none;
  color: white;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  position: relative;
  font-size: 0.9rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    text-decoration: none;
  }

  &.active {
    background-color: rgba(255, 255, 255, 0.2);
    font-weight: 600;

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0.75rem;
      right: 0.75rem;
      height: 2px;
      background-color: white;
      border-radius: 2px;
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
  border-radius: 4px;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
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
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

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

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const handleGithubClick = () => {
    window.open(GITHUB_URL, '_blank', 'noopener,noreferrer');
  };

  const handleHelpClick = () => {
    // Show help modal or documentation
    alert('Help functionality will be implemented here');
  };

  const handleAboutClick = () => {
    // Show about modal with app information
    alert('About functionality will be implemented here');
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
      </NavContainer>

      <ControlsContainer>
        <HeaderButton
          onClick={handleHelpClick}
          aria-label="Help"
        >
          <FaQuestionCircle size={18} />
          Help
          <Tooltip>Help & Documentation</Tooltip>
        </HeaderButton>

        <HeaderButton
          onClick={handleAboutClick}
          aria-label="About"
        >
          <FaInfoCircle size={18} />
          About
          <Tooltip>About PolyGlot Pro</Tooltip>
        </HeaderButton>

        <HeaderButton
          onClick={handleGithubClick}
          aria-label="Visit GitHub repository"
        >
          <FaGithub size={18} />
          GitHub
          <Tooltip>View on GitHub</Tooltip>
        </HeaderButton>

        <ThemeToggle />
      </ControlsContainer>
    </HeaderContainer>
  );
};

export default Header;
