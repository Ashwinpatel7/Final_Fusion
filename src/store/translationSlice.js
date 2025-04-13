import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { translateText } from '../utils/api';
import { getLanguageNameFromCode } from '../utils/helpers';

// Async thunk for translation
export const translateTextAsync = createAsyncThunk(
  'translation/translateText',
  async ({ text, fromLang, toLang }, { rejectWithValue }) => {
    try {
      const sourceCode = fromLang === 'Auto Detect' ? 'auto' : fromLang;
      const result = await translateText(text, sourceCode, toLang);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  inputText: '',
  outputText: '',
  fromLang: 'Auto Detect',
  toLang: 'en',
  detectedLanguage: null,
  detectedLanguageName: null,
  isTranslating: false,
  error: null,
  status: 'Ready',
  isError: false,
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
      if (state.fromLang !== 'Auto Detect') {
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
        state.status = `Translated from ${state.fromLang === 'Auto Detect' ? state.detectedLanguageName || 'Auto Detect' : state.fromLang} to ${state.toLang}`;
        state.isError = false;
      })
      .addCase(translateTextAsync.rejected, (state, action) => {
        state.isTranslating = false;
        state.error = action.payload || 'Translation failed';
        state.status = `Translation error: ${state.error}`;
        state.isError = true;
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
  setStatus
} = translationSlice.actions;

export default translationSlice.reducer;
