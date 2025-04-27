import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  FaImage,
  FaUpload,
  FaTrash,
  FaDownload,
  FaSpinner,
  FaExchangeAlt,
  FaCheck,
  FaCrop,
  FaSearchPlus,
  FaSearchMinus,
  FaRedo
} from 'react-icons/fa';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  animation: ${fadeIn} 0.6s ease-out;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  background: linear-gradient(to right, ${({ theme }) => theme.primary}, ${({ theme }) => theme.purple});
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 700;
`;

const Subtitle = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.secondary};
  margin-bottom: 1rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const AzureNotice = styled.div`
  background-color: rgba(0, 120, 212, 0.1);
  border: 1px solid rgba(0, 120, 212, 0.3);
  border-radius: 8px;
  padding: 10px 15px;
  margin-bottom: 2rem;
  font-size: 14px;
  color: #0078D4;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  span {
    font-weight: bold;
    margin-right: 5px;
  }
`;

const LanguageSelectionContainer = styled.div`
  margin-bottom: 2rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 3rem 2rem;
  border: 2px dashed ${({ isDragging, theme }) =>
    isDragging ? theme.primary : 'rgba(255, 255, 255, 0.2)'};
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.primary}77;
    background: rgba(255, 255, 255, 0.05);
  }
`;

const UploadIcon = styled.div`
  font-size: 3rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  animation: ${pulse} 2s infinite ease-in-out;
`;

const UploadText = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const UploadSubtext = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.secondary};
  margin-bottom: 1.5rem;
`;

const BrowseButton = styled.button`
  background: ${({ theme }) => theme.primaryGradient};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(99, 102, 241, 0.4);
  }
`;

const FileInput = styled.input`
  display: none;
`;

const ImagePreviewContainer = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  animation: ${fadeIn} 0.5s ease-out;
`;

const ImagePreviewWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto 1.5rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.cardShadow};
  background: rgba(0, 0, 0, 0.2);
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const ImageControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const ImageControlButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: ${({ theme }) => theme.textColor};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryOpacity};
    color: ${({ theme }) => theme.primary};
  }
`;

const TranslateButton = styled.button`
  background: ${({ theme }) => theme.primaryGradient};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled(FaSpinner)`
  animation: ${spin} 1s linear infinite;
`;

const ResultContainer = styled.div`
  margin-top: 3rem;
  animation: ${fadeIn} 0.6s ease-out;
`;

const ResultHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ResultTitle = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.textColor};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DownloadButton = styled.button`
  background: ${({ theme }) => theme.successGradient};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(16, 185, 129, 0.4);
  }
`;

const ResultContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ResultPanel = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const PanelTitle = styled.h4`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ExtractedText = styled.div`
  color: ${({ theme }) => theme.secondary};
  font-family: var(--font-mono);
  font-size: 0.9rem;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
  max-height: 300px;
  overflow-y: auto;
`;

const TranslatedText = styled.div`
  color: ${({ theme }) => theme.textColor};
  font-size: 0.9rem;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
  max-height: 300px;
  overflow-y: auto;
`;

