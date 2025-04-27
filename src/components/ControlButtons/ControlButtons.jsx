import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { translateTextAsync, clearText, setStatus } from '../../store/translationSlice';
import { useSpeech } from '../../hooks/useSpeech';
import { copyToClipboard } from '../../utils/helpers';
import {
  FaLanguage,
  FaEraser,
  FaCopy,
  FaVolumeUp,
  FaMicrophone,
  FaSpinner
} from 'react-icons/fa';

const ButtonsContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${({ color, theme }) => theme[color] || theme.primary};
  color: white;
  border: none;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (max-width: 576px) {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
    flex: 1;
    min-width: 120px;
  }
`;

const ButtonRipple = styled.span`
  position: absolute;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  transform: scale(0);
  animation: ripple 0.6s linear;

  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.darkBg};
  color: ${({ theme }) => theme.lightText};
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 10;
  margin-bottom: 5px;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: ${({ theme }) => theme.darkBg} transparent transparent transparent;
  }
`;

const ButtonWithTooltip = styled(Button)`
  &:hover ${Tooltip} {
    opacity: 1;
    visibility: visible;
  }
`;

const SpinnerIcon = styled(FaSpinner)`
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const RippleButton = ({ children, onClick, ...props }) => {
  const [coords, setCoords] = React.useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = React.useState(false);

  React.useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 600);
    } else {
      setIsRippling(false);
    }
  }, [coords]);

  React.useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    if (onClick) onClick(e);
  };

  return (
    <ButtonWithTooltip {...props} onClick={handleClick}>
      {isRippling && (
        <ButtonRipple
          style={{
            left: coords.x,
            top: coords.y
          }}
        />
      )}
      {children}
    </ButtonWithTooltip>
  );
};

const ControlButtons = ({ onTranslate }) => {
  const dispatch = useDispatch();
  const {
    inputText,
    outputText,
    fromLang,
    toLang,
    isTranslating
  } = useSelector(state => state.translation);

  const { speak, listen, isSpeaking, isListening } = useSpeech();

  const handleTranslate = () => {
    if (!inputText.trim()) {
      dispatch(setStatus({
        message: 'Please enter text to translate',
        isError: true
      }));
      return;
    }

    // Use the onTranslate prop if provided, otherwise use the default implementation
    if (onTranslate) {
      onTranslate();
    } else {
      dispatch(translateTextAsync({ text: inputText, fromLang, toLang }));
    }
  };

  const handleClear = () => {
    dispatch(clearText());
  };

  const handleCopy = async () => {
    if (!outputText.trim()) {
      dispatch(setStatus({
        message: 'No text to copy',
        isError: true
      }));
      return;
    }

    const success = await copyToClipboard(outputText);
    if (success) {
      dispatch(setStatus({
        message: 'Text copied to clipboard',
        isError: false
      }));
    } else {
      dispatch(setStatus({
        message: 'Failed to copy text',
        isError: true
      }));
    }
  };

  const handleTextToSpeech = () => {
    if (!outputText.trim()) {
      dispatch(setStatus({
        message: 'No text to read',
        isError: true
      }));
      return;
    }

    // Show immediate feedback
    dispatch(setStatus({
      message: 'Reading text aloud...',
      isError: false
    }));

    // Call the speak function
    speak(outputText, toLang);
  };

  const handleSpeechToText = () => {
    listen(fromLang);
  };

  const hasInputText = inputText.trim().length > 0;
  const hasOutputText = outputText.trim().length > 0;

  return (
    <ButtonsContainer>
      {/* Text to Text Button */}
      <RippleButton
        color="primary"
        onClick={handleTranslate}
        disabled={isTranslating || !hasInputText}
        aria-label="Text to Text"
        style={{ minWidth: '140px' }}
      >
        {isTranslating ? (
          <>
            <SpinnerIcon />
            <span style={{ marginLeft: '8px' }}>Translating...</span>
          </>
        ) : (
          <>
            <FaLanguage style={{ marginRight: '8px' }} />
            <span>Text to Text</span>
          </>
        )}
        <Tooltip>Translate written text to another language</Tooltip>
      </RippleButton>

      {/* Text to Speech Button */}
      <RippleButton
        color="warning"
        onClick={handleTextToSpeech}
        disabled={isSpeaking || !hasOutputText}
        aria-label="Text to Speech"
        style={{ minWidth: '140px' }}
      >
        {isSpeaking ? (
          <>
            <SpinnerIcon />
            <span style={{ marginLeft: '8px' }}>Speaking...</span>
          </>
        ) : (
          <>
            <FaVolumeUp style={{ marginRight: '8px' }} />
            <span>Text to Speech</span>
          </>
        )}
        <Tooltip>Convert text to spoken audio</Tooltip>
      </RippleButton>

      {/* Speech to Text Button */}
      <RippleButton
        color="info"
        onClick={handleSpeechToText}
        disabled={isListening}
        aria-label="Speech to Text"
        style={{ minWidth: '140px' }}
      >
        {isListening ? (
          <>
            <SpinnerIcon />
            <span style={{ marginLeft: '8px' }}>Listening...</span>
          </>
        ) : (
          <>
            <FaMicrophone style={{ marginRight: '8px' }} />
            <span>Speech to Text</span>
          </>
        )}
        <Tooltip>Convert your speech to written text</Tooltip>
      </RippleButton>

      {/* Clear Button */}
      <RippleButton
        color="secondary"
        onClick={handleClear}
        disabled={!hasInputText && !hasOutputText}
        aria-label="Clear text"
      >
        <FaEraser style={{ marginRight: '8px' }} />
        <span>Clear</span>
        <Tooltip>Clear both text areas</Tooltip>
      </RippleButton>

      {/* Copy Button */}
      <RippleButton
        color="success"
        onClick={handleCopy}
        disabled={!hasOutputText}
        aria-label="Copy translation"
      >
        <FaCopy style={{ marginRight: '8px' }} />
        <span>Copy</span>
        <Tooltip>Copy translation to clipboard</Tooltip>
      </RippleButton>
    </ButtonsContainer>
  );
};

export default ControlButtons;
