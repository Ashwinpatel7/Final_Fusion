import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaCog, FaCheck, FaInfoCircle } from 'react-icons/fa';
import { TRANSLATION_APIS, setTranslationAPI, getCurrentAPI } from '../../utils/translationAPI';

const SettingsContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const SettingsPanel = styled.div`
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

const SettingsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

const SettingsTitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.textColor};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.textColor};
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.backgroundSecondary};
  }
`;

const SettingsSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 1rem;
`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const OptionItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  background-color: ${({ isSelected, theme }) => isSelected ? theme.primaryOpacity : 'transparent'};

  &:hover {
    background-color: ${({ isSelected, theme }) => isSelected ? theme.primaryOpacity : theme.backgroundSecondary};
  }
`;

const OptionLabel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const OptionName = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.textColor};
`;

const OptionDescription = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.secondary};
  margin-top: 0.25rem;
`;

const OptionIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.primary};
`;

const InfoBox = styled.div`
  background-color: ${({ theme }) => theme.backgroundSecondary};
  border-left: 4px solid ${({ theme }) => theme.info};
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;

  svg {
    color: ${({ theme }) => theme.info};
    flex-shrink: 0;
    margin-top: 0.25rem;
  }
`;

const InfoText = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textColor};
  line-height: 1.5;
`;

const Settings = ({ onClose }) => {
  const [selectedAPI, setSelectedAPI] = useState(getCurrentAPI());

  const handleAPIChange = (api) => {
    setSelectedAPI(api);
    setTranslationAPI(api);
  };

  const apiOptions = [
    {
      id: TRANSLATION_APIS.MICROSOFT,
      name: 'Microsoft Translator',
      description: 'Neural machine translation with support for over 90 languages.',
      requiresKey: true
    },
    {
      id: TRANSLATION_APIS.MICROSOFT_DOCUMENT,
      name: 'Microsoft Document Translator',
      description: 'Translate documents and files while preserving formatting.',
      requiresKey: true
    },
    {
      id: TRANSLATION_APIS.GOOGLE,
      name: 'Google Translate API',
      description: 'High-quality translations with support for over 100 languages.',
      requiresKey: true
    },
    {
      id: TRANSLATION_APIS.DEEPL,
      name: 'DeepL Translator',
      description: 'Known for high-quality, natural-sounding translations.',
      requiresKey: true
    },
    {
      id: TRANSLATION_APIS.MOCK,
      name: 'Demo Mode (No API)',
      description: 'Uses built-in mock translations. No API key required.',
      requiresKey: false
    }
  ];

  // Close settings when Escape key is pressed
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <SettingsContainer onClick={onClose}>
      <SettingsPanel onClick={(e) => e.stopPropagation()}>
        <SettingsHeader>
          <SettingsTitle>
            <FaCog /> Settings
          </SettingsTitle>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </SettingsHeader>

        <SettingsSection>
          <SectionTitle>Translation API</SectionTitle>
          <OptionsList>
            {apiOptions.map((option) => (
              <OptionItem
                key={option.id}
                isSelected={selectedAPI === option.id}
                onClick={() => handleAPIChange(option.id)}
              >
                <OptionLabel>
                  <OptionName>{option.name}</OptionName>
                  <OptionDescription>{option.description}</OptionDescription>
                </OptionLabel>
                {selectedAPI === option.id && (
                  <OptionIcon>
                    <FaCheck />
                  </OptionIcon>
                )}
              </OptionItem>
            ))}
          </OptionsList>

          <InfoBox>
            <FaInfoCircle size={18} />
            <InfoText>
              Your Microsoft Translator API key is configured and ready to use. You can select any of the Microsoft
              translation options for high-quality translations. The other API options require additional API keys.
            </InfoText>
          </InfoBox>
        </SettingsSection>
      </SettingsPanel>
    </SettingsContainer>
  );
};

export default Settings;
