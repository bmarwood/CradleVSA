import React from 'react';
import Button from '@material-ui/core/Button';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import axios from 'axios';
import ShowRoles from "./SymptomsForm";
import {Grid, Cell} from 'react-mdl';

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
            gender: 'male',
            roles: [],
            enabled: false,

            //TEMPORARY VARIABLES
            error: false,
            fname: '',
            lname: '',
            roles_array: [
                {id: 1, name: 'USER', checked: true},
                {id: 2, name: 'ADMIN', checked: false},
                {id: 3, name: 'HEALTH WORKER', checked: false}
            ]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this)
    }


    //make the checkboxes are changeable
    handleCheckbox(id) {
        this.setState(prevState => {
            const updatedSymp = prevState.roles_array.map(each => {
                if (each.id === id) {
                    each.checked = !each.checked
                }
                return each
            });
            prevState.roles_array = updatedSymp;
            return prevState;
        })
        console.log(this.state.roles_array)
    }


    //add selected roles in the array
    addRole() {
        const role_array = this.state.roles_array;
        for (let index in role_array) {
            if (role_array[index].checked) {
                this.state.roles.push({id: role_array[index].id, role: role_array[index].name})
            }
        }
    }


    changeState() {
        this.setState({
            name: this.state.fname + ' ' + this.state.lname
        })
        this.addRole();

        //delete
        delete this.state.fname;
        delete this.state.lname;
        delete this.state.error;
        delete this.state.roles_array;
    }


    //check if at least one role has been selected
    checkRole() {
        const role = this.state.roles_array;
        this.setState({
            error: false
        })
        for (let index in role) {
            if (role[index].checked && !this.state.error) {
                this.setState({
                    error: true
                })
            }
        }
    }


    handleSubmit = () => {
        //input validation
        this.checkRole();
        if (!this.state.error) {
            alert("Must select one role")
            return
        }

        //remove and change the inputs
        this.changeState();
        console.log(this.state);

        //connect to the database
        axios.post('http://cmpt373.csil.sfu.ca:8083/users/add', this.state)
            .then(response => {
                console.log(this.state);
                this.props.history.push(
                    '/',
                    {detail: response.data}
                )
            })
            .catch(error => {
                console.log('error block')
                console.log(error)
            })
    }


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    render() {
        const roles = this.state.roles_array.map(item => <ShowRoles key={item.id} item={item}
                                                                    handleChange={this.handleCheckbox}/>)
        return (
            <ValidatorForm
                style={{
                    backgroundColor: 'white',
                    margin: 'auto',
                    padding: '50px',
                    textAlign: 'center'
                    // width: '400px',
                    // height: '400px'
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
                        <TextValidator
                            label="Date of Birth"
                            onChange={this.handleChange}
                            name="dob"
                            value={this.state.dob}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            variant="outlined"
                        />
                        <br/>
                        <br/>

                        <label>Gender: </label>
                        <select
                            value={this.state.gender}
                            onChange={this.handleChange}
                            name="gender"
                        >
                            <option value="male"> Male</option>
                            <option value="female"> Female</option>
                        </select>
                        <br/>
                        <br/>
                        <p>Select role</p>
                        {roles}
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
