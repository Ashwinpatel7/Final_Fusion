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
`;

const WelcomeSection = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, ${({ theme }) => theme.primary}, #8ab4f8);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.secondary};
  max-width: 600px;
  margin: 0 auto;
`;

const TilesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const FeatureTile = styled.div`
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.inputBg}, ${theme.inputBg}CC)`};
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid ${({ theme }) => theme.borderColor};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    border-color: ${({ theme }) => theme.primary};

    &::before {
      opacity: 1;
    }

    svg {
      animation: ${pulse} 1s infinite;
      color: ${({ theme }) => theme.primary};
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${({ theme }) => theme.primary}, ${({ color, theme }) => color || theme.primary});
    opacity: 0;
    transition: opacity 0.3s ease;
  }
`;

const IconWrapper = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: ${({ theme, color }) => `linear-gradient(135deg, ${theme.background}, ${color || theme.primary}22)`};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;

  svg {
    font-size: 2rem;
    color: ${({ theme, color }) => color || theme.primary};
    transition: all 0.3s ease;
  }
`;

const TileTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.textColor};
`;

const TileDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.secondary};
  margin-bottom: 1rem;
`;

const Badge = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: ${({ theme, type }) =>
    type === 'new' ? theme.success :
    type === 'beta' ? theme.warning :
    theme.info};
  color: white;
  font-size: 0.7rem;
  font-weight: bold;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  text-transform: uppercase;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin: 2rem 0 1rem;
  color: ${({ theme }) => theme.textColor};
  border-bottom: 2px solid ${({ theme }) => theme.borderColor};
  padding-bottom: 0.5rem;
`;

const RecentActivitySection = styled.div`
  margin-top: 3rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  background: ${({ theme }) => theme.inputBg};
  border-radius: 8px;
  border: 1px dashed ${({ theme }) => theme.borderColor};

  p {
    color: ${({ theme }) => theme.secondary};
    margin-top: 1rem;
  }
`;

const HomeScreen = ({ onSelectMode }) => {
  const navigate = useNavigate();

  const handleTileClick = (mode) => {
    if (onSelectMode) {
      onSelectMode(mode);
    } else {
      navigate(`/translate/${mode}`);
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
            style={{ animationDelay: `${index * 0.1}s` }}
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
        <SectionTitle>Recent Activity</SectionTitle>
        <EmptyState>
          <IconWrapper color="#9aa0a6">
            <FaHistory />
          </IconWrapper>
          <p>Your recent translations will appear here</p>
        </EmptyState>
      </RecentActivitySection>
    </Container>
  );
};

export default HomeScreen;
