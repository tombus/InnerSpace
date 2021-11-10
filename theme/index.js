import { createMuiTheme } from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors';

const global = {
  body: {
    backgroundColor: colors.blue[100],
    overflowY: 'scroll',
  },
};

const theme = {
  props: {
    MuiTextField: {
      variant: 'outlined'
    }
  },
  palette: {
  },
  overrides: {
    MuiSkeleton: {
      text: {
        display: 'inline-block'
      }
    },
    MuiCssBaseline: {
      '@global': global
    },
  },
};

export default createMuiTheme(theme);
