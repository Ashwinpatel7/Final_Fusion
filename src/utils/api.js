import { CACHE_SIZE, LANGUAGE_CODES } from './constants';

// Simple in-memory cache
const cache = new Map();

/**
 * Generate cache key from text and languages
 * @param {string} text - Text to translate
 * @param {string} source - Source language
 * @param {string} target - Target language
 * @returns {string} - Cache key
 */
const getCacheKey = (text, source, target) => `${text}_${source}_${target}`;

/**
 * Add translation result to cache with LRU eviction
 * @param {string} key - Cache key
 * @param {Object} value - Translation result
 */
const addToCache = (key, value) => {
  if (cache.size >= CACHE_SIZE) {
    // Remove oldest entry (first key in the map)
    const oldestKey = cache.keys().next().value;
    cache.delete(oldestKey);
  }
  cache.set(key, value);
};

/**
 * Translate text using a translation service
 * @param {string} text - Text to translate
 * @param {string} source - Source language code
 * @param {string} target - Target language code
 * @returns {Promise<Object>} - Translation result
 */
export const translateText = async (text, source, target) => {
  if (!text.trim()) {
    return { text: '', source: source };
  }

  const cacheKey = getCacheKey(text, source, target);

  // Check cache first
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    // In a real application, you would use a proper translation API
    // For this demo, we'll use a more sophisticated mock implementation

    // Simulate API call with a delay
    const result = await mockTranslateAPI(text, source, target);

    // Add to cache
    addToCache(cacheKey, result);

    return result;
  } catch (error) {
    console.error('Translation error:', error);
    throw new Error(`Translation failed: ${error.message}`);
  }
};

// Common words in different languages for more realistic mock translations
const commonWords = {
  en: {
    greetings: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
    farewells: ['goodbye', 'bye', 'see you', 'see you later', 'take care'],
    questions: ['what', 'where', 'when', 'why', 'how', 'who'],
    pronouns: ['i', 'you', 'he', 'she', 'it', 'we', 'they'],
    verbs: ['am', 'is', 'are', 'was', 'were', 'have', 'has', 'had', 'do', 'does', 'did'],
    nouns: ['world', 'day', 'time', 'year', 'people', 'way', 'thing', 'man', 'woman', 'child'],
    adjectives: ['good', 'new', 'first', 'last', 'long', 'great', 'little', 'own', 'other', 'old'],
    conjunctions: ['and', 'but', 'or', 'because', 'if', 'when', 'that', 'while', 'although'],
    prepositions: ['in', 'on', 'at', 'with', 'by', 'for', 'from', 'to', 'of', 'about']
  },
  es: {
    greetings: ['hola', 'buenos días', 'buenas tardes', 'buenas noches'],
    farewells: ['adiós', 'hasta luego', 'hasta pronto', 'nos vemos', 'cuídate'],
    questions: ['qué', 'dónde', 'cuándo', 'por qué', 'cómo', 'quién'],
    pronouns: ['yo', 'tú', 'él', 'ella', 'nosotros', 'ellos', 'ellas'],
    verbs: ['soy', 'eres', 'es', 'somos', 'son', 'tengo', 'tienes', 'tiene', 'tenemos', 'tienen'],
    nouns: ['mundo', 'día', 'tiempo', 'año', 'gente', 'manera', 'cosa', 'hombre', 'mujer', 'niño'],
    adjectives: ['bueno', 'nuevo', 'primero', 'último', 'largo', 'gran', 'pequeño', 'propio', 'otro', 'viejo'],
    conjunctions: ['y', 'pero', 'o', 'porque', 'si', 'cuando', 'que', 'mientras', 'aunque'],
    prepositions: ['en', 'sobre', 'con', 'por', 'para', 'desde', 'hasta', 'de', 'acerca de']
  },
  fr: {
    greetings: ['bonjour', 'salut', 'bonsoir'],
    farewells: ['au revoir', 'à bientôt', 'à plus tard', 'adieu', 'prenez soin de vous'],
    questions: ['quoi', 'où', 'quand', 'pourquoi', 'comment', 'qui'],
    pronouns: ['je', 'tu', 'il', 'elle', 'nous', 'ils', 'elles'],
    verbs: ['suis', 'es', 'est', 'sommes', 'sont', 'ai', 'as', 'a', 'avons', 'ont'],
    nouns: ['monde', 'jour', 'temps', 'année', 'gens', 'façon', 'chose', 'homme', 'femme', 'enfant'],
    adjectives: ['bon', 'nouveau', 'premier', 'dernier', 'long', 'grand', 'petit', 'propre', 'autre', 'vieux'],
    conjunctions: ['et', 'mais', 'ou', 'parce que', 'si', 'quand', 'que', 'pendant que', 'bien que'],
    prepositions: ['dans', 'sur', 'à', 'avec', 'par', 'pour', 'de', 'vers', 'au sujet de']
  },
  de: {
    greetings: ['hallo', 'guten morgen', 'guten tag', 'guten abend'],
    farewells: ['auf wiedersehen', 'tschüss', 'bis später', 'bis bald', 'pass auf dich auf'],
    questions: ['was', 'wo', 'wann', 'warum', 'wie', 'wer'],
    pronouns: ['ich', 'du', 'er', 'sie', 'es', 'wir', 'sie'],
    verbs: ['bin', 'bist', 'ist', 'sind', 'habe', 'hast', 'hat', 'haben'],
    nouns: ['welt', 'tag', 'zeit', 'jahr', 'leute', 'weg', 'ding', 'mann', 'frau', 'kind'],
    adjectives: ['gut', 'neu', 'erst', 'letzt', 'lang', 'groß', 'klein', 'eigen', 'ander', 'alt'],
    conjunctions: ['und', 'aber', 'oder', 'weil', 'wenn', 'als', 'dass', 'während', 'obwohl'],
    prepositions: ['in', 'auf', 'an', 'mit', 'durch', 'für', 'von', 'zu', 'über']
  },
  'zh-cn': {
    greetings: ['你好', '早上好', '下午好', '晚上好'],
    farewells: ['再见', '拜拜', '回头见', '保重'],
    questions: ['什么', '哪里', '何时', '为什么', '怎么样', '谁'],
    pronouns: ['我', '你', '他', '她', '它', '我们', '他们'],
    verbs: ['是', '有', '做', '去', '来', '看', '说', '想', '知道', '认为'],
    nouns: ['世界', '日子', '时间', '年', '人们', '方式', '事情', '男人', '女人', '孩子'],
    adjectives: ['好', '新', '第一', '最后', '长', '伟大', '小', '自己的', '其他', '老'],
    conjunctions: ['和', '但是', '或者', '因为', '如果', '当', '那', '而', '虽然'],
    prepositions: ['在', '上', '于', '与', '由', '为', '从', '到', '关于']
  }
};

