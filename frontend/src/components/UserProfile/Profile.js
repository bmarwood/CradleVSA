import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import RequestServer from '../RequestServer';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Tabs, Tab, Grid, Cell, Card, CardTitle, CardText, CardActions, CardMenu, IconButton} from 'react-mdl';

//Profile class which gets user data from localStorage and display accordingly
export default class Profile extends Component {

    constructor(props) {
        super(props);
        let userData = JSON.parse(localStorage.getItem('userData'));
        this.state = {
            id: userData.id,
            username: userData.username,
            password: userData.password,
            name: userData.name,
            dob: userData.dob,
            address: userData.address,
            gender: userData.gender,
            roles: userData.roles,
            roles_temp: this.getUserRoles(userData),
            enabled: userData.enabled
        }
    }

    getUserRoles(user) {
        var roleString = ''
        if (user && user.roles) {
            user.roles.forEach(role => {
                roleString = roleString + " " + role.role + ", "
            })
            return roleString
        }

        return roleString
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


    //Submit button handler to the back-end
    async handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        delete (this.state.roles_temp);
        try {
            var response = await RequestServer.updateUser(this.state)
            if (response != null) {
                localStorage.setItem("userData", JSON.stringify(response.data))
                window.alert("Profile changed successfully")
                window.location.reload()
            }

        } catch (e) {
            console.log(e)
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
                    <form className="demo-form" noValidate autoComplete="off" onSubmit={this.handleSubmit.bind(this)}>
                        <Grid className="demo-grid-ruler">
                            <Cell col={12}>
                                <h3>User Information</h3>
                            </Cell>
                            <Cell col={4}>
                                <TextField
                                    id="id"
                                    label="Worker ID"
                                    name="id"
                                    defaultValue={this.state.id}
                                    className="demo-text"
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="outlined"
                                />
                            </Cell>

                            <Cell col={4}>
                                <TextField
                                    id="username"
                                    label="User Name"
                                    name="username"
                                    className="demo-text"
                                    value={this.state.username}
                                    onChange={this.handleChange.bind(this)}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </Cell>

                            <Cell col={4}>
                                <TextField
                                    required
                                    id="name"
                                    label="Name"
                                    name="name"
                                    className="demo-text"
                                    value={this.state.name}
                                    onChange={this.handleChange.bind(this)}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </Cell>

                            <Cell col={4}>
                                <TextField
                                    id="dob"
                                    label="Date of Birth"
                                    name="dob"
                                    className="demo-text"
                                    value={this.state.dob}
                                    onChange={this.handleChange.bind(this)}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </Cell>

                            <Cell col={4}>
                                <TextField
                                    id="address"
                                    label="Address"
                                    name="address"
                                    className="demo-text"
                                    value={this.state.address}
                                    onChange={this.handleChange.bind(this)}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </Cell>

                            <Cell col={4}>
                                <TextField
                                    id="gender"
                                    label="Gender"
                                    name="gender"
                                    className="demo-text"
                                    value={this.state.gender}
                                    onChange={this.handleChange.bind(this)}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </Cell>

                            <Cell col={4}>
                                <TextField
                                    id="roles"
                                    label="Roles"
                                    name="roles"
                                    className="demo-text"
                                    value={this.state.roles_temp}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    onChange={this.handleChange.bind(this)}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </Cell>

                        </Grid>
                        <Button style={{padding: '10px'}} variant="outlined" color="secondary" className="demo-button"
                                type="submit">
                            Submit
                        </Button>


                    </form>
                    <div style={{margin: 'auto', padding: '20px', textAlign: 'center'}}>
                        <Link to="/changePassword">Change Password</Link>
                    </div>

                </div>
            </div>
        )
    }

    render() {
        return this.renderDefaultView()

    }
}