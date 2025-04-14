import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import {
  FaGlobe,
  FaUsers,
  FaRocket,
  FaLightbulb,
  FaShieldAlt,
  FaChartLine,
  FaArrowRight,
  FaGithub
} from 'react-icons/fa';
import { APP_NAME, APP_TAGLINE, GITHUB_URL } from '../../utils/constants';

// Import team member images
import imageA from '../../assets/a.jpeg';
import imageB from '../../assets/b.jpeg';
import imageC from '../../assets/c.jpeg';
import imageD from '../../assets/d.jpeg';
import imageE from '../../assets/e.jpeg';

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

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Styled Components
const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  animation: ${fadeIn} 0.6s ease-out;
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 5rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -30px;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.primary}33, transparent);
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
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
  font-size: 1.5rem;
  color: ${({ theme }) => theme.secondary};
  max-width: 800px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const GlobeIcon = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto 2rem;
  position: relative;
  animation: ${float} 5s infinite ease-in-out;

  svg {
    font-size: 5rem;
    color: ${({ theme }) => theme.primary};
    animation: ${rotate} 20s linear infinite;
    filter: drop-shadow(0 0 20px ${({ theme }) => theme.primary}77);
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150%;
    height: 150%;
    background: radial-gradient(circle, ${({ theme }) => theme.primary}22 0%, transparent 70%);
    border-radius: 50%;
    z-index: -1;
  }
`;

const MissionSection = styled.div`
  margin-bottom: 5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MissionContent = styled.div`
  animation: ${fadeIn} 0.6s ease-out;
  animation-delay: 0.2s;
  opacity: 0;
  animation-fill-mode: forwards;
`;

const MissionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.textColor};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 80px;
    height: 3px;
    background: ${({ theme }) => theme.primaryGradient};
    border-radius: 3px;
  }
`;

const MissionText = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.secondary};
  line-height: 1.8;
  margin-bottom: 1.5rem;
`;

const MissionImage = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.cardShadow};
  animation: ${fadeIn} 0.6s ease-out;
  animation-delay: 0.4s;
  opacity: 0;
  animation-fill-mode: forwards;

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const FeaturesSection = styled.div`
  margin-bottom: 5rem;
`;

const FeaturesTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: ${({ theme }) => theme.primaryGradient};
    border-radius: 3px;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.6s ease-out;
  animation-delay: ${({ index }) => `${0.2 + index * 0.1}s`};
  opacity: 0;
  animation-fill-mode: forwards;

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

const FeatureIcon = styled.div`
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

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.textColor};
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.secondary};
  line-height: 1.6;
`;

const TeamSection = styled.div`
  margin-bottom: 5rem;
  text-align: center;
`;

const TeamTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const TeamDescription = styled.p`
  max-width: 800px;
  margin: 0 auto 3rem;
  color: ${({ theme }) => theme.secondary};
  font-size: 1.1rem;
  line-height: 1.6;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const TeamMember = styled.div`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid ${({ isGuide, theme }) => isGuide ? `${theme.primary}33` : 'rgba(255, 255, 255, 0.1)'};
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.6s ease-out;
  animation-delay: ${({ index }) => `${0.2 + index * 0.1}s`};
  opacity: 0;
  animation-fill-mode: forwards;
  box-shadow: ${({ isGuide, theme }) => isGuide ? `0 0 20px ${theme.primary}22` : 'none'};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.cardShadow};
    border-color: ${({ theme }) => theme.primary}33;
  }
`;

const MemberAvatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  background: ${({ theme }) => theme.primaryGradient};
  position: relative;
  overflow: hidden;
  border: 3px solid ${({ theme }) => theme.primary}33;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const MemberName = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.textColor};
`;

const MemberRole = styled.p`
  color: ${({ isGuide, theme }) => isGuide ? theme.success : theme.primary};
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &::before {
    content: ${({ isGuide }) => isGuide ? '"👨‍🏫"' : '""'};
    display: ${({ isGuide }) => isGuide ? 'inline' : 'none'};
  }
`;

const MemberBio = styled.p`
  color: ${({ theme }) => theme.secondary};
  font-size: 0.9rem;
  line-height: 1.6;
`;

const CTASection = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => `radial-gradient(circle at center, ${theme.primary}11 0%, transparent 70%)`};
    z-index: -1;
  }
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.textColor};
`;

const CTADescription = styled.p`
  max-width: 700px;
  margin: 0 auto 2rem;
  color: ${({ theme }) => theme.secondary};
  font-size: 1.2rem;
  line-height: 1.6;
`;

const CTAButton = styled(Link)`
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
  margin-right: 1rem;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3);
    text-decoration: none;
  }
`;

const CTALink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.textColor};
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    transform: translateY(-3px);
    background: rgba(255, 255, 255, 0.15);
    border-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
  }
`;

