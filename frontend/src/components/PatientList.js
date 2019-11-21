import React, {Component} from 'react';
import MaterialTable from 'material-table';
import './AdminComponents/AdminLanding.css';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {HeaderRow, HeaderTabs} from 'react-mdl';
import {Grid, Cell, Card, CardTitle, CardText, CardActions, CardMenu, IconButton } from 'react-mdl';
import PieChart from './Chart/PieChart';

class PatientsList extends Component {

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
  appbar:{
    alignItems: 'center',
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
        <PatientList/>
      </div>
  );
}

function PatientList() {
    const [state, setState] = React.useState({
      columns: [
        { title: 'Name', field: 'name' },
        { title: 'Surname', field: 'surname' },
        { title: 'Sex', field: 'sex'},
        { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
        { title: 'ID Number', field: 'id', type: 'numberic'},
      ],
      data: [
        { name: 'Ann',
          surname: 'Howard',
          sex: 'F',
          birthYear: 1987,
          id: 849567 },
        {
          name: 'Kenneth',
          surname: 'Washington',
          sex: 'M',
          birthYear: 2017,
          id: 374856,
        },
        {
          name: 'Shayla',
          surname: 'Owens',
          sex: 'F',
          birthYear: 1991,
          id: 384957,
        },
        {
          name: 'Kirsten',
          surname: 'Turner',
          sex: 'F',
          birthYear: 1972,
          id: 794057,
        },
      ],
    });

    return (
      <div className = "table-position" >
      <MaterialTable
        title="Patients"
        columns={state.columns}
        data={state.data}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...state.data];
                data[data.indexOf(oldData)] = newData;
                setState({ ...state, data });
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...state.data];
                data.splice(data.indexOf(oldData), 1);
                setState({ ...state, data });
              }, 600);
            }),

          onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const data = [...state.data];
                    data.push(newData);
                    setState({ ...state, data });
                  }
                  resolve();
                }, 600);
              }),
        }}

      //Other Actions
      actions={[
        {
          //Graph button for patient chart
          icon: 'assessment',
          tooltip: 'Graph',
          onClick: () => {
            //Popup for Patient chart
            window.open("/users/PatientChart",'popUpWindow',
            'height=500,width=800,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes')
          }
        }
      ]}
        />
      </div>

      
    );
}





export default PatientsList;