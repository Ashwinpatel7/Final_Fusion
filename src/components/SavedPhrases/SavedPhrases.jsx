import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FaBookmark, FaArrowRight, FaStar, FaRegStar, FaTrash, FaCopy } from 'react-icons/fa';

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

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const SavedPhrasesContainer = styled.div`
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

const PhrasesList = styled.div`
  position: relative;
  min-height: 300px;
`;

const PhraseItem = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  background: ${({ theme }) => theme.backgroundSecondary};
  border-radius: 8px;
  border-left: 4px solid ${({ theme }) => theme.primary};
  position: absolute;
  width: calc(100% - 2rem);
  animation: ${({ isEntering }) => isEntering ? css`${slideIn} 0.5s ease-out forwards` : css`${slideOut} 0.5s ease-out forwards`};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const PhraseHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

const PhraseTitle = styled.h3`
  font-size: 1rem;
  color: ${({ theme }) => theme.textColor};
  margin: 0;
`;

const PhraseActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
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

  &:hover {
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.primary}15;
  }

  &.favorite {
    color: ${({ isFavorite, theme }) => isFavorite ? '#f59e0b' : theme.secondary};

    &:hover {
      color: #f59e0b;
    }
  }

  &.delete:hover {
    color: #ef4444;
    background: #ef444415;
  }

  &.copy:hover {
    color: #10b981;
    background: #10b98115;
  }

  &.active {
    animation: ${css`${pulse} 0.3s ease-in-out`};
  }
`;

const PhraseContent = styled.div`
  margin-bottom: 0.75rem;
`;

const PhraseText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.textColor};
  font-size: 0.95rem;
  line-height: 1.5;
`;

const PhraseTranslation = styled.p`
  margin: 0.5rem 0 0;
  color: ${({ theme }) => theme.secondary};
  font-size: 0.9rem;
  line-height: 1.5;
  font-style: italic;
`;

const PhraseFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.secondary};
`;

const PhraseLanguages = styled.div``;

const PhraseDate = styled.div``;

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

// Sample data for saved phrases
const savedPhrases = [
  {
    id: 1,
    title: 'Philosophical Quote',
    text: 'The unexamined life is not worth living.',
    translation: 'Das ungeprüfte Leben ist nicht lebenswert.',
    sourceLanguage: 'English',
    targetLanguage: 'German',
    date: 'Apr 10, 2025',
    isFavorite: true
  },
  {
    id: 2,
    title: 'Scientific Concept',
    text: 'Entropy is a measure of disorder or randomness in a system.',
    translation: 'L\'entropie est une mesure du désordre ou de l\'aléatoire dans un système.',
    sourceLanguage: 'English',
    targetLanguage: 'French',
    date: 'Apr 8, 2025',
    isFavorite: false
  },
  {
    id: 3,
    title: 'Literary Quote',
    text: 'All happy families are alike; each unhappy family is unhappy in its own way.',
    translation: 'Все счастливые семьи похожи друг на друга, каждая несчастливая семья несчастлива по-своему.',
    sourceLanguage: 'English',
    targetLanguage: 'Russian',
    date: 'Apr 5, 2025',
    isFavorite: true
  },
  {
    id: 4,
    title: 'Mathematical Theorem',
    text: 'In a right-angled triangle, the square of the hypotenuse equals the sum of the squares of the other two sides.',
    translation: 'En un triángulo rectángulo, el cuadrado de la hipotenusa es igual a la suma de los cuadrados de los otros dos lados.',
    sourceLanguage: 'English',
    targetLanguage: 'Spanish',
    date: 'Apr 3, 2025',
    isFavorite: false
  },
  {
    id: 5,
    title: 'Historical Statement',
    text: 'I have nothing to offer but blood, toil, tears, and sweat.',
    translation: '私が提供できるのは、血と労苦と涙と汗だけです。',
    sourceLanguage: 'English',
    targetLanguage: 'Japanese',
    date: 'Mar 30, 2025',
    isFavorite: true
  }
];

const SavedPhrases = () => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isEntering, setIsEntering] = useState(true);
  const [visiblePhrase, setVisiblePhrase] = useState(savedPhrases[0]);
  const [favorites, setFavorites] = useState(
    savedPhrases.reduce((acc, phrase) => {
      acc[phrase.id] = phrase.isFavorite;
      return acc;
    }, {})
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setIsEntering(false);

      setTimeout(() => {
        setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % savedPhrases.length);
        setIsEntering(true);
      }, 500); // Wait for slide out animation to complete

    }, 6000); // Change phrase every 6 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setVisiblePhrase(savedPhrases[currentPhraseIndex]);
  }, [currentPhraseIndex]);

  const toggleFavorite = (id) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <SavedPhrasesContainer>
      <Title>
        <FaBookmark /> Saved Phrases
        <ViewAllButton>
          View All <FaArrowRight />
        </ViewAllButton>
      </Title>

      <PhrasesList>
        <PhraseItem
          key={visiblePhrase.id}
          isEntering={isEntering}
        >
          <PhraseHeader>
            <PhraseTitle>{visiblePhrase.title}</PhraseTitle>
            <PhraseActions>
              <ActionButton
                className="favorite"
                isFavorite={favorites[visiblePhrase.id]}
                onClick={() => toggleFavorite(visiblePhrase.id)}
              >
                {favorites[visiblePhrase.id] ? <FaStar /> : <FaRegStar />}
              </ActionButton>
              <ActionButton
                className="copy"
                onClick={() => copyToClipboard(visiblePhrase.text)}
              >
                <FaCopy />
              </ActionButton>
              <ActionButton className="delete">
                <FaTrash />
              </ActionButton>
            </PhraseActions>
          </PhraseHeader>

          <PhraseContent>
            <PhraseText>{visiblePhrase.text}</PhraseText>
            <PhraseTranslation>{visiblePhrase.translation}</PhraseTranslation>
          </PhraseContent>

          <PhraseFooter>
            <PhraseLanguages>
              {visiblePhrase.sourceLanguage} → {visiblePhrase.targetLanguage}
            </PhraseLanguages>
            <PhraseDate>{visiblePhrase.date}</PhraseDate>
          </PhraseFooter>
        </PhraseItem>
      </PhrasesList>
    </SavedPhrasesContainer>
  );
};

export default SavedPhrases;
