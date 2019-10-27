import React from 'react';
import Button from '@material-ui/core/Button';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import ShowRoles from "./SymptomsForm";
import {Grid, Cell} from 'react-mdl';
import RequestServer from '../RequestServer'
import {toast} from 'react-toastify';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import Utility from "./Utility";

const Gender = {
    MALE: "MALE",
    FEMALE: "FEMALE"
}
const Role = {
    USER: "USER",
    ADMIN: "ADMIN",
    HEALTH_WORKER: "HEALTH_WORKER",
    COMMUNITY_HEALTH_OFFICER: "COMMUNITY_HEALTH_OFFICER"
}

const Role_Termination_Integer = -1

//form for a new user
class NewUser extends React.Component {
    constructor() {
        super()
        this.state = {
            id: '',
            username: '',
            password: '',
            name: '',
            dob: '',
            address: '',
            gender: Gender.MALE,
            roles: [],
            enabled: false,

            //TEMPORARY VARIABLES
            error: false,
            fname: '',
            lname: '',
            temp_dob: new Date(),
            roles_array: this.getRoleArray(),
            user_array: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.getUserList();
        this.getRoleArray();
    }

    getRoles() {
        var roleArray = []
        var user = localStorage.getItem("userData")
        var parsedUser = JSON.parse(user)
        if (parsedUser && parsedUser.roles) {
            parsedUser.roles.forEach(function (role) {
                console.log("User data is : " + role.role)
                roleArray.push(role.role)
            })
        }
        return roleArray
    }

    getRoleArray() {
        var roles = this.getRoles()
        if (roles.indexOf("ADMIN") > Role_Termination_Integer) {
            return [{id: 1, name: Role.USER, checked: true},
                {id: 2, name: Role.ADMIN, checked: false},
                {id: 3, name: Role.HEALTH_WORKER, checked: false},
                {id: 4, name: Role.COMMUNITY_HEALTH_OFFICER, checked: false}]
        } else if (roles.indexOf("COMMUNITY_HEALTH_OFFICER") > Role_Termination_Integer) {
            return [{id: 1, name: Role.USER, checked: true},
                {id: 4, name: Role.COMMUNITY_HEALTH_OFFICER, checked: false}]
        }
    }

    changeDOB = date => {
        this.setState({
            temp_dob: date
        });
    };


    //make the checkboxes are changeable
    handleCheckbox(id) {
        this.setState(prevState => {
            const updatedRole = prevState.roles_array.map(each => {
                if (each.id === id) {
                    each.checked = !each.checked
                }
                return each
            });
            prevState.roles_array = updatedRole;
            return prevState;
        })
    }


    //add selected roles in the array
    addRole() {
        //We need to re-initialize - if error cause
        this.setState({
            roles: []
        })
        const role_array = this.state.roles_array;
        for (let index in role_array) {
            if (role_array[index].checked) {
                this.state.roles.push({id: this.state.id, role: role_array[index].name})
            }
        }
    }

    //format change
    changeState() {
        this.setState({
            name: this.state.fname + ' ' + this.state.lname,
            dob: Utility.convertDate(this.state.temp_dob)
        })
        this.addRole();
    }


    //check if at least one role has been selected
    checkRole() {
        const role = this.state.roles_array;
        for (let index in role) {
            //check if the checkbox is selected and if so change the error to true
            if (role[index].checked) {
                return;
            }
        }
        this.setState({
            error: true
        })
    }

    //check if the id is taken
    checkID() {
        for (let user of this.state.user_array) {
            if (user.id === this.state.id) {
                this.setState({
                    error: true
                })
                return;
            }
        }
    }

    //check if username is taken
    checkUsername() {
        for (let user of this.state.user_array) {
            if (user.username === this.state.username) {
                this.setState({
                    error: true
                })
                return;
            }
        }

    }

    //check if the name is taken
    checkName() {
        let temp_name = this.state.fname + ' ' + this.state.lname
        for (let user of this.state.user_array) {
            if (user.name === temp_name) {
                this.setState({
                    error: true
                })
                return;
            }
        }
    }

    //get all the user lists
    async getUserList() {
        var passback = await RequestServer.getUserList()
        if (passback !== null) {
            this.setState({
                user_array: Utility.populateUser(passback.data)
            })
        }
    }


    handleSubmit = async () => {
        await this.getUserList()

        //input validation
        this.setState({
            error: false
        })
        this.checkRole();
        if (this.state.error) {
            alert("Must select one role")
            return
        }

        //check for user id - no duplicate value
        this.checkID();
        if (this.state.error) {
            alert("Existing ID: Re-enter the ID")
            this.setState({
                id: ''
            })
            return
        }

        this.checkUsername();
        if (this.state.error) {
            alert("Existing username: Re-enter username")
            this.setState({
                username: '',
            })
            return
        }

        //check for user name - no duplicate value
        this.checkName();
        if (this.state.error) {
            alert("Existing user: Re-enter first name and last name")
            this.setState({
                fname: '',
                lname: '',
            })
            return
        }

        //remove and change the inputs
        this.changeState();
        console.log(this.state);

        //  '/users/register/this.state'
        var response = await RequestServer.addUser(this.state)
        if (response !== null) {
            toast("User Added");
            this.props.history.push(
                '/',
                {detail: response.data}
            )
        } else {
            this.setState({
                error: true,
                errorMsg: 'Unable to register'
            })
        }

    }


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    render() {
        let roles_map = this.state.roles_array.map(item => <ShowRoles key={item.id} item={item}
                                                                      handleChange={this.handleCheckbox}/>)
        return (
            <ValidatorForm
                style={{
                    backgroundColor: 'white',
                    margin: 'auto',
                    padding: '50px',
                    textAlign: 'center'
                }}
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
            >
                <h4>New User </h4>

                <Grid>
                    <Cell col={4}>
                        <TextValidator
                            label="First Name"
                            onChange={this.handleChange}
                            name="fname"
                            value={this.state.fname}
                            validators={['required', 'matchRegexp:^[A-Za-z]+$']}
                            errorMessages={['this field is required', 'Invalid input (only letters)']}
                            variant="outlined"
                        />
                        <br/>
                        <br/>
                        <TextValidator
                            label="Last Name"
                            onChange={this.handleChange}
                            name="lname"
                            value={this.state.lname}
                            validators={['required', 'matchRegexp:^[A-Za-z]+$']}
                            errorMessages={['this field is required', 'Invalid input (only letters)']}
                            variant="outlined"
                        />
                        <br/>
                        <br/>
                        <TextValidator
                            label="Address"
                            onChange={this.handleChange}
                            name="address"
                            value={this.state.address}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            variant="outlined"
                        />
                        <br/>
                        <br/>
                    </Cell>

                    <Cell col={4}>
                        <TextValidator
                            label="ID"
                            onChange={this.handleChange}
                            name="id"
                            value={this.state.id}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            variant="outlined"
                        />
                        <br/>
                        <br/>
                        <TextValidator
                            label="Username"
                            onChange={this.handleChange}
                            name="username"
                            value={this.state.username}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            variant="outlined"
                        />
                        <br/>
                        <br/>
                        <TextValidator
                            label="Password"
                            onChange={this.handleChange}
                            name="password"
                            value={this.state.password}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            variant="outlined"
                        />
                        <br/>
                        <br/>
                    </Cell>
                    <Cell col={4}>
                        <p>Date of Birth:</p>
                        <DatePicker
                            selected={this.state.temp_dob}
                            onChange={this.changeDOB}
                        />
                        <br/>
                        <br/>

                        <label>Gender: </label>
                        <select
                            value={this.state.gender}
                            onChange={this.handleChange}
                            name="gender"
                        >
                            <option value="MALE"> Male</option>
                            <option value="FEMALE"> Female</option>
                        </select>
                        <br/>
                        <br/>
                        <p>Select role</p>
                        {roles_map}
                        <br/>
                        <br/>
                    </Cell>
                </Grid>
                <Button type="submit" style={{
                    backgroundColor: 'blue',
                    color: 'white'
                }}>Submit</Button>
                <br/>
                <br/>
            </ValidatorForm>
        );
    }
}

export default NewUser
