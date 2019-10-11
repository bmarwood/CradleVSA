import React from 'react';
import Button from '@material-ui/core/Button';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import axios from 'axios';
import ShowSymp from "./SymptomsForm";
import {Grid, Cell} from 'react-mdl';

//form for a new patient
class NewPatient extends React.Component {

    constructor() {
        super();
        this.state = {
            id: '',
            name: '',
            birth_date: '',
            list_of_assessments: [], // NOT SURE IF WE NEED IT HERE //LEAVE FOR LATER
            gender: 'male',
            //TEMP VARIABLES
            fname: '',
            lname: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }


    changeState() {
        this.state.name = this.state.fname + ' ' + this.state.lname;
        delete this.state.fname;
        delete this.state.lname;
    }

    checkTheInput() {
        //remove the empty space
    }


    handleSubmit = () => {
        this.changeState();
        this.checkTheInput();
        console.log(this.state);
        axios.post('http://localhost:8080/patients/add', this.state)
            .then(response => {
                console.log(this.state);
                this.props.history.push(
                    '/',
                    {detail: response.data}
                )
            })
            .catch(error => {
                console.log('error block');
                console.log(error)
            })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    render() {
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
                <h4>New Patient </h4>
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
                    label="Date of Birth"
                    onChange={this.handleChange}
                    name="birth_date"
                    value={this.state.birth_date}
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
                <br/>
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

export default NewPatient
