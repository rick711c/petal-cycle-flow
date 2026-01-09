import { createTheme } from '@mui/material/styles';

// Flora color palette - matching the orchid theme
const floraTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: 'hsl(333, 71%, 50%)', // --primary
      light: 'hsl(328, 85%, 70%)',
      dark: 'hsl(333, 71%, 40%)',
      contrastText: 'hsl(327, 73%, 97%)', // --primary-foreground
    },
    secondary: {
      main: 'hsl(240, 5%, 33%)', // --secondary
      contrastText: 'hsl(0, 0%, 98%)', // --secondary-foreground
    },
    error: {
      main: 'hsl(0, 72%, 50%)', // --destructive
      contrastText: 'hsl(0, 85%, 97%)',
    },
    warning: {
      main: 'hsl(351, 94%, 71%)', // --chart-2
    },
    info: {
      main: 'hsl(327, 87%, 81%)', // --chart-3
    },
    success: {
      main: 'hsl(352, 95%, 81%)', // --chart-4
    },
    background: {
      default: 'hsl(240, 4%, 95%)', // --background
      paper: 'hsl(0, 0%, 98%)', // --card
    },
    text: {
      primary: 'hsl(240, 5%, 10%)', // --foreground
      secondary: 'hsl(240, 5%, 10%)', // --muted-foreground (darker for readability)
    },
    divider: 'hsl(240, 4%, 83%)', // --border
    action: {
      hover: 'hsla(355, 100%, 97%, 0.8)', // --accent with transparency
    },
  },
  typography: {
    fontFamily: "'Poppins', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    h2: {
      fontWeight: 700,
      fontSize: '1.5rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.125rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '0.875rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 20px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px hsla(333, 71%, 50%, 0.2)',
          },
        },
        sizeLarge: {
          padding: '14px 28px',
          fontSize: '1rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 2px 8px hsla(0, 0%, 0%, 0.06)',
          border: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: 'hsl(0, 0%, 98%)',
          borderTop: '1px solid hsl(240, 4%, 83%)',
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: 'hsl(333, 71%, 50%)',
          },
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 12px hsla(333, 71%, 50%, 0.3)',
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          '&.Mui-checked': {
            color: 'hsl(333, 71%, 50%)',
            '& + .MuiSwitch-track': {
              backgroundColor: 'hsl(333, 71%, 50%)',
            },
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: 'hsl(240, 4%, 83%)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
  },
});

// Custom colors for cycle phases
export const cyclePhaseColors = {
  menstruation: 'hsl(333, 71%, 50%)', // primary
  follicular: 'hsl(327, 87%, 81%)', // chart-3
  ovulation: 'hsl(351, 94%, 71%)', // chart-2
  luteal: 'hsl(352, 95%, 81%)', // chart-4
};

export const chartColors = {
  chart1: 'hsl(328, 85%, 70%)',
  chart2: 'hsl(351, 94%, 71%)',
  chart3: 'hsl(327, 87%, 81%)',
  chart4: 'hsl(352, 95%, 81%)',
  chart5: 'hsl(240, 3%, 46%)',
};

export default floraTheme;
