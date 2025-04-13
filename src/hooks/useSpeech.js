import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { textToSpeech, speechToText } from '../utils/helpers';
import { setStatus, setInputText } from '../store/translationSlice';
import { LANGUAGE_CODES } from '../utils/constants';

/**
 * Custom hook for speech functionality
 * @returns {Object} - Speech functions and state
 */
export const useSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const dispatch = useDispatch();

  /**
   * Convert text to speech
   * @param {string} text - Text to speak
   * @param {string} language - Language code or name
   */
  const speak = useCallback(async (text, language) => {
    if (!text.trim()) {
      dispatch(setStatus({ 
        message: 'No text to read', 
        isError: true 
      }));
      return;
    }

    setIsSpeaking(true);
    dispatch(setStatus({ 
      message: 'Reading text aloud...', 
      isError: false 
    }));

    try {
      const langCode = LANGUAGE_CODES[language] || language;
      await textToSpeech(text, langCode);
      dispatch(setStatus({ 
        message: 'Text read successfully', 
        isError: false 
      }));
    } catch (err) {
      dispatch(setStatus({ 
        message: `Speech synthesis error: ${err.message}`, 
        isError: true 
      }));
    } finally {
      setIsSpeaking(false);
    }
  }, [dispatch]);

  /**
   * Convert speech to text
   * @param {string} language - Language code or name
   */
  const listen = useCallback(async (language) => {
    setIsListening(true);
    dispatch(setStatus({ 
      message: 'Listening... Speak now', 
      isError: false 
    }));

    try {
      const langCode = language === 'Auto Detect' ? 'en-US' : LANGUAGE_CODES[language] || language;
      const transcript = await speechToText(langCode);
      
      if (transcript) {
        dispatch(setInputText(transcript));
        dispatch(setStatus({ 
          message: 'Speech recognized', 
          isError: false 
        }));
      }
    } catch (err) {
      dispatch(setStatus({ 
        message: `Speech recognition error: ${err.message}`, 
        isError: true 
      }));
    } finally {
      setIsListening(false);
    }
  }, [dispatch]);

  return {
    speak,
    listen,
    isSpeaking,
    isListening
  };
};
