import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Container,
  Typography,
  Paper,
  makeStyles,
} from '@material-ui/core';
import {
  useState,
  useCallback
} from 'react';
import EmotionsData from './EmotionsData';

const useStyles = makeStyles(({
  root: { width: '100%' },
  title: {
    color: 'inherit',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 500,
  },
  msg: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 700
  }
}));

const colorlist = EmotionsData(2);
const title = EmotionsData(5);
function create(total, title) {
  return { total, title };
};

export default function EmotionsBarChart({ intro, data }) {
  const classes = useStyles();
  // count if id matches
  function count(id) {
    let total = 0;
    data.map((obj) => (total += (obj.titleId === id) ? 1 : 0));
    return total;
  };
  // create emotions total object for (total, title)
  const emotionsTotal = [];
  for (let i = 0; i < 6; i += 1)
    emotionsTotal.push(create(count(i), title[i]));

  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = emotionsTotal[activeIndex];
  const handleClick = useCallback((entry, index) => { setActiveIndex(index); }, [setActiveIndex]);

  return (
    <div className={ classes.root }>
      <Container maxWidth="lg">
        <Typography className={ classes.title }>{ intro }</Typography>
        <Paper variant="outlined">
          <BarChart width={ 1100 } height={ 500 } data={ emotionsTotal }
            margin={ { top: 25, left: 25, right: -30, bottom: 0, } }>
            <CartesianGrid strokeDasharray="2 3" stroke="#8c8c89" />
            <XAxis dataKey="title" stroke="#000000" />
            <YAxis />
            <Bar dataKey="total" onClick={ handleClick }>
              { emotionsTotal.map((entry, index) => {
                return (
                  <Cell cursor="pointer"
                    key={ `cell-${index}` }
                    fill={ index === activeIndex ? colorlist[index] : "#ededed" } />
                  );
                }) }
            </Bar>
          </BarChart>
          <div className={ classes.msg }>
            <span style={ { color: colorlist[activeIndex] } }>
              { `${activeItem.title}: ` }
              <span style={ { color: '#3d3d3c' } }>{ `${activeItem.total}` }</span>
            </span>
          </div>
        </Paper>
      </Container>
    </div>
  );
}
