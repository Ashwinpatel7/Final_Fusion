import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { getNativeNameFromEnglish, getLanguageCode } from '../../utils/supportedLanguages';
import { isRtlLanguage, getFontSettings } from '../../utils/languageUtils';

const TextAreaContainer = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.inputBg};
  transition: all 0.3s ease;
  height: 100%;
  min-height: 200px;
  overflow: hidden;

  &:focus-within {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}40;
  }

  @media (max-width: 768px) {
    min-height: 180px;
  }

  @media (max-width: 480px) {
    min-height: 150px;
  }
`;

const Label = styled.label`
  position: absolute;
  top: 10px;
  left: 15px;
  font-size: 0.8rem;
  font-weight: bold;
  color: ${({ theme }) => theme.secondary};
  pointer-events: none;
  transition: all 0.3s ease;
  z-index: 1;

  ${({ isFocused, hasValue }) => (isFocused || hasValue) && `
    transform: translateY(-5px) scale(0.9);
    color: ${({ theme }) => theme.primary};
  `}
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 2.5rem 1rem 1.5rem;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.textColor};
  font-size: 1rem;
  line-height: 1.5;
  resize: none;
  flex: 1;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  direction: ${({ isRtl }) => isRtl ? 'rtl' : 'ltr'}; /* Handle RTL languages */
  text-align: ${({ isRtl }) => isRtl ? 'right' : 'left'};
  unicode-bidi: isolate;
  font-feature-settings: "kern", "liga", "clig", "calt";

  &::placeholder {
    color: ${({ theme }) => theme.secondary}80;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
    padding: 2.2rem 0.9rem 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 2rem 0.8rem 1rem;
  }
`;

const CharCount = styled.div`
  position: absolute;
  bottom: 10px;
  right: 15px;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.secondary};
  display: flex;
  align-items: center;
  gap: 5px;
`;

const CharCountRing = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid ${({ theme, percentage }) =>
    percentage > 80
      ? theme.danger
      : percentage > 60
        ? theme.warning
        : theme.success};
  position: relative;
  display: inline-block;
  margin-right: 5px;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ theme, percentage }) =>
      percentage > 80
        ? theme.danger
        : percentage > 60
          ? theme.warning
          : theme.success};
    opacity: ${({ percentage }) => percentage / 100};
  }
`;

const DetectedLanguage = styled.div`
  position: absolute;
  bottom: 10px;
  left: 15px;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.primary};
  font-style: italic;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  direction: auto; /* Automatically handle RTL languages */
`;

const TextArea = ({
  value,
  onChange,
  label,
  placeholder,
  readOnly = false,
  detectedLanguage = null,
  maxLength = 5000,
  languageCode = null // Language code for the text (used for RTL detection and font settings)
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const textAreaRef = useRef(null);

  // Determine if the language is RTL
  const langCode = languageCode || (detectedLanguage ? getLanguageCode(detectedLanguage) : null);
  const isRtl = langCode ? isRtlLanguage(langCode) : false;

  // Get font settings for the language
  const fontSettings = langCode ? getFontSettings(langCode) : {};

  useEffect(() => {
    setCharCount(value.length);
  }, [value]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const percentage = Math.min((charCount / maxLength) * 100, 100);

  return (
    <TextAreaContainer>
      <Label
        htmlFor={`textarea-${label.replace(/\s+/g, '-').toLowerCase()}`}
        isFocused={isFocused}
        hasValue={value.length > 0}
      >
        {label}
      </Label>
      <StyledTextArea
        id={`textarea-${label.replace(/\s+/g, '-').toLowerCase()}`}
        ref={textAreaRef}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        onFocus={handleFocus}
        onBlur={handleBlur}
        maxLength={maxLength}
        aria-label={label}
        isRtl={isRtl}
        style={{
          fontFamily: fontSettings.fontFamily,
          fontSize: fontSettings.fontSize,
          lineHeight: fontSettings.lineHeight
        }}
      />
      <CharCount>
        <CharCountRing percentage={percentage} />
        {charCount} / {maxLength}
      </CharCount>
      {detectedLanguage && (
        <DetectedLanguage>
          Detected: {getNativeNameFromEnglish(detectedLanguage)}
        </DetectedLanguage>
      )}
    </TextAreaContainer>
  );
};

export default TextArea;
