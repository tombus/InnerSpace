import {
  Box,
  Button,
  Grid,
  Typography,
  Paper,
  colors,
  makeStyles,
} from '@material-ui/core';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1 },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
    background: colors.grey[200]
  },
  button: {
    margin: 8,
    width: '33%',
    minHeight: '3.5rem',
    fontSize: 20
  },
}));

export default function Completion(props) {
  const classes = useStyles();
  const { user } = props;
  function handleCompletion(item) {
    if (props.onSelect) props.onSelect(item);
  }

  return <>
    <div className={ classes.root }>
      <Grid container spacing={ 3 }>
        <Grid item xs>
          <Paper className={ classes.paper }>
            <img src="https://dejpknyizje2n.cloudfront.net/marketplace/products/3d-gold-star-sticker-1547509628.227473.png"/>
            <Box fontWeight="fontWeightBold" m={ 1 }>
              <Typography variant="h4" component="div">
                Great job checking in today, <strong>{ user }</strong>!
                <br/>
                You've earned a <strong>golden star</strong>!
              </Typography>
            </Box>
            <Link shallow href={ `/programs` }>
              <Button className={ classes.button }
                onClick={ handleCompletion.bind(null) }
                variant="contained"
                color="primary"
                type="button">Return to programs
              </Button>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </div>
  </>
}
