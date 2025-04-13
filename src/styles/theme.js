// Futuristic color palette
const colors = {
  // Primary colors
  cosmic: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1', // Primary cosmic blue
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81'
  },
  nova: {
    50: '#fdf2f8',
    100: '#fce7f3',
    200: '#fbcfe8',
    300: '#f9a8d4',
    400: '#f472b6',
    500: '#ec4899', // Vibrant pink
    600: '#db2777',
    700: '#be185d',
    800: '#9d174d',
    900: '#831843'
  },
  aurora: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981', // Vibrant teal
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b'
  },
  solar: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b', // Vibrant amber
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f'
  },
  // Neutral colors - Space inspired
  space: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617' // Deep space
  },
  // Additional colors
  nebula: {
    500: '#8b5cf6', // Purple
    600: '#7c3aed'
  },
  plasma: {
    500: '#06b6d4', // Cyan
    600: '#0891b2'
  },
  meteor: {
    500: '#ef4444', // Red
    600: '#dc2626'
  },
  galaxy: {
    500: '#8b5cf6', // Purple
    600: '#7c3aed'
  }
};

// Light theme - Futuristic inspired
export const lightTheme = {
  // Brand colors
  primary: colors.cosmic[500],
  secondary: colors.space[600],
  success: colors.aurora[500],
  warning: colors.solar[500],
  danger: colors.meteor[500],
  info: colors.plasma[500],

  // Additional brand colors
  purple: colors.nebula[500],
  teal: colors.plasma[500],
  orange: colors.solar[500],
  rose: colors.nova[500],

  // Background colors
  background: colors.space[50],
  textColor: colors.space[900],
  lightText: colors.space[50],
  inputBg: '#ffffff',
  darkInputBg: colors.space[800],
  lightBg: '#ffffff',
  darkBg: colors.space[900],

  // UI elements
  borderColor: colors.space[200],
  headerBg: 'linear-gradient(90deg, #6366f1, #4f46e5)',  // Cosmic gradient header
  headerBorder: 'transparent',
  footerBg: '#ffffff',
  buttonHoverBg: colors.cosmic[600],
  buttonActiveBg: colors.cosmic[700],

  // Effects
  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.1), 0 2px 4px rgba(99, 102, 241, 0.06)',
  cardShadow: '0 8px 16px rgba(99, 102, 241, 0.08), 0 2px 4px rgba(99, 102, 241, 0.04)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

  // Gradients
  primaryGradient: 'linear-gradient(135deg, #6366f1, #4338ca)',
  successGradient: 'linear-gradient(135deg, #10b981, #059669)',
  warningGradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
  dangerGradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
  infoGradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',

  // Opacity variants
  primaryOpacity: 'rgba(99, 102, 241, 0.1)',
  successOpacity: 'rgba(16, 185, 129, 0.1)',
  warningOpacity: 'rgba(245, 158, 11, 0.1)',
  dangerOpacity: 'rgba(239, 68, 68, 0.1)',
  infoOpacity: 'rgba(6, 182, 212, 0.1)',

  // Futuristic elements
  glassEffect: 'backdrop-filter: blur(10px); background-color: rgba(255, 255, 255, 0.7);',
  neonGlow: '0 0 10px rgba(99, 102, 241, 0.5), 0 0 20px rgba(99, 102, 241, 0.3)',
  dotPattern: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 1px, transparent 1px)',
};

// Dark theme - Futuristic space inspired
export const darkTheme = {
  // Brand colors
  primary: colors.cosmic[400],
  secondary: colors.space[400],
  success: colors.aurora[400],
  warning: colors.solar[400],
  danger: colors.meteor[500],
  info: colors.plasma[400],

  // Additional brand colors
  purple: colors.nebula[500],
  teal: colors.plasma[500],
  orange: colors.solar[500],
  rose: colors.nova[500],

  // Background colors
  background: colors.space[950], // Deep space background
  textColor: '#e2e8f0', // Light text
  lightText: '#f8fafc',
  inputBg: colors.space[900], // Dark space background
  darkInputBg: colors.space[900],
  lightBg: colors.space[800],
  darkBg: colors.space[950],

  // UI elements
  borderColor: colors.space[700], // Space dark border
  headerBg: 'linear-gradient(90deg, #4338ca, #312e81)', // Cosmic dark gradient
  headerBorder: 'transparent',
  footerBg: colors.space[900],
  buttonHoverBg: colors.cosmic[500],
  buttonActiveBg: colors.cosmic[600],

  // Effects
  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2), 0 2px 4px rgba(99, 102, 241, 0.1)',
  cardShadow: '0 8px 16px rgba(0, 0, 0, 0.3), 0 4px 6px rgba(0, 0, 0, 0.2)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

  // Gradients
  primaryGradient: 'linear-gradient(135deg, #818cf8, #4f46e5)',
  successGradient: 'linear-gradient(135deg, #34d399, #10b981)',
  warningGradient: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
  dangerGradient: 'linear-gradient(135deg, #f87171, #ef4444)',
  infoGradient: 'linear-gradient(135deg, #22d3ee, #06b6d4)',

  // Opacity variants
  primaryOpacity: 'rgba(129, 140, 248, 0.15)',
  successOpacity: 'rgba(52, 211, 153, 0.15)',
  warningOpacity: 'rgba(251, 191, 36, 0.15)',
  dangerOpacity: 'rgba(248, 113, 113, 0.15)',
  infoOpacity: 'rgba(34, 211, 238, 0.15)',

  // Futuristic elements
  glassEffect: 'backdrop-filter: blur(10px); background-color: rgba(15, 23, 42, 0.7);',
  neonGlow: '0 0 10px rgba(129, 140, 248, 0.5), 0 0 20px rgba(129, 140, 248, 0.3)',
  dotPattern: 'radial-gradient(circle, rgba(129, 140, 248, 0.1) 1px, transparent 1px)',
};
