import React from 'react';
import Button from '@material-ui/core/Button';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import RequestServer from '../RequestServer';
import Utility from './Utility';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './newForm.css';
import {Cell, Radio, RadioGroup} from "react-mdl";
import ShowSymp from "./SymptomsForm";
import {toast} from "react-toastify";

//form for a new patient
class NewPatient extends React.Component {

    constructor(props) {
        super(props);
        console.log(props.id)

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
            dob_type: 'date',
            temp_dob: new Date(),
            vht_array: [],
            update: props.id,
        };
        this.handleChange = this.handleChange.bind(this);
        this.getOldData();
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

        ValidatorForm.addValidationRule('check_format', (value) => {
            if (value === this.state.update) {
                return true;
            }
            var regex = /[[0-9]{11}/;
            if (regex.test(value)) {
                if (value.length === 11) {
                    return true
                }
            }
            return false;
        });

        //check if age is filled
        ValidatorForm.addValidationRule('check_dob_type', (value) => {
            if (this.state.dob_type === 'age' && this.state.birth_date === '') {
                return false;
            }
            return true;
        });
    }

    async getOldData() {
        if (!this.state.update) {
            return
        }
        let old_data = await RequestServer.getPatientByID(this.state.update)
        if (old_data) {
            old_data = old_data.data
            if (old_data !== null) {
                console.log(old_data)
                this.setState({
                    id: old_data.id,
                    gender: old_data.gender,
                    fname: old_data.name.split(" ")[0],
                    lname: old_data.name.split(" ")[1],
                    vht_id: old_data.vht_id
                })
                if (old_data.birth_date.includes(",")) {
                    this.setState({
                        temp_dob: new Date(old_data.birth_date),
                        dob_type: 'date'
                    })
                } else {
                    this.setState({
                        birth_date: old_data.birth_date,
                        dob_type: 'age'
                    })
                }
            }
        }
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
            name: this.state.fname + ' ' + this.state.lname
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
        if (patient_id === this.state.update || existing_id !== patient_id) {
            return true;
        }
        return false;
    }

    handleSubmit = async () => {
        console.log(this.state)
        // if (this.state.vht_id === "EMPTY") {
        //     alert("Please select at least one VHT")
        //     return false;
        // }
        if (this.state.dob_type === "date") {
            let input_dob = Utility.convertDate(this.state.temp_dob)
            let today = Utility.convertDate(new Date())

            if (today === input_dob) {
                alert("Incorrect date of birth")
                return false;
            }
            this.setState({
                birth_date: input_dob
            })
        }
        this.changeState();
        var response = null;
        console.log(this.state.update)
        if (this.state.update) {
            response = await RequestServer.updatePatient(this.state)
            alert("UPDATED!!")
        } else {
            response = await RequestServer.addPatient(this.state)
            if (response !== null) {
                toast("Patient Added");
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


    render() {
        let vht_select_option = this.state.vht_array.map(item => <option key={item.id}
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
                <div style={{display: (this.state.update ? 'none' : 'block')}}>
                    <h4>New Patient </h4>
                </div>
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
                    validators={['required', 'check_format', 'checkID']}
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

                <RadioGroup name="dob_type"
                            onChange={this.handleChange}
                            value={this.state.dob_type}>
                    <Radio value="date" ripple>
                        <span className="mdl-radio__label">Date of Birth</span>
                    </Radio>
                    <Radio value="age">Age</Radio>
                </RadioGroup>


                <div style={{display: (this.state.dob_type == "age" ? 'block' : 'none')}}>
                    <TextValidator
                        label="Age"
                        onChange={this.handleChange}
                        name="birth_date"
                        value={this.state.birth_date}
                        validators={['check_dob_type', 'minNumber:0', 'maxNumber:150', 'matchRegexp:^[0-9]*$']}
                        errorMessages={['this field is required', 'between 0 - 150', 'between 0 - 150', "Number only"]}
                    />
                    <br/>
                </div>
                <div style={{display: (this.state.dob_type == "date" ? 'block' : 'none')}}>
                    <label>Date of Birth:</label>
                    <br/>
                    <DatePicker
                        selected={this.state.temp_dob}
                        onChange={this.changeDOB}
                        maxDate={new Date()}
                    />
                    <br/>
                </div>
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
            </ValidatorForm>
        );
    }
}

export default NewPatient
