// Modern color palette
const colors = {
  // Primary colors
  blue: {
    50: '#e8f0fe',
    100: '#d2e3fc',
    200: '#a8c7fa',
    300: '#7eabf8',
    400: '#5490f6',
    500: '#4285f4', // Primary blue
    600: '#3367d6',
    700: '#2a56c6',
    800: '#1e47a8',
    900: '#183885'
  },
  red: {
    50: '#fce8e6',
    100: '#fad2cf',
    200: '#f6a59f',
    300: '#f2786f',
    400: '#ee4c3f',
    500: '#ea4335', // Primary red
    600: '#d93025',
    700: '#c5221f',
    800: '#b31412',
    900: '#a50e0e'
  },
  green: {
    50: '#e6f4ea',
    100: '#ceead6',
    200: '#9ddcac',
    300: '#6cce83',
    400: '#3bc159',
    500: '#34a853', // Primary green
    600: '#2d9644',
    700: '#188038',
    800: '#137333',
    900: '#0d652d'
  },
  yellow: {
    50: '#fef7e0',
    100: '#feefc3',
    200: '#fde293',
    300: '#fdd663',
    400: '#fcc934',
    500: '#fbbc05', // Primary yellow
    600: '#f9ab00',
    700: '#f29900',
    800: '#ea8600',
    900: '#e37400'
  },
  // Neutral colors
  gray: {
    50: '#f8f9fa',
    100: '#f1f3f4',
    200: '#e8eaed',
    300: '#dadce0',
    400: '#bdc1c6',
    500: '#9aa0a6',
    600: '#80868b',
    700: '#5f6368',
    800: '#3c4043',
    900: '#202124'
  },
  // Additional colors
  purple: {
    500: '#9c27b0'
  },
  teal: {
    500: '#46bdc6'
  },
  orange: {
    500: '#ff6d01'
  },
  brown: {
    500: '#795548'
  }
};

// Light theme
export const lightTheme = {
  // Brand colors
  primary: colors.blue[500],
  secondary: colors.gray[700],
  success: colors.green[500],
  warning: colors.yellow[500],
  danger: colors.red[500],
  info: colors.teal[500],

  // Additional brand colors
  purple: colors.purple[500],
  teal: colors.teal[500],
  orange: colors.orange[500],
  brown: colors.brown[500],

  // Background colors
  background: colors.gray[100],
  textColor: colors.gray[900],
  lightText: colors.gray[50],
  inputBg: '#ffffff',
  darkInputBg: colors.gray[800],
  lightBg: '#ffffff',
  darkBg: colors.gray[900],

  // UI elements
  borderColor: colors.gray[300],
  headerBg: 'linear-gradient(135deg, #4285f4, #0d47a1)',
  footerBg: '#ffffff',
  buttonHoverBg: colors.blue[600],
  buttonActiveBg: colors.blue[700],

  // Effects
  boxShadow: '0 2px 10px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.12)',
  cardShadow: '0 4px 20px rgba(0,0,0,0.05), 0 2px 6px rgba(0,0,0,0.03)',
  transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',

  // Gradients
  primaryGradient: 'linear-gradient(135deg, #4285f4, #0d47a1)',
  successGradient: 'linear-gradient(135deg, #34a853, #0d652d)',
  warningGradient: 'linear-gradient(135deg, #fbbc05, #e37400)',
  dangerGradient: 'linear-gradient(135deg, #ea4335, #a50e0e)',
  infoGradient: 'linear-gradient(135deg, #46bdc6, #1a8e99)',

  // Opacity variants
  primaryOpacity: 'rgba(66, 133, 244, 0.1)',
  successOpacity: 'rgba(52, 168, 83, 0.1)',
  warningOpacity: 'rgba(251, 188, 5, 0.1)',
  dangerOpacity: 'rgba(234, 67, 53, 0.1)',
  infoOpacity: 'rgba(70, 189, 198, 0.1)',
};

// Dark theme
export const darkTheme = {
  // Brand colors
  primary: colors.blue[300],
  secondary: colors.gray[500],
  success: colors.green[300],
  warning: colors.yellow[300],
  danger: colors.red[300],
  info: '#5ccad5',

  // Additional brand colors
  purple: '#ce93d8',
  teal: '#80deea',
  orange: '#ffab91',
  brown: '#bcaaa4',

  // Background colors
  background: colors.gray[900],
  textColor: colors.gray[200],
  lightText: colors.gray[50],
  inputBg: colors.gray[800],
  darkInputBg: colors.gray[800],
  lightBg: colors.gray[800],
  darkBg: colors.gray[900],

  // UI elements
  borderColor: colors.gray[700],
  headerBg: 'linear-gradient(135deg, #1a73e8, #0d47a1)',
  footerBg: colors.gray[900],
  buttonHoverBg: colors.blue[400],
  buttonActiveBg: colors.blue[500],

  // Effects
  boxShadow: '0 4px 12px rgba(0,0,0,0.3), 0 1px 4px rgba(0,0,0,0.2)',
  cardShadow: '0 8px 24px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.1)',
  transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',

  // Gradients
  primaryGradient: 'linear-gradient(135deg, #5490f6, #1a73e8)',
  successGradient: 'linear-gradient(135deg, #6cce83, #34a853)',
  warningGradient: 'linear-gradient(135deg, #fdd663, #fbbc05)',
  dangerGradient: 'linear-gradient(135deg, #f2786f, #ea4335)',
  infoGradient: 'linear-gradient(135deg, #80deea, #46bdc6)',

  // Opacity variants
  primaryOpacity: 'rgba(126, 171, 248, 0.15)',
  successOpacity: 'rgba(108, 206, 131, 0.15)',
  warningOpacity: 'rgba(253, 214, 99, 0.15)',
  dangerOpacity: 'rgba(242, 120, 111, 0.15)',
  infoOpacity: 'rgba(92, 202, 213, 0.15)',
};
