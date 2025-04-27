import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { FaMagic, FaRobot } from 'react-icons/fa';
import { setTranslationMode } from '../../store/translationSlice';

const SelectorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.backgroundSecondary};
  border-radius: 8px;
  padding: 0.5rem;
  width: fit-content;
`;

const ModeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.primary : 'transparent'};
  color: ${({ isActive, theme }) =>
    isActive ? theme.buttonText : theme.textColor};
  font-weight: ${({ isActive }) => isActive ? 'bold' : 'normal'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ isActive, theme }) =>
      isActive ? theme.primary : theme.backgroundHover};
  }

  svg {
    font-size: 1rem;
  }
`;

const TranslationModeSelector = () => {
  const dispatch = useDispatch();
  const { translationMode } = useSelector(state => state.translation);

  const handleModeChange = (mode) => {
    dispatch(setTranslationMode(mode));
  };

  return (
    <SelectorContainer>
      <ModeButton
        isActive={translationMode === 'api'}
        onClick={() => handleModeChange('api')}
        aria-label="Use Microsoft Azure Translation"
      >
        <FaMagic />
        Microsoft Azure Translation
      </ModeButton>
      {/* We're removing the Demo Mode option since all translations should be powered by Microsoft Azure */}
    </SelectorContainer>
  );
};

export default TranslationModeSelector;
