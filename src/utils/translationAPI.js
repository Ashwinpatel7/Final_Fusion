/**
 * This file contains functions for integrating with professional translation APIs
 * Primarily focused on Microsoft Azure Translator API
 */

import { getLanguageCode } from './supportedLanguages';

// Options for translation APIs - We only use Microsoft Azure
const TRANSLATION_APIS = {
  MICROSOFT: 'microsoft',
  MICROSOFT_DOCUMENT: 'microsoft_document'
};

// Always use Microsoft Azure Translator
let currentAPI = TRANSLATION_APIS.MICROSOFT;

/**
 * Set which translation API to use
 * @param {string} apiName - Name of the API to use
 */
export const setTranslationAPI = (apiName) => {
  if (Object.values(TRANSLATION_APIS).includes(apiName)) {
    currentAPI = apiName;
    return true;
  }
  return false;
};

/**
 * Get the current translation API being used
 * @returns {string} - Name of the current API
 */
export const getCurrentAPI = () => currentAPI;

/**
 * Translate text using Google Translate API
 * @param {string} text - Text to translate
 * @param {string} sourceLang - Source language code
 * @param {string} targetLang - Target language code
 * @returns {Promise<Object>} - Translation result
 */
const googleTranslate = async (text, sourceLang, targetLang) => {
  try {
    // Replace this with your actual Google Translate API key
    const apiKey = process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY;

    if (!apiKey) {
      console.warn('Google Translate API key not found. Using mock translation instead.');
      return null; // Will fall back to mock translation
    }

    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: sourceLang === 'auto' ? undefined : sourceLang,
        target: targetLang,
        format: 'text'
      })
    });

    if (!response.ok) {
      throw new Error(`Google Translate API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.data && data.data.translations && data.data.translations.length > 0) {
      return {
        text: data.data.translations[0].translatedText,
        source: data.data.translations[0].detectedSourceLanguage || sourceLang
      };
    }

    throw new Error('Invalid response from Google Translate API');
  } catch (error) {
    console.error('Google Translate error:', error);
    return null; // Will fall back to mock translation
  }
};

/**
 * Translate text using Microsoft Translator API
 * @param {string} text - Text to translate
 * @param {string} sourceLang - Source language code
 * @param {string} targetLang - Target language code
 * @returns {Promise<Object>} - Translation result
 */
const microsoftTranslate = async (text, sourceLang, targetLang) => {
  try {
    // Use hardcoded API key for reliability
    const apiKey = '7FhbJs1gThyPzdpsFLBc0umBoS4sJviBbBNLlyjWQXIBCVTmQlZhJQQJ99BDACGhslBXJ3w3AAAbACOGq4CN';
    const region = 'centralindia'; // Updated region as specified
    const endpoint = 'https://api.cognitive.microsofttranslator.com/';
    const url = `${endpoint}translate`;

    console.log('Microsoft Translator API key available:', !!apiKey);
    console.log('Microsoft Translator region:', region);
    console.log('Microsoft Translator endpoint:', endpoint);

    // Ensure we're using the correct language codes for Microsoft Translator
    // For auto-detect, we need to leave the 'from' parameter empty
    const sourceCode = sourceLang === 'auto' ? '' : sourceLang;
    const targetCode = targetLang;

    console.log(`Using raw language codes: source=${sourceCode || 'auto-detect'}, target=${targetCode}`);
    console.log(`Text to translate: "${text}"`);

    // Construct the URL properly - this is critical
    // For auto-detect, we omit the 'from' parameter entirely
    let apiUrl;
    if (sourceLang === 'auto') {
      apiUrl = `${url}?api-version=3.0&to=${targetCode}`;
    } else {
      apiUrl = `${url}?api-version=3.0&from=${sourceCode}&to=${targetCode}`;
    }

    console.log(`Final API URL: ${apiUrl}`);

    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': apiKey,
        'Ocp-Apim-Subscription-Region': region,
        'Accept': 'application/json'
      },
      body: JSON.stringify([{
        text: text
      }])
    });

    // Check if the response is OK
    if (!response.ok) {
      let errorText = '';
      try {
        errorText = await response.text();
      } catch (e) {
        errorText = 'Could not read error response';
      }
      console.error(`Microsoft Translator API error: Status ${response.status}, Response: ${errorText}`);

      // For Hindi specifically, try a fallback approach
      if (targetCode === 'hi') {
        console.log('Attempting fallback for Hindi translation...');
        return {
          text: await fallbackTranslation(text, targetCode),
          source: sourceCode || 'en'
        };
      }

      throw new Error(`Translation API error: ${response.status} - ${errorText}`);
    }

    // Parse the response
    const data = await response.json();
    console.log('Translation API response:', JSON.stringify(data, null, 2));

    // Extract the translated text
    if (data && data.length > 0 && data[0].translations && data[0].translations.length > 0) {
      const translatedText = data[0].translations[0].text;
      console.log(`Successfully translated to: "${translatedText}"`);

      // Create the result object
      const result = {
        text: translatedText,
        source: data[0].detectedLanguage ? data[0].detectedLanguage.language : sourceLang
      };

      return result;
    }

    throw new Error('Invalid response from translation API');
  } catch (error) {
    console.error('Translation error:', error);

    // Return a simple fallback translation to prevent the app from breaking
    return {
      text: text + ' (Translation failed, please try again)',
      source: sourceLang,
      error: true
    };
  }
};

// Fallback translation function for when the API fails
const fallbackTranslation = async (text, targetLang) => {
  // This is a very simple fallback that just returns the original text
  // with a note that it's a fallback translation
  console.log('Using fallback translation');

  // For Hindi specifically, we can add some common phrases
  if (targetLang === 'hi') {
    const commonPhrases = {
      'hello': 'नमस्ते',
      'how are you': 'आप कैसे हैं',
      'thank you': 'धन्यवाद',
      'goodbye': 'अलविदा',
      'yes': 'हां',
      'no': 'नहीं',
      'please': 'कृपया',
      'sorry': 'माफ़ करें',
      'good morning': 'सुप्रभात',
      'good night': 'शुभ रात्रि'
    };

    // Check if the text matches any common phrase
    const lowerText = text.toLowerCase();
    for (const [phrase, translation] of Object.entries(commonPhrases)) {
      if (lowerText.includes(phrase)) {
        return lowerText.replace(phrase, translation);
      }
    }
  }

  return text + ' (Fallback translation)';
};

/**
 * Translate text using DeepL API
 * @param {string} text - Text to translate
 * @param {string} sourceLang - Source language code
 * @param {string} targetLang - Target language code
 * @returns {Promise<Object>} - Translation result
 */
const deeplTranslate = async (text, sourceLang, targetLang) => {
  try {
    // Use Vite environment variables for the DeepL API
    const apiKey = import.meta.env.VITE_DEEPL_API_KEY;

    if (!apiKey) {
      console.warn('DeepL API key not found. Using mock translation instead.');
      return null; // Will fall back to mock translation
    }

    // DeepL uses different language codes, so we need to convert them
    const deeplSourceLang = convertToDeepLCode(sourceLang);
    const deeplTargetLang = convertToDeepLCode(targetLang);

    const url = 'https://api-free.deepl.com/v2/translate';

    const formData = new URLSearchParams();
    formData.append('auth_key', apiKey);
    formData.append('text', text);
    formData.append('target_lang', deeplTargetLang);

    if (sourceLang !== 'auto') {
      formData.append('source_lang', deeplSourceLang);
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`DeepL API error: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.translations && data.translations.length > 0) {
      return {
        text: data.translations[0].text,
        source: data.translations[0].detected_source_language ?
                convertFromDeepLCode(data.translations[0].detected_source_language) :
                sourceLang
      };
    }

    throw new Error('Invalid response from DeepL API');
  } catch (error) {
    console.error('DeepL error:', error);
    return null; // Will fall back to mock translation
  }
};

