import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Container,
  Typography,
  Grid,
  Paper,
  makeStyles,
} from '@material-ui/core';
import EmotionsData from './EmotionsData';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    flexGrow: 1,
  },
  title: {
    color: 'inherit',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 500,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const style = {
  top: '10%',
  left: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
};

const colorlist = EmotionsData(2);
const title = EmotionsData(5);

function create(title, total) {
  return { title, total };
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}, any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={ x } y={ y } fill="white"
      textAnchor={ x > cx ? "start" : "end" }
      dominantBaseline="central">
      { `${(percent * 100).toFixed(0)}%` }
    </text>
  );
};

export default function EmotionsRadarChart({ intro, data }) {
  const classes = useStyles();
  function count(id) {
    let total = 0;
    data.map((obj) => (total += (obj.titleId === id) ? 1 : 0));
    return total;
  };
  const emotions = [];
  for (let i = 0; i < 6; i += 1) {
    emotions.push(create(title[i], count(i)));
  }

  function r(day, srn) {
    let count = 0;
    data.map((obj) => {
      count += (
        moment(obj.date).format('dddd') === day &&
        obj.titleId === srn
      ) ? 1 : 0
    });
    return count;
  };
  const collections = [
    { date: 'Monday', Happy: r('Monday', 0), Sadness: r('Monday', 1), Anger: r('Monday', 2), Fearful: r('Monday', 3), Boredom: r('Monday', 4), Disgust: r('Monday', 5) },

    { date: 'Tuesday', Happy: r('Tuesday', 0), Sadness: r('Tuesday', 1), Anger: r('Tuesday', 2), Fearful: r('Tuesday', 3), Boredom: r('Tuesday', 4), Disgust: r('Tuesday', 5) },

    { date: 'Wednesday', Happy: r('Wednesday', 0), Sadness: r('Wednesday', 1), Anger: r('Wednesday', 2), Fearful: r('Wednesday', 3), Boredom: r('Wednesday', 4), Disgust: r('Wednesday', 5) },

    { date: 'Thursday', Happy: r('Thursday', 0), Sadness: r('Thursday', 1), Anger: r('Thursday', 2), Fearful: r('Thursday', 3), Boredom: r('Thursday', 4), Disgust: r('Thursday', 5) },

    { date: 'Friday', Happy: r('Friday', 0), Sadness: r('Friday', 1), Anger: r('Friday', 2), Fearful: r('Friday', 3), Boredom: r('Friday', 4), Disgust: r('Friday', 5) },

    { date: 'Saturday', Happy: r('Saturday', 0), Sadness: r('Saturday', 1), Anger: r('Saturday', 2), Fearful: r('Saturday', 3), Boredom: r('Saturday', 4), Disgust: r('Saturday', 5) },

    { date: 'Sunday', Happy: r('Sunday', 0), Sadness: r('Sunday', 1), Anger: r('Sunday', 2), Fearful: r('Sunday', 3), Boredom: r('Sunday', 4), Disgust: r('Sunday', 5) }
  ];

  return (
    <div className={ classes.root }>
      <Container maxWidth="lg">
        <Typography className={ classes.title }>{ intro }</Typography>
        <Grid container spacing={ 1 }>
          <Grid item xs={ 6 }>
            <Paper className={ classes.paper }>
              <PieChart width={ 500 } height={ 600 }>
                <Pie data={ emotions }
                  cx={ 270 } cy={ 300 }
                  outerRadius={ 220 }
                  labelLine={ false }
                  label={ renderCustomizedLabel }
                  fill="#8884d8"
                  dataKey="total">
                  { emotions.map((entry, index) => (
                    <Cell cursor="pointer"
                      key={ `cell-${index}` }
                      dataKey={ `${entry.title}` }
                      name={ `${entry.title}: ${entry.total}` }
                      fill={ colorlist[index % colorlist.length] } />
                  )) }
                </Pie>

                <Legend iconSize={ 12 } layout="vertical" verticalAlign="middle" wrapperStyle={ style } />
              </PieChart>
            </Paper>
          </Grid>
          <Grid item xs={ 6 }>
            <Paper className={ classes.paper }>
              <RadarChart data={ collections }
                width={ 500 } height={ 600 }
                cx={ 245 } cy={ 300 }
                outerRadius={ 200 }>
                <PolarGrid strokeDasharray="2 1" stroke="#8c8c89" />
                <PolarAngleAxis dataKey="date" fontSize={ 10 } />
                <PolarRadiusAxis stroke="#8c8c89" angle={ 15 } domain={ [0, 6] } />
                { title.map((entry, index) => (
                  <Radar name={ title[index] } dataKey={ title[index] } stroke={ colorlist[index] } fillOpacity={ 0.2 } strokeWidth={ 0.8 } fill={ colorlist[index] } />
                )) }

              </RadarChart>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