const StatusMessage = styled.div`
  text-align: center;
  padding: 1rem;
  color: ${({ theme, type }) =>
    type === 'success' ? theme.success :
    type === 'error' ? theme.danger :
    theme.secondary};
  background: ${({ theme, type }) =>
    type === 'success' ? theme.successOpacity :
    type === 'error' ? theme.dangerOpacity :
    'transparent'};
  border-radius: 8px;
  margin-bottom: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const ImageTranslation = () => {
  const dispatch = useDispatch();
  const { sourceLanguage, targetLanguage } = useSelector(state => state.translation);

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationResult, setTranslationResult] = useState(null);
  const [status, setStatus] = useState(null);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      validateAndSetImage(selectedFile);
    }
  };

  const validateAndSetImage = (file) => {
    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    if (!validTypes.includes(file.type)) {
      setStatus({
        type: 'error',
        message: 'Unsupported file type. Please upload JPG, PNG, GIF, or WebP images.'
      });
      return;
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setStatus({
        type: 'error',
        message: 'File size exceeds 5MB limit. Please upload a smaller image.'
      });
      return;
    }

    setImage(file);

    // Create image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);

    setStatus(null);
    setTranslationResult(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetImage(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
    setTranslationResult(null);
    setStatus(null);
  };

  const handleTranslate = async () => {
    if (!image) return;

    setIsTranslating(true);
    setStatus({
      type: 'info',
      message: 'Analyzing image and extracting text...'
    });

    try {
      // In a real application, you would upload the image to a server for OCR and translation
      // For this demo, we'll simulate the OCR and translation process

      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update status
      setStatus({
        type: 'info',
        message: 'Translating extracted text...'
      });

      // Simulate another delay for translation
      await new Promise(resolve => setTimeout(resolve, 1500));

      // For demo purposes, we'll use mock extracted text based on the image name
      const extractedText = generateMockExtractedText(image.name);

      // Generate mock translated text
      const translatedText = generateMockTranslatedText(extractedText, sourceLanguage, targetLanguage);

      setTranslationResult({
        extractedText,
        translatedText
      });

      setStatus({
        type: 'success',
        message: 'Image text translated successfully!'
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: `Translation failed: ${error.message}`
      });
    } finally {
      setIsTranslating(false);
    }
  };

  const handleDownload = () => {
    if (!translationResult) return;

    // Create a blob from the translated text
    const blob = new Blob([translationResult.translatedText], { type: 'text/plain' });

    // Create a download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `translated_text_${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Helper function to generate mock extracted text
  const generateMockExtractedText = (imageName) => {
    // In a real app, this would be the result of OCR on the image
    const mockTexts = [
      "Welcome to our international conference on artificial intelligence and machine learning. We are delighted to have participants from over 30 countries joining us today.",
      "IMPORTANT NOTICE: This area is under video surveillance. All activities are being recorded for security purposes. Please follow the posted guidelines.",
      "MENU\nStarter: Fresh garden salad with balsamic vinaigrette\nMain Course: Grilled salmon with lemon butter sauce\nDessert: Chocolate mousse with fresh berries",
      "WARNING: Hazardous materials storage area. Authorized personnel only. Proper safety equipment must be worn at all times.",
      "PRODUCT INFORMATION\nModel: XR-5000\nSerial Number: 78542169\nManufacturing Date: 05/2023\nWarranty: 2 years limited"
    ];

    // Select a mock text based on the image name
    const hash = imageName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return mockTexts[hash % mockTexts.length];
  };

  // Helper function to generate mock translated text
  const generateMockTranslatedText = (text, sourceLanguage, targetLanguage) => {
    // In a real app, this would be the result of translation API
    // For demo, we'll just add a prefix and some modifications

    if (targetLanguage === 'es') {
      // Spanish-like modifications
      return text
        .replace(/Welcome/g, 'Bienvenidos')
        .replace(/to our/g, 'a nuestra')
        .replace(/international/g, 'internacional')
        .replace(/conference/g, 'conferencia')
        .replace(/artificial intelligence/g, 'inteligencia artificial')
        .replace(/machine learning/g, 'aprendizaje automático')
        .replace(/We are/g, 'Estamos')
        .replace(/delighted/g, 'encantados')
        .replace(/to have/g, 'de tener')
        .replace(/participants/g, 'participantes')
        .replace(/from over/g, 'de más de')
        .replace(/countries/g, 'países')
        .replace(/joining us/g, 'acompañándonos')
        .replace(/today/g, 'hoy')
        .replace(/IMPORTANT NOTICE/g, 'AVISO IMPORTANTE')
        .replace(/This area/g, 'Esta área')
        .replace(/is under/g, 'está bajo')
        .replace(/video surveillance/g, 'videovigilancia')
        .replace(/All activities/g, 'Todas las actividades')
        .replace(/are being recorded/g, 'están siendo grabadas')
        .replace(/for security purposes/g, 'por motivos de seguridad')
        .replace(/Please follow/g, 'Por favor siga')
        .replace(/the posted guidelines/g, 'las normas publicadas')
        .replace(/MENU/g, 'MENÚ')
        .replace(/Starter/g, 'Entrante')
        .replace(/Fresh garden salad/g, 'Ensalada fresca del jardín')
        .replace(/with balsamic vinaigrette/g, 'con vinagreta balsámica')
        .replace(/Main Course/g, 'Plato Principal')
        .replace(/Grilled salmon/g, 'Salmón a la parrilla')
        .replace(/with lemon butter sauce/g, 'con salsa de mantequilla y limón')
        .replace(/Dessert/g, 'Postre')
        .replace(/Chocolate mousse/g, 'Mousse de chocolate')
        .replace(/with fresh berries/g, 'con bayas frescas');
    } else if (targetLanguage === 'fr') {
      // French-like modifications
      return text
        .replace(/Welcome/g, 'Bienvenue')
        .replace(/to our/g, 'à notre')
        .replace(/international/g, 'internationale')
        .replace(/conference/g, 'conférence')
        .replace(/artificial intelligence/g, 'intelligence artificielle')
        .replace(/machine learning/g, 'apprentissage automatique')
        .replace(/We are/g, 'Nous sommes')
        .replace(/delighted/g, 'ravis')
        .replace(/to have/g, "d'avoir")
        .replace(/participants/g, 'participants')
        .replace(/from over/g, 'de plus de')
        .replace(/countries/g, 'pays')
        .replace(/joining us/g, 'qui nous rejoignent')
        .replace(/today/g, "aujourd'hui")
        .replace(/IMPORTANT NOTICE/g, 'AVIS IMPORTANT')
        .replace(/This area/g, 'Cette zone')
        .replace(/is under/g, 'est sous')
        .replace(/video surveillance/g, 'vidéosurveillance')
        .replace(/All activities/g, 'Toutes les activités')
        .replace(/are being recorded/g, 'sont enregistrées')
        .replace(/for security purposes/g, 'à des fins de sécurité')
        .replace(/Please follow/g, 'Veuillez suivre')
        .replace(/the posted guidelines/g, 'les directives affichées')
        .replace(/MENU/g, 'MENU')
        .replace(/Starter/g, 'Entrée')
        .replace(/Fresh garden salad/g, 'Salade fraîche du jardin')
        .replace(/with balsamic vinaigrette/g, 'avec vinaigrette balsamique')
        .replace(/Main Course/g, 'Plat Principal')
        .replace(/Grilled salmon/g, 'Saumon grillé')
        .replace(/with lemon butter sauce/g, 'avec sauce au beurre citronné')
        .replace(/Dessert/g, 'Dessert')
        .replace(/Chocolate mousse/g, 'Mousse au chocolat')
        .replace(/with fresh berries/g, 'avec des baies fraîches');
    } else {
      // For other languages, just add a prefix
      return `[Translated from ${sourceLanguage} to ${targetLanguage}]\n\n${text}`;
    }
  };

  return (
    <Container>
      <Title>Image Translation</Title>
      <Subtitle>
        Upload images containing text and our AI will extract and translate the text
        while preserving the context. Perfect for signs, menus, documents, and more.
      </Subtitle>

      <AzureNotice>
        <span>Powered by Team Final Fusion</span>
        - Advanced image text extraction and translation services for our college final year project
      </AzureNotice>

      <LanguageSelectionContainer>
        <LanguageSwitcher />
      </LanguageSelectionContainer>

      {status && (
        <StatusMessage type={status.type}>
          {status.type === 'success' && <FaCheck />}
          {status.type === 'error' && <FaExchangeAlt />}
          {status.type === 'info' && <LoadingSpinner />}
          {status.message}
        </StatusMessage>
      )}

      {!image ? (
        <UploadContainer
          isDragging={isDragging}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
        >
          <UploadIcon>
            <FaImage />
          </UploadIcon>
          <UploadText>Drag & Drop your image here</UploadText>
          <UploadSubtext>or</UploadSubtext>
          <BrowseButton>
            <FaUpload /> Browse Images
          </BrowseButton>
          <FileInput
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/gif,image/webp"
          />
        </UploadContainer>
      ) : (
        <ImagePreviewContainer>
          <ImagePreviewWrapper>
            <ImagePreview src={imagePreview} alt="Preview" />
          </ImagePreviewWrapper>

          <ImageControls>
            <ImageControlButton title="Zoom In">
              <FaSearchPlus />
            </ImageControlButton>
            <ImageControlButton title="Zoom Out">
              <FaSearchMinus />
            </ImageControlButton>
            <ImageControlButton title="Reset">
              <FaRedo />
            </ImageControlButton>
            <ImageControlButton title="Remove Image" onClick={handleRemoveImage}>
              <FaTrash />
            </ImageControlButton>
          </ImageControls>

          <TranslateButton
            onClick={handleTranslate}
            disabled={isTranslating || !image}
          >
            {isTranslating ? (
              <>
                <LoadingSpinner /> Processing Image...
              </>
            ) : (
              <>
                <FaExchangeAlt /> Extract & Translate Text
              </>
            )}
          </TranslateButton>
        </ImagePreviewContainer>
      )}

      {translationResult && (
        <ResultContainer>
          <ResultHeader>
            <ResultTitle>
              <FaCheck /> Translation Result
            </ResultTitle>
            <DownloadButton onClick={handleDownload}>
              <FaDownload /> Download Translation
            </DownloadButton>
          </ResultHeader>

          <ResultContent>
            <ResultPanel>
              <PanelTitle>Extracted Text</PanelTitle>
              <ExtractedText>{translationResult.extractedText}</ExtractedText>
            </ResultPanel>

            <ResultPanel>
              <PanelTitle>Translated Text</PanelTitle>
              <TranslatedText>{translationResult.translatedText}</TranslatedText>
            </ResultPanel>
          </ResultContent>
        </ResultContainer>
      )}
    </Container>
  );
};

export default ImageTranslation;
