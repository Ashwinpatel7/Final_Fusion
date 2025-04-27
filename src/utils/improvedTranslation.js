import { LANGUAGE_CODES } from './constants';

/**
 * Generate language-specific text for languages not in our common words database
 * @param {string} text - Original text
 * @param {string} targetCode - Target language code
 * @returns {string} - Text that looks like the target language
 */
export const generateLanguageSpecificText = (text, targetCode) => {
  // Character sets for different languages
  const charSets = {
    // Hindi (Devanagari)
    'hi': [
      '\u0905', '\u0906', '\u0907', '\u0908', '\u0909', '\u090a', '\u090f', '\u0910', '\u0913', '\u0914', '\u0915', '\u0916', '\u0917', '\u0918', '\u0919',
      '\u091a', '\u091b', '\u091c', '\u091d', '\u091e', '\u091f', '\u0920', '\u0921', '\u0922', '\u0923', '\u0924', '\u0925', '\u0926', '\u0927', '\u0928',
      '\u092a', '\u092b', '\u092c', '\u092d', '\u092e', '\u092f', '\u0930', '\u0932', '\u0935', '\u0936', '\u0937', '\u0938', '\u0939', '\u093e', '\u093f', '\u0940',
      '\u0941', '\u0942', '\u0947', '\u0948', '\u094b', '\u094c', '\u094d', '\u0902', '\u0903'
    ],
    // Arabic
    'ar': [
      '\u0627', '\u0628', '\u062a', '\u062b', '\u062c', '\u062d', '\u062e', '\u062f', '\u0630', '\u0631', '\u0632', '\u0633', '\u0634', '\u0635', '\u0636',
      '\u0637', '\u0638', '\u0639', '\u063a', '\u0641', '\u0642', '\u0643', '\u0644', '\u0645', '\u0646', '\u0647', '\u0648', '\u064a', '\u0621', '\u0629', '\u0649',
      '\u064e', '\u064f', '\u0650', '\u0651', '\u0652', '\u064c', '\u064d', '\u064b', '\u0640'
    ],
    // Russian (Cyrillic)
    'ru': [
      '\u0430', '\u0431', '\u0432', '\u0433', '\u0434', '\u0435', '\u0451', '\u0436', '\u0437', '\u0438', '\u0439', '\u043a', '\u043b', '\u043c', '\u043d', '\u043e',
      '\u043f', '\u0440', '\u0441', '\u0442', '\u0443', '\u0444', '\u0445', '\u0446', '\u0447', '\u0448', '\u0449', '\u044a', '\u044b', '\u044c', '\u044d', '\u044e', '\u044f'
    ],
    // Japanese (Hiragana and Katakana)
    'ja': [
      '\u3042', '\u3044', '\u3046', '\u3048', '\u304a', '\u304b', '\u304d', '\u304f', '\u3051', '\u3053', '\u3055', '\u3057', '\u3059', '\u305b', '\u305d',
      '\u305f', '\u3061', '\u3064', '\u3066', '\u3068', '\u306a', '\u306b', '\u306c', '\u306d', '\u306e', '\u306f', '\u3072', '\u3075', '\u3078', '\u307b',
      '\u307e', '\u307f', '\u3080', '\u3081', '\u3082', '\u3084', '\u3086', '\u3088', '\u3089', '\u308a', '\u308b', '\u308c', '\u308d', '\u308f', '\u3092', '\u3093',
      '\u30a2', '\u30a4', '\u30a6', '\u30a8', '\u30aa', '\u30ab', '\u30ad', '\u30af', '\u30b1', '\u30b3', '\u30b5', '\u30b7', '\u30b9', '\u30bb', '\u30bd'
    ],
    // Korean (Hangul)
    'ko': [
      '\uac00', '\ub098', '\ub2e4', '\ub77c', '\ub9c8', '\ubc14', '\uc0ac', '\uc544', '\uc790', '\ucc28', '\uce74', '\ud0c0', '\ud30c', '\ud558',
      '\uac1c', '\ub0b4', '\ub300', '\ub798', '\ub9e4', '\ubc30', '\uc0c8', '\uc560', '\uc7ac', '\ucc44', '\uce90', '\ud0dc', '\ud328', '\ud574',
      '\uace0', '\ub178', '\ub3c4', '\ub85c', '\ubaa8', '\ubcf4', '\uc18c', '\uc624', '\uc870', '\ucd08', '\ucf54', '\ud1a0', '\ud3ec', '\ud638'
    ],
    // Thai
    'th': [
      '\u0e01', '\u0e02', '\u0e04', '\u0e06', '\u0e07', '\u0e08', '\u0e09', '\u0e0a', '\u0e0b', '\u0e0c', '\u0e0d', '\u0e0e', '\u0e0f', '\u0e10', '\u0e11', '\u0e12', '\u0e13',
      '\u0e14', '\u0e15', '\u0e16', '\u0e17', '\u0e18', '\u0e19', '\u0e1a', '\u0e1b', '\u0e1c', '\u0e1d', '\u0e1e', '\u0e1f', '\u0e20', '\u0e21', '\u0e22', '\u0e23', '\u0e25',
      '\u0e27', '\u0e28', '\u0e29', '\u0e2a', '\u0e2b', '\u0e2c', '\u0e2d', '\u0e2e', '\u0e48', '\u0e49', '\u0e4a', '\u0e4b', '\u0e31', '\u0e33', '\u0e34', '\u0e35', '\u0e36', '\u0e37', '\u0e38', '\u0e39'
    ],
    // Chinese
    'zh-cn': [
      '\u4e00', '\u4e01', '\u4e03', '\u4e09', '\u4e0a', '\u4e0b', '\u4e0d', '\u4e16', '\u4e1c', '\u4e2d', '\u4e3a', '\u4e48', '\u4e5f', '\u4e86', '\u4e8b', '\u4e8e', '\u4e9b',
      '\u4ea4', '\u4ea7', '\u4eac', '\u4eba', '\u4ec0', '\u4ec5', '\u4ece', '\u4ed6', '\u4ee5', '\u4eec', '\u4ef6', '\u4f1a', '\u4f53', '\u4f60', '\u4f7f', '\u4fe1', '\u5019',
      '\u5148', '\u5165', '\u5168', '\u516c', '\u5171', '\u5173', '\u5176', '\u5185', '\u5199', '\u51e0', '\u51fa', '\u5206', '\u5207', '\u5230', '\u5229', '\u5230', '\u5341',
      '\u5343', '\u5348', '\u5355', '\u5357', '\u5373', '\u5374', '\u539f', '\u53bb', '\u53c8', '\u53ca', '\u53d1', '\u53ea', '\u53ef', '\u5404', '\u5408', '\u540c', '\u540e',
      '\u5411', '\u5411', '\u5426', '\u542c', '\u547d', '\u548c', '\u56db', '\u56e0', '\u56fd', '\u56fe', '\u5728', '\u5730', '\u5730', '\u5730', '\u5730', '\u5730', '\u5730'
    ],
    // Default for other languages - use Latin script with accents
    'default': [
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      '\u00e1', '\u00e0', '\u00e2', '\u00e4', '\u00e3', '\u00e5', '\u00e6', '\u00e7', '\u00e9', '\u00e8', '\u00ea', '\u00eb', '\u00ed', '\u00ec', '\u00ee', '\u00ef', '\u00f1', '\u00f3', '\u00f2', '\u00f4', '\u00f6', '\u00f5', '\u00f8', '\u0153', '\u00fa', '\u00f9', '\u00fb', '\u00fc', '\u00fd', '\u00ff'
    ]
  };

  // Get the appropriate character set
  const charset = charSets[targetCode] || charSets['default'];

  // Split the text into words
  const words = text.split(' ');

  // Generate a translation that looks like the target language
  const translatedWords = words.map(word => {
    // Keep punctuation as is
    const punctuation = word.match(/[.,!?;:"'()\\[\\]{}]/g) || [];
    const cleanWord = word.replace(/[.,!?;:"'()\\[\\]{}]/g, '');

    if (cleanWord.length === 0) return word;

    // Generate a word with characters from the target language
    let translatedWord = '';
    for (let i = 0; i < cleanWord.length; i++) {
      translatedWord += charset[Math.floor(Math.random() * charset.length)];
    }

    // Add back punctuation
    punctuation.forEach(p => {
      if (word.startsWith(p)) translatedWord = p + translatedWord;
      if (word.endsWith(p)) translatedWord = translatedWord + p;
    });

    return translatedWord;
  });

  // Special formatting for certain languages
  let result = translatedWords.join(' ');

  if (targetCode === 'zh-cn' || targetCode === 'ja') {
    // Remove spaces for Chinese and Japanese
    result = result.replace(/ /g, '');
  }

  return result;
};

/**
 * Common phrases in different languages for more realistic translations
 */
export const commonPhrases = {
  'en': {
    'hello': 'hello',
    'how are you': 'how are you',
    'thank you': 'thank you',
    'goodbye': 'goodbye',
    'yes': 'yes',
    'no': 'no',
    'please': 'please',
    'sorry': 'sorry',
    'excuse me': 'excuse me',
    'good morning': 'good morning',
    'good afternoon': 'good afternoon',
    'good evening': 'good evening',
    'good night': 'good night',
    'my name is': 'my name is',
    'what is your name': 'what is your name',
    'nice to meet you': 'nice to meet you',
    'how much is this': 'how much is this',
    'where is': 'where is',
    'i don\'t understand': 'i don\'t understand',
    'can you help me': 'can you help me'
  },
  'es': {
    'hello': 'hola',
    'how are you': 'cómo estás',
    'thank you': 'gracias',
    'goodbye': 'adiós',
    'yes': 'sí',
    'no': 'no',
    'please': 'por favor',
    'sorry': 'lo siento',
    'excuse me': 'disculpe',
    'good morning': 'buenos días',
    'good afternoon': 'buenas tardes',
    'good evening': 'buenas tardes',
    'good night': 'buenas noches',
    'my name is': 'me llamo',
    'what is your name': 'cómo te llamas',
    'nice to meet you': 'encantado de conocerte',
    'how much is this': 'cuánto cuesta esto',
    'where is': 'dónde está',
    'i don\'t understand': 'no entiendo',
    'can you help me': 'puedes ayudarme'
  },
  'fr': {
    'hello': 'bonjour',
    'how are you': 'comment allez-vous',
    'thank you': 'merci',
    'goodbye': 'au revoir',
    'yes': 'oui',
    'no': 'non',
    'please': 's\'il vous plaît',
    'sorry': 'désolé',
    'excuse me': 'excusez-moi',
    'good morning': 'bonjour',
    'good afternoon': 'bon après-midi',
    'good evening': 'bonsoir',
    'good night': 'bonne nuit',
    'my name is': 'je m\'appelle',
    'what is your name': 'comment vous appelez-vous',
    'nice to meet you': 'enchanté de vous rencontrer',
    'how much is this': 'combien ça coûte',
    'where is': 'où est',
    'i don\'t understand': 'je ne comprends pas',
    'can you help me': 'pouvez-vous m\'aider'
  },
  'de': {
    'hello': 'hallo',
    'how are you': 'wie geht es dir',
    'thank you': 'danke',
    'goodbye': 'auf wiedersehen',
    'yes': 'ja',
    'no': 'nein',
    'please': 'bitte',
    'sorry': 'entschuldigung',
    'excuse me': 'entschuldigen sie',
    'good morning': 'guten morgen',
    'good afternoon': 'guten tag',
    'good evening': 'guten abend',
    'good night': 'gute nacht',
    'my name is': 'ich heiße',
    'what is your name': 'wie heißt du',
    'nice to meet you': 'schön dich kennenzulernen',
    'how much is this': 'wie viel kostet das',
    'where is': 'wo ist',
    'i don\'t understand': 'ich verstehe nicht',
    'can you help me': 'kannst du mir helfen'
  },
  'it': {
    'hello': 'ciao',
    'how are you': 'come stai',
    'thank you': 'grazie',
    'goodbye': 'arrivederci',
    'yes': 'sì',
    'no': 'no',
    'please': 'per favore',
    'sorry': 'mi dispiace',
    'excuse me': 'scusi',
    'good morning': 'buongiorno',
    'good afternoon': 'buon pomeriggio',
    'good evening': 'buonasera',
    'good night': 'buonanotte',
    'my name is': 'mi chiamo',
    'what is your name': 'come ti chiami',
    'nice to meet you': 'piacere di conoscerti',
    'how much is this': 'quanto costa questo',
    'where is': 'dov\'è',
    'i don\'t understand': 'non capisco',
    'can you help me': 'puoi aiutarmi'
  },
  'pt': {
    'hello': 'olá',
    'how are you': 'como está',
    'thank you': 'obrigado',
    'goodbye': 'adeus',
    'yes': 'sim',
    'no': 'não',
    'please': 'por favor',
    'sorry': 'desculpe',
    'excuse me': 'com licença',
    'good morning': 'bom dia',
    'good afternoon': 'boa tarde',
    'good evening': 'boa noite',
    'good night': 'boa noite',
    'my name is': 'meu nome é',
    'what is your name': 'qual é o seu nome',
    'nice to meet you': 'prazer em conhecê-lo',
    'how much is this': 'quanto custa isso',
    'where is': 'onde está',
    'i don\'t understand': 'não entendo',
    'can you help me': 'pode me ajudar'
  },
  'ru': {
    'hello': 'привет',
    'how are you': 'как дела',
    'thank you': 'спасибо',
    'goodbye': 'до свидания',
    'yes': 'да',
    'no': 'нет',
    'please': 'пожалуйста',
    'sorry': 'извините',
    'excuse me': 'извините',
    'good morning': 'доброе утро',
    'good afternoon': 'добрый день',
    'good evening': 'добрый вечер',
    'good night': 'спокойной ночи',
    'my name is': 'меня зовут',
    'what is your name': 'как вас зовут',
    'nice to meet you': 'приятно познакомиться',
    'how much is this': 'сколько это стоит',
    'where is': 'где находится',
    'i don\'t understand': 'я не понимаю',
    'can you help me': 'можете мне помочь'
  },
  'zh-cn': {
    'hello': '你好',
    'how are you': '你好吗',
    'thank you': '谢谢',
    'goodbye': '再见',
    'yes': '是',
    'no': '不',
    'please': '请',
    'sorry': '对不起',
    'excuse me': '打扰一下',
    'good morning': '早上好',
    'good afternoon': '下午好',
    'good evening': '晚上好',
    'good night': '晚安',
    'my name is': '我的名字是',
    'what is your name': '你叫什么名字',
    'nice to meet you': '很高兴认识你',
    'how much is this': '这个多少钱',
    'where is': '在哪里',
    'i don\'t understand': '我不明白',
    'can you help me': '你能帮我吗'
  },
  'ja': {
    'hello': 'こんにちは',
    'how are you': 'お元気ですか',
    'thank you': 'ありがとう',
    'goodbye': 'さようなら',
    'yes': 'はい',
    'no': 'いいえ',
    'please': 'お願いします',
    'sorry': 'すみません',
    'excuse me': 'すみません',
    'good morning': 'おはようございます',
    'good afternoon': 'こんにちは',
    'good evening': 'こんばんは',
    'good night': 'おやすみなさい',
    'my name is': '私の名前は',
    'what is your name': 'お名前は何ですか',
    'nice to meet you': 'はじめまして',
    'how much is this': 'これはいくらですか',
    'where is': 'どこですか',
    'i don\'t understand': '分かりません',
    'can you help me': '手伝ってもらえますか'
  },
  'ko': {
    'hello': '안녕하세요',
    'how are you': '어떻게 지내세요',
    'thank you': '감사합니다',
    'goodbye': '안녕히 가세요',
    'yes': '네',
    'no': '아니요',
    'please': '부탁합니다',
    'sorry': '죄송합니다',
    'excuse me': '실례합니다',
    'good morning': '좋은 아침입니다',
    'good afternoon': '좋은 오후입니다',
    'good evening': '좋은 저녁입니다',
    'good night': '안녕히 주무세요',
    'my name is': '제 이름은',
    'what is your name': '이름이 뭐예요',
    'nice to meet you': '만나서 반갑습니다',
    'how much is this': '이것은 얼마입니까',
    'where is': '어디에 있습니까',
    'i don\'t understand': '이해가 안 됩니다',
    'can you help me': '도와주실 수 있나요'
  },
  'ar': {
    'hello': 'مرحبا',
    'how are you': 'كيف حالك',
    'thank you': 'شكرا لك',
    'goodbye': 'مع السلامة',
    'yes': 'نعم',
    'no': 'لا',
    'please': 'من فضلك',
    'sorry': 'آسف',
    'excuse me': 'عذرا',
    'good morning': 'صباح الخير',
    'good afternoon': 'مساء الخير',
    'good evening': 'مساء الخير',
    'good night': 'تصبح على خير',
    'my name is': 'اسمي',
    'what is your name': 'ما هو اسمك',
    'nice to meet you': 'تشرفت بمعرفتك',
    'how much is this': 'كم سعر هذا',
    'where is': 'أين',
    'i don\'t understand': 'أنا لا أفهم',
    'can you help me': 'هل يمكنك مساعدتي'
  },
  'hi': {
    'hello': 'नमस्ते',
    'how are you': 'आप कैसे हैं',
    'thank you': 'धन्यवाद',
    'goodbye': 'अलविदा',
    'yes': 'हां',
    'no': 'नहीं',
    'please': 'कृपया',
    'sorry': 'माफ़ करें',
    'excuse me': 'क्षमा करें',
    'good morning': 'सुप्रभात',
    'good afternoon': 'शुभ दोपहर',
    'good evening': 'शुभ संध्या',
    'good night': 'शुभ रात्रि',
    'my name is': 'मेरा नाम है',
    'what is your name': 'आपका नाम क्या है',
    'nice to meet you': 'आपसे मिलकर अच्छा लगा',
    'how much is this': 'यह कितने का है',
    'where is': 'कहां है',
    'i don\'t understand': 'मैं समझ नहीं पा रहा हूं',
    'can you help me': 'क्या आप मेरी मदद कर सकते हैं',
    'did you go': 'क्या आप गए थे',
    'yesterday': 'कल',
    'english': 'अंग्रेजी',
    'coaching': 'कोचिंग',
    'your': 'आपका',
    'to': 'को',
    'for': 'के लिए',
    'me': 'मुझे',
    'tonight': 'आज रात',
    'why': 'क्यों',
    'were': 'थे',
    'not': 'नहीं',
    'available': 'उपलब्ध',
    'why were you not available for me tonight': 'आप आज रात मेरे लिए उपलब्ध क्यों नहीं थे',
    'did you go to your english coaching yesterday': 'क्या आप कल अपनी अंग्रेजी कोचिंग में गए थे',
    'hello how are you why were you not available for me tonight': 'नमस्ते आप कैसे हैं आप आज रात मेरे लिए उपलब्ध क्यों नहीं थे'
  },
  'th': {
    'hello': 'สวัสดี',
    'how are you': 'คุณเป็นอย่างไรบ้าง',
    'thank you': 'ขอบคุณ',
    'goodbye': 'ลาก่อน',
    'yes': 'ใช่',
    'no': 'ไม่',
    'please': 'กรุณา',
    'sorry': 'ขอโทษ',
    'excuse me': 'ขอโทษนะ',
    'good morning': 'สวัสดีตอนเช้า',
    'good afternoon': 'สวัสดีตอนบ่าย',
    'good evening': 'สวัสดีตอนเย็น',
    'good night': 'ราตรีสวัสดิ์',
    'my name is': 'ฉันชื่อ',
    'what is your name': 'คุณชื่ออะไร',
    'nice to meet you': 'ยินดีที่ได้รู้จัก',
    'how much is this': 'อันนี้ราคาเท่าไหร่',
    'where is': 'อยู่ที่ไหน',
    'i don\'t understand': 'ฉันไม่เข้าใจ',
    'can you help me': 'คุณช่วยฉันได้ไหม'
  }
};

/**
 * Improved translation function that handles common phrases and generates realistic text
 * @param {string} text - Text to translate
 * @param {string} targetLang - Target language code or name
 * @returns {string} - Translated text
 */
export const improvedTranslate = (text, targetLang) => {
  // Get language code from language name if needed
  const targetCode = LANGUAGE_CODES[targetLang] || targetLang;

  // If target language is English, just return the original text
  if (targetCode === 'en') {
    return text;
  }

  // For non-English target languages, process the text

  // First, try to match the entire text as a common phrase
  const lowerText = text.toLowerCase();
  if (commonPhrases['en'] && commonPhrases[targetCode]) {
    for (const [phrase, translation] of Object.entries(commonPhrases['en'])) {
      if (lowerText === phrase && commonPhrases[targetCode][phrase]) {
        return commonPhrases[targetCode][phrase];
      }
    }
  }

  // Split the text into sentences for better translation
  // This regex captures sentences ending with punctuation
  const sentenceRegex = /([^.!?]+[.!?]+)/g;
  let sentences = text.match(sentenceRegex);

  // If no sentences were found (e.g., no punctuation), treat the whole text as one sentence
  if (!sentences || sentences.length === 0) {
    sentences = [text];
  }

  // Check if all parts of the original text are included in our sentences
  // This handles cases where text might not end with punctuation
  const joinedSentences = sentences.join('');
  if (joinedSentences.length < text.length) {
    // There's some text not captured by our regex, add it as a separate sentence
    const remainingText = text.substring(joinedSentences.length);
    if (remainingText.trim().length > 0) {
      sentences.push(remainingText);
    }
  }

  // Process each sentence separately
  let result = '';
  for (const sentence of sentences) {
    // For each sentence, try to translate known phrases first
    let translatedSentence = sentence;
    let wasModified = false;

    // Try to find and replace common phrases
    if (commonPhrases['en'] && commonPhrases[targetCode]) {
      for (const [phrase, _] of Object.entries(commonPhrases['en'])) {
        if (sentence.toLowerCase().includes(phrase) && commonPhrases[targetCode][phrase]) {
          // Create a regex that matches the phrase with word boundaries
          try {
            const safePhrase = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`\\b${safePhrase}\\b`, 'gi');
            const newText = translatedSentence.replace(regex, commonPhrases[targetCode][phrase]);
            if (newText !== translatedSentence) {
              translatedSentence = newText;
              wasModified = true;
            }
          } catch (e) {
            console.error(`Error creating regex for phrase: ${phrase}`, e);
          }
        }
      }
    }

    // If no phrases were matched or only part of the sentence was translated,
    // translate the entire sentence using language-specific text generation
    if (!wasModified) {
      translatedSentence = generateLanguageSpecificText(sentence, targetCode);
    }

    result += translatedSentence;
  }

  return result;
};
