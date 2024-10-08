import { createTheme } from '@mui/material/styles';

const defaultColor = '#ffc404';
const theme = createTheme({
           palette: {
            primary: { main: defaultColor },
           },
          });

export default theme;