import React, { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  FaFileUpload,
  FaFileAlt,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileImage,
  FaFileCode,
  FaTrash,
  FaDownload,
  FaSpinner,
  FaExchangeAlt,
  FaCheck
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

const FilePreviewContainer = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  animation: ${fadeIn} 0.5s ease-out;
`;

const FilePreview = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 1rem;
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const FileIconContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background: ${({ theme }) => theme.primaryOpacity};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.primary};
`;

const FileDetails = styled.div``;

const FileName = styled.p`
  font-weight: 500;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 0.25rem;
`;

const FileSize = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.secondary};
`;

const FileActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.secondary};
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0.5rem;
  border-radius: 50%;

  &:hover {
    color: ${({ theme, danger }) => danger ? theme.danger : theme.primary};
    background: ${({ theme, danger }) => danger ? theme.dangerOpacity : theme.primaryOpacity};
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

const ResultPreview = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-height: 500px;
  overflow-y: auto;

  pre {
    white-space: pre-wrap;
    word-break: break-word;
    color: ${({ theme }) => theme.textColor};
    font-family: var(--font-mono);
    font-size: 0.9rem;
    line-height: 1.6;
  }
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

// Helper function to format file size
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Helper function to get file icon based on file type
const getFileIcon = (fileName) => {
  const extension = fileName.split('.').pop().toLowerCase();

  switch (extension) {
    case 'pdf':
      return <FaFilePdf />;
    case 'doc':
    case 'docx':
      return <FaFileWord />;
    case 'xls':
    case 'xlsx':
      return <FaFileExcel />;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return <FaFileImage />;
    case 'html':
    case 'css':
    case 'js':
    case 'json':
    case 'xml':
      return <FaFileCode />;
    default:
      return <FaFileAlt />;
  }
};

const DocumentTranslation = () => {
  const dispatch = useDispatch();
  const { sourceLanguage, targetLanguage } = useSelector(state => state.translation);

  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationResult, setTranslationResult] = useState(null);
  const [status, setStatus] = useState(null);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (file) => {
    // Check file type
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'text/html',
      'text/csv'
    ];

    if (!validTypes.includes(file.type)) {
      setStatus({
        type: 'error',
        message: 'Unsupported file type. Please upload PDF, DOC, DOCX, TXT, HTML, or CSV files.'
      });
      return;
    }

    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setStatus({
        type: 'error',
        message: 'File size exceeds 10MB limit. Please upload a smaller file.'
      });
      return;
    }

    setFile(file);
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
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setTranslationResult(null);
    setStatus(null);
  };

  const handleTranslate = async () => {
    if (!file) return;

    setIsTranslating(true);
    setStatus({
      type: 'info',
      message: 'Translating document...'
    });

    try {
      // In a real application, you would upload the file to a server for translation
      // For this demo, we'll simulate the translation process

      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      // For demo purposes, we'll just read the file and show its content
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target.result;

        // In a real app, this would be the translated content from the API
        // For demo, we'll just add a prefix to show it's "translated"
        const translatedContent = `[Translated from ${sourceLanguage} to ${targetLanguage}]\n\n${content}`;

        setTranslationResult({
          originalFileName: file.name,
          translatedContent,
          translatedFileName: `translated_${file.name}`
        });

        setStatus({
          type: 'success',
          message: 'Document translated successfully!'
        });
      };

      reader.onerror = () => {
        setStatus({
          type: 'error',
          message: 'Error reading file. Please try again.'
        });
      };

      // Read as text for demo purposes
      // In a real app, you'd handle different file types appropriately
      reader.readAsText(file);
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

    // Create a blob from the translated content
    const blob = new Blob([translationResult.translatedContent], { type: 'text/plain' });

    // Create a download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = translationResult.translatedFileName;
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Container>
      <Title>Document Translation</Title>
      <Subtitle>
        Upload documents in various formats and translate them while preserving formatting.
        Supported formats include PDF, Word, TXT, HTML, and CSV.
      </Subtitle>

      <AzureNotice>
        <span>Powered by Team Final Fusion</span>
        - Advanced document translation services for our college final year project
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

      {!file ? (
        <UploadContainer
          isDragging={isDragging}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
        >
          <UploadIcon>
            <FaFileUpload />
          </UploadIcon>
          <UploadText>Drag & Drop your document here</UploadText>
          <UploadSubtext>or</UploadSubtext>
          <BrowseButton>
            <FaFileAlt /> Browse Files
          </BrowseButton>
          <FileInput
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.txt,.html,.csv"
          />
        </UploadContainer>
      ) : (
        <FilePreviewContainer>
          <FilePreview>
            <FileInfo>
              <FileIconContainer>
                {getFileIcon(file.name)}
              </FileIconContainer>
              <FileDetails>
                <FileName>{file.name}</FileName>
                <FileSize>{formatFileSize(file.size)}</FileSize>
              </FileDetails>
            </FileInfo>
            <FileActions>
              <ActionButton danger onClick={handleRemoveFile}>
                <FaTrash />
              </ActionButton>
            </FileActions>
          </FilePreview>

          <TranslateButton
            onClick={handleTranslate}
            disabled={isTranslating || !file}
          >
            {isTranslating ? (
              <>
                <LoadingSpinner /> Translating...
              </>
            ) : (
              <>
                <FaExchangeAlt /> Translate Document
              </>
            )}
          </TranslateButton>
        </FilePreviewContainer>
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

          <ResultPreview>
            <pre>{translationResult.translatedContent}</pre>
          </ResultPreview>
        </ResultContainer>
      )}
    </Container>
  );
};

export default DocumentTranslation;
