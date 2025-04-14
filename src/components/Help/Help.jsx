import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import {
  FaQuestionCircle,
  FaBook,
  FaVideo,
  FaHeadset,
  FaLightbulb,
  FaChevronDown,
  FaChevronUp,
  FaSearch,
  FaArrowRight,
  FaGithub,
  FaBug
} from 'react-icons/fa';
import { APP_NAME, GITHUB_URL, SUPPORT_EMAIL } from '../../utils/constants';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// Styled Components
const HelpContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  animation: ${fadeIn} 0.6s ease-out;
`;

const HelpHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.primary}33, transparent);
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  background: linear-gradient(to right, ${({ theme }) => theme.primary}, ${({ theme }) => theme.purple}, ${({ theme }) => theme.primary});
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 800;
  letter-spacing: -1px;
  animation: ${shimmer} 5s linear infinite;
  display: inline-block;
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.secondary};
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto 3rem;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1.5rem 1rem 3rem;
  border-radius: 50px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  color: ${({ theme }) => theme.textColor};
  font-size: 1.1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primaryOpacity};
    border-color: ${({ theme }) => theme.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.secondary};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.secondary};
  font-size: 1.1rem;
`;

const HelpGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const HelpCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.neonGlow}, ${({ theme }) => theme.cardShadow};
    border-color: ${({ theme }) => theme.primary};

    svg {
      animation: ${float} 3s infinite ease-in-out;
      color: ${({ theme }) => theme.primary};
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ theme }) => theme.primaryGradient};
    opacity: 0;
    transition: all 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const CardIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;

  svg {
    font-size: 1.8rem;
    color: ${({ theme }) => theme.primary};
    transition: all 0.3s ease;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.textColor};
`;

const CardDescription = styled.p`
  color: ${({ theme }) => theme.secondary};
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const CardLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(5px);
    text-decoration: none;
  }
`;

const FAQSection = styled.div`
  margin-top: 4rem;
`;

const FAQTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: ${({ theme }) => theme.primaryGradient};
    border-radius: 3px;
  }
`;

const FAQItem = styled.div`
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.primary}33;
  }
`;

const FAQQuestion = styled.div`
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.03);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const QuestionText = styled.h4`
  margin: 0;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textColor};
`;

const FAQAnswer = styled.div`
  padding: 0 1.5rem;
  max-height: ${({ isOpen }) => (isOpen ? '500px' : '0')};
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(0, 0, 0, 0.1);

  p {
    padding: 1.5rem 0;
    margin: 0;
    color: ${({ theme }) => theme.secondary};
    line-height: 1.6;
  }
`;

const ContactSection = styled.div`
  margin-top: 4rem;
  text-align: center;
`;

const ContactTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const ContactDescription = styled.p`
  max-width: 600px;
  margin: 0 auto 2rem;
  color: ${({ theme }) => theme.secondary};
  line-height: 1.6;
`;

const ContactButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.primaryGradient};
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3);
    text-decoration: none;
  }
`;

// FAQ data
const faqData = [
  {
    question: "How do I translate text using Final Fusion Translator?",
    answer: "To translate text, simply navigate to the Text Translation section, enter your text in the input field, select your source and target languages, and click the Translate button. Your translated text will appear in the output field."
  },
  {
    question: "What languages are supported by Final Fusion Translator?",
    answer: "Final Fusion Translator supports over 100 languages, including major languages like English, Spanish, French, German, Chinese, Japanese, Arabic, Russian, and many more. You can select your desired language from the dropdown menu or language tiles."
  },
  {
    question: "How accurate are the translations?",
    answer: "Final Fusion Translator uses advanced neural machine translation technology to provide highly accurate translations. However, like any translation service, it may not always capture nuances, idioms, or cultural context perfectly. For critical or professional translations, we recommend having a human translator review the output."
  },
  {
    question: "Can I translate documents and images?",
    answer: "Yes! Final Fusion Translator supports document translation for formats like PDF, DOCX, and TXT. For images containing text, you can use our Image Translation feature to extract and translate the text. Simply upload your document or image and select your target language."
  },
  {
    question: "Is my data secure when using Final Fusion Translator?",
    answer: "We take data security very seriously. Your translations are encrypted during transmission and we do not store them permanently unless you explicitly save them to your account. Please refer to our Privacy Policy for more details on how we handle your data."
  }
];

