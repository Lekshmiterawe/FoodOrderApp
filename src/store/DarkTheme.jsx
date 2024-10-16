import { createTheme } from '@mui/material/styles';

const defaultColor = '#fff';
const theme = createTheme({
           palette: {
            primary: { main: defaultColor },
           },
          });

export default theme;