/**
 * Convert standard language code to DeepL format
 * @param {string} code - Standard language code
 * @returns {string} - DeepL language code
 */
const convertToDeepLCode = (code) => {
  const mapping = {
    'en': 'EN-US',
    'zh-cn': 'ZH',
    'pt': 'PT-PT',
    // Add more mappings as needed
  };

  return mapping[code] || code.toUpperCase();
};

/**
 * Convert DeepL language code to standard format
 * @param {string} code - DeepL language code
 * @returns {string} - Standard language code
 */
const convertFromDeepLCode = (code) => {
  const mapping = {
    'EN-US': 'en',
    'ZH': 'zh-cn',
    'PT-PT': 'pt',
    // Add more mappings as needed
  };

  return mapping[code] || code.toLowerCase();
};

/**
 * Translate text using the selected translation API
 * @param {string} text - Text to translate
 * @param {string} sourceLang - Source language code
 * @param {string} targetLang - Target language code
 * @returns {Promise<Object>} - Translation result or null if all APIs fail
 */
export const translateWithAPI = async (text, sourceLang, targetLang) => {
  try {
    // Always use Microsoft Azure Translator
    console.log('Using Microsoft Azure Translator for translation');
    console.log(`Text to translate: "${text}"`);
    console.log(`Source language: ${sourceLang}, Target language: ${targetLang}`);

    // Call the Microsoft Translator API
    const result = await microsoftTranslate(text, sourceLang, targetLang);

    // Return the result
    return result;
  } catch (error) {
    console.error('Translation API error:', error);

    // Instead of propagating the error, return a fallback result
    // This ensures the UI doesn't break even if the API fails
    return {
      text: text + ' (Translation service unavailable, please try again later)',
      source: sourceLang,
      error: true
    };
  }
};

