import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaGlobe } from 'react-icons/fa';
import { APP_NAME, APP_TAGLINE } from '../../utils/constants';

// Animations
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const LogoIcon = styled.div`
  font-size: 1.8rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  padding: 0.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
  animation: ${pulse} 3s infinite ease-in-out;

  svg {
    animation: ${rotate} 10s linear infinite;
    position: relative;
    z-index: 2;
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transform: rotate(45deg);
    z-index: 1;
    transition: all 0.5s ease;
  }

  &:hover {
    transform: rotate(10deg) scale(1.1);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);

    &::before {
      transform: rotate(90deg);
    }
  }
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  color: white;
  letter-spacing: 0.5px;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
  }
`;

const LogoSubtitle = styled.p`
  font-size: 0.8rem;
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 300;
`;

const Logo = () => {
  return (
    <LogoContainer>
      <LogoIcon>
        <FaGlobe />
      </LogoIcon>
      <LogoText>
        <LogoTitle>{APP_NAME}</LogoTitle>
        <LogoSubtitle>{APP_TAGLINE}</LogoSubtitle>
      </LogoText>
    </LogoContainer>
  );
};

export default Logo;
