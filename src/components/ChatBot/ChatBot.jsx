import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  FaRobot,
  FaPaperPlane,
  FaTimes,
  FaComments,
  FaSearch,
  FaSpinner,
  FaUser,
  FaInfoCircle,
  FaGlobe
} from 'react-icons/fa';
import { predefinedQA, suggestedQuestions, greetings, fallbackMessages } from '../../data/chatbotData';
import { searchWeb } from '../../utils/webSearch';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled Components
const ChatBotContainer = styled.div`
  position: fixed;
  bottom: ${({ isOpen }) => (isOpen ? '20px' : '20px')};
  right: 20px;
  width: ${({ isOpen }) => (isOpen ? '350px' : 'auto')};
  height: ${({ isOpen }) => (isOpen ? '500px' : 'auto')};
  background-color: ${({ theme }) => theme.inputBg};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.cardShadow};
  z-index: 1000;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid ${({ theme }) => theme.borderColor};
  display: flex;
  flex-direction: column;
`;

const ChatBotHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background: ${({ theme }) => theme.primaryGradient};
  color: white;
`;

const ChatBotTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  font-size: 1rem;
`;

const ChatBotIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  animation: ${({ isOpen }) => (isOpen ? 'none' : pulse)} 2s infinite;

  &:hover {
    transform: scale(1.05);
  }
`;

const CloseButton = styled.button`
  background: transparent;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const ChatBotBody = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.borderColor};
    border-radius: 3px;
  }
`;

const Message = styled.div`
  max-width: 80%;
  padding: 10px 15px;
  border-radius: 18px;
  font-size: 0.9rem;
  line-height: 1.4;
  animation: ${fadeIn} 0.3s ease;
  position: relative;

  ${({ isUser, theme }) =>
    isUser
      ? `
      align-self: flex-end;
      background-color: ${theme.primary};
      color: white;
      border-bottom-right-radius: 5px;
    `
      : `
      align-self: flex-start;
      background-color: ${theme.lightBg};
      color: ${theme.textColor};
      border-bottom-left-radius: 5px;
    `}
`;

const MessageTime = styled.div`
  font-size: 0.7rem;
  color: ${({ isUser, theme }) => (isUser ? 'rgba(255, 255, 255, 0.7)' : theme.secondary)};
  margin-top: 5px;
  text-align: ${({ isUser }) => (isUser ? 'right' : 'left')};
`;

const ChatBotFooter = styled.div`
  padding: 15px;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
`;

const InputContainer = styled.form`
  display: flex;
  gap: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px 15px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.textColor};
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primaryOpacity};
  }
`;

const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHoverBg};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.borderColor};
    cursor: not-allowed;
  }
`;

const SuggestedQuestions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 15px;
`;

const SuggestedQuestion = styled.button`
  background-color: ${({ theme }) => theme.primaryOpacity};
  color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.primary}33;
  border-radius: 15px;
  padding: 6px 12px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;

  &:hover {
    background-color: ${({ theme }) => theme.primary}22;
  }
`;

const LoadingSpinner = styled(FaSpinner)`
  animation: ${spin} 1s linear infinite;
`;

const SearchingMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.secondary};
  margin-top: 5px;
  font-style: italic;
`;

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize with a greeting message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
      setMessages([
        {
          text: randomGreeting,
          isUser: false,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [isOpen, messages.length]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChatBot = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const userMessage = {
      text: input,
      isUser: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Process the user's message
    processUserMessage(input);
  };

  const processUserMessage = async (userInput) => {
    // Check if the question matches any predefined Q&A
    const matchedQA = predefinedQA.find(
      (qa) => qa.question.toLowerCase() === userInput.toLowerCase() ||
              qa.question.toLowerCase().includes(userInput.toLowerCase())
    );

    if (matchedQA) {
      // Add a small delay to make it feel more natural
      setTimeout(() => {
        const botMessage = {
          text: matchedQA.answer,
          isUser: false,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages((prev) => [...prev, botMessage]);
      }, 1000);
    } else {
      // If no predefined answer, simulate searching the web
      setIsSearching(true);

      // Add a fallback message
      const randomFallback = fallbackMessages[Math.floor(Math.random() * fallbackMessages.length)];
      setTimeout(() => {
        const fallbackMessage = {
          text: randomFallback,
          isUser: false,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages((prev) => [...prev, fallbackMessage]);
      }, 1000);

      // Search the web for an answer (simulated)
      searchForAnswer(userInput).then(answer => {
        setIsSearching(false);

        const botMessage = {
          text: answer,
          isUser: false,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages((prev) => [...prev, botMessage]);
      }).catch(error => {
        setIsSearching(false);
        console.error('Error in web search:', error);

        const errorMessage = {
          text: "I'm sorry, I encountered an error while searching. Please try again later.",
          isUser: false,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages((prev) => [...prev, errorMessage]);
      });
    }
  };

  // Function to search the web for non-predefined questions
  const searchForAnswer = async (question) => {
    try {
      // In a real application, this would be an actual API call to a search service
      const searchResult = await searchWeb(question);
      return searchResult;
    } catch (error) {
      console.error('Error searching for answer:', error);
      return "I'm sorry, I couldn't find information about that. Please try asking something else or contact our support team for assistance.";
    }
  };

  const handleSuggestedQuestionClick = (question) => {
    setInput(question);

    // Automatically submit the question
    const userMessage = {
      text: question,
      isUser: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);

    // Process the user's message
    processUserMessage(question);
  };

  return (
    <ChatBotContainer isOpen={isOpen}>
      {isOpen ? (
        <>
          <ChatBotHeader>
            <ChatBotTitle>
              <FaGlobe size={20} />
              Final Fusion Assistant
            </ChatBotTitle>
            <CloseButton onClick={toggleChatBot}>
              <FaTimes />
            </CloseButton>
          </ChatBotHeader>

          <ChatBotBody>
            {messages.map((message, index) => (
              <Message key={index} isUser={message.isUser}>
                {message.text}
                <MessageTime isUser={message.isUser}>{message.time}</MessageTime>
              </Message>
            ))}

            {isSearching && (
              <SearchingMessage>
                <LoadingSpinner size={12} />
                Searching for an answer...
              </SearchingMessage>
            )}

            {messages.length === 1 && (
              <SuggestedQuestions>
                {suggestedQuestions.map((question, index) => (
                  <SuggestedQuestion
                    key={index}
                    onClick={() => handleSuggestedQuestionClick(question)}
                  >
                    {question}
                  </SuggestedQuestion>
                ))}
              </SuggestedQuestions>
            )}

            <div ref={messagesEndRef} />
          </ChatBotBody>

          <ChatBotFooter>
            <InputContainer onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="Type your question..."
                value={input}
                onChange={handleInputChange}
              />
              <SendButton type="submit" disabled={input.trim() === ''}>
                <FaPaperPlane size={16} />
              </SendButton>
            </InputContainer>
          </ChatBotFooter>
        </>
      ) : (
        <ChatBotIcon onClick={toggleChatBot} isOpen={isOpen}>
          <FaComments size={20} />
        </ChatBotIcon>
      )}
    </ChatBotContainer>
  );
};

export default ChatBot;
