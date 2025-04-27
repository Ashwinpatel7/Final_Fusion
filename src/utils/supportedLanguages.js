/**
 * This file contains the list of languages fully supported by Microsoft Azure Translator
 * Based on the official documentation: https://learn.microsoft.com/en-us/azure/ai-services/translator/language-support
 *
 * Last updated: 2023
 * Only includes languages that are fully supported by Microsoft Azure Translator for text translation
 */

import { NATIVE_LANGUAGE_NAMES, getNativeLanguageName } from './nativeLanguageNames';

// Languages fully supported by Microsoft Azure Translator for text translation
// This list is specifically curated for Microsoft Azure Translator and only includes languages
// that are fully supported for text translation by the Microsoft Azure Translator service
export const SUPPORTED_LANGUAGES = {
  'Afrikaans': 'af',
  'Albanian': 'sq',
  'Amharic': 'am',
  'Arabic': 'ar',
  'Armenian': 'hy',
  'Assamese': 'as',
  'Azerbaijani': 'az',
  'Bangla': 'bn',
  'Bashkir': 'ba',
  'Basque': 'eu',
  'Bhojpuri': 'bho',
  'Bodo': 'brx',
  'Bosnian': 'bs',
  'Bulgarian': 'bg',
  'Cantonese (Traditional)': 'yue',
  'Catalan': 'ca',
  'Chinese (Literary)': 'lzh',
  'Chinese (Simplified)': 'zh-Hans',
  'Chinese (Traditional)': 'zh-Hant',
  'Croatian': 'hr',
  'Czech': 'cs',
  'Danish': 'da',
  'Dari': 'prs',
  'Divehi': 'dv',
  'Dogri': 'doi',
  'Dutch': 'nl',
  'English': 'en',
  'Estonian': 'et',
  'Faroese': 'fo',
  'Fijian': 'fj',
  'Filipino': 'fil',
  'Finnish': 'fi',
  'French': 'fr',
  'French (Canada)': 'fr-ca',
  'Galician': 'gl',
  'Georgian': 'ka',
  'German': 'de',
  'Greek': 'el',
  'Gujarati': 'gu',
  'Haitian Creole': 'ht',
  'Hausa': 'ha',
  'Hebrew': 'he',
  'Hindi': 'hi',
  'Hmong Daw': 'mww',
  'Hungarian': 'hu',
  'Icelandic': 'is',
  'Igbo': 'ig',
  'Indonesian': 'id',
  'Inuinnaqtun': 'ikt',
  'Inuktitut': 'iu',
  'Inuktitut (Latin)': 'iu-Latn',
  'Irish': 'ga',
  'Italian': 'it',
  'Japanese': 'ja',
  'Kannada': 'kn',
  'Kashmiri': 'ks',
  'Kazakh': 'kk',
  'Khmer': 'km',
  'Kinyarwanda': 'rw',
  'Konkani': 'gom',
  'Korean': 'ko',
  'Kurdish (Central)': 'ku',
  'Kurdish (Northern)': 'kmr',
  'Kyrgyz': 'ky',
  'Lao': 'lo',
  'Latvian': 'lv',
  'Lithuanian': 'lt',
  'Lingala': 'ln',
  'Lower Sorbian': 'dsb',
  'Luganda': 'lug',
  'Macedonian': 'mk',
  'Maithili': 'mai',
  'Malagasy': 'mg',
  'Malay': 'ms',
  'Malayalam': 'ml',
  'Maltese': 'mt',
  'Maori': 'mi',
  'Marathi': 'mr',
  'Mongolian (Cyrillic)': 'mn-Cyrl',
  'Mongolian (Traditional)': 'mn-Mong',
  'Myanmar': 'my',
  'Nepali': 'ne',
  'Norwegian': 'nb',
  'Nyanja': 'nya',
  'Odia': 'or',
  'Pashto': 'ps',
  'Persian': 'fa',
  'Polish': 'pl',
  'Portuguese (Brazil)': 'pt',
  'Portuguese (Portugal)': 'pt-pt',
  'Punjabi': 'pa',
  'Queretaro Otomi': 'otq',
  'Romanian': 'ro',
  'Rundi': 'run',
  'Russian': 'ru',
  'Samoan': 'sm',
  'Serbian (Cyrillic)': 'sr-Cyrl',
  'Serbian (Latin)': 'sr-Latn',
  'Sesotho': 'st',
  'Sesotho sa Leboa': 'nso',
  'Setswana': 'tn',
  'Sindhi': 'sd',
  'Sinhala': 'si',
  'Slovak': 'sk',
  'Slovenian': 'sl',
  'Somali': 'so',
  'Spanish': 'es',
  'Swahili': 'sw',
  'Swedish': 'sv',
  'Tahitian': 'ty',
  'Tamil': 'ta',
  'Tatar': 'tt',
  'Telugu': 'te',
  'Thai': 'th',
  'Tibetan': 'bo',
  'Tigrinya': 'ti',
  'Tongan': 'to',
  'Turkish': 'tr',
  'Turkmen': 'tk',
  'Ukrainian': 'uk',
  'Upper Sorbian': 'hsb',
  'Urdu': 'ur',
  'Uyghur': 'ug',
  'Uzbek': 'uz',
  'Vietnamese': 'vi',
  'Welsh': 'cy',
  'Xhosa': 'xh',
  'Yoruba': 'yo',
  'Yucatec Maya': 'yua',
  'Zulu': 'zu'
};

