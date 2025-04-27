/**
 * Utility functions for language handling
 */

// List of RTL (Right-to-Left) language codes
const RTL_LANGUAGES = [
  'ar', // Arabic
  'dv', // Divehi
  'fa', // Persian
  'ha', // Hausa
  'he', // Hebrew
  'ks', // Kashmiri
  'ku', // Kurdish (Central)
  'ps', // Pashto
  'sd', // Sindhi
  'ur', // Urdu
  'yi', // Yiddish
  'ug'  // Uyghur
];

/**
 * Check if a language is RTL (Right-to-Left)
 * @param {string} languageCode - The language code to check
 * @returns {boolean} - True if the language is RTL, false otherwise
 */
export const isRtlLanguage = (languageCode) => {
  if (!languageCode) return false;
  
  // Extract the base language code (e.g., 'ar-SA' -> 'ar')
  const baseCode = languageCode.split('-')[0].toLowerCase();
  
  return RTL_LANGUAGES.includes(baseCode);
};

/**
 * Get the appropriate text direction for a language
 * @param {string} languageCode - The language code
 * @returns {string} - 'rtl' for Right-to-Left languages, 'ltr' for Left-to-Right languages
 */
export const getTextDirection = (languageCode) => {
  return isRtlLanguage(languageCode) ? 'rtl' : 'ltr';
};

/**
 * Get appropriate font settings for a language
 * @param {string} languageCode - The language code
 * @returns {Object} - Font settings for the language
 */
export const getFontSettings = (languageCode) => {
  if (!languageCode) {
    return {
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      fontSize: '1rem',
      lineHeight: 1.5
    };
  }
  
  const baseCode = languageCode.split('-')[0].toLowerCase();
  
  // Special font settings for specific languages
  switch (baseCode) {
    case 'ar': // Arabic
    case 'ur': // Urdu
    case 'fa': // Persian
      return {
        fontFamily: '"Noto Sans Arabic", "Segoe UI", Tahoma, sans-serif',
        fontSize: '1.05rem',
        lineHeight: 1.6
      };
      
    case 'zh': // Chinese
    case 'ja': // Japanese
      return {
        fontFamily: '"Noto Sans CJK SC", "Microsoft YaHei", "SimHei", sans-serif',
        fontSize: '1rem',
        lineHeight: 1.7
      };
      
    case 'ko': // Korean
      return {
        fontFamily: '"Noto Sans CJK KR", "Malgun Gothic", sans-serif',
        fontSize: '1rem',
        lineHeight: 1.7
      };
      
    case 'th': // Thai
    case 'lo': // Lao
      return {
        fontFamily: '"Noto Sans Thai", "Leelawadee UI", sans-serif',
        fontSize: '1rem',
        lineHeight: 1.8 // Taller line height for scripts with tall characters
      };
      
    case 'hi': // Hindi
    case 'mr': // Marathi
    case 'ne': // Nepali
    case 'sa': // Sanskrit
      return {
        fontFamily: '"Noto Sans Devanagari", "Mangal", sans-serif',
        fontSize: '1rem',
        lineHeight: 1.7
      };
      
    default:
      return {
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontSize: '1rem',
        lineHeight: 1.5
      };
  }
};
