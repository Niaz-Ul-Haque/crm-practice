// src/styles/design-system.ts
export const designSystem = {
    // Color palette
    colors: {
      // Primary brand colors
      primary: {
        50: "#e6f2ff",
        100: "#cce5ff",
        200: "#99cbff",
        300: "#66b0ff",
        400: "#3396ff",
        500: "#007bff", // Main primary color
        600: "#0062cc",
        700: "#004999",
        800: "#003166",
        900: "#001833",
      },
      
      // Gray scale
      gray: {
        50: "#f8f9fa",
        100: "#f1f3f5",
        200: "#e9ecef",
        300: "#dee2e6",
        400: "#ced4da",
        500: "#adb5bd",
        600: "#6c757d",
        700: "#495057",
        800: "#343a40",
        900: "#212529",
      },
      
      // Feedback colors
      success: {
        main: "#28a745",
        light: "#d4edda",
        dark: "#1e7e34",
      },
      danger: {
        main: "#dc3545",
        light: "#f8d7da",
        dark: "#a71d2a",
      },
      warning: {
        main: "#ffc107",
        light: "#fff3cd",
        dark: "#d39e00",
      },
      info: {
        main: "#17a2b8",
        light: "#d1ecf1",
        dark: "#117a8b",
      },
    },
    
    // Typography
    typography: {
      fontFamily: {
        body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        heading: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      },
      fontSize: {
        xs: "0.75rem",    // 12px
        sm: "0.875rem",   // 14px
        base: "1rem",     // 16px
        lg: "1.125rem",   // 18px
        xl: "1.25rem",    // 20px
        "2xl": "1.5rem",  // 24px
        "3xl": "1.875rem", // 30px
        "4xl": "2.25rem", // 36px
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      lineHeight: {
        none: "1",
        tight: "1.25",
        normal: "1.5",
        relaxed: "1.75",
      },
    },
    
    // Spacing
    spacing: {
      px: "1px",
      0: "0",
      0.5: "0.125rem", // 2px
      1: "0.25rem",    // 4px
      1.5: "0.375rem", // 6px
      2: "0.5rem",     // 8px
      2.5: "0.625rem", // 10px
      3: "0.75rem",    // 12px
      3.5: "0.875rem", // 14px
      4: "1rem",       // 16px
      5: "1.25rem",    // 20px
      6: "1.5rem",     // 24px
      8: "2rem",       // 32px
      10: "2.5rem",    // 40px
      12: "3rem",      // 48px
      16: "4rem",      // 64px
      20: "5rem",      // 80px
    },
    
    // Borders and Radii
    borders: {
      width: {
        none: "0",
        thin: "1px",
        normal: "2px",
        thick: "4px",
      },
      radius: {
        none: "0",
        sm: "0.25rem",   // 4px
        md: "0.375rem",  // 6px
        lg: "0.5rem",    // 8px
        xl: "0.75rem",   // 12px
        full: "9999px",
      },
    },
    
    // Shadows
    shadows: {
      none: "none",
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    },
    
    // Transitions and Animations
    transitions: {
      duration: {
        fast: "150ms",
        normal: "250ms",
        slow: "350ms",
      },
      timing: {
        easeIn: "cubic-bezier(0.4, 0, 1, 1)",
        easeOut: "cubic-bezier(0, 0, 0.2, 1)",
        easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
    
    // Breakpoints for responsive design
    breakpoints: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    
    // Z-index scale
    zIndex: {
      hide: -1,
      auto: "auto",
      base: 0,
      dropdown: 1000,
      sticky: 1100,
      navbar: 1200,
      drawer: 1300,
      modal: 1400,
      popover: 1500,
      tooltip: 1600,
    },
  };
  
  // Define animation standards
  export const animations = {
    // Transitions
    transitions: {
      subtle: `all ${designSystem.transitions.duration.fast} ${designSystem.transitions.timing.easeInOut}`,
      smooth: `all ${designSystem.transitions.duration.normal} ${designSystem.transitions.timing.easeInOut}`,
      slowReveal: `all ${designSystem.transitions.duration.slow} ${designSystem.transitions.timing.easeInOut}`,
    },
    
    // Micro-interactions
    hover: {
      scale: "transform: scale(1.02)",
      lift: "transform: translateY(-2px)",
      glow: "box-shadow: 0 0 8px rgba(0, 123, 255, 0.5)",
    },
    
    // Loading states
    loading: {
      pulse: `
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
        animation: pulse 1.5s infinite ease-in-out;
      `,
      spin: `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        animation: spin 1s infinite linear;
      `,
    },
    
    // Feedback animations
    feedback: {
      success: `
        @keyframes successFade {
          0% { background-color: ${designSystem.colors.success.light}; }
          100% { background-color: transparent; }
        }
        animation: successFade 2s ease-out;
      `,
      error: `
        @keyframes errorShake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
        animation: errorShake 0.5s ease-in-out;
      `,
    },
  };