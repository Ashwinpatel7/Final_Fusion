import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { APP_NAME, APP_TAGLINE } from '../../utils/constants';
import {
  FaLanguage,
  FaMicrophone,
  FaVolumeUp,
  FaFileAlt,
  FaImage,
  FaGlobe,
  FaHistory,
  FaBookmark
} from 'react-icons/fa';

// Import activity components
import RecentActivity from '../RecentActivity';
import SavedPhrases from '../SavedPhrases';
import TranslationHistory from '../TranslationHistory';
import Gamification from '../Gamification';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const Container = styled.div`
  padding: 2rem 0;
  max-width: 1200px;
  margin: 0 auto;
  animation: ${fadeIn} 0.6s ease-out;
  position: relative;

  @media (max-width: 768px) {
    padding: 1.5rem 0;
  }

  @media (max-width: 480px) {
    padding: 1rem 0;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: ${({ theme }) => theme.dotPattern};
    background-size: 20px 20px;
    opacity: 0.05;
    pointer-events: none;
    z-index: -1;
  }
`;

const WelcomeSection = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  padding: 1.5rem 0;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.primary}33, transparent);
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(to right, ${({ theme }) => theme.primary}, ${({ theme }) => theme.purple}, ${({ theme }) => theme.primary});
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 800;
  letter-spacing: -1px;
  animation: ${shimmer} 5s linear infinite;
  text-align: center;
  text-shadow: 0 2px 10px rgba(99, 102, 241, 0.2);
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: ${({ theme }) => theme.primaryGradient};
    border-radius: 3px;
  }
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.secondary};
  max-width: 700px;
  margin: 0 auto 2rem;
  text-align: center;
  line-height: 1.6;
  font-weight: 300;
  letter-spacing: 0.3px;
`;

const TilesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const FeatureTile = styled.div`
  background: ${({ theme }) => `rgba(255, 255, 255, 0.03)`};
  border-radius: 12px;
  padding: 1.8rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.25s ease-out;
  border: 1px solid ${({ theme }) => `rgba(255, 255, 255, 0.1)`};
  box-shadow: ${({ theme }) => theme.boxShadow};
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.5s ease-out;
  animation-delay: ${({ index }) => `${index * 0.05}s`};
  opacity: 0;
  animation-fill-mode: forwards;
  will-change: transform, opacity;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    border-color: ${({ color, theme }) => color || theme.primary};
    background: ${({ theme }) => `rgba(255, 255, 255, 0.05)`};

    &::before {
      opacity: 1;
      transform: translateY(0);
    }

    svg {
      color: ${({ color }) => color || 'white'};
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ color, theme }) => color || theme.primary};
    opacity: 0;
    transform: translateY(-3px);
    transition: all 0.3s ease;
  }

  @media (max-width: 768px) {
    padding: 1.5rem 1.2rem;
  }

  @media (max-width: 480px) {
    padding: 1.2rem 1rem;
    margin-bottom: 0.5rem;
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ color }) => `${color}22` || 'rgba(255, 255, 255, 0.1)'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: all 0.25s ease;
  position: relative;

  svg {
    font-size: 1.75rem;
    color: ${({ color }) => color || 'white'};
    transition: all 0.25s ease;
  }

  ${FeatureTile}:hover & {
    background: ${({ color }) => `${color}33` || 'rgba(255, 255, 255, 0.2)'};
    transform: scale(1.05);
  }
`;

const TileTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
  color: white;
  font-weight: 600;
  letter-spacing: 0.5px;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 2px;
    background: ${({ color }) => color || 'rgba(255, 255, 255, 0.5)'};
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  ${FeatureTile}:hover &::after {
    width: 50px;
    background: ${({ color }) => color || 'white'};
    box-shadow: 0 0 10px ${({ color }) => `${color}77` || 'rgba(255, 255, 255, 0.5)'};
  }
`;

