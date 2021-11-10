import {
  Box,
  Typography,
  colors,
  makeStyles,
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
  },
}));

export default function About(props) {
  const classes = useStyles();
  const { intro } = props;
  return <>
    <div style={ { padding: 12, backgroundColor: colors.lightBlue[50] } }>
      <Typography variant="h4" align="center" className={ classes.title }>
        { intro }
      </Typography>
      <img className={ classes.hero } src="/static/images/kids-removebg-preview.png" />
    </div>
    <Box p={ 3 } style={ { border: '1px solid #e2e2e2' } }>
      <Typography variant="h6" align="justify">
        <b>Innerspace</b> is a web based application that is designed to give special needs children an accessible, effective, and interactive way to communicate their feelings and emotions and allow them to express themselves through the application rather than verbally.
        The target audience is special needs children K-3 that generally are nonverbal and are affected by their lack of speech which affects how they interact with the people around them.<br /><br />
        The core base is to have students interact with a speech pathologist, psychologist, or trained professional who is working through a school that can allow special needs children to communicate and interact more with the supervisor.<br /><br />
        Our aim is to create an application that can assist children that have communicative disorders, have difficulties expressing themselves, are on the autism spectrum, or are nonverbal.
      </Typography>
    </Box>
  </>
}
