import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import './styles/components.css';
// MUI setup
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);