/**
 * Translate a document using Microsoft Document Translator
 * @param {File} file - The document file to translate
 * @param {string} sourceLang - Source language code
 * @param {string} targetLang - Target language code
 * @returns {Promise<Object>} - Translation result with download URL
 */
export const translateDocument = async (file, sourceLang, targetLang) => {
  try {
    console.log('Using Microsoft Azure Document Translator for document translation');
    const apiKey = '7FhbJs1gThyPzdpsFLBc0umBoS4sJviBbBNLlyjWQXIBCVTmQlZhJQQJ99BDACGhslBXJ3w3AAAbACOGq4CN';
    const endpoint = 'https://finalfusion.cognitiveservices.azure.com/'; // Hardcoded document translation endpoint
    const region = 'centralindia';

    if (!apiKey) {
      console.warn('Microsoft Translator API key not found. Cannot translate document.');
      throw new Error('API key not found');
    }

    // First, we need to upload the document to Azure Blob Storage
    // This is a simplified example - in a real application, you would need to:
    // 1. Get a SAS URL from your backend
    // 2. Upload the file to Azure Blob Storage
    // 3. Start a translation operation
    // 4. Poll for completion
    // 5. Get the translated document URL

    // For this demo, we'll simulate the process with a mock implementation
    console.log(`Document translation requested for file: ${file.name}`);
    console.log(`Source language: ${sourceLang}, Target language: ${targetLang}`);
    console.log('Using endpoint:', endpoint);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Return a mock result
    return {
      success: true,
      message: 'Document translation is not fully implemented in this demo.',
      fileName: file.name,
      sourceLanguage: sourceLang,
      targetLanguage: targetLang,
      // In a real implementation, this would be a download URL
      downloadUrl: null
    };
  } catch (error) {
    console.error('Document translation error:', error);
    throw error;
  }
};

/**
 * Translate an image with text using OCR and translation
 * @param {File} imageFile - The image file containing text to translate
 * @param {string} sourceLang - Source language code
 * @param {string} targetLang - Target language code
 * @returns {Promise<Object>} - Translation result
 */
export const translateImage = async (imageFile, sourceLang, targetLang) => {
  try {
    console.log('Using Microsoft Azure Computer Vision and Translator for image translation');
    const apiKey = '7FhbJs1gThyPzdpsFLBc0umBoS4sJviBbBNLlyjWQXIBCVTmQlZhJQQJ99BDACGhslBXJ3w3AAAbACOGq4CN';
    const region = 'centralindia';
    const endpoint = 'https://api.cognitive.microsofttranslator.com/';

    console.log('Using API key:', apiKey ? 'Available' : 'Not available');
    console.log('Using region:', region);
    console.log('Using endpoint:', endpoint);

    if (!apiKey) {
      console.warn('Microsoft Translator API key not found. Cannot translate image.');
      throw new Error('API key not found');
    }

    // In a real implementation, you would:
    // 1. Use Computer Vision API to extract text from the image (OCR)
    // 2. Translate the extracted text
    // 3. Return the translated text

    // For this demo, we'll simulate the process
    console.log(`Image translation requested for file: ${imageFile.name}`);
    console.log(`Source language: ${sourceLang}, Target language: ${targetLang}`);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Return a mock result
    return {
      success: true,
      message: 'Image text extraction and translation is not fully implemented in this demo.',
      fileName: imageFile.name,
      sourceLanguage: sourceLang,
      targetLanguage: targetLang,
      extractedText: 'Sample text extracted from image',
      translatedText: 'Sample translated text'
    };
  } catch (error) {
    console.error('Image translation error:', error);
    throw error;
  }
};

// Export the API options for use in settings
export { TRANSLATION_APIS };
