import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setFromLang, setToLang } from '../../store/translationSlice';
import {
  SOURCE_LANGUAGES,
  TARGET_LANGUAGES,
  getNativeNameFromEnglish,
  getEnglishNameFromNative
} from '../../utils/supportedLanguages';
import { FaStar, FaHistory, FaGlobeAmericas } from 'react-icons/fa';

const TilesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1.5rem;
`;

const TilesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const TilesTitle = styled.h2`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textColor};
  margin: 0;
`;

const TilesToggle = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ToggleButton = styled.button`
  background-color: ${({ active, theme }) => active ? theme.primary : 'transparent'};
  color: ${({ active, theme }) => active ? 'white' : theme.textColor};
  border: 1px solid ${({ active, theme }) => active ? theme.primary : theme.borderColor};
  border-radius: 4px;
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: ${({ active, theme }) => active ? theme.primary : theme.primary + '10'};
  }
`;

const TilesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  max-height: ${({ expanded }) => expanded ? '400px' : '200px'};
  overflow-y: auto;
  transition: max-height 0.3s ease;
  padding-right: 0.5rem;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.background};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.secondary};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.primary};
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }

  @media (max-width: 576px) {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  }
`;

const LanguageTile = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 0.5rem;
  background-color: ${({ selected, theme }) => selected ? theme.primary + '20' : theme.inputBg};
  border: 1px solid ${({ selected, theme }) => selected ? theme.primary : theme.borderColor};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-color: ${({ theme }) => theme.primary};
  }

  &:active {
    transform: translateY(0);
  }
`;

const LanguageName = styled.span`
  font-size: 0.9rem;
  font-weight: ${({ selected }) => selected ? 'bold' : 'normal'};
  color: ${({ selected, theme }) => selected ? theme.primary : theme.textColor};
  text-align: center;
  margin-top: 0.5rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  direction: auto; /* Automatically handle RTL languages */
  min-height: 2.5em; /* Ensure consistent height for all languages */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LanguageIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primary + '10'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.primary};
`;

const FavoriteIcon = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  color: ${({ theme }) => theme.warning};
  font-size: 0.8rem;
`;

const ShowMoreButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.primary};
  border: none;
  padding: 0.5rem;
  margin-top: 0.5rem;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
  text-align: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primary + '10'};
  }
`;

// Mock data for frequently used and recently used languages
const FAVORITE_LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Chinese'];
const RECENT_LANGUAGES = ['Japanese', 'Russian', 'Italian', 'Portuguese', 'Arabic'];

const LanguageTiles = ({ forSource = true }) => {
  const dispatch = useDispatch();
  const { fromLang, toLang } = useSelector(state => state.translation);
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [displayLanguages, setDisplayLanguages] = useState(forSource ? SOURCE_LANGUAGES : TARGET_LANGUAGES);

  useEffect(() => {
    // Update displayed languages based on active tab
    if (activeTab === 'favorites') {
      setDisplayLanguages(FAVORITE_LANGUAGES);
    } else if (activeTab === 'recent') {
      setDisplayLanguages(RECENT_LANGUAGES);
    } else {
      setDisplayLanguages(forSource ? SOURCE_LANGUAGES : TARGET_LANGUAGES);
    }
  }, [activeTab]);

  const handleLanguageSelect = (language) => {
    if (forSource) {
      dispatch(setFromLang(language));
    } else {
      dispatch(setToLang(language));
    }
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const currentValue = forSource ? fromLang : toLang;

  return (
    <TilesContainer>
      <TilesHeader>
        <TilesTitle>{forSource ? 'Source Language' : 'Target Language'}</TilesTitle>
        <TilesToggle>
          <ToggleButton
            active={activeTab === 'all'}
            onClick={() => setActiveTab('all')}
          >
            <FaGlobeAmericas />
            All
          </ToggleButton>
          <ToggleButton
            active={activeTab === 'favorites'}
            onClick={() => setActiveTab('favorites')}
          >
            <FaStar />
            Favorites
          </ToggleButton>
          <ToggleButton
            active={activeTab === 'recent'}
            onClick={() => setActiveTab('recent')}
          >
            <FaHistory />
            Recent
          </ToggleButton>
        </TilesToggle>
      </TilesHeader>

      <TilesGrid expanded={expanded}>
        {forSource && (
          <LanguageTile
            selected={currentValue === 'Auto Detect'}
            onClick={() => handleLanguageSelect('Auto Detect')}
          >
            <LanguageIcon>🔍</LanguageIcon>
            <LanguageName selected={currentValue === 'Auto Detect'}>Auto Detect</LanguageName>
          </LanguageTile>
        )}

        {displayLanguages.map(language => {
          const nativeName = getNativeNameFromEnglish(language);
          return (
            <LanguageTile
              key={language}
              selected={currentValue === language}
              onClick={() => handleLanguageSelect(language)}
            >
              <LanguageIcon>
                {nativeName.charAt(0)}
              </LanguageIcon>
              <LanguageName selected={currentValue === language}>
                {nativeName}
              </LanguageName>
              {FAVORITE_LANGUAGES.includes(language) && <FavoriteIcon>★</FavoriteIcon>}
            </LanguageTile>
          );
        })}
      </TilesGrid>

      <ShowMoreButton onClick={toggleExpanded}>
        {expanded ? 'Show Less' : 'Show More'}
      </ShowMoreButton>
    </TilesContainer>
  );
};

export default LanguageTiles;
