import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { APP_VERSION, APP_NAME, GITHUB_URL, SUPPORT_EMAIL } from '../../utils/constants';
import { FaHeart, FaTwitter, FaFacebook, FaLinkedin, FaGlobe, FaBook, FaHeadset, FaShieldAlt, FaGithub, FaBug } from 'react-icons/fa';

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem;
  background: ${({ theme }) => `linear-gradient(to top, ${theme.darkBg}, transparent)`};
  border-top: 1px solid ${({ theme }) => `rgba(255, 255, 255, 0.1)`};
  color: ${({ theme }) => theme.secondary};
  font-size: 0.85rem;
  transition: all 0.3s ease;
  position: relative;
  backdrop-filter: blur(10px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.primary}33, transparent);
  }

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    padding: 1.2rem 0.75rem;
    font-size: 0.75rem;
  }
`;

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (max-width: 768px) {
    min-width: 120px;
  }

  @media (max-width: 480px) {
    margin-bottom: 1rem;
  }
`;

const FooterTitle = styled.h4`
  font-size: 0.95rem;
  color: white;
  margin-bottom: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 0.5rem;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 1rem;
    background: ${({ theme }) => theme.primary};
    border-radius: 3px;
  }

  svg {
    margin-right: 8px;
    color: ${({ theme }) => theme.primary};
  }
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: all 0.2s ease;
  padding: 0.25rem 0;
  font-size: 0.85rem;
  display: block;
  position: relative;
  padding-left: 0.5rem;

  &::before {
    content: '›';
    position: absolute;
    left: 0;
    top: 0.25rem;
    opacity: 0;
    transform: translateX(-5px);
    transition: all 0.2s ease;
  }

  &:hover {
    color: white;
    text-decoration: none;
    transform: translateX(2px);
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);

    &::before {
      opacity: 1;
      transform: translateX(0);
      color: ${({ theme }) => theme.primary};
    }
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  margin-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.8rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  }

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  color: ${({ isError, theme }) => isError ? theme.danger : 'rgba(255, 255, 255, 0.7)'};
  max-width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  backdrop-filter: blur(5px);
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
  font-size: 0.75rem;
`;

const StatusDot = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ isError, theme }) => isError ? theme.danger : theme.success};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 50%;
    border: 2px solid ${({ isError, theme }) => isError ? theme.danger : theme.success};
    opacity: 0.5;
    animation: ${({ isError }) => isError ? 'none' : 'pulse 2s infinite'};
  }

  @keyframes pulse {
    0% {
      transform: scale(0.95);
      opacity: 0.5;
    }
    70% {
      transform: scale(1.1);
      opacity: 0.25;
    }
    100% {
      transform: scale(0.95);
      opacity: 0.5;
    }
  }
`;

const Version = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const UpdateIndicator = styled.span`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primary};
  animation: blink 1.5s infinite;

  @keyframes blink {
    0% { opacity: 0.2; }
    50% { opacity: 1; }
    100% { opacity: 0.2; }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    background: ${({ theme }) => theme.primaryGradient};
    opacity: 0;
    transition: all 0.3s ease;
    transform: scale(0);
    border-radius: 50%;
  }

  svg {
    position: relative;
    z-index: 2;
    transition: all 0.3s ease;
  }

  &:hover {
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 0 15px rgba(99, 102, 241, 0.5);

    &::before {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const Copyright = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: rgba(255, 255, 255, 0.7);

  svg {
    color: ${({ theme }) => theme.danger};
    filter: drop-shadow(0 0 3px rgba(239, 68, 68, 0.5));
  }
`;

const Footer = () => {
  const { status, isError } = useSelector(state => state.translation);
  const [displayStatus, setDisplayStatus] = useState('Ready');
  const [showError, setShowError] = useState(false);
  const [hasUpdate, setHasUpdate] = useState(false);

  // Simulate checking for updates
  useEffect(() => {
    const timer = setTimeout(() => {
      // This would be a real update check in a production app
      setHasUpdate(Math.random() > 0.7);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setDisplayStatus(status);
    setShowError(isError);

    // Reset status after 5 seconds if not an error
    if (!isError && status !== 'Ready') {
      const timer = setTimeout(() => {
        setDisplayStatus('Ready');
        setShowError(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [status, isError]);

  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterTop>
        <FooterSection>
          <FooterTitle>
            <FaGlobe style={{ marginRight: '8px' }} />
            {APP_NAME}
          </FooterTitle>
          <FooterLink to="/about">Our Mission</FooterLink>
          <FooterLink to="/blog">Translation Blog</FooterLink>
          <FooterLink to="/careers">Join Our Team</FooterLink>
          <FooterLink as="a" href={`mailto:${SUPPORT_EMAIL}`}>Contact Us</FooterLink>
          <FooterLink as="a" href={`mailto:${SUPPORT_EMAIL}?subject=Issue Report: Final Fusion Translator&body=Issue Description:%0A%0ASteps to Reproduce:%0A%0AExpected Behavior:%0A%0AActual Behavior:%0A%0ABrowser/Device Information:%0A`}>
            <FaBug style={{ marginRight: '5px' }} /> Report an Issue
          </FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>
            <FaBook style={{ marginRight: '8px' }} />
            Translation Services
          </FooterTitle>
          <FooterLink to="/translate">Text Translation</FooterLink>
          <FooterLink to="/translate/document">Document Translation</FooterLink>
          <FooterLink to="/translate/image">Image Translation</FooterLink>
          <FooterLink to="/translate/voice">Voice Translation</FooterLink>
          <FooterLink to="/translate/website">Website Translation</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>
            <FaHeadset style={{ marginRight: '8px' }} />
            Resources
          </FooterTitle>
          <FooterLink to="/help">Help Center</FooterLink>
          <FooterLink to="/api">API Documentation</FooterLink>
          <FooterLink to="/community">Community Forum</FooterLink>
          <FooterLink to="/tutorials">Video Tutorials</FooterLink>
          <FooterLink to="/faq">FAQs</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>
            <FaShieldAlt style={{ marginRight: '8px' }} />
            Legal
          </FooterTitle>
          <FooterLink to="/privacy">Privacy Policy</FooterLink>
          <FooterLink to="/terms">Terms of Service</FooterLink>
          <FooterLink to="/cookies">Cookie Policy</FooterLink>
          <FooterLink to="/accessibility">Accessibility</FooterLink>
          <FooterLink to="/security">Security</FooterLink>
        </FooterSection>
      </FooterTop>

      <FooterBottom>
        <Status isError={showError}>
          <StatusDot isError={showError} />
          {displayStatus}
        </Status>

        <Copyright>
          © {currentYear} {APP_NAME}. Made with <FaHeart /> by Ashwin Patel
        </Copyright>

        <div>
          <SocialLinks>
            <SocialLink href={GITHUB_URL} target="_blank" aria-label="GitHub">
              <FaGithub size={18} />
            </SocialLink>
            <SocialLink href="https://twitter.com" target="_blank" aria-label="Twitter">
              <FaTwitter size={18} />
            </SocialLink>
            <SocialLink href="https://facebook.com" target="_blank" aria-label="Facebook">
              <FaFacebook size={18} />
            </SocialLink>
            <SocialLink href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
              <FaLinkedin size={18} />
            </SocialLink>
          </SocialLinks>
        </div>

        <Version>
          {hasUpdate && <UpdateIndicator title="Update available" />}
          v{APP_VERSION}
        </Version>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
