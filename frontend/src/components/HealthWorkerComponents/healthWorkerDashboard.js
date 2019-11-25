import React, { Component } from 'react';
import '../AdminComponents/AdminLanding.css';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PatientList from '../PatientComponents/PatientList'
import UserList from '../UserList';
import AssessmentList from '../AssessmentComponents/AssessmentList';

class HWDashboard extends Component {
    render() {
        return (
            <div>
                <SimpleTabs />
            </div>
        );
    }
}



function SimpleTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Assessments" {...a11yProps(1)} />
                    <Tab label="Patients" {...a11yProps(0)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={1}>
                <PatientList />
            </TabPanel>

            <TabPanel value={value} index={0}>
                <AssessmentList id={localStorage.getItem('userData').id} />
            </TabPanel>
        </div>
    );
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

function getCVSAID() {
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
    }
}));




export default HWDashboard;
