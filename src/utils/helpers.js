import { LANGUAGE_CODES } from './constants';
import { getLanguageCode } from './supportedLanguages';

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
    console.log(`Starting text-to-speech for language: ${language}`);

    // Check if the browser supports speech synthesis
    if (!window.speechSynthesis) {
      console.warn('Speech synthesis not supported in this browser, using fallback');
      // Use a fallback mechanism - resolve after a short delay to simulate speech
      setTimeout(() => {
        console.log('Fallback speech synthesis completed');
        resolve();
      }, 2000);
      return;
    }

    // Always cancel any ongoing speech first
    window.speechSynthesis.cancel();

    // Get language code if language name is provided
    // First try the new supported languages, then fall back to the old mapping
    const rawLangCode = getLanguageCode(language) || LANGUAGE_CODES[language] || language || 'en';

    // For some languages, we need to use a specific format
    let langCode = rawLangCode;

    // Special handling for languages that need specific formats
    if (rawLangCode === 'hi') langCode = 'hi-IN';
    if (rawLangCode === 'kn') langCode = 'kn-IN'; // Kannada
    if (rawLangCode === 'bho') langCode = 'hi-IN'; // Use Hindi for Bhojpuri as fallback
    if (rawLangCode === 'gu') langCode = 'gu-IN'; // Gujarati
    if (rawLangCode === 'ta') langCode = 'ta-IN'; // Tamil
    if (rawLangCode === 'te') langCode = 'te-IN'; // Telugu
    if (rawLangCode === 'ml') langCode = 'ml-IN'; // Malayalam
    if (rawLangCode === 'mr') langCode = 'mr-IN'; // Marathi
    if (rawLangCode === 'bn') langCode = 'bn-IN'; // Bengali
    if (rawLangCode === 'pa') langCode = 'pa-IN'; // Punjabi
    if (rawLangCode === 'or') langCode = 'or-IN'; // Odia

    console.log(`Text-to-speech requested:
      - Language: ${language}
      - Raw language code: ${rawLangCode}
      - Adjusted language code: ${langCode}
      - Text length: ${text.length} characters`);

    // Create a new utterance
    const utterance = new SpeechSynthesisUtterance();

    // Set the language
    utterance.lang = langCode;

    // Set the text
    utterance.text = text;

    // Set up event handlers with proper error handling
    let hasResolved = false;

    utterance.onend = () => {
      if (!hasResolved) {
        hasResolved = true;
        clearTimeout(timeoutId);
        console.log('Speech synthesis finished successfully');
        resolve();
      }
    };

    utterance.onerror = (error) => {
      if (!hasResolved) {
        hasResolved = true;
        clearTimeout(timeoutId);
        console.error('Speech synthesis error:', error);

        // Try again with English voice as fallback
        if (langCode !== 'en-US') {
          console.log('Trying fallback to English voice...');
          textToSpeech(text, 'en-US')
            .then(resolve)
            .catch(() => resolve()); // Resolve anyway to prevent UI from getting stuck
        } else {
          resolve(); // Resolve anyway to prevent UI from getting stuck
        }
      }
    };

    // Set a timeout to resolve the promise even if onend doesn't fire
    // This prevents the UI from getting stuck in a loading state
    const timeoutId = setTimeout(() => {
      if (!hasResolved) {
        hasResolved = true;
        console.log('Speech synthesis timed out, resolving anyway');
        resolve();
      }
    }, 10000); // 10 second timeout

    // Get available voices
    let voices = window.speechSynthesis.getVoices();

    // Function to start speaking with the best available voice
    const startSpeaking = () => {
      // Find the best voice for this language
      let selectedVoice = null;

      // Try to find an exact match for the language code
      selectedVoice = voices.find(v => v.lang.toLowerCase() === langCode.toLowerCase());

      // If no exact match, try to find a voice that starts with the language code
      if (!selectedVoice) {
        const langPrefix = langCode.split('-')[0].toLowerCase();
        selectedVoice = voices.find(v => v.lang.toLowerCase().startsWith(langPrefix));
      }

      // If still no match, try to find any voice
      if (!selectedVoice && voices.length > 0) {
        // Try to find a default voice
        selectedVoice = voices.find(v => v.default === true);

        // If no default voice, use the first available voice
        if (!selectedVoice) {
          selectedVoice = voices[0];
        }
      }

      // If we found a voice, use it
      if (selectedVoice) {
        utterance.voice = selectedVoice;
        console.log(`Using voice: ${selectedVoice.name} (${selectedVoice.lang})`);
      } else {
        console.log('No specific voice found, using browser default');
      }

      // Set pitch and rate for better quality
      utterance.pitch = 1;
      utterance.rate = 0.9; // Slightly slower for better clarity

      // Special handling for Indian languages
      if (['hi-IN', 'kn-IN', 'gu-IN', 'ta-IN', 'te-IN', 'ml-IN', 'mr-IN', 'bn-IN', 'pa-IN', 'or-IN'].includes(langCode)) {
        utterance.rate = 0.8; // Even slower for Indian languages
        utterance.pitch = 1.1; // Slightly higher pitch
      }

      // Speak the text
      console.log('Starting speech synthesis...');
      try {
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        console.error('Error starting speech synthesis:', error);
        if (!hasResolved) {
          hasResolved = true;
          clearTimeout(timeoutId);
          resolve(); // Resolve anyway to prevent UI from getting stuck
        }
      }
    };

    // If no voices are available, try to load them
    if (!voices || voices.length === 0) {
      console.log('No voices available, trying to load them');

      // Set a timeout to ensure we don't wait forever
      const voiceTimeout = setTimeout(() => {
        console.log('Voice loading timed out, proceeding with default voice');
        startSpeaking();
      }, 1000);

      // Try to load voices
      window.speechSynthesis.onvoiceschanged = () => {
        clearTimeout(voiceTimeout);
        voices = window.speechSynthesis.getVoices();
        startSpeaking();
      };
    } else {
      // Voices are already available, start speaking
      startSpeaking();
    }
  });
};

