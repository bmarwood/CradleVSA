import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Grid, Cell } from 'react-mdl';
import { isThisSecond } from 'date-fns/esm';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));

export default function OutlinedTextFields() {
  const classes = useStyles();
   const [values, setValues] = React.useState({
     name: 'Ryan Rocky',
     userName: 'rrocky',
     dob: '27/04/1999',
     address: '8888 University Dr, Burnaby, V5J 2X2',
     gender: 'Male',
     status: 'Active'
    
    });

  const data = this.props.data;

  const initializeData = () => {
    this.setState({data})
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div style={{width: '90%', margin: 'auto', backgroundColor: 'white', textAlign: 'center'}}>
        <form className={classes.container} noValidate autoComplete="off">
            <Grid className = "demo-grid-ruler">
                <Cell col = {4}>
                    <TextField
                        id="outlined-read-only-input"
                        label="Worker ID"
                        defaultValue="3012391"
                        className={classes.textField}
                        margin="normal"
                        InputProps={{
                        readOnly: true,
                        }}
                        variant="outlined"
                    />  
                </Cell>

                <Cell col = {4}>
                    <TextField
                        id="outlined-username"
                        label="User Name"
                        className={classes.textField}
                        value={values.userName}
                        onChange={handleChange('userName')}
                        margin="normal"
                        variant="outlined"
                    />
                </Cell>

                <Cell col = {4}>
                    <TextField
                        required
                        id="outlined-name"
                        label="Name"
                        className={classes.textField}
                        value={values.name}
                        onChange={handleChange('name')}
                        margin="normal"
                        variant="outlined"
                    />
                </Cell>

                <Cell col = {4}>
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        className={classes.textField}
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                    />
                </Cell>

                <Cell col = {4}>
                    <TextField
                        id="outlined-password-input"
                        label="Retype Password"
                        className={classes.textField}
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                    />
                </Cell>

                <Cell col = {4}>
                    <TextField
                        id="outlined-username"
                        label="User Name"
                        className={classes.textField}
                        value={values.userName}
                        onChange={handleChange('userName')}
                        margin="normal"
                        variant="outlined"
                    />
                </Cell>

                <Cell col = {4}>
                    <TextField
                        id="outlined-dob"
                        label="Date of Birth"
                        className={classes.textField}
                        value={values.dob}
                        onChange={handleChange('dob')}
                        margin="normal"
                        variant="outlined"
                    />
                </Cell>

                <Cell col = {4}>
                    <TextField
                        id="outlined-address"
                        label="Address"
                        className={classes.textField}
                        value={values.address}
                        onChange={handleChange('address')}
                        margin="normal"
                        variant="outlined"
                    />
                </Cell>

                <Cell col = {4}>
                    <TextField
                        id="outlined-gender"
                        label="Gender"
                        className={classes.textField}
                        value={values.gender}
                        onChange={handleChange('gender')}
                        margin="normal"
                        variant="outlined"
                    />
                </Cell>

                <Cell col = {4}>
                    <TextField
                        id="outlined-status"
                        label="Status"
                        className={classes.textField}
                        value={values.status}
                        onChange={handleChange('status')}
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                            }}
                        variant="outlined"
                    />
                </Cell>

            </Grid>
        </form>
    </div>
  );
}