import React, { useState } from 'react';
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

// Redux actions
import { setInputText } from './store/translationSlice';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Styled components
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: background-color 0.3s ease, color 0.3s ease;
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
    detectedLanguageName
  } = useSelector(state => state.translation);

  const [languageSelectionMode, setLanguageSelectionMode] = useState('tiles');

  const handleInputChange = (e) => {
    dispatch(setInputText(e.target.value));
  };

  return (
    <MainContent>
      <LanguageSelectionContainer>
        <TabsContainer>
          <Tab
            active={languageSelectionMode === 'tiles'}
            onClick={() => setLanguageSelectionMode('tiles')}
          >
            Tile View
          </Tab>
          <Tab
            active={languageSelectionMode === 'dropdown'}
            onClick={() => setLanguageSelectionMode('dropdown')}
          >
            Dropdown View
          </Tab>
        </TabsContainer>

        {languageSelectionMode === 'tiles' ? (
          <div>
            <LanguageTiles forSource={true} />
            <LanguageTiles forSource={false} />
          </div>
        ) : (
          <LanguageSwitcher />
        )}
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
        />
      </TextAreasContainer>

      <ControlButtons />
    </MainContent>
  );
};

// Main App component
function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AppContainer>
          <Header />

          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/translate" element={<TranslationInterface />} />
            <Route path="/translate/:mode" element={<TranslationInterface />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <Footer />
        </AppContainer>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