/**
 * More sophisticated mock translation API
 * @param {string} text - Text to translate
 * @param {string} source - Source language code
 * @param {string} target - Target language code
 * @returns {Promise<Object>} - Translation result
 */
const mockTranslateAPI = (text, source, target) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Detect language if source is 'auto'
      const detectedSource = source === 'auto' ? detectLanguage(text) : source;

      // Get language code from language name if needed
      const sourceCode = LANGUAGE_CODES[detectedSource] || detectedSource;
      const targetCode = LANGUAGE_CODES[target] || target;

      // Perform mock translation
      const translatedText = performMockTranslation(text, sourceCode, targetCode);

      resolve({
        text: translatedText,
        source: sourceCode
      });
    }, 800); // Simulate network delay
  });
};

/**
 * Perform a more realistic mock translation
 * @param {string} text - Text to translate
 * @param {string} sourceCode - Source language code
 * @param {string} targetCode - Target language code
 * @returns {string} - Translated text
 */
const performMockTranslation = (text, sourceCode, targetCode) => {
  // If source and target are the same, return the original text
  if (sourceCode === targetCode) {
    return text;
  }

  // If target is English and we don't have specific translation rules, return the original
  if (targetCode === 'en' && !commonWords[sourceCode]) {
    return text;
  }

  // If we don't have translation data for the target language, use a simple algorithm
  if (!commonWords[targetCode]) {
    // For languages we don't have specific rules for, add a prefix and reverse the text
    return `[${targetCode}] ${text.split('').reverse().join('')}`;
  }

  // For languages we have data for, perform word-by-word replacement
  let translatedText = text;

  // Replace common words based on the target language
  Object.entries(commonWords.en).forEach(([category, words]) => {
    words.forEach((word, index) => {
      const targetWords = commonWords[targetCode][category];
      if (targetWords && targetWords[index]) {
        // Create a regex that matches the word with word boundaries
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        translatedText = translatedText.replace(regex, targetWords[index]);
      }
    });
  });

  // Add language-specific formatting
  if (targetCode === 'es') {
    // Spanish: add opening exclamation/question marks for sentences
    translatedText = translatedText.replace(/([.!?]\s*|^)([A-Z¡¿])/g, (match, p1, p2) => {
      if (p2.match(/[A-Z]/)) {
        return `${p1}¡${p2}`;
      }
      return match;
    });
  } else if (targetCode === 'zh-cn') {
    // Chinese: remove some spaces as Chinese doesn't use spaces between words
    translatedText = translatedText.replace(/ ([,.])/g, '$1');
  } else if (targetCode === 'de') {
    // German: capitalize nouns (simplified approach)
    commonWords.en.nouns.forEach((noun, index) => {
      const germanNoun = commonWords.de.nouns[index];
      if (germanNoun) {
        const regex = new RegExp(`\\b${germanNoun}\\b`, 'g');
        translatedText = translatedText.replace(regex, germanNoun.charAt(0).toUpperCase() + germanNoun.slice(1));
      }
    });
  }

  return translatedText;
};

/**
 * Improved mock language detection
 * @param {string} text - Text to detect language for
 * @returns {string} - Detected language code
 */
const detectLanguage = (text) => {
  const lowerText = text.toLowerCase();

  // Count matches for each language
  const matches = {};

  // Check for matches in each language
  Object.entries(commonWords).forEach(([langCode, categories]) => {
    matches[langCode] = 0;

    // Check each category of words
    Object.values(categories).forEach(words => {
      words.forEach(word => {
        // Create a regex that matches the word with word boundaries
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        const count = (lowerText.match(regex) || []).length;
        matches[langCode] += count;
      });
    });
  });

  // Find the language with the most matches
  let detectedLang = 'en'; // Default to English
  let maxMatches = 0;

  Object.entries(matches).forEach(([langCode, count]) => {
    if (count > maxMatches) {
      maxMatches = count;
      detectedLang = langCode;
    }
  });

  return detectedLang;
};
