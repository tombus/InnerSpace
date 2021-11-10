import {
  AppBar,
  Box,
  Tabs,
  Tab,
  Typography,
  colors,
  useTheme
} from '@material-ui/core';
import {
  BarChartSharp,
  ShowChartSharp,
  TableChartSharp,
  TrackChangesSharp
} from '@material-ui/icons';
import { useState } from 'react';
import EmotionsTable from './EmotionsTable';
import EmotionsBarChart from './EmotionsBarChart';
import EmotionsLineChart from './EmotionsLineChart';
import EmotionsRadarChart from './EmotionsRadarChart';
import SwipeableViews from 'react-swipeable-views';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel"
      hidden={ value !== index }
      id={ `full-width-tabpanel-${index}` }
      aria-labelledby={ `full-width-tab-${index}` }
      { ...other }>
      {value === index && (
        <Box p={ 3 }>
          <Typography>{ children }</Typography>
        </Box>
      ) }
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function Collections({ name, data }) {
  const theme = useTheme();
  const prefix = (name && `${name}'s `);
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => { setValue(newValue); };
  const handleChangeIndex = (index) => { setValue(index); };

  return <>
    <AppBar position="static" color="default">
      <Tabs value={ value }
        onChange={ handleChange }
        indicatorColor="secondary"
        textColor="secondary"
        variant="fullWidth"
        aria-label="full width tabs">
        <Tab label="Table" icon={ <TableChartSharp /> } { ...a11yProps(0) } />
        <Tab label="Line Chart" icon={ <ShowChartSharp /> } { ...a11yProps(1) } />
        <Tab label="Radar Chart" icon={ <TrackChangesSharp /> } { ...a11yProps(2) } />
        <Tab label="Bar Chart" icon={ <BarChartSharp /> } { ...a11yProps(3) } />
      </Tabs>
    </AppBar>
    <SwipeableViews index={ value }
      onChangeIndex={ handleChangeIndex }
      axis={ theme.direction === 'rtl' ? 'x-reverse' : 'x' }
      style={ { backgroundColor: colors.common.white } }>
      <TabPanel value={ value } index={ 0 } dir={ theme.direction }>
        <EmotionsTable intro={ `${prefix}Emotion Table` } data={ data } />
      </TabPanel>
      <TabPanel value={ value } index={ 1 } dir={ theme.direction }>
        <EmotionsLineChart intro={ `${prefix}Emotion Line Chart` } data={ data }/>
      </TabPanel>
      <TabPanel value={ value } index={ 2 } dir={ theme.direction }>
        <EmotionsRadarChart intro={ `${prefix}Emotion Radar Chart` } data={ data }/>
      </TabPanel>
      <TabPanel value={ value } index={ 3 } dir={ theme.direction }>
        <EmotionsBarChart intro={ `${prefix}Emotion Bubble Chart` } data={ data }/>
      </TabPanel>
    </SwipeableViews>
  </>
}
