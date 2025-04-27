import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { translateText } from '../utils/api';
import { getLanguageNameFromCode } from '../utils/helpers';
import {
  AUTO_DETECT,
  getLanguageCode,
  getNativeNameFromEnglish
} from '../utils/supportedLanguages';

// Async thunk for translation
export const translateTextAsync = createAsyncThunk(
  'translation/translateText',
  async ({ text, fromLang, toLang }, { rejectWithValue }) => {
    try {
      // Get the source language code
      // For Microsoft Translator API, 'auto' should be an empty string for auto-detection
      const sourceCode = fromLang === AUTO_DETECT ? 'auto' : getLanguageCode(fromLang);

      // Get the target language code
      const targetCode = getLanguageCode(toLang);

      console.log(`Translation requested:
        - From: ${fromLang} (code: ${sourceCode})
        - To: ${toLang} (code: ${targetCode})
        - Text: "${text}"`);

      // Special handling for Hindi
      if (toLang === 'Hindi') {
        console.log('Hindi translation requested - ensuring proper handling');
      }

      // Make the translation request
      const result = await translateText(text, sourceCode, targetCode);

      // Check if the result is valid
      if (!result || !result.text) {
        throw new Error('Translation failed: No valid result returned');
      }

      // Log the successful translation
      console.log(`Translation completed:
        - Detected source: ${result.source}
        - Result: "${result.text}"`);

      return result;
    } catch (error) {
      // Log the error for debugging
      console.error('Translation error in Redux thunk:', error);

      // Create a more descriptive error message
      let errorMessage = 'Translation failed';

      if (error.message) {
        errorMessage += `: ${error.message}`;
      }

      // Return the error message to be handled by the rejected case
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  inputText: '',
  outputText: '',
  fromLang: AUTO_DETECT,
  toLang: 'English',
  detectedLanguage: null,
  detectedLanguageName: null,
  isTranslating: false,
  error: null,
  status: 'Ready',
  isError: false,
  isMock: false, // Flag to indicate if the translation is from the mock API
  translationMode: 'api' // Default to API mode
};

export const translationSlice = createSlice({
  name: 'translation',
  initialState,
  reducers: {
    setInputText: (state, action) => {
      state.inputText = action.payload;
    },
    setOutputText: (state, action) => {
      state.outputText = action.payload;
    },
    setFromLang: (state, action) => {
      state.fromLang = action.payload;
    },
    setToLang: (state, action) => {
      state.toLang = action.payload;
    },

    swapLanguages: (state) => {
      if (state.fromLang !== AUTO_DETECT) {
        const tempLang = state.fromLang;
        state.fromLang = state.toLang;
        state.toLang = tempLang;

        // Swap text
        const tempText = state.inputText;
        state.inputText = state.outputText;
        state.outputText = tempText;

        state.status = 'Languages and text swapped';
        state.isError = false;
      }
    },
    clearText: (state) => {
      state.inputText = '';
      state.outputText = '';
      state.detectedLanguage = null;
      state.detectedLanguageName = null;
      state.status = 'Cleared all text';
      state.isError = false;
    },
    setStatus: (state, action) => {
      state.status = action.payload.message;
      state.isError = action.payload.isError || false;
    },
    setTranslationMode: (state, action) => {
      state.translationMode = action.payload;
      state.status = `Translation mode set to ${action.payload === 'api' ? 'Microsoft Azure' : 'Demo'}`;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(translateTextAsync.pending, (state) => {
        state.isTranslating = true;
        state.error = null;
        state.status = 'Translating...';
        state.isError = false;
      })
      .addCase(translateTextAsync.fulfilled, (state, action) => {
        state.isTranslating = false;
        state.outputText = action.payload.text;
        state.detectedLanguage = action.payload.source;
        state.detectedLanguageName = getLanguageNameFromCode(action.payload.source);
        state.isMock = action.payload.isMock || false;

        // Always indicate that we're using Microsoft Azure for translation
        const translationSource = 'Microsoft Azure';

        // Get source language name (either detected or selected)
        const sourceLang = state.fromLang === AUTO_DETECT ? state.detectedLanguageName || AUTO_DETECT : state.fromLang;

        // Convert to native script
        const nativeSourceLang = getNativeNameFromEnglish(sourceLang);
        const nativeTargetLang = getNativeNameFromEnglish(state.toLang);

        state.status = `${translationSource}: Translated from ${nativeSourceLang} to ${nativeTargetLang}`;
        state.isError = false;
      })
      .addCase(translateTextAsync.rejected, (state, action) => {
        state.isTranslating = false;
        state.error = action.payload || 'Translation failed';

        // Provide a more detailed error message
        const errorMessage = action.payload || 'Unknown error';
        console.error('Translation rejected in Redux:', errorMessage);

        state.status = `Translation error: ${errorMessage}`;
        state.isError = true;

        // Don't clear the output text if there was a previous successful translation
        // This prevents the UI from showing an empty translation area on error
      });
  },
});

export const {
  setInputText,
  setOutputText,
  setFromLang,
  setToLang,
  swapLanguages,
  clearText,
  setStatus,
  setTranslationMode
} = translationSlice.actions;

export default translationSlice.reducer;
