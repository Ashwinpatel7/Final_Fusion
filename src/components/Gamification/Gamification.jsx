import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FaTrophy, FaMedal, FaStar, FaFire, FaCalendarCheck, FaGlobe, FaLanguage, FaFileAlt, FaImage, FaMicrophone } from 'react-icons/fa';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const shine = keyframes`
  0% { background-position: -100px; }
  40%, 100% { background-position: 300px; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// Styled Components
const GamificationContainer = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: ${({ theme }) => theme.boxShadow};
  animation: ${fadeIn} 0.5s ease-out;
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

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.backgroundSecondary};
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const StatIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ color }) => color || '#6366f1'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;

  svg {
    color: white;
    font-size: 1.2rem;
  }
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.secondary};
`;

const ProgressSection = styled.div`
  margin-bottom: 1.5rem;
`;

const ProgressTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.textColor};
`;

const ProgressBar = styled.div`
  height: 8px;
  background: ${({ theme }) => theme.backgroundSecondary};
  border-radius: 4px;
  margin-bottom: 0.5rem;
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${({ percent }) => `${percent}%`};
  background: ${({ color }) => color || '#6366f1'};
  border-radius: 4px;
  transition: width 1s ease-in-out;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    animation: ${shine} 2s infinite linear;
  }
`;

const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
`;

const ProgressLabel = styled.span`
  color: ${({ theme }) => theme.secondary};
`;

const ProgressValue = styled.span`
  color: ${({ theme }) => theme.textColor};
  font-weight: 600;
`;

const BadgesSection = styled.div`
  margin-bottom: 1.5rem;
`;

const BadgesTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.textColor};
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.primary};
  }
`;

const BadgesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
`;

const BadgeCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  ${({ isLocked }) => isLocked && css`
    opacity: 0.5;
    filter: grayscale(1);
  `}

  ${({ isNew }) => isNew && css`
    animation: ${pulse} 2s infinite;
  `}
`;

const BadgeIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ color }) => color || '#6366f1'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  position: relative;

  ${({ isAnimated }) => isAnimated && css`
    animation: ${float} 3s ease-in-out infinite;
  `}

  svg {
    color: white;
    font-size: 1.5rem;
  }

  &::after {
    content: '';
    position: absolute;
    top: -5px;
    right: -5px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #10b981;
    border: 2px solid white;
    display: ${({ isNew }) => isNew ? 'block' : 'none'};
  }
`;

const BadgeName = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 0.25rem;
`;

const BadgeDescription = styled.div`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.secondary};
`;

const StreakSection = styled.div`
  margin-bottom: 1.5rem;
`;

const StreakTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.textColor};
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
    color: #f59e0b;
  }
`;

const StreakInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const StreakCount = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.textColor};
  margin-right: 1rem;
`;

const StreakDetails = styled.div``;

const StreakLabel = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 0.25rem;
`;

const StreakSubtext = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.secondary};
`;

const StreakCalendar = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
`;

const CalendarDay = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 4px;
  background: ${({ isActive, theme }) => isActive ? '#10b981' : theme.backgroundSecondary};
  opacity: ${({ isToday, isFuture }) => isToday ? 1 : isFuture ? 0.3 : 0.7};
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

// Sample data for gamification
const stats = [
  { icon: <FaLanguage />, value: 1250, label: 'Words Translated', color: '#6366f1' },
  { icon: <FaGlobe />, value: 8, label: 'Languages Used', color: '#8b5cf6' },
  { icon: <FaCalendarCheck />, value: 15, label: 'Days Active', color: '#10b981' },
  { icon: <FaTrophy />, value: 12, label: 'Achievements', color: '#f59e0b' }
];

const progressData = [
  {
    label: 'Translator Level',
    current: 1250,
    target: 2000,
    color: '#6366f1',
    level: 3,
    nextLevel: 4
  },
  {
    label: 'Language Diversity',
    current: 8,
    target: 10,
    color: '#8b5cf6',
    level: 2,
    nextLevel: 3
  },
  {
    label: 'Translation Accuracy',
    current: 92,
    target: 100,
    color: '#10b981',
    level: 4,
    nextLevel: 5
  }
];

