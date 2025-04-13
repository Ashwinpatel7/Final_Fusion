import React from 'react';
import styled from 'styled-components';
import { FaLanguage } from 'react-icons/fa';
import { APP_NAME, APP_TAGLINE } from '../../utils/constants';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const LogoIcon = styled.div`
  font-size: 2.2rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, ${({ theme }) => theme.primary}, #8ab4f8);
  border-radius: 12px;
  padding: 0.3rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: rotate(10deg);
  }
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0;
  background: linear-gradient(45deg, #fff, #e8f0fe);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  letter-spacing: 0.5px;
`;

const LogoSubtitle = styled.p`
  font-size: 0.9rem;
  margin: 0;
  opacity: 0.8;
`;

const Logo = () => {
  return (
    <LogoContainer>
      <LogoIcon>
        <FaLanguage />
      </LogoIcon>
      <LogoText>
        <LogoTitle>{APP_NAME}</LogoTitle>
        <LogoSubtitle>{APP_TAGLINE}</LogoSubtitle>
      </LogoText>
    </LogoContainer>
  );
};

export default Logo;
