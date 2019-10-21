import React from 'react';
import Button from '@material-ui/core/Button';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import RequestServer from '../RequestServer';
import Utility from './Utility';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
            lname: '',
            dob: new Date(),
        };
        this.handleChange = this.handleChange.bind(this);
    }

    changeDOB = date => {
        this.setState({
            dob: date
        });
    };


    changeState() {
        this.setState({
            name: this.state.fname + ' ' + this.state.lname,
            birth_date: Utility.convertDate(this.state.dob)
        })

        // delete this.state.fname;
        // delete this.state.lname;
    }

    async getMatchingPatientID(patient_id) {
        var passback = await RequestServer.getPatientByID(patient_id)
        console.log(passback)
        if (passback !== null) {
            return passback.data.id
        }
        return null
    }

    async checkID(patient_id) {
        var existing_id = await this.getMatchingPatientID(patient_id);
        if(existing_id !== patient_id){
            return true;
        }
        return false;
    }

    handleSubmit = async () => {
        let no_existing_ID = await this.checkID(this.state.id)
        //true if id does not exist
        if (!no_existing_ID){
            alert("Patient ID EXISTS : IT'S BEEN USING")
            this.state.id = ''
            return;
        }

        this.changeState();
        console.log(this.state);
        console.log("UT")



        // Optional
        // var patient = {
        //     id: this.state.id,
        //     name: this.state.name,
        //     birth_date: this.state.birth_date,
        //     list_of_assessments: this.state.list_of_assessments,
        //     gender: this.state.gender,
        // }
        // var response = await RequestServer.addPatient(patient)

        var response = await RequestServer.addPatient(this.state)

        if (response !== null) {
            this.props.history.push(
                '/',
                {detail: response.data}
            )
        }

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

                <p>Date of Birth:</p>
                <DatePicker
                    selected={this.state.dob}
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