// The findBestVoice function has been integrated directly into the textToSpeech function

// The setVoiceForLanguage function has been replaced by the findBestVoice function above

/**
 * Speech to text using Web Speech API
 * @param {string} language - Language code or name
 * @returns {Promise<string>} - Recognized text
 */
export const speechToText = (language = 'en-US') => {
  return new Promise((resolve, reject) => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      console.warn('Speech recognition not supported in this browser, using fallback');
      // Use a fallback mechanism - resolve after a short delay to simulate speech recognition
      setTimeout(() => {
        resolve('Speech recognition not supported in this browser. Please type your text instead.');
      }, 1000);
      return;
    }

    // Get language code if language name is provided
    // First try the new supported languages, then fall back to the old mapping
    // If no language code is found, default to 'en-US' to ensure it always works
    const langCode = getLanguageCode(language) || LANGUAGE_CODES[language] || language || 'en-US';

    console.log(`Speech recognition requested:
      - Language: ${language}
      - Language code: ${langCode}`);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    // Configure recognition settings
    recognition.lang = langCode;
    recognition.continuous = true; // Allow for longer speech input
    recognition.interimResults = true; // Get interim results for better feedback
    recognition.maxAlternatives = 3; // Get multiple alternatives for better accuracy

    let finalTranscript = '';
    let recognitionTimeout;

    recognition.onresult = (event) => {
      let interimTranscript = '';

      // Process all results
      for (let i = event.resultIndex; i < event.results.length; i++) {
        // Get the most confident transcript
        const transcript = event.results[i][0].transcript;
        const confidence = event.results[i][0].confidence;

        console.log(`Recognition result: "${transcript}" (confidence: ${confidence.toFixed(2)})`);

        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
          console.log(`Final transcript updated: "${finalTranscript}"`);
        } else {
          interimTranscript += transcript;
        }
      }

      // If we have a final transcript, update the timeout
      if (finalTranscript) {
        // Reset the timeout each time we get a result
        clearTimeout(recognitionTimeout);
        recognitionTimeout = setTimeout(() => {
          console.log('Recognition completed due to timeout after results');
          recognition.stop();
        }, 3000); // Stop after 3 seconds of silence after getting results
      }
    };

    recognition.onerror = (event) => {
      console.error(`Speech recognition error: ${event.error}`);

      // Don't reject for 'no-speech' or 'aborted' errors
      if (event.error === 'no-speech') {
        resolve(''); // Return empty string for no speech
      } else if (event.error === 'not-allowed') {
        reject(new Error('Microphone access denied. Please allow microphone access and try again.'));
      } else if (event.error === 'language-not-supported') {
        // If the language is not supported, try with English
        console.warn(`Language ${langCode} not supported, falling back to English`);
        resolve(speechToText('en-US'));
      } else if (event.error !== 'aborted') {
        reject(new Error(`Speech recognition error: ${event.error}`));
      }
    };

    recognition.onend = () => {
      clearTimeout(recognitionTimeout);

      console.log(`Recognition ended with transcript: "${finalTranscript}"`);

      // If we have a transcript when recognition ends, resolve with it
      if (finalTranscript.trim()) {
        resolve(finalTranscript.trim());
      } else {
        // If no final transcript, resolve with empty string
        resolve('');
      }
    };

    // Set a timeout to stop listening after a certain period
    recognitionTimeout = setTimeout(() => {
      console.log('Recognition timeout reached');
      recognition.stop();
    }, 10000); // 10 seconds timeout for speech input

    // Start recognition
    try {
      console.log('Starting speech recognition...');
      recognition.start();
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      reject(error);
    }
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
