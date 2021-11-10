import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  colors,
  Container,
  Box,
  Paper,
  Typography,
  makeStyles,
} from '@material-ui/core';
import EmotionsData from './EmotionsData';
import moment from 'moment';

const c = EmotionsData(2);
const title = EmotionsData(5);
const emotionids = EmotionsData(6);
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  title: {
    color: 'inherit',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 500,
  },
  rootTool: {
    width: '100%',
    padding: theme.spacing(2)
  },
  tooltips: { width: 200 },
  daily: {
    fontSize: 20,
    fontWeight: 800,
    fontStyle: 'bold',
    letterSpacing: theme.spacing(0.1)
  },
  emotion: {
    fontWeight: 900,
    fontSize: 15,
    fontStyle: 'bold',
    letterSpacing: theme.spacing(0.3)
  },
  emotionTotal: {
    fontWeight: 800,
    fontSize: 14,
    fontStyle: 'bold',
    color: colors.common.black
  },
  timestamp: {
    color: colors.common.black,
    fontSize: 11,
    fontWeight: 600,
    fontStyle: 'italic'
  }
}));

const tooltip = {
  opacity: 0.7,
  fontSize: 10,
  fontWeight: 400,
  borderRadius: 5,
  color: colors.blueGrey[900],
  backgroundColor: colors.grey[100],
}

const style = {
  top: '50%',
  left: 30,
  transform: 'translate(0, -50%)',
  lineHeight: '34px',
};

function CustomizedXAxis({ x, y, stroke, payload }) {
  return (
    <g transform={ `translate(${x},${y})` }>
      <text x={ 0 } y={ 0 } dy={ 25 } dx={ -5 }
        fontWeight={ 300 }
        fontSize={ 16 }
        textAnchor="start"
        transform="rotate(20)">
        { payload.value }
      </text>
    </g>
  );
};

function CustomizedYAxis({ x, y, stroke, payload }) {
  return (
    <g transform={ `translate(${x},${y})` }>
      <text x={ 0 } y={ 0 } dy={ 5 } dx={ -10 }
        stroke={ c[12] }
        fontWeight={ 400 }
        fontSize={ 14 }
        textAnchor="middle"
        transform="rotate(0)">
        { payload.value }
      </text>
    </g>
  );
};

function CustomizedLabel({ x, y, stroke, value }) {
  return (
    <text x={ x } y={ y }
      dy={ -10 } dx={ 0 }
      fontWeight={ 300 }
      fontSize={ 15 }
      stroke={ c[12] }
      textAnchor="start">
      { value > 0 ? value : '' }
    </text>
  )
};

export default function EmotionsLineChart({ intro, data }) {
  const classes = useStyles();
  // count and return time
  function t(id, date) {
    moment.locale();
    let time = '';
    data.map((obj) => {
      time += (obj.titleId === id && moment(obj.date).format('dddd') === date) ? `${moment(obj.date).format('LT')}, ` : ''
    });
    return time.substring(0, time.length - 2)
  };

  // count if id and timestamp match
  function r(day, srn) {
    let count = 0;
    data.map((obj) => { count += (moment(obj.date).format('dddd') === day && obj.titleId === srn) ? 1 : 0 });
    return count;
  };

  // count if timestamp match
  function d(day) {
    let count = 0;
    data.map((obj) => { count += (moment(obj.date).format('dddd') === day) ? 1 : 0 });
    return count;
  };

  // collection of users result
  const collections = [
    { date: 'Monday', Happy: r('Monday', 0), Sadness: r('Monday', 1), Anger: r('Monday', 2), Fearful: r('Monday', 3), Boredom: r('Monday', 4), Disgust: r('Monday', 5) },
    { date: 'Tuesday', Happy: r('Tuesday', 0), Sadness: r('Tuesday', 1), Anger: r('Tuesday', 2), Fearful: r('Tuesday', 3), Boredom: r('Tuesday', 4), Disgust: r('Tuesday', 5) },
    { date: 'Wednesday', Happy: r('Wednesday', 0), Sadness: r('Wednesday', 1), Anger: r('Wednesday', 2), Fearful: r('Wednesday', 3), Boredom: r('Wednesday', 4), Disgust: r('Wednesday', 5) },
    { date: 'Thursday', Happy: r('Thursday', 0), Sadness: r('Thursday', 1), Anger: r('Thursday', 2), Fearful: r('Thursday', 3), Boredom: r('Thursday', 4), Disgust: r('Thursday', 5) },
    { date: 'Friday', Happy: r('Friday', 0), Sadness: r('Friday', 1), Anger: r('Friday', 2), Fearful: r('Friday', 3), Boredom: r('Friday', 4), Disgust: r('Friday', 5) },
    { date: 'Saturday', Happy: r('Saturday', 0), Sadness: r('Saturday', 1), Anger: r('Saturday', 2), Fearful: r('Saturday', 3), Boredom: r('Saturday', 4), Disgust: r('Saturday', 5) },
    { date: 'Sunday', Happy: r('Sunday', 0), Sadness: r('Sunday', 1), Anger: r('Sunday', 2), Fearful: r('Sunday', 3), Boredom: r('Sunday', 4), Disgust: r('Sunday', 5) }
  ];

  // custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    {
      const classes = useStyles();
      const day = `${label}`;
      return !(active && payload && payload.length) ? null : (
        <Box className={ classes.rootTool } component="span" display="block">
          <div className={ classes.tooltips }>
            <p>
              <span className={ classes.daily }><u>{ `${day.toUpperCase()}: ${d(day)}` }</u></span><br /><br />
              { emotionids.map((i) => {
                return (
                  <span>
                    { payload[i].value === 0 ? null :
                      <span style={ { flexDirection: 'row' } } >
                        <span className={ classes.emotion } style={ { color: c[i] } }>
                          { `${payload[i].name}: ` }
                          <span className={ classes.emotionTotal }>{ `${payload[i].value}` }</span>
                        </span><br />
                        <span className={ classes.timestamp } my={ 2 } whiteSpace="normal">{ `${t(i, day)}` }</span><br />
                        <br />
                      </span>
                    }
                  </span>
                );
              }) }
            </p>
          </div>
        </Box>
      );
    }
  };

  return (
    <div className={ classes.root }>
      <Container maxWidth="lg">
        <Typography className={ classes.title }>{ intro }</Typography>
        <Paper variant="outlined">
          <LineChart width={ 1100 } height={ 500 } data={ collections }
            margin={ { top: 25, right: 20, left: 100, bottom: 10 } }>
            <CartesianGrid strokeDasharray="2 1" stroke="#8c8c89" />
            <XAxis dataKey="date" tick={ <CustomizedXAxis /> }
              height={ 60 } strokeWidth={ 1 }
              padding={ { left: 20, right: 20 } } />
            <YAxis tick={ <CustomizedYAxis /> } strokeWidth={ 1 } />
            <Legend iconSize={ 20 } layout="vertical" verticalAlign="middle" wrapperStyle={ style } />
            <Tooltip wrapperStyle={ tooltip } content={ <CustomTooltip /> } />
            { title.map((entry, index) => (
              <Line type="monotone" dataKey={ `${title[index]}`}
                stroke={ c[index] } opacity={ 0.9 }
                strokeWidth={ 3 } activeDot={ { r: 4 } }
                label={ <CustomizedLabel /> } />
            ))}
          </LineChart>
        </Paper>
      </Container>
    </div>
  );
}