const Help = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <HelpContainer>
      <HelpHeader>
        <Title>How Can We Help?</Title>
        <Subtitle>
          Find answers to common questions and learn how to make the most of {APP_NAME}
        </Subtitle>
      </HelpHeader>

      <SearchContainer>
        <SearchIcon>
          <FaSearch />
        </SearchIcon>
        <SearchInput
          type="text"
          placeholder="Search for help topics..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </SearchContainer>

      <HelpGrid>
        <HelpCard>
          <CardIcon>
            <FaBook />
          </CardIcon>
          <CardTitle>Documentation</CardTitle>
          <CardDescription>
            Explore our comprehensive guides and documentation to learn all about {APP_NAME}'s features and capabilities.
          </CardDescription>
          <CardLink to="/documentation">
            Browse Documentation <FaArrowRight />
          </CardLink>
        </HelpCard>

        <HelpCard>
          <CardIcon>
            <FaVideo />
          </CardIcon>
          <CardTitle>Video Tutorials</CardTitle>
          <CardDescription>
            Watch step-by-step video tutorials to see {APP_NAME} in action and learn how to use all its features.
          </CardDescription>
          <CardLink to="/tutorials">
            Watch Tutorials <FaArrowRight />
          </CardLink>
        </HelpCard>

        <HelpCard>
          <CardIcon>
            <FaLightbulb />
          </CardIcon>
          <CardTitle>Tips & Tricks</CardTitle>
          <CardDescription>
            Discover expert tips and tricks to enhance your translation experience and boost productivity.
          </CardDescription>
          <CardLink to="/tips">
            View Tips <FaArrowRight />
          </CardLink>
        </HelpCard>

        <HelpCard>
          <CardIcon>
            <FaHeadset />
          </CardIcon>
          <CardTitle>Support</CardTitle>
          <CardDescription>
            Need personalized help? Our support team is ready to assist you with any questions or issues.
          </CardDescription>
          <CardLink to="/support">
            Contact Support <FaArrowRight />
          </CardLink>
        </HelpCard>

        <HelpCard>
          <CardIcon>
            <FaGithub />
          </CardIcon>
          <CardTitle>GitHub Repository</CardTitle>
          <CardDescription>
            Access our source code, report issues, or contribute to the project on GitHub.
          </CardDescription>
          <CardLink as="a" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            View on GitHub <FaArrowRight />
          </CardLink>
        </HelpCard>

        <HelpCard>
          <CardIcon>
            <FaBug />
          </CardIcon>
          <CardTitle>Report an Issue</CardTitle>
          <CardDescription>
            Found a bug or have a suggestion? Let us know so we can improve the application.
          </CardDescription>
          <CardLink as="a" href={`mailto:${SUPPORT_EMAIL}?subject=Issue Report: Final Fusion Translator&body=Issue Description:%0A%0ASteps to Reproduce:%0A%0AExpected Behavior:%0A%0AActual Behavior:%0A%0ABrowser/Device Information:%0A`} target="_blank" rel="noopener noreferrer">
            Report Issue <FaArrowRight />
          </CardLink>
        </HelpCard>
      </HelpGrid>

      <FAQSection>
        <FAQTitle>Frequently Asked Questions</FAQTitle>

        {faqData.map((faq, index) => (
          <FAQItem key={index}>
            <FAQQuestion onClick={() => toggleFAQ(index)}>
              <QuestionText>{faq.question}</QuestionText>
              {openFAQ === index ? <FaChevronUp /> : <FaChevronDown />}
            </FAQQuestion>
            <FAQAnswer isOpen={openFAQ === index}>
              <p>{faq.answer}</p>
            </FAQAnswer>
          </FAQItem>
        ))}
      </FAQSection>

      <ContactSection>
        <ContactTitle>Still Need Help?</ContactTitle>
        <ContactDescription>
          If you couldn't find what you're looking for, our support team is always ready to help you with any questions or issues.
        </ContactDescription>
        <ContactButton href={`mailto:${SUPPORT_EMAIL}`}>
          <FaHeadset /> Contact Support
        </ContactButton>
      </ContactSection>
    </HelpContainer>
  );
};

export default Help;
