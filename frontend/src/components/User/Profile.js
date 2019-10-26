import React, { Component, PostForm } from 'react';
import Button from '@material-ui/core/Button';
import SimpleList from './SimpleList'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import RequestServer from '../RequestServer';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import {Tabs, Tab, Grid, Cell, Card, CardTitle, CardText, CardActions, CardMenu, IconButton } from 'react-mdl';
import PieChart from '../Chart/PieChart';
import StatIcon from '../../stat-icon.png';



//Profile class which gets user data from localStorage and display accordingly
export default class Profile extends Component {
    
    constructor(props) {
        super(props);
        let userData = JSON.parse(localStorage.getItem('userData'));
        this.state = {
            user: {
            id : userData.id,
            username: userData.username,
            password: userData.password,
            name: userData.name,
            dob: userData.dob,
            address: userData.address,
            gender: userData.gender,
            roles: userData.roles,
            isInEditMode: false
            }
        }
        console.log(this.state)

    }

    useStyles = makeStyles(theme => ({
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
    
/*     
    //Submit button handler to the back-end
    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        fetch('/api/form-submit-url', {
          method: 'POST',
          body: data,
        });
      }

    changeEditMode = () => {
        this.setState({
            isInEditMode: !this.state.isInEditMode
        })
    }

    //update the component after user clicks submit
    updateComponentValue = () => {
        this.setState({
            isInEditMode: false,
            name: this.refs.theTextInput.value
        })
    }

    renderEditView = () => {
        return <div className="landing-form" style = {{color : "white"}}>
            <input
                type = "text"
                defaultValue = {this.state.name}
                ref = "theTextInput"
            />
            SimpleList.SimpleList()
            <button onClick={this.changeEditMode}>X</button>
            <button onClick={this.updateComponentValue}>Submit</button>
        </div> 
    }
 
    renderDefaultView = () => {
        return <div className="landing-form" style = {{color : "white"}} onDoubleClick={this.changeEditMode}>
            {this.state.name}
        </div>
    } */

    handleChange(event) {
        this.setState({ 
            [event.target.name] : event.target.value
        });
    }

    renderDefaultView = () => {
        //const classes = useStyles();
        return (
        <div style={{margin: 'auto', textAlign: 'center'}}>
            <div style={{margin: 'auto', backgroundColor: 'white', textAlign: 'center', width : '100%'}}>
            <form className="demo-form" noValidate autoComplete="off">
                <Grid className = "demo-grid-ruler">
                    <Cell col = {12}>
                        <h3>Edit User Information</h3> 
                    </Cell>
                    <Cell col = {4}>
                        <TextField
                            id="id"
                            label="Worker ID"
                            defaultValue= {this.state.user.id}
                            className="demo-text"
                            margin="normal"
                            InputProps={{
                            readOnly: true,
                            }}
                            variant="outlined"
                        />  
                    </Cell>

                    <Cell col = {4}>
                        <TextField
                            id="text-username"
                            label="User Name"
                            className="demo-text"
                            value={this.state.user.username}
                            onChange= {this.handleChange.bind(this)}
                            margin="normal"
                            variant="outlined"
                        />
                    </Cell>

                    <Cell col = {4}>
                        <TextField
                            required
                            id="outlined-name"
                            label="Name"
                            //className={classes.textField}
                            value={this.state.user.name}
                            //onChange={handleChange('name')}
                            margin="normal"
                            variant="outlined"
                        />
                    </Cell>

                    <Cell col = {4}>
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            //className={classes.textField}
                            type="password"
                            value="password"
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                        />
                    </Cell>

                    <Cell col = {4}>
                        <TextField
                            id="outlined-password-input"
                            label="Retype Password"
                            //className={classes.textField}
                            type="password"
                            value="password"
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                        />
                    </Cell>

                    <Cell col = {4}>
                        <TextField
                            id="outlined-username"
                            label="User Name"
                            //className={classes.textField}
                            value={this.state.user.username}
                            //onChange={handleChange('userName')}
                            margin="normal"
                            variant="outlined"
                        />
                    </Cell>

                    <Cell col = {4}>
                        <TextField
                            id="outlined-dob"
                            label="Date of Birth"
                            //className={classes.textField}
                            value={this.state.user.dob}
                            //onChange={handleChange('dob')}
                            margin="normal"
                            variant="outlined"
                        />
                    </Cell>

                    <Cell col = {4}>
                        <TextField
                            id="outlined-address"
                            label="Address"
                            //className={classes.textField}
                            value={this.state.user.address}
                            //onChange={handleChange('address')}
                            margin="normal"
                            variant="outlined"
                        />
                    </Cell>

                    <Cell col = {4}>
                        <TextField
                            id="outlined-gender"
                            label="Gender"
                            //className={classes.textField}
                            value={this.state.user.gender}
                            //onChange={handleChange('gender')}
                            margin="normal"
                            variant="outlined"
                        />
                    </Cell>

                    {/* <Cell col = {4}>
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
                    </Cell> */}

                </Grid>
            </form>

            <Button style = {{ padding: '10px'}} variant="outlined" color="secondary" className= "demo-button">
            Submit
        </Button>
        </div>
    </div>
        )
    }

    render() {
        // return this.state.isInEditMode ? 
        // this.renderEditView() : 
        // this.renderDefaultView()
        return this.renderDefaultView()
        
    }
}

// <div className="landing-form" style = {{color : "white"}}>
            //     <h1> Your Profile</h1>
            //     <h2 style = {{color : "white"}}>Hello Ms.{this.state.name}</h2>
            //     <p>Username: {this.state.username}</p>
            //     <p>Full Name: {this.state.username}</p>
            //     <p>Date Of Birth: {this.state.dob}</p>
            //     <p>Address: {this.state.address}</p>
            //     <p>Gender: {this.state.gender}</p>
            // </div>