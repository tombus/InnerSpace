import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  colors,
  makeStyles,
} from '@material-ui/core';
import LazyCardGrid from './LazyCardGrid';
import ModelViewer from './ModelViewer';
import Image from 'next/image';

const useStyles = makeStyles(theme => ({
  root: { position: 'relative' },
  card: {
    border: '1px solid #808080',
    maxWidth: 350,
    maxHeight: 350
  },
  cardContent: {
    textAlign: 'center',
    backgroundColor: colors.blueGrey[100],
  },
  cardMedia: {
    height: 260,
    width: 320
  },
  button: {
    borderTop: '1px solid #808080',
    width: '100%'
  }
}));

function Emotions2Card({ data, handle, titleId, title }) {
  const classes = useStyles();
  return (
    <Card className={ classes.card }>
      <CardContent className={ classes.cardContent }>
        <CardMedia title={ data.emotions[titleId] }
          className={ classes.cardMedia }>
          { titleId === 2 ?
            <ModelViewer size={ 280 } file={ `/static/images/${title.toLowerCase()}/${data.id}.fbx` } /> :
            <Image src={ `/static/images/${title.toLowerCase()}/${data.id}.png` }
              alt={ data.emotions[titleId] }
              width={ 320 } height={ 260 } />}
        </CardMedia>
      </CardContent>
      <CardActionArea onClick={ handle }>
        <div className={ classes.buttonCenter }>
          <Button className={ classes.button }
            variant="contained"
            color="default"
            size="large"
            type="button">
            <Typography variant="h6" color="primary">
              <b>{ data.emotions[titleId] }</b>
            </Typography>
          </Button>
        </div>
      </CardActionArea>
    </Card>
  )
};

export default function Emotions2(props) {
  const classes = useStyles();
  const { intro, title, titleId } = props;
  const _title = `${title}`.toLowerCase();
  function handleEmotions2(item) {
    if (props.onSelect) props.onSelect(item);
  }
  return <>
    <Typography variant="h4" align="center">
      { `${intro}`.replace(/\_/g, _title) }
    </Typography>
    <Divider />
    <Box className={ classes.root } p={ 1 }>
      <LazyCardGrid
        API="/emotions"
        itemWidth={ 4 }
        placeholders={ 3 }
        cardClass={ classes.card }
        renderItem={
          data => <Emotions2Card data={ data }
            handle={ handleEmotions2.bind(null, data) }
            titleId={ titleId }
            title={ _title } />
        } />
    </Box>
  </>
};
