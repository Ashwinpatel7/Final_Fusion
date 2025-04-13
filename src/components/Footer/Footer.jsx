import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { APP_VERSION, APP_NAME } from '../../utils/constants';
import { FaHeart, FaTwitter, FaFacebook, FaLinkedin, FaGlobe, FaBook, FaHeadset, FaShieldAlt } from 'react-icons/fa';

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background: ${({ theme }) => theme.footerBg};
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  color: ${({ theme }) => theme.secondary};
  font-size: 0.85rem;
  transition: all 0.3s ease;
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
`;

const FooterTitle = styled.h4`
  font-size: 1rem;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 0.5rem;
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.secondary};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.borderColor};

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
  color: ${({ isError, theme }) => isError ? theme.danger : theme.secondary};
  max-width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  color: ${({ theme }) => theme.secondary};
  transition: color 0.2s ease, transform 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: translateY(-2px);
  }
`;

const Copyright = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  svg {
    color: ${({ theme }) => theme.danger};
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
          <FooterLink to="/contact">Contact Us</FooterLink>
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
          © {currentYear} {APP_NAME}. Made with <FaHeart /> by Augment Code
        </Copyright>

        <div>
          <SocialLinks>
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
