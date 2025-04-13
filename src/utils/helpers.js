import { LANGUAGE_CODES } from './constants';

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} - Success status
 */
export const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand('copy');
      textArea.remove();
      return success;
    }
  } catch (error) {
    console.error('Failed to copy text: ', error);
    return false;
  }
};

/**
 * Text to speech using Web Speech API
 * @param {string} text - Text to speak
 * @param {string} language - Language code or name
 * @returns {Promise<void>}
 */
export const textToSpeech = (text, language) => {
  return new Promise((resolve, reject) => {
    if (!window.speechSynthesis) {
      reject(new Error('Speech synthesis not supported in this browser'));
      return;
    }

    // Get language code if language name is provided
    const langCode = LANGUAGE_CODES[language] || language;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode;
    utterance.onend = () => resolve();
    utterance.onerror = (error) => reject(error);
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Speak the text
    window.speechSynthesis.speak(utterance);
  });
};

/**
 * Speech to text using Web Speech API
 * @param {string} language - Language code or name
 * @returns {Promise<string>} - Recognized text
 */
export const speechToText = (language = 'en-US') => {
  return new Promise((resolve, reject) => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      reject(new Error('Speech recognition not supported in this browser'));
      return;
    }

    // Get language code if language name is provided
    const langCode = LANGUAGE_CODES[language] || language;
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = langCode;
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      resolve(transcript);
    };
    
    recognition.onerror = (event) => {
      reject(new Error(`Speech recognition error: ${event.error}`));
    };
    
    recognition.start();
    
    // Set a timeout to stop listening after a certain period
    setTimeout(() => {
      if (recognition) {
        recognition.stop();
      }
    }, 10000); // 10 seconds timeout
  });
};

/**
 * Debounce function to limit the rate at which a function can fire
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Get language name from language code
 * @param {string} code - Language code
 * @returns {string|null} - Language name or null if not found
 */
export const getLanguageNameFromCode = (code) => {
  if (!code) return null;
  
  const entry = Object.entries(LANGUAGE_CODES).find(([_, langCode]) => langCode === code);
  return entry ? entry[0] : null;
};
