import {
  Box,
  Button,
  Card,
  CardHeader,
  CardMedia,
  Divider,
  LinearProgress,
  Grid,
  Typography,
  Paper,
  colors,
  makeStyles,
} from '@material-ui/core';
import { useState } from 'react';
import ModelViewer from './ModelViewer';
import Image from 'next/image';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1 },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: colors.grey[200]
  },
  button: {
    margin: 8,
    width: '33%',
    minHeight: '3.5rem',
    fontSize: 20
  },
  progress: {
    position: 'absolute',
    width: '80%'
  },
  cardRoot: { paddingLeft: theme.spacing(1) },
  media: {
    maxWidth: 350,
    height: 355,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(10),
    marginBottom: theme.spacing(5)
  },
}));

export default function Emotions3(props) {
  const classes = useStyles();
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const { titleId, emotionId, title, emotion } = props;

  function handleEmotions3(item) {
    () => setLoading2(true)
    if (props.onSelect) props.onSelect(item);
  }

  function Heading({ srn, sub }) {
    return (
      <Box fontWeight="fontWeightBold" m={ 1 }>
        <Typography variant="h4" component="div">
          You're feeling {srn}. Are you ready to submit?
        </Typography>
      </Box>
    );
  }

  return <>
    <div className={ classes.root }>
      <Grid container spacing={ 3 }>
        <Grid item xs>
          <Paper className={ classes.paper }>
            <Heading srn={ title } sub={ emotion }/>
          </Paper>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs>
          <Paper className={ classes.paper }>
            <Card className={ classes.cardRoot }>
              <CardHeader title={ title } />
              <Divider />
              <CardMedia title={ title }
                className={ classes.media }>
                { titleId === 2 ?
                  <ModelViewer size={ 350 } file={ `/static/images/${titleId}.fbx` } /> :
                  <Image alt={ `${title}` } width={ 350 } height={ 355 }
                    src={ `/static/images/${titleId}.png` }
                  /> }
              </CardMedia>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={ classes.paper }>
            <Card className={ classes.cardRoot }>
              <CardHeader title={ emotion } />
              <Divider />
              <div style={ { textAlign: 'center' } }>
                <CardMedia title={ emotion }
                  className={ classes.media }>
                  { title.toLowerCase() === 'angry' ?
                    <ModelViewer size={ 350 } file={ `/static/images/${title && title.toLowerCase()}/${emotionId}.fbx` } /> :
                    <Image alt={ `${emotion}` } width={ 350 } height={ 355 }
                      src={ `/static/images/${title.toLowerCase()}/${emotionId}.png` } /> }
                </CardMedia>
              </div>
            </Card>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={ 3 }>
        <Grid item xs>
          <Paper className={ classes.paper }>
            <div style={ { width: '100%', textAlign: 'center' } }>
              <Box component="div" display="inline" p={ 3 } m={ 1 }>
                <Link shallow href={`/programs`}>
                  <Button disabled={ loading1 }
                    className={ classes.button }
                    onClick={ () => setLoading1(true) }
                    variant="contained"
                    color="primary"
                    type="button">Cancel
                    { loading1 && <LinearProgress className={ classes.progress } /> }
                  </Button>
                </Link>
              </Box>
              <Box component="div" display="inline" p={ 3 } m={ 1 }>
                <Link shallow href={ `/programs/completion` }>
                  <Button disabled={ loading2 }
                    className={ classes.button }
                    onClick={ handleEmotions3.bind(null) }
                    variant="contained"
                    color="secondary"
                    type="button">Submit
                    { loading2 && <LinearProgress className={ classes.progress } /> }
                  </Button>
                </Link>
              </Box>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  </>
};
