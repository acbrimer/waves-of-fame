import { createTheme } from '@material-ui/core';

export const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#D33E43',
      contrastText: '#e8e8e8',
    },
    secondary: {
      main: '#FF220C',
    },
    text: {
      primary: '#E8E8E8',
    },
    background: {
      paper: '#666370',
      default: '#1C1F33',
    },
  },
  props: {
    MuiAppBar: {
      color: 'primary',
    },
    MuiList: {
      dense: true,
    },
    MuiMenuItem: {
      dense: true,
    },
    MuiTable: {
      size: 'small',
    },
    MuiTooltip: {
      arrow: true,
    },
  },
  typography: {
    fontFamily: 'Anton',
    subtitle1: {
      fontFamily: 'Roboto',
    },
    subtitle2: {
      fontFamily: 'Roboto',
    },
    body1: {
      fontFamily: 'Roboto',
      fontWeight: 500,
    },
    body2: {
      fontFamily: 'Roboto',
    },
    button: {
      fontFamily: 'Roboto',
    },
    caption: {
      fontFamily: 'Roboto',
    },
    overline: {
      fontFamily: 'Roboto',
    },
    h6: {
      fontSize: '1.5rem',
      fontFamily: 'Anton',
    },
    h5: {
      fontSize: '2rem',
      fontFamily: 'Anton',
    },
    h3: {
      fontFamily: 'Anton',
    },
  },
});
