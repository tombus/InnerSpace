import {
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  hero: {
    width: '100%',
    minHeight: 290,
  },
  title: {
    fontSize: 28,
    fontFamily: '"Pacifico", cursive',
    color: theme.palette.common.black,
  }
}));

export default function Home({ intro }) {
  const classes = useStyles();
  return <>
    <div style={ { padding: 12, backgroundColor: colors.lightBlue[50] } }>
      <Typography variant="h4" align="center" className={ classes.title }>
        { intro }
      </Typography>
      <img className={ classes.hero }
        src="/static/images/kids-removebg-preview.png"
      />
    </div>
  </>
}