const badges = [
  {
    name: 'First Translation',
    description: 'Completed your first translation',
    icon: <FaLanguage />,
    color: '#6366f1',
    isLocked: false,
    isNew: false,
    isAnimated: true
  },
  {
    name: 'Polyglot Novice',
    description: 'Used 5 different languages',
    icon: <FaGlobe />,
    color: '#8b5cf6',
    isLocked: false,
    isNew: false,
    isAnimated: false
  },
  {
    name: 'Document Master',
    description: 'Translated 10 documents',
    icon: <FaFileAlt />,
    color: '#10b981',
    isLocked: false,
    isNew: true,
    isAnimated: true
  },
  {
    name: 'Voice Virtuoso',
    description: 'Used voice translation 20 times',
    icon: <FaMicrophone />,
    color: '#ec4899',
    isLocked: true,
    isNew: false,
    isAnimated: false
  },
  {
    name: 'Image Interpreter',
    description: 'Translated text from 5 images',
    icon: <FaImage />,
    color: '#f59e0b',
    isLocked: true,
    isNew: false,
    isAnimated: false
  },
  {
    name: 'Daily Devotee',
    description: 'Used the app for 7 consecutive days',
    icon: <FaCalendarCheck />,
    color: '#14b8a6',
    isLocked: false,
    isNew: false,
    isAnimated: false
  }
];

// Generate last 14 days for streak calendar
const generateCalendarDays = () => {
  const days = [];
  const today = new Date();

  for (let i = 13; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);

    days.push({
      date,
      isActive: Math.random() > 0.3, // Randomly mark days as active
      isToday: i === 0,
      isFuture: i < 0
    });
  }

  return days;
};

const Gamification = () => {
  const [calendarDays, setCalendarDays] = useState([]);

  useEffect(() => {
    setCalendarDays(generateCalendarDays());
  }, []);

  return (
    <GamificationContainer>
      <Title>
        <FaTrophy /> Your Translation Journey
      </Title>

      <StatsContainer>
        {stats.map((stat, index) => (
          <StatCard key={index}>
            <StatIcon color={stat.color}>
              {stat.icon}
            </StatIcon>
            <StatValue>{stat.value}</StatValue>
            <StatLabel>{stat.label}</StatLabel>
          </StatCard>
        ))}
      </StatsContainer>

      <ProgressSection>
        <ProgressTitle>Your Progress</ProgressTitle>

        {progressData.map((progress, index) => {
          const percent = Math.min(100, (progress.current / progress.target) * 100);

          return (
            <div key={index} style={{ marginBottom: '1rem' }}>
              <ProgressInfo>
                <ProgressLabel>{progress.label}</ProgressLabel>
                <ProgressValue>Level {progress.level}</ProgressValue>
              </ProgressInfo>
              <ProgressBar>
                <ProgressFill percent={percent} color={progress.color} />
              </ProgressBar>
              <ProgressInfo>
                <ProgressLabel>{progress.current} / {progress.target}</ProgressLabel>
                <ProgressValue>{percent.toFixed(0)}% to Level {progress.nextLevel}</ProgressValue>
              </ProgressInfo>
            </div>
          );
        })}
      </ProgressSection>

      <BadgesSection>
        <BadgesTitle>
          <FaMedal /> Your Achievements
        </BadgesTitle>

        <BadgesGrid>
          {badges.map((badge, index) => (
            <BadgeCard
              key={index}
              isLocked={badge.isLocked}
              isNew={badge.isNew}
            >
              <BadgeIcon
                color={badge.color}
                isNew={badge.isNew}
                isAnimated={badge.isAnimated}
              >
                {badge.icon}
              </BadgeIcon>
              <BadgeName>{badge.name}</BadgeName>
              <BadgeDescription>{badge.description}</BadgeDescription>
            </BadgeCard>
          ))}
        </BadgesGrid>
      </BadgesSection>

      <StreakSection>
        <StreakTitle>
          <FaFire /> Your Streak
        </StreakTitle>

        <StreakInfo>
          <StreakCount>7</StreakCount>
          <StreakDetails>
            <StreakLabel>Day Streak</StreakLabel>
            <StreakSubtext>Keep it up! You're on a roll!</StreakSubtext>
          </StreakDetails>
        </StreakInfo>

        <StreakCalendar>
          {calendarDays.map((day, index) => (
            <CalendarDay
              key={index}
              isActive={day.isActive}
              isToday={day.isToday}
              isFuture={day.isFuture}
            />
          ))}
        </StreakCalendar>
      </StreakSection>
    </GamificationContainer>
  );
};

export default Gamification;
