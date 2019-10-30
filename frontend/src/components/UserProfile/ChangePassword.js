import React, {Component, PostForm} from 'react';
import Button from '@material-ui/core/Button';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import RequestServer from '../RequestServer';
import {Link} from 'react-router-dom';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import {Tabs, Tab, Grid, Cell, Card, CardTitle, CardText, CardActions, CardMenu, IconButton} from 'react-mdl';
import PieChart from '../Chart/PieChart';
import StatIcon from '../../stat-icon.png';
import UserList from '../UserList';
import axios from 'axios';

//Profile class which gets user data from localStorage and display accordingly
export default class ChangePassword extends Component {

    constructor(props) {
        super(props);
        let userData = JSON.parse(localStorage.getItem('userData'));
        this.state = {
            id: userData.id,
            username: userData.username,
            old_password: '',
            new_password: '',
            recheck: ''
        }
    }

    componentDidMount() {
        //get id of user
        var userData = JSON.parse(localStorage.getItem("userData"))

        //check if systolic > diastolic
        ValidatorForm.addValidationRule('isSame', (value) => {
            if (this.state.new_password === this.state.recheck && this.state.old_password !== '' && this.state.new_password !== '') {
                return true;
            }
            return false;
        });
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

    validateNewPassword() {
        if (this.state.new_password === this.state.recheck) {
            return true;
        }
        return false;
    }

    //Submit button handler to the back-end
    async handleSubmit(event) {
        event.preventDefault();
        console.log("Before Submit", this.state);
        if (this.validateNewPassword() === true) {
            try {
                console.log("hello")
                console.log("User info", this.state.username);
                var reset = {
                    username: this.state.username,
                    old_password: this.state.old_password,
                    new_password: this.state.new_password
                }
                //var response = await axios.post('http://cmpt373.csil.sfu.ca:8083/users/updatePassword/' + this.state.id + "/" + this.state.username + "/" + this.state.old_password + "/" + this.state.new_password)
                var response = await RequestServer.updateUserPassword(this.state)
                console.log(response)
                if (response !== null) {
                    localStorage.setItem("userData", JSON.stringify(response.data))
                    console.log(response.data)
                    window.alert("Password change succeed")
                    window.location.reload()
                } else {
                    window.alert("Your current password is wrong")
                }
            } catch (e) {
                window.alert("Your current password is wrong")
                console.log(e)
            }
        } else {

        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    renderDefaultView = () => {
        //const classes = useStyles();
        return (
            <div style={{margin: 'auto', textAlign: 'center'}}>
                <div style={{margin: 'auto', backgroundColor: 'white', textAlign: 'center', width: '100%'}}>
                    <ValidatorForm onSubmit={this.handleSubmit.bind(this)}>
                        <Grid className="demo-grid-ruler">
                            <Cell col={12}>
                                <h3>Change Password</h3>
                            </Cell>

                            <Cell col={12}>
                                <TextField
                                    id="old_password"
                                    label="Current Password"
                                    name="old_password"
                                    className="demo-text"
                                    type="password"
                                    value={this.state.old_password}
                                    onChange={this.handleChange.bind(this)}
                                    autoComplete="current-password"
                                    margin="normal"
                                    variant="outlined"
                                />
                            </Cell>

                            <Cell col={12}>
                                <TextValidator
                                    label="New Password"
                                    onChange={this.handleChange.bind(this)}
                                    name="new_password"
                                    type="password"
                                    value={this.state.new_password}
                                    variant="outlined"
                                />
                            </Cell>

                            <Cell col={12}>
                                <TextValidator
                                    label="Retype New Password"
                                    name="recheck"
                                    className="demo-text"
                                    type="password"
                                    value={this.state.recheck}
                                    onChange={this.handleChange.bind(this)}
                                    validators={['isSame']}
                                    errorMessages={["Password doesn't match"]}
                                    variant="outlined"
                                />
                            </Cell>

                        </Grid>
                        <Button style={{padding: '10px'}} variant="outlined" color="secondary" className="demo-button"
                                type="submit">
                            Submit New Password
                        </Button>


                    </ValidatorForm>
                    <div style={{margin: 'auto', padding: '20px', textAlign: 'center'}}>
                        <Link to="/profile">Go Back</Link>
                    </div>

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