// Feature data
const features = [
  {
    icon: <FaGlobe />,
    title: "100+ Languages",
    description: "Translate between over 100 languages with high accuracy and natural-sounding results."
  },
  {
    icon: <FaRocket />,
    title: "Lightning Fast",
    description: "Get instant translations powered by our advanced neural machine translation technology."
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure & Private",
    description: "Your data is encrypted and protected. We prioritize your privacy and security."
  },
  {
    icon: <FaLightbulb />,
    title: "Smart Features",
    description: "Enjoy intelligent features like auto-language detection, pronunciation guides, and more."
  },
  {
    icon: <FaUsers />,
    title: "Collaborative",
    description: "Share translations with your team and collaborate on projects seamlessly."
  },
  {
    icon: <FaChartLine />,
    title: "Continuous Improvement",
    description: "Our translation models are constantly learning and improving for better results."
  }
];

// Team data for college project
const team = [
  {
    name: "Ritesh Raj",
    role: "Documentation Lead",
    bio: "Ritesh manages project documentation and ensures all technical specifications are clearly communicated. He also contributes to the application's architecture design.",
    avatar: imageA // Using the imported image A
  },
  {
    name: "Ashwin Patel",
    role: "Technical Lead",
    bio: "Ashwin leads the technical implementation of the project, focusing on backend development and integration of translation APIs. He specializes in system architecture and performance optimization.",
    avatar: imageB // Using the imported image B
  },
  {
    name: "Anshita Tripathi",
    role: "Frontend Expert",
    bio: "Anshita is responsible for the user interface and experience design. She has implemented the React components and ensures the application is responsive across all devices.",
    avatar: imageC // Using the imported image C
  },
  {
    name: "Prof. Shankar Madkar",
    role: "Project Guide",
    bio: "Prof. Madkar provides guidance and mentorship to the team throughout the development process. His expertise in language processing and web technologies has been invaluable to the project's success.",
    avatar: imageD, // Using the imported image D for the professor
    isGuide: true
  }
];

const About = () => {
  return (
    <AboutContainer>
      <HeroSection>
        <GlobeIcon>
          <FaGlobe />
        </GlobeIcon>
        <Title>About {APP_NAME}</Title>
        <Subtitle>
          {APP_TAGLINE}. A final year engineering project designed to break language barriers and facilitate global communication.
        </Subtitle>
      </HeroSection>

      <MissionSection>
        <MissionContent>
          <MissionTitle>Our Project</MissionTitle>
          <MissionText>
            {APP_NAME} is our final year engineering project at Bharati Vidyapeeth College of Engineering, developed under the guidance of Prof. Shankar Madkar. We set out to create a comprehensive language translation tool that addresses real-world communication challenges.
          </MissionText>
          <MissionText>
            As a team of passionate engineering students, we've combined our knowledge of React, machine learning, and natural language processing to build this application. Our goal was to apply theoretical concepts learned throughout our academic journey to create something practical and impactful.
          </MissionText>
          <MissionText>
            This project represents the culmination of our undergraduate studies, showcasing our technical skills, teamwork, and problem-solving abilities. We hope that {APP_NAME} demonstrates our readiness to transition from academic learning to professional application development.
          </MissionText>
        </MissionContent>

        <MissionImage>
          <img src={imageE} alt="Mission illustration" />
        </MissionImage>
      </MissionSection>

      <FeaturesSection>
        <FeaturesTitle>What Sets Us Apart</FeaturesTitle>

        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index} index={index}>
              <FeatureIcon>
                {feature.icon}
              </FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </FeaturesSection>

      <TeamSection>
        <TeamTitle>Meet Our Team</TeamTitle>
        <TeamDescription>
          {APP_NAME} is a college project developed by a passionate team of computer science students under the guidance of Prof. Shankar Madkar. This project demonstrates our ability to create innovative solutions for real-world language barriers using modern web technologies and AI-powered translation services.
        </TeamDescription>

        <TeamGrid>
          {team.map((member, index) => (
            <TeamMember key={index} index={index} isGuide={member.isGuide}>
              <MemberAvatar>
                <img src={member.avatar} alt={member.name} />
              </MemberAvatar>
              <MemberName>{member.name}</MemberName>
              <MemberRole isGuide={member.isGuide}>{member.role}</MemberRole>
              <MemberBio>{member.bio}</MemberBio>
            </TeamMember>
          ))}
        </TeamGrid>
      </TeamSection>

      <CTASection>
        <CTATitle>Explore Our Final Year Project</CTATitle>
        <CTADescription>
          {APP_NAME} showcases our engineering skills and passion for solving real-world problems. We welcome feedback from professors, peers, and potential employers!
        </CTADescription>
        <CTAButton to="/translate">
          Try Our Translator <FaArrowRight />
        </CTAButton>
        <CTALink href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
          <FaGithub /> View Source Code
        </CTALink>
      </CTASection>
    </AboutContainer>
  );
};

export default About;
