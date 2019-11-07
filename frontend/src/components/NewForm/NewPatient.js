import React from 'react';
import Button from '@material-ui/core/Button';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import RequestServer from '../RequestServer';
import Utility from './Utility';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './newForm.css';

//form for a new patient
class NewPatient extends React.Component {

    constructor() {
        super();
        this.state = {
            id: '',
            name: '',
            birth_date: '',
            list_of_assessments: [], // NOT SURE IF WE NEED IT HERE //LEAVE FOR LATER
            gender: 'MALE',
            vht_id: 'EMPTY',
            //TEMP VARIABLES
            fname: '',
            lname: '',
            temp_dob: new Date(),
            vht_array: []
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.getVHTList()
            .catch(() => {
                return true;
            });

        //check for patient id - no duplicate value
        ValidatorForm.addValidationRule('checkID', (value) => {
            let validID = this.checkID(value)
                .catch(() => {
                    console.log("validID", validID)

                    return true;
                });
            return validID;
        });

        ValidatorForm.addValidationRule('check_vht_id', (value) => {
            //check for existing vht id
            return true;
        });
    }

    async getVHTList() {
        var passback = await RequestServer.getUserList()
        if (passback !== null) {
            this.setState({
                vht_array: Utility.populateVHT(passback.data)
            })
        }
    }

    //handle date change
    changeDOB = date => {
        this.setState({
            temp_dob: date
        });
    };

    //handle input change
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    //change the format of the string
    changeState() {
        this.setState({
            name: this.state.fname + ' ' + this.state.lname,
            birth_date: Utility.convertDate(this.state.temp_dob)
        })
    }

    //get a single patient with matching patient_id
    async getMatchingPatientID(patient_id) {
        var passback = await RequestServer.getPatientByID(patient_id)
        //console.log(passback)
        if (passback !== null) {
            return passback.data.id
        }
        return null
    }

    //compare with the matching id
    async checkID(patient_id) {
        var existing_id = await this.getMatchingPatientID(patient_id);
        if (existing_id !== patient_id) {
            return true;
        }
        return false;
    }


    handleSubmit = async () => {
        this.changeState();
        //console.log(this.state);
        if (this.state.vht_id === "EMPTY") {
            alert("Please select at least one VHT")
            return false;
        }
        var response = await RequestServer.addPatient(this.state)
        if (response !== null) {
            this.props.history.push(
                '/',
                {detail: response.data}
            )
        }
    }


    render() {
        let vht_select_option = this.state.vht_array.map(item => <option id={item.id}
                                                                         value={item.id}> {item.id} </option>)

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
                    label="Attestation ID"
                    onChange={this.handleChange}
                    name="id"
                    value={this.state.id}
                    validators={['required', 'matchRegexp:^[0-9]{11}$', 'checkID']}
                    errorMessages={['this field is required', 'Must be 11 digits', 'Existing ID: Re-enter the ID']}
                    variant="outlined"
                />
                <br/>
                <br/>
                <label>VHT: </label>
                <select
                    value={this.state.vht_id}
                    onChange={this.handleChange}
                    name="vht_id"
                >
                    <option value="EMPTY"> --SELECT ONE--</option>
                    {vht_select_option}
                </select>
                <br/>
                <br/>


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
