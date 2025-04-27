import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { textToSpeech, speechToText } from '../utils/helpers';
import { setStatus, setInputText } from '../store/translationSlice';
import { LANGUAGE_CODES } from '../utils/constants';
import { getLanguageCode } from '../utils/supportedLanguages';

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
      console.log(`Speaking text in language: ${language}`);

      // Show immediate feedback to the user
      dispatch(setStatus({
        message: `Reading text aloud in ${language}...`,
        isError: false
      }));

      // Special handling for languages that might need extra support
      if (language === 'Bhojpuri' || language === 'Kannada' ||
          language === 'Tamil' || language === 'Telugu' ||
          language === 'Malayalam' || language === 'Gujarati' ||
          language === 'Marathi' || language === 'Bengali' ||
          language === 'Punjabi' || language === 'Odia') {
        console.log(`Special handling for ${language} text-to-speech`);
      }

      // Call the improved textToSpeech function
      await textToSpeech(text, language);

      // Update status when speech is complete
      dispatch(setStatus({
        message: `Text successfully read aloud in ${language}`,
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
      // Get the language code
      // For Auto Detect, we'll use the browser's default language
      // Otherwise, use the selected language
      const langCode = language === 'Auto Detect'
        ? navigator.language || 'en-US'
        : getLanguageCode(language) || LANGUAGE_CODES[language] || language;

      console.log(`Listening for speech in language: ${language} (code: ${langCode})`);

      // Show immediate feedback
      dispatch(setStatus({
        message: `Listening for ${language} speech...`,
        isError: false
      }));

      // Call the speech recognition function
      const transcript = await speechToText(langCode);

      if (transcript) {
        // Update the input text with the recognized speech
        dispatch(setInputText(transcript));

        // Update the status
        dispatch(setStatus({
          message: 'Speech recognized successfully',
          isError: false
        }));

        // Return the transcript for further processing
        return transcript;
      } else {
        // If no speech was recognized
        dispatch(setStatus({
          message: 'No speech detected. Please try again.',
          isError: true
        }));
        return '';
      }
    } catch (err) {
      console.error('Speech recognition error:', err);

      // Show a user-friendly error message
      dispatch(setStatus({
        message: `Speech recognition error: ${err.message}`,
        isError: true
      }));
      return '';
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