// List of language names for dropdown
export const SUPPORTED_LANGUAGE_NAMES = Object.keys(SUPPORTED_LANGUAGES);

// Auto detect option
export const AUTO_DETECT = 'Auto Detect';

// Add auto detect to the list of source languages
export const SOURCE_LANGUAGES = [AUTO_DETECT, ...SUPPORTED_LANGUAGE_NAMES];

// Target languages (all supported languages without auto detect)
export const TARGET_LANGUAGES = SUPPORTED_LANGUAGE_NAMES;

// Native language names for display
export const NATIVE_SOURCE_LANGUAGES = [AUTO_DETECT, ...SUPPORTED_LANGUAGE_NAMES.map(lang => getNativeLanguageName(lang))];
export const NATIVE_TARGET_LANGUAGES = SUPPORTED_LANGUAGE_NAMES.map(lang => getNativeLanguageName(lang));

// Get language code from language name
export const getLanguageCode = (languageName) => {
  if (languageName === AUTO_DETECT) return 'auto';
  return SUPPORTED_LANGUAGES[languageName] || null;
};

// Get language name from language code
export const getLanguageName = (languageCode) => {
  if (languageCode === 'auto') return AUTO_DETECT;

  for (const [name, code] of Object.entries(SUPPORTED_LANGUAGES)) {
    if (code === languageCode) {
      return name;
    }
  }

  return null;
};

// Get native language name from English name
// Now includes English name in brackets for better understanding
export const getNativeNameFromEnglish = (englishName) => {
  if (englishName === AUTO_DETECT) return AUTO_DETECT;

  const nativeName = getNativeLanguageName(englishName);

  // If the native name is different from the English name, add the English name in brackets
  if (nativeName !== englishName) {
    return `${nativeName} (${englishName})`;
  }

  return nativeName;
};

// Get English language name from native name
export const getEnglishNameFromNative = (nativeName) => {
  if (nativeName === AUTO_DETECT) return AUTO_DETECT;

  // Find the English name by looking up the native name
  for (const [english, native] of Object.entries(NATIVE_LANGUAGE_NAMES)) {
    if (native === nativeName) {
      return english;
    }
  }

  return nativeName; // Return as is if not found
};

// Create a mapping of English to native names for all supported languages
export const createLanguageNameMapping = () => {
  const mapping = {};
  SUPPORTED_LANGUAGE_NAMES.forEach(englishName => {
    mapping[englishName] = getNativeLanguageName(englishName);
  });
  mapping[AUTO_DETECT] = AUTO_DETECT;
  return mapping;
};

// Create a mapping of native to English names for all supported languages
export const createReverseLanguageNameMapping = () => {
  const mapping = {};
  SUPPORTED_LANGUAGE_NAMES.forEach(englishName => {
    const nativeName = getNativeLanguageName(englishName);
    mapping[nativeName] = englishName;
  });
  mapping[AUTO_DETECT] = AUTO_DETECT;
  return mapping;
};
