import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useDispatch } from 'react-redux';
import { FaLanguage, FaExchangeAlt, FaTimes, FaCopy, FaVolumeUp, FaExpand, FaCompress } from 'react-icons/fa';
import { setInputText } from '../../store/translationSlice';

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

// Styled Components
const WidgetContainer = styled.div`
  position: fixed;
  bottom: ${({ isExpanded }) => isExpanded ? '20px' : '80px'};
  right: 20px;
  width: ${({ isExpanded }) => isExpanded ? '400px' : '60px'};
  height: ${({ isExpanded }) => isExpanded ? 'auto' : '60px'};
  background: ${({ theme }) => theme.cardBackground};
  border-radius: ${({ isExpanded }) => isExpanded ? '12px' : '50%'};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  transition: all 0.3s ease;
  overflow: hidden;
  animation: ${fadeIn} 0.5s ease-out;

  ${({ isExpanded }) => !isExpanded && css`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
    }
  `}
`;

const WidgetButton = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const WidgetHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

const WidgetTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  color: ${({ theme }) => theme.textColor};
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.primary};
  }
`;

const WidgetControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ControlButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.secondary};
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.backgroundSecondary};
    color: ${({ theme }) => theme.primary};
  }
`;

const WidgetContent = styled.div`
  padding: 1rem;
  animation: ${slideIn} 0.3s ease-out;
`;

const LanguageSelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const LanguageButton = styled.button`
  background: ${({ theme }) => theme.backgroundSecondary};
  border: 1px solid ${({ theme }) => theme.borderColor};
  color: ${({ theme }) => theme.textColor};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  flex: 1;
  text-align: center;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const SwapButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.backgroundSecondary};
    transform: rotate(180deg);
  }
`;

const TextAreaWrapper = styled.div`
  margin-bottom: 1rem;
`;

const TextAreaLabel = styled.label`
  display: block;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.secondary};
  margin-bottom: 0.25rem;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background: ${({ theme }) => theme.backgroundSecondary};
  color: ${({ theme }) => theme.textColor};
  font-size: 0.9rem;
  resize: none;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}33;
  }

  &::placeholder {
    color: ${({ theme }) => theme.secondary}99;
  }
`;

const TranslationActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const ActionButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.secondary};
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;

  svg {
    margin-right: ${({ hasText }) => hasText ? '0.25rem' : '0'};
  }

  &:hover {
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.primary}15;
  }

  &.active {
    animation: ${pulse} 0.3s ease-in-out;
  }
`;

const TranslateButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  margin-top: 0.5rem;
  width: 100%;

  &:hover {
    background: ${({ theme }) => theme.primaryDark || theme.primary};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

// Sample language options
const languageOptions = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ar', name: 'Arabic' }
];

const QuickTranslate = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [isTranslating, setIsTranslating] = useState(false);
  const [copyAnimation, setCopyAnimation] = useState(false);
  const widgetRef = useRef(null);

  const dispatch = useDispatch();

  // Close widget when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleWidget = () => {
    setIsExpanded(!isExpanded);
  };

  const swapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleTranslate = () => {
    if (!sourceText.trim()) return;

    setIsTranslating(true);

    // Simulate translation API call
    setTimeout(() => {
      // This is a mock translation - in a real app, you would call your translation API
      setTranslatedText(`[${targetLanguage.toUpperCase()}] ${sourceText}`);
      setIsTranslating(false);

      // Update Redux store with the translation
      dispatch(setInputText(sourceText));
    }, 500);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopyAnimation(true);
    setTimeout(() => setCopyAnimation(false), 300);
  };

  const speakText = (text, lang) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  };

  const getLanguageName = (code) => {
    const language = languageOptions.find(lang => lang.code === code);
    return language ? language.name : code;
  };

  return (
    <WidgetContainer ref={widgetRef} isExpanded={isExpanded}>
      {isExpanded ? (
        <>
          <WidgetHeader>
            <WidgetTitle>
              <FaLanguage /> Quick Translate
            </WidgetTitle>
            <WidgetControls>
              <ControlButton onClick={() => setIsExpanded(false)}>
                <FaCompress />
              </ControlButton>
              <ControlButton onClick={() => setIsExpanded(false)}>
                <FaTimes />
              </ControlButton>
            </WidgetControls>
          </WidgetHeader>

          <WidgetContent>
            <LanguageSelector>
              <LanguageButton>
                {getLanguageName(sourceLanguage)}
              </LanguageButton>
              <SwapButton onClick={swapLanguages}>
                <FaExchangeAlt />
              </SwapButton>
              <LanguageButton>
                {getLanguageName(targetLanguage)}
              </LanguageButton>
            </LanguageSelector>

            <TextAreaWrapper>
              <TextAreaLabel>Enter text</TextAreaLabel>
              <StyledTextArea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder="Type or paste text here..."
              />
              <TranslationActions>
                <ActionButton
                  onClick={() => speakText(sourceText, sourceLanguage)}
                  disabled={!sourceText}
                >
                  <FaVolumeUp />
                </ActionButton>
                <ActionButton
                  className={copyAnimation ? 'active' : ''}
                  onClick={() => copyToClipboard(sourceText)}
                  disabled={!sourceText}
                >
                  <FaCopy />
                </ActionButton>
              </TranslationActions>
            </TextAreaWrapper>

            <TextAreaWrapper>
              <TextAreaLabel>Translation</TextAreaLabel>
              <StyledTextArea
                value={translatedText}
                readOnly
                placeholder="Translation will appear here..."
              />
              <TranslationActions>
                <ActionButton
                  onClick={() => speakText(translatedText, targetLanguage)}
                  disabled={!translatedText}
                >
                  <FaVolumeUp />
                </ActionButton>
                <ActionButton
                  className={copyAnimation ? 'active' : ''}
                  onClick={() => copyToClipboard(translatedText)}
                  disabled={!translatedText}
                >
                  <FaCopy />
                </ActionButton>
              </TranslationActions>
            </TextAreaWrapper>

            <TranslateButton
              onClick={handleTranslate}
              disabled={isTranslating || !sourceText.trim()}
            >
              {isTranslating ? 'Translating...' : 'Translate'}
            </TranslateButton>
          </WidgetContent>
        </>
      ) : (
        <WidgetButton onClick={toggleWidget}>
          <FaLanguage />
        </WidgetButton>
      )}
    </WidgetContainer>
  );
};

export default QuickTranslate;
