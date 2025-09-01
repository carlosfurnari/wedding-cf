// MUI Theme setup aligned with existing CSS palette variables
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Fixed hex values matching src/index.css to ensure stability
const COLORS = {
  primary: '#bfa980',
  primaryHover: '#a08c5b',
  text: '#2E2A25',
  textMuted: '#6B6B6B',
  border: '#e7dfd2',
  bg: '#f7f4f1'
};

let theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: COLORS.primary,
      dark: COLORS.primaryHover,
      contrastText: '#fff'
    },
    text: {
      primary: COLORS.text,
      secondary: COLORS.textMuted
    },
    divider: COLORS.border,
    background: {
      default: COLORS.bg,
      paper: '#ffffff'
    }
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: ['Roboto', 'system-ui', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    button: { textTransform: 'none' },
    h2: { fontFamily: ['Dantina', 'serif'].join(','), fontWeight: 700 },
    h3: { fontFamily: ['Dantina', 'serif'].join(','), fontWeight: 700 }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', borderWidth: 1.5, borderRadius: 28 }
      }
    }
  }
});

theme = responsiveFontSizes(theme);
export default theme;
