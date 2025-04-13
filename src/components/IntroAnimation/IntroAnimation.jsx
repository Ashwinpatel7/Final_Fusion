import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { APP_NAME } from '../../utils/constants';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const drawLine = keyframes`
  0% { stroke-dashoffset: 1000; }
  100% { stroke-dashoffset: 0; }
`;

const animateDots = keyframes`
  0% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
  70% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(1.5); }
`;

// Styled Components
const AnimationContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.darkBg};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: ${({ isClosing }) => (isClosing ? fadeOut : fadeIn)} 0.8s ease-in-out;
`;

const GlobeContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin-bottom: 2rem;
  animation: ${float} 3s ease-in-out infinite;
`;

const Globe = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #3730a3);
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(99, 102, 241, 0.5), inset 0 0 30px rgba(255, 255, 255, 0.2);
  animation: ${rotate} 30s linear infinite;
  will-change: transform;

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 70%);
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,50 Q25,30 50,50 T100,50' fill='none' stroke='rgba(255,255,255,0.2)' stroke-width='0.5'/%3E%3Cpath d='M0,70 Q25,50 50,70 T100,70' fill='none' stroke='rgba(255,255,255,0.2)' stroke-width='0.5'/%3E%3Cpath d='M0,30 Q25,10 50,30 T100,30' fill='none' stroke='rgba(255,255,255,0.2)' stroke-width='0.5'/%3E%3C/svg%3E");
    background-size: 100% 100%;
    opacity: 0.5;
  }
`;

const Meridians = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.7;
`;

const ConnectionDot = styled.div`
  position: absolute;
  width: ${({ size }) => size || '6px'};
  height: ${({ size }) => size || '6px'};
  background-color: ${({ color, theme }) => color || theme.primary};
  border-radius: 50%;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  opacity: 0;
  transform: scale(0);
  animation: ${animateDots} ${({ delay }) => delay || '3s'} ease-in-out infinite;
  animation-delay: ${({ animDelay }) => animDelay || '0s'};
  box-shadow: 0 0 10px ${({ color, theme }) => color || theme.primary};
  z-index: 2;
`;

const ConnectionLine = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  path {
    stroke: ${({ theme }) => theme.primary};
    stroke-width: 1;
    fill: none;
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: ${drawLine} 3s ease-in-out forwards;
    animation-delay: ${({ delay }) => delay || '0s'};
    opacity: 0.6;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: white;
  margin-bottom: 1rem;
  text-align: center;
  opacity: 0;
  animation: ${fadeIn} 1s ease-in-out forwards;
  animation-delay: 1s;
  background: linear-gradient(to right, #a5b4fc, #818cf8, #6366f1);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 700;
  letter-spacing: -0.5px;
  text-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
`;

const Tagline = styled.p`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.lightText};
  text-align: center;
  max-width: 600px;
  opacity: 0;
  animation: ${fadeIn} 1s ease-in-out forwards;
  animation-delay: 1.5s;
  margin-bottom: 2rem;
`;

const IntroAnimation = ({ onComplete }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Start closing animation after 3 seconds (reduced from 5 seconds for better UX)
    const timer = setTimeout(() => {
      setIsClosing(true);

      // Call onComplete after animation finishes
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 800); // Match the fadeOut animation duration
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Generate random positions for connection dots (reduced count for better performance)
  const generateDots = (count) => {
    const dots = [];
    for (let i = 0; i < count; i++) {
      dots.push({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 4 + 3}px`,
        delay: `${Math.random() * 3 + 2}s`,
        animDelay: `${Math.random() * 2}s`,
        color: i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#34d399' : '#f472b6'
      });
    }
    return dots;
  };

  const dots = generateDots(8); // Reduced from 15 to 8 dots

  return (
    <AnimationContainer isClosing={isClosing}>
      <GlobeContainer>
        <Globe />

        <Meridians viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <ellipse cx="100" cy="100" rx="80" ry="30" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <ellipse cx="100" cy="100" rx="80" ry="30" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" transform="rotate(60,100,100)" />
          <ellipse cx="100" cy="100" rx="80" ry="30" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" transform="rotate(120,100,100)" />
        </Meridians>

        {dots.map((dot) => (
          <ConnectionDot
            key={dot.id}
            top={dot.top}
            left={dot.left}
            size={dot.size}
            delay={dot.delay}
            animDelay={dot.animDelay}
            color={dot.color}
          />
        ))}

        <ConnectionLine delay="0.5s">
          <path d="M100,100 C130,70 160,90 180,60" />
        </ConnectionLine>

        <ConnectionLine delay="1s">
          <path d="M100,100 C70,130 40,110 20,140" />
        </ConnectionLine>

        <ConnectionLine delay="1.5s">
          <path d="M100,100 C130,130 160,110 180,140" />
        </ConnectionLine>

        <ConnectionLine delay="2s">
          <path d="M100,100 C70,70 40,90 20,60" />
        </ConnectionLine>
      </GlobeContainer>

      <Title>{APP_NAME}</Title>
      <Tagline>The world is small. We make it smaller.</Tagline>
    </AnimationContainer>
  );
};

export default IntroAnimation;
