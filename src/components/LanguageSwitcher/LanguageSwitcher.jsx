import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setFromLang, setToLang, swapLanguages } from '../../store/translationSlice';
import {
  SOURCE_LANGUAGES,
  TARGET_LANGUAGES,
  AUTO_DETECT,
  getNativeNameFromEnglish,
  getEnglishNameFromNative
} from '../../utils/supportedLanguages';
import { FaExchangeAlt } from 'react-icons/fa';

const SwitcherContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  width: 100%;

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const LanguageSelectGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.8rem;
  font-weight: bold;
  color: ${({ theme }) => theme.secondary};
  text-transform: uppercase;
`;

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Select = styled.select`
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.textColor};
  font-size: 1rem;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  direction: auto; /* Automatically handle RTL languages */

  /* Ensure proper display of different writing systems */
  option {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    direction: auto;
  }

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}40;
  }
`;

const SelectArrow = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: ${({ theme }) => theme.secondary};
`;

const SwapButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1.5rem;

  &:hover {
    background-color: ${({ theme }) => theme.primary}20;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 576px) {
    margin: 0;
    align-self: center;
    transform: rotate(90deg);

    &:hover {
      transform: rotate(90deg) scale(1.1);
    }

    &:active {
      transform: rotate(90deg) scale(0.95);
    }
  }
`;

const AutoDetectBadge = styled.span`
  display: inline-block;
  background-color: ${({ theme }) => theme.primary}20;
  color: ${({ theme }) => theme.primary};
  font-size: 0.7rem;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  margin-left: 0.5rem;
  font-weight: bold;
`;

const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const { fromLang, toLang } = useSelector(state => state.translation);

  const handleFromLangChange = (e) => {
    dispatch(setFromLang(e.target.value));
  };

  const handleToLangChange = (e) => {
    dispatch(setToLang(e.target.value));
  };

  const handleSwap = () => {
    dispatch(swapLanguages());
  };

  return (
    <SwitcherContainer>
      <LanguageSelectGroup>
        <Label htmlFor="from-lang">
          Source Language
          {fromLang === AUTO_DETECT && <AutoDetectBadge>Auto</AutoDetectBadge>}
        </Label>
        <SelectContainer>
          <Select
            id="from-lang"
            value={fromLang}
            onChange={handleFromLangChange}
          >
            {SOURCE_LANGUAGES.map((lang) => (
              <option key={`from-${lang}`} value={lang}>
                {getNativeNameFromEnglish(lang)}
              </option>
            ))}
          </Select>
          <SelectArrow>▼</SelectArrow>
        </SelectContainer>
      </LanguageSelectGroup>

      <SwapButton
        onClick={handleSwap}
        title="Swap languages"
        aria-label="Swap languages"
        disabled={fromLang === AUTO_DETECT}
      >
        <FaExchangeAlt />
      </SwapButton>

      <LanguageSelectGroup>
        <Label htmlFor="to-lang">Target Language</Label>
        <SelectContainer>
          <Select
            id="to-lang"
            value={toLang}
            onChange={handleToLangChange}
          >
            {TARGET_LANGUAGES.map((lang) => (
              <option key={`to-${lang}`} value={lang}>
                {getNativeNameFromEnglish(lang)}
              </option>
            ))}
          </Select>
          <SelectArrow>▼</SelectArrow>
        </SelectContainer>
      </LanguageSelectGroup>
    </SwitcherContainer>
  );
};

export default LanguageSwitcher;
