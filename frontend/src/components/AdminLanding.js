import React, {Component} from 'react';
import MaterialTable from 'material-table';
import './AdminLanding.css';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Grid, Cell, Card, CardTitle, CardText, CardActions, CardMenu, IconButton } from 'react-mdl';
import PieChart from './Chart/PieChart';
import AssessmentList from './AssessmentComponents/AssessmentList';

class Landing_List extends Component {

    render() {
      return (
          <div>
            <SimpleTabs/>
          </div>
      );
    }
  }

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
      <Typography
          component="div"
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
      >
        <Box p={2}>{children}</Box>
      </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    alignItems: 'center',
    backgroundColor: '#436494 !important',
    borderRadius: '500px',
    width: '50%',
    margin: '10px auto',
}
}));

function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <div className={classes.root}>
        <AppBar className={classes.appbar} position="static" color = "white">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" color = "white">
            <Tab label="Patients" {...a11yProps(0)} color = "white"/>
            <Tab label="Users" {...a11yProps(1)} color = "white"/>
            <Tab label="Assessments" {...a11yProps(2)} color = "white"/>
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0}>
          <PatientList/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UserList/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <AssessmentList/>
        </TabPanel>
      </div>
  );
}





export default Landing_List;