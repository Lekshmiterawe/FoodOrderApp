import { createTheme } from '@mui/material/styles';

const defaultColor = '#f5cc73';
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: defaultColor,
    },
    background: {
        default: '#f5cc73', // Light theme background
        paper: '#fff',
      },
      text: {
        primary: '#000', // Change primary text color to blue
        //secondary: '#ff0000', // Change secondary text color to red
      },
  },

  typography: {
    fontFamily: "'Raleway', sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          background: 'linear-gradient(#dbaa6a, #77662d)',
          color: '#d9e2f1',
          minHeight: '100vh',
        },
      },
    },
  },
}

);

export default theme;
