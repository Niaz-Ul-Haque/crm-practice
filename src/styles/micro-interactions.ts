// src/styles/micro-interactions.ts
import { designSystem } from './design-system';

export const microInteractions = {
  // Hover effects
  hover: {
    subtle: {
      scale: 'transform: scale(1.01)',
      transition: `transform ${designSystem.transitions.duration.fast} ${designSystem.transitions.timing.easeOut}`,
    },
    lift: {
      transform: 'transform: translateY(-2px)',
      shadow: 'box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      transition: `all ${designSystem.transitions.duration.fast} ${designSystem.transitions.timing.easeOut}`,
    },
    highlight: {
      border: `border-color: ${designSystem.colors.primary[500]}`,
      transition: `border-color ${designSystem.transitions.duration.fast} ${designSystem.transitions.timing.easeInOut}`,
    },
  },
  
  // Click/tap feedback
  click: {
    scale: {
      active: 'transform: scale(0.97)',
      transition: `transform ${designSystem.transitions.duration.fast} ${designSystem.transitions.timing.easeInOut}`,
    },
    press: {
      active: 'transform: translateY(1px)',
      transition: `transform ${designSystem.transitions.duration.fast} ${designSystem.transitions.timing.easeInOut}`,
    },
  },
  
  // Focus states
  focus: {
    glow: {
      boxShadow: `0 0 0 2px ${designSystem.colors.primary[100]}`,
      transition: `box-shadow ${designSystem.transitions.duration.fast} ${designSystem.transitions.timing.easeInOut}`,
    },
  },
  
  // Transitions for page/component changes
  transitions: {
    fadeIn: {
      from: 'opacity: 0',
      to: 'opacity: 1',
      transition: `opacity ${designSystem.transitions.duration.normal} ${designSystem.transitions.timing.easeOut}`,
    },
    slideIn: {
      from: 'transform: translateY(10px); opacity: 0',
      to: 'transform: translateY(0); opacity: 1',
      transition: `all ${designSystem.transitions.duration.normal} ${designSystem.transitions.timing.easeOut}`,
    },
    tabChange: {
      transition: `opacity ${designSystem.transitions.duration.fast} ${designSystem.transitions.timing.easeInOut}, transform ${designSystem.transitions.duration.fast} ${designSystem.transitions.timing.easeInOut}`,
      entering: 'opacity: 0; transform: translateY(5px)',
      entered: 'opacity: 1; transform: translateY(0)',
      exiting: 'opacity: 0; transform: translateY(-5px)',
    },
  },
  
  // Loading states
  loading: {
    pulse: {
      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      keyframes: `
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `,
    },
    shimmer: {
      animation: 'shimmer 1.5s linear infinite',
      keyframes: `
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `,
      background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%)',
      backgroundSize: '200% 100%',
    },
  },
  
  // Success/Error feedback
  feedback: {
    success: {
      animation: 'successFade 2s ease-out',
      keyframes: `
        @keyframes successFade {
          0% { background-color: ${designSystem.colors.success.light}; }
          100% { background-color: transparent; }
        }
      `,
    },
    error: {
      animation: 'errorShake 0.5s ease-in-out',
      keyframes: `
        @keyframes errorShake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
      `,
    },
  },
};

// Predefined animation sets for common UI patterns
export const animationPatterns = {
  // For main content areas when navigating between pages
  pageTransition: {
    enter: `
      opacity: 0;
      transform: translateY(10px);
    `,
    enterActive: `
      opacity: 1;
      transform: translateY(0);
      transition: opacity ${designSystem.transitions.duration.normal} ${designSystem.transitions.timing.easeOut}, transform ${designSystem.transitions.duration.normal} ${designSystem.transitions.timing.easeOut};
    `,
    exit: `
      opacity: 0;
      transform: translateY(-10px);
      transition: opacity ${designSystem.transitions.duration.fast} ${designSystem.transitions.timing.easeIn}, transform ${designSystem.transitions.duration.fast} ${designSystem.transitions.timing.easeIn};
    `,
  },
  
  // For modal dialogs and popovers
  modalTransition: {
    overlay: {
      enter: `opacity: 0;`,
      enterActive: `opacity: 1; transition: opacity ${designSystem.transitions.duration.normal} ${designSystem.transitions.timing.easeOut};`,
      exit: `opacity: 0; transition: opacity ${designSystem.transitions.duration.fast} ${designSystem.transitions.timing.easeIn};`,
    },
    content: {
      enter: `opacity: 0; transform: scale(0.95);`,
      enterActive: `opacity: 1; transform: scale(1); transition: opacity ${designSystem.transitions.duration.normal} ${designSystem.transitions.timing.easeOut}, transform ${designSystem.transitions.duration.normal} ${designSystem.transitions.timing.easeOut};`,
      exit: `opacity: 0; transform: scale(0.95); transition: opacity ${designSystem.transitions.duration.fast} ${designSystem.transitions.timing.easeIn}, transform ${designSystem.transitions.duration.fast} ${designSystem.transitions.timing.easeIn};`,
    },
  },
  
  // For list items (staggered reveal)
  listItemTransition: {
    item: (index: number) => ({
      enter: `opacity: 0; transform: translateY(10px);`,
      enterActive: `opacity: 1; transform: translateY(0); transition: opacity ${designSystem.transitions.duration.normal} ${designSystem.transitions.timing.easeOut}, transform ${designSystem.transitions.duration.normal} ${designSystem.transitions.timing.easeOut}; transition-delay: ${index * 50}ms;`,
    }),
  },
  
  // For buttons and interactive elements
  buttonInteraction: {
    hover: `transform: translateY(-1px); box-shadow: ${designSystem.shadows.md};`,
    active: `transform: translateY(0); box-shadow: ${designSystem.shadows.sm};`,
    focus: `box-shadow: 0 0 0 2px ${designSystem.colors.primary[100]};`,
    transition: `all ${designSystem.transitions.duration.fast} ${designSystem.transitions.timing.easeInOut};`,
  },
};