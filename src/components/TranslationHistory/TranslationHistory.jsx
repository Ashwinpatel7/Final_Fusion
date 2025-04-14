import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FaHistory, FaArrowRight, FaLanguage, FaFileAlt, FaImage, FaMicrophone, FaTrash, FaSave, FaCopy } from 'react-icons/fa';

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
const HistoryContainer = styled.div`
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

const HistoryList = styled.div`
  position: relative;
  min-height: 300px;
`;

const HistoryItem = styled.div`
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

const HistoryHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const HistoryIcon = styled.div`
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

const HistoryInfo = styled.div`
  flex: 1;
`;

const HistoryTitle = styled.h3`
  font-size: 1rem;
  margin: 0 0 0.25rem;
  color: ${({ theme }) => theme.textColor};
`;

const HistoryMeta = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.secondary};
`;

const HistoryTime = styled.span`
  margin-left: auto;
  color: ${({ theme }) => theme.secondary};
  font-size: 0.8rem;
`;

const HistoryContent = styled.div`
  margin: 0.75rem 0;
`;

const SourceText = styled.p`
  margin: 0 0 0.5rem;
  color: ${({ theme }) => theme.textColor};
  font-size: 0.95rem;
  line-height: 1.5;
`;

const TranslatedText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.secondary};
  font-size: 0.9rem;
  line-height: 1.5;
  font-style: italic;
`;

const HistoryActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.75rem;
`;

const ActionButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.secondary};
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;

  svg {
    margin-right: 0.25rem;
  }

  &:hover {
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.primary}15;
  }

  &.save:hover {
    color: #10b981;
    background: #10b98115;
  }

  &.delete:hover {
    color: #ef4444;
    background: #ef444415;
  }
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

// Sample data for translation history
const historyItems = [
  {
    id: 1,
    type: 'text',
    title: 'Quantum Physics Concept',
    sourceLanguage: 'English',
    targetLanguage: 'German',
    sourceText: 'Quantum entanglement is a physical phenomenon that occurs when a group of particles are generated, interact, or share spatial proximity in a way such that the quantum state of each particle cannot be described independently of the state of the others.',
    translatedText: 'Quantenverschränkung ist ein physikalisches Phänomen, das auftritt, wenn eine Gruppe von Teilchen so erzeugt wird, interagiert oder räumliche Nähe teilt, dass der Quantenzustand jedes Teilchens nicht unabhängig vom Zustand der anderen beschrieben werden kann.',
    time: '1 hour ago',
    color: '#6366f1',
    icon: <FaLanguage />
  },
  {
    id: 2,
    type: 'document',
    title: 'Neuropsychology Research Paper',
    sourceLanguage: 'Spanish',
    targetLanguage: 'English',
    sourceText: 'La neuroplasticidad, también conocida como plasticidad cerebral, es la capacidad del sistema nervioso para cambiar su estructura y funcionamiento a lo largo de su vida como reacción a la diversidad del entorno.',
    translatedText: 'Neuroplasticity, also known as brain plasticity, is the ability of the nervous system to change its structure and functioning throughout its life as a reaction to environmental diversity.',
    time: '3 hours ago',
    color: '#10b981',
    icon: <FaFileAlt />
  },
  {
    id: 3,
    type: 'image',
    title: 'Renaissance Art Description',
    sourceLanguage: 'Italian',
    targetLanguage: 'English',
    sourceText: 'La prospettiva lineare è una tecnica matematica utilizzata per creare l\'illusione di profondità e spazio su una superficie piatta.',
    translatedText: 'Linear perspective is a mathematical technique used to create the illusion of depth and space on a flat surface.',
    time: '6 hours ago',
    color: '#f59e0b',
    icon: <FaImage />
  },
  {
    id: 4,
    type: 'voice',
    title: 'Philosophical Discourse',
    sourceLanguage: 'French',
    targetLanguage: 'English',
    sourceText: 'L\'existentialisme est une philosophie qui met l\'accent sur l\'existence individuelle, la liberté et le choix.',
    translatedText: 'Existentialism is a philosophy that emphasizes individual existence, freedom, and choice.',
    time: '12 hours ago',
    color: '#ec4899',
    icon: <FaMicrophone />
  },
  {
    id: 5,
    type: 'text',
    title: 'Economic Theory',
    sourceLanguage: 'English',
    targetLanguage: 'Japanese',
    sourceText: 'The law of diminishing marginal utility states that as consumption increases, the marginal utility derived from each additional unit declines.',
    translatedText: '限界効用逓減の法則は、消費が増加するにつれて、追加の単位から得られる限界効用が減少することを示しています。',
    time: '1 day ago',
    color: '#6366f1',
    icon: <FaLanguage />
  }
];

const TranslationHistory = () => {
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);
  const [isEntering, setIsEntering] = useState(true);
  const [visibleHistory, setVisibleHistory] = useState(historyItems[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsEntering(false);

      setTimeout(() => {
        setCurrentHistoryIndex((prevIndex) => (prevIndex + 1) % historyItems.length);
        setIsEntering(true);
      }, 500); // Wait for slide out animation to complete

    }, 7000); // Change history item every 7 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setVisibleHistory(historyItems[currentHistoryIndex]);
  }, [currentHistoryIndex]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <HistoryContainer>
      <Title>
        <FaHistory /> Translation History
        <ViewAllButton>
          View All <FaArrowRight />
        </ViewAllButton>
      </Title>

      <HistoryList>
        <HistoryItem
          key={visibleHistory.id}
          color={visibleHistory.color}
          isEntering={isEntering}
        >
          <HistoryHeader>
            <HistoryIcon color={visibleHistory.color}>
              {visibleHistory.icon}
            </HistoryIcon>
            <HistoryInfo>
              <HistoryTitle>{visibleHistory.title}</HistoryTitle>
              <HistoryMeta>
                {visibleHistory.sourceLanguage} → {visibleHistory.targetLanguage}
              </HistoryMeta>
            </HistoryInfo>
            <HistoryTime>{visibleHistory.time}</HistoryTime>
          </HistoryHeader>

          <HistoryContent>
            <SourceText>{visibleHistory.sourceText}</SourceText>
            <TranslatedText>{visibleHistory.translatedText}</TranslatedText>
          </HistoryContent>

          <HistoryActions>
            <ActionButton onClick={() => copyToClipboard(visibleHistory.translatedText)}>
              <FaCopy /> Copy
            </ActionButton>
            <ActionButton className="save">
              <FaSave /> Save
            </ActionButton>
            <ActionButton className="delete">
              <FaTrash /> Delete
            </ActionButton>
          </HistoryActions>
        </HistoryItem>
      </HistoryList>
    </HistoryContainer>
  );
};

export default TranslationHistory;