const TileDescription = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;
  line-height: 1.5;
  transition: all 0.3s ease;

  ${FeatureTile}:hover & {
    color: rgba(255, 255, 255, 0.9);
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${({ theme, type }) =>
    type === 'new' ? theme.successGradient :
    type === 'beta' ? theme.warningGradient :
    theme.infoGradient};
  color: white;
  font-size: 0.65rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 10px ${({ theme, type }) =>
    type === 'new' ? 'rgba(16, 185, 129, 0.3)' :
    type === 'beta' ? 'rgba(245, 158, 11, 0.3)' :
    'rgba(6, 182, 212, 0.3)'};
  backdrop-filter: blur(5px);
  z-index: 2;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin: 2.5rem 0 1.25rem;
  color: ${({ theme }) => theme.textColor};
  position: relative;
  font-weight: 600;
  padding-bottom: 0.5rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background-color: ${({ theme }) => theme.primary};
    border-radius: 3px;
  }
`;

const RecentActivitySection = styled.div`
  margin-top: 3rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2.5rem;
  background: ${({ theme }) => theme.inputBg};
  border-radius: 8px;
  border: 1px dashed ${({ theme }) => theme.borderColor};
  box-shadow: ${({ theme }) => theme.boxShadow};

  p {
    color: ${({ theme }) => theme.secondary};
    margin-top: 1rem;
    font-size: 0.95rem;
  }
`;

const HomeScreen = ({ onSelectMode }) => {
  const navigate = useNavigate();

  const handleTileClick = (mode) => {
    if (onSelectMode) {
      onSelectMode(mode);
    } else {
      // For document and image translation, navigate to their dedicated routes
      if (mode === 'document') {
        navigate('/document');
      } else if (mode === 'image') {
        navigate('/image');
      } else {
        navigate(`/translate/${mode}`);
      }
    }
  };

  const featureTiles = [
    {
      icon: <FaLanguage />,
      title: 'Text to Text',
      description: 'Translate written text between 100+ languages',
      color: '#4285f4',
      mode: 'text-to-text'
    },
    {
      icon: <FaVolumeUp />,
      title: 'Text to Speech',
      description: 'Convert your text into spoken words',
      color: '#ea4335',
      mode: 'text-to-speech',
      badge: 'popular'
    },
    {
      icon: <FaMicrophone />,
      title: 'Speech to Text',
      description: 'Convert spoken words into written text',
      color: '#34a853',
      mode: 'speech-to-text'
    },
    {
      icon: <FaFileAlt />,
      title: 'Document Translation',
      description: 'Translate entire documents with formatting preserved',
      color: '#fbbc05',
      mode: 'document',
      badge: 'new'
    },
    {
      icon: <FaImage />,
      title: 'Image Translation',
      description: 'Extract and translate text from images',
      color: '#ff6d01',
      mode: 'image',
      badge: 'beta'
    },
    {
      icon: <FaGlobe />,
      title: 'Website Translation',
      description: 'Translate entire websites on the fly',
      color: '#46bdc6',
      mode: 'website',
      badge: 'beta'
    },
    {
      icon: <FaHistory />,
      title: 'Translation History',
      description: 'View and manage your past translations',
      color: '#9c27b0',
      mode: 'history'
    },
    {
      icon: <FaBookmark />,
      title: 'Saved Phrases',
      description: 'Access your saved translations and phrases',
      color: '#795548',
      mode: 'saved'
    }
  ];

  return (
    <Container>
      <WelcomeSection>
        <Title>Welcome to {APP_NAME}</Title>
        <Subtitle>
          {APP_TAGLINE}.
          Select a feature below to get started.
        </Subtitle>
      </WelcomeSection>

      <SectionTitle>Translation Tools</SectionTitle>
      <TilesGrid>
        {featureTiles.map((tile, index) => (
          <FeatureTile
            key={index}
            onClick={() => handleTileClick(tile.mode)}
            index={index}
            color={tile.color}
          >
            {tile.badge && <Badge type={tile.badge}>{tile.badge}</Badge>}
            <IconWrapper color={tile.color}>
              {tile.icon}
            </IconWrapper>
            <TileTitle>{tile.title}</TileTitle>
            <TileDescription>{tile.description}</TileDescription>
          </FeatureTile>
        ))}
      </TilesGrid>

      <RecentActivitySection>
        <Gamification />
        <RecentActivity />
        <TranslationHistory />
        <SavedPhrases />
      </RecentActivitySection>
    </Container>
  );
};

export default HomeScreen;
