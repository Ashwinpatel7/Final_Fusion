import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// Components
import Header from './components/Header/Header';
import HomeScreen from './components/HomeScreen/HomeScreen';
import LanguageSwitcher from './components/LanguageSwitcher/LanguageSwitcher';
import LanguageTiles from './components/LanguageTiles/LanguageTiles';
import TextArea from './components/TextArea/TextArea';
import ControlButtons from './components/ControlButtons/ControlButtons';
import Footer from './components/Footer/Footer';
import ChatBot from './components/ChatBot';
import IntroAnimation from './components/IntroAnimation';
import Help from './components/Help';
import About from './components/About';
import DocumentTranslation from './components/DocumentTranslation';
import ImageTranslation from './components/ImageTranslation';
import RecentActivity from './components/RecentActivity';
import SavedPhrases from './components/SavedPhrases';
import TranslationHistory from './components/TranslationHistory';
import QuickTranslate from './components/QuickTranslate';
import Gamification from './components/Gamification';


// Redux actions
import { setInputText, translateTextAsync } from './store/translationSlice';

// Utilities
import { getLanguageCode } from './utils/supportedLanguages';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled components
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: background-color 0.3s ease, color 0.3s ease;
  position: relative;
  overflow-x: hidden;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => `linear-gradient(135deg, ${theme.background}, ${theme.darkBg})`};
    z-index: -2;
  }

  &::after {
    content: '';
    position: fixed;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    background: ${({ theme }) => `radial-gradient(circle at 30% 30%, ${theme.primary}05, transparent 20%),
                                  radial-gradient(circle at 70% 60%, ${theme.purple}05, transparent 20%),
                                  radial-gradient(circle at 40% 80%, ${theme.info}05, transparent 20%),
                                  radial-gradient(circle at 80% 10%, ${theme.success}05, transparent 20%)`};
    z-index: -1;
    opacity: 0.5;
    will-change: transform;
    animation: ${gradientMove} 60s linear infinite;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 576px) {
    padding: 1rem;
  }
`;

const TextAreasContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  flex: 1;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const LanguageSelectionContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${({ active, theme }) => active ? theme.primaryOpacity : 'transparent'};
  color: ${({ active, theme }) => active ? theme.primary : theme.textColor};
  border: none;
  border-bottom: 2px solid ${({ active, theme }) => active ? theme.primary : 'transparent'};
  cursor: pointer;
  font-weight: ${({ active }) => active ? 'bold' : 'normal'};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primaryOpacity};
  }
`;

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '20px',
          margin: '20px',
          backgroundColor: '#ffebee',
          color: '#b71c1c',
          borderRadius: '8px',
          border: '1px solid #ef9a9a',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <h2>Something went wrong</h2>
          <p>We're sorry, but an error occurred. Please try refreshing the page.</p>
          <details>
            <summary>Error details</summary>
            <pre>{this.state.error && this.state.error.toString()}</pre>
          </details>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#b71c1c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              marginTop: '15px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Translation interface component
const TranslationInterface = () => {
  const dispatch = useDispatch();
  const {
    inputText,
    outputText,
    detectedLanguageName,
    fromLang,
    toLang
  } = useSelector(state => state.translation);

  // No longer need languageSelectionMode since we're only using dropdown view

  const handleInputChange = (e) => {
    dispatch(setInputText(e.target.value));
  };

  // Handle translation when the user clicks the translate button
  const handleTranslate = () => {
    if (inputText.trim()) {
      console.log(`Translation requested in App.jsx:
        - From: ${fromLang}
        - To: ${toLang}
        - Text: "${inputText.substring(0, 50)}${inputText.length > 50 ? '...' : ''}"`);

      // Check if we're translating to Hindi
      if (toLang === 'hi') {
        console.log('Hindi translation requested - ensuring proper API usage');
      }

      dispatch(translateTextAsync({
        text: inputText,
        fromLang,
        toLang
      }));
    }
  };

  return (
    <MainContent>
      <div style={{
        backgroundColor: 'rgba(0, 120, 212, 0.1)',
        border: '1px solid rgba(0, 120, 212, 0.3)',
        borderRadius: '8px',
        padding: '10px 15px',
        marginBottom: '20px',
        fontSize: '14px',
        color: '#0078D4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Powered by Team Final Fusion</span>
        - Advanced translation services for our college final year project
      </div>

      <LanguageSelectionContainer>
        <LanguageSwitcher />
      </LanguageSelectionContainer>

      <TextAreasContainer>
        <TextArea
          value={inputText}
          onChange={handleInputChange}
          label="Enter text to translate"
          placeholder="Type or paste text here..."
        />

        <TextArea
          value={outputText}
          onChange={() => {}}
          label="Translation"
          placeholder="Translation will appear here..."
          readOnly
          detectedLanguage={detectedLanguageName}
          languageCode={getLanguageCode(toLang)}
        />
      </TextAreasContainer>

      <ControlButtons onTranslate={handleTranslate} />

      <Gamification />
      <RecentActivity />
      <TranslationHistory />
      <SavedPhrases />
    </MainContent>
  );
};

// Main App component
function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);

  // Check if user has seen the intro before
  useEffect(() => {
    const introSeen = localStorage.getItem('introSeen');
    if (introSeen) {
      setShowIntro(false);
      setHasSeenIntro(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setHasSeenIntro(true);
    localStorage.setItem('introSeen', 'true');
  };

  return (
    <ErrorBoundary>
      {showIntro && !hasSeenIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      <Router>
        <AppContainer>
          <Header />

          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/translate" element={<TranslationInterface />} />
            <Route path="/translate/:mode" element={<TranslationInterface />} />
            <Route path="/document" element={<DocumentTranslation />} />
            <Route path="/image" element={<ImageTranslation />} />
            <Route path="/help" element={<Help />} />
            <Route path="/about" element={<About />} />
            <Route path="/achievements" element={<Gamification />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <Footer />
          <ChatBot />
          <QuickTranslate />
        </AppContainer>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
