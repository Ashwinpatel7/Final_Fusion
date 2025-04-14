import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FaHistory, FaArrowRight, FaLanguage, FaFileAlt, FaImage, FaMicrophone } from 'react-icons/fa';

// Animations
const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Styled Components
const RecentActivityContainer = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: ${({ theme }) => theme.boxShadow};
  animation: ${fadeIn} 0.5s ease-out;
  overflow: hidden;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.textColor};

  svg {
    margin-right: 0.75rem;
    color: ${({ theme }) => theme.primary};
  }
`;

const ActivityList = styled.div`
  position: relative;
  min-height: 300px;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  background: ${({ theme }) => theme.backgroundSecondary};
  border-radius: 8px;
  border-left: 4px solid ${({ color }) => color || '#6366f1'};
  position: absolute;
  width: calc(100% - 2rem);
  animation: ${({ isEntering }) => isEntering ? css`${slideIn} 0.5s ease-out forwards` : css`${slideOut} 0.5s ease-out forwards`};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ color }) => color || '#6366f1'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  flex-shrink: 0;

  svg {
    color: white;
    font-size: 1.2rem;
  }
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.25rem;
  color: ${({ theme }) => theme.textColor};
`;

const ActivityDetails = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.secondary};
`;

const ActivityLanguages = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
`;

const ActivityTime = styled.span`
  margin-left: auto;
  color: ${({ theme }) => theme.secondary};
  font-size: 0.8rem;
`;

const ViewAllButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.primary};
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  margin-left: auto;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.primary}15;
  }

  svg {
    margin-left: 0.5rem;
    font-size: 0.8rem;
  }
`;

// Sample data for recent activities
const recentActivities = [
  {
    id: 1,
    type: 'text',
    title: 'Philosophical Discourse Translation',
    sourceLanguage: 'English',
    targetLanguage: 'German',
    text: 'The categorical imperative is the central philosophical concept in the deontological moral philosophy of Immanuel Kant.',
    time: '2 hours ago',
    color: '#6366f1',
    icon: <FaLanguage />
  },
  {
    id: 2,
    type: 'document',
    title: 'Research Paper Translation',
    sourceLanguage: 'French',
    targetLanguage: 'English',
    text: 'Quantum Mechanics: A Modern Development - Academic Paper',
    time: '5 hours ago',
    color: '#10b981',
    icon: <FaFileAlt />
  },
  {
    id: 3,
    type: 'image',
    title: 'Ancient Manuscript Translation',
    sourceLanguage: 'Latin',
    targetLanguage: 'English',
    text: 'Medieval manuscript with historical significance',
    time: '1 day ago',
    color: '#f59e0b',
    icon: <FaImage />
  },
  {
    id: 4,
    type: 'voice',
    title: 'Conference Speech Translation',
    sourceLanguage: 'Japanese',
    targetLanguage: 'English',
    text: 'International Symposium on Artificial Intelligence keynote',
    time: '2 days ago',
    color: '#ec4899',
    icon: <FaMicrophone />
  },
  {
    id: 5,
    type: 'text',
    title: 'Literary Analysis Translation',
    sourceLanguage: 'Russian',
    targetLanguage: 'English',
    text: 'Dostoevsky\'s exploration of existentialism in Crime and Punishment',
    time: '3 days ago',
    color: '#6366f1',
    icon: <FaLanguage />
  }
];

const RecentActivity = () => {
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [isEntering, setIsEntering] = useState(true);
  const [visibleActivity, setVisibleActivity] = useState(recentActivities[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsEntering(false);

      setTimeout(() => {
        setCurrentActivityIndex((prevIndex) => (prevIndex + 1) % recentActivities.length);
        setIsEntering(true);
      }, 500); // Wait for slide out animation to complete

    }, 5000); // Change activity every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setVisibleActivity(recentActivities[currentActivityIndex]);
  }, [currentActivityIndex]);

  return (
    <RecentActivityContainer>
      <Title>
        <FaHistory /> Recent Activity
        <ViewAllButton>
          View All <FaArrowRight />
        </ViewAllButton>
      </Title>

      <ActivityList>
        <ActivityItem
          key={visibleActivity.id}
          color={visibleActivity.color}
          isEntering={isEntering}
        >
          <ActivityIcon color={visibleActivity.color}>
            {visibleActivity.icon}
          </ActivityIcon>
          <ActivityContent>
            <ActivityTitle>{visibleActivity.title}</ActivityTitle>
            <ActivityDetails>
              <ActivityLanguages>
                {visibleActivity.sourceLanguage} → {visibleActivity.targetLanguage}
              </ActivityLanguages>
              {visibleActivity.text}
            </ActivityDetails>
          </ActivityContent>
          <ActivityTime>{visibleActivity.time}</ActivityTime>
        </ActivityItem>
      </ActivityList>
    </RecentActivityContainer>
  );
};

export default RecentActivity;
