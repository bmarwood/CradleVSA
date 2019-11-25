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
    COMMUNITY_HEALTH_OFFICER: "COMMUNITY_HEALTH_OFFICER",
    VHT: "VHT"
}


// add working area
// address = optional
// change to add worker
const Role_Termination_Integer = -1

//form for a new user
class NewUser extends React.Component {
    constructor(props) {
        super(props)
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
            area: "", // need to talk about the field name

            //TEMPORARY VARIABLES
            error: false,
            fname: '',
            lname: '',
            temp_dob: new Date(),
            roles_array: [],
            user_array: [],
            update: props.id,
            old_username: '',
            location_array: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.getUserList();
        this.getRoleArray();
        this.getOldData();

    }

    async getOldData() {
        if (!this.state.update) {
            return
        }
        let old_user_data = await RequestServer.getCVSA(this.state.update)
        if (old_user_data) {
            old_user_data = old_user_data.data
            if (old_user_data !== null) {
                this.setState({
                    id: old_user_data.id,
                    gender: old_user_data.gender,
                    username: old_user_data.username,
                    address: old_user_data.address,
                    password: old_user_data.password,
                    area: old_user_data.area,
                    fname: old_user_data.name.split(" ")[0],
                    lname: old_user_data.name.split(" ")[1],
                    temp_dob: new Date(old_user_data.dob),
                    old_username: old_user_data.username
                })
                for (let role of this.state.roles_array) {
                    for (let selected_role of old_user_data.roles) {
                        if (selected_role.role.includes(role.name)) {
                            role.checked = true
                        }
                    }
                }
            }
        }
    }

    getRoles() {
        var roleArray = []
        var user = localStorage.getItem("userData")
        var parsedUser = JSON.parse(user)
        if (parsedUser && parsedUser.roles) {
            parsedUser.roles.forEach(function (role) {
                roleArray.push(role.role)
            })
        }
        return roleArray
    }

    componentDidMount() {
        this.getUserList()
            .catch(() => {
                return true;
            });

        this.getLocation()
            .catch(() => {
                this.setState({
                    location_array: []
                })
            })

        this.setState({
            roles_array: this.getRoleArray()
        });


        //check for user id - no duplicate value
        ValidatorForm.addValidationRule('checkID', (value) => {
            for (let user of this.state.user_array) {
                if (user.id === value && value !== this.state.update) {
                    return false;
                }
            }
            return true;
        });

        ValidatorForm.addValidationRule('checkUsername', (value) => {
            for (let user of this.state.user_array) {
                if (user.username === value && value !== this.state.old_username) {
                    return false;
                }
            }
            return true;
        });

    }

    getRoleArray() {
        var roles = this.getRoles()
        if (roles.indexOf("ADMIN") > Role_Termination_Integer) {
            return [//{id: 1, name: Role.USER, checked: true},
                {id: 2, name: Role.ADMIN, checked: false},
                {id: 3, name: Role.HEALTH_WORKER, checked: false},
                {id: 4, name: Role.COMMUNITY_HEALTH_OFFICER, checked: false},
                {id: 5, name: Role.VHT, checked: false}]
        } else if (roles.indexOf("HEALTH_WORKER") > Role_Termination_Integer) {
            return [
                {id: 5, name: Role.VHT, checked: false},
                {id: 4, name: Role.COMMUNITY_HEALTH_OFFICER, checked: false},
            ]
        } else if (roles.indexOf("COMMUNITY_HEALTH_OFFICER") > Role_Termination_Integer) {
            return [{id: 5, name: Role.VHT, checked: false}]
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
                if (each.id === id && each.id !== 1) {
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
        //hard code the user to do not display the user
        this.state.roles.push({id: 1, role: Role.USER})
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

    //get all the user lists
    async getUserList() {
        var passback = await RequestServer.getUserList()
        if (passback !== null) {
            this.setState({
                user_array: Utility.populateUser(passback.data)
            })
        }
    }

    async getLocation() {
        let response = await RequestServer.getLocations()
        if (response !== null) {
            this.setState({
                location_array: response.data
            })
        }
        return [];
    }


    handleSubmit = async () => {
        //input validation
        this.setState({
            error: false
        })
        this.checkRole();
        if (this.state.error) {
            alert("Must select one role")
            return
        }
        if (this.state.location === "EMPTY") {
            alert(this.state.errorMsg + "\nPlease select one of the location")
            return;
        }

        //remove and change the inputs
        this.changeState();
        var response = null
        if (this.state.update) {
            response = await RequestServer.updateUser(this.state)
            alert("UPDATED!!")
        } else {
            response = await RequestServer.addUser(this.state)
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

    }


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    render() {
        let roles_map = this.state.roles_array.map(item => <ShowRoles key={item.id} item={item}
                                                                      handleChange={this.handleCheckbox}/>)
        let location_select_option = this.state.location_array.map(location => <option key={location.id}
                                                                                       value={location.id}> {location.name}</option>)

        return (
            <div className="newForm">
                <ValidatorForm
                    ref="form"
                    onSubmit={this.handleSubmit}
                    onError={errors => console.log(errors)}
                >
                    <div style={{display: (this.state.update ? 'none' : 'block')}}>
                        <h4>New Worker </h4>
                    </div>

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
                                validators={['required', 'checkID']}
                                errorMessages={['this field is required', 'Existing ID: Re-enter the ID']}
                                variant="outlined"
                            />
                            <br/>
                            <br/>
                            <TextValidator
                                label="Username"
                                onChange={this.handleChange}
                                name="username"
                                value={this.state.username}
                                validators={['required', 'checkUsername']}
                                errorMessages={['this field is required', 'Existing Username: Re-enter the username']}
                                variant="outlined"
                            />
                            <br/>
                            <br/>
                            <div style={{display: (this.state.update ? 'none' : 'block')}}>
                                <TextValidator
                                    label="Password"
                                    onChange={this.handleChange}
                                    name="password"
                                    value={this.state.password}
                                    type="password"
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    variant="outlined"
                                />
                                <br/>
                                <br/>
                            </div>
                            <label> Location </label>
                            <select
                                value={this.state.area}
                                onChange={this.handleChange}
                                name="area"
                            >
                                <option value="EMPTY"> --SELECT ONE--</option>
                                {location_select_option}
                            </select>
                            <br/>
                            <br/>
                        </Cell>
                        <Cell col={4}>
                            <p>Date of Birth:</p>
                            <DatePicker
                                selected={this.state.temp_dob}
                                onChange={this.changeDOB}
                                maxDate={new Date()}
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
                </ValidatorForm>
            </div>
        );
    }
}

export default NewUser
