import React from 'react';
import Button from '@material-ui/core/Button';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import ShowSymp from "./SymptomsForm";
import {Grid, Cell, RadioGroup, Radio} from 'react-mdl';
import RequestServer from '../RequestServer';
import Utility from './Utility';
import DatePicker from "react-datepicker";
import ReadingRequestAnalysis from "./ReadingRetestAnalysis";
import Alert from "react-bootstrap/Alert";

const Color = {
    GREEN: "GREEN",
    YELLOW: "YELLOW",
    RED: "RED"
}

const Arrow = {
    UP: "UP",
    DOWN: "DOWN",
    EMPTY: "EMPTY"
}

const Gestational_unit = {
    EMPTY: "EMPTY",
    WEEK: "WEEK",
    MONTH: "MONTH",
    NOT_PREGNANT: "NOT_PREGNANT"
}

//Form for a new assessment
class NewAssessment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //use get method to get the assessment id <- should be equal to # of assessments + 1
            id: '',
            patient_id: '',
            birth_date: '',
            gender: "MALE",
            name: '',
            date: "",
            gestational_age: "0",
            heart_rate: "",
            systolic: "",
            diastolic: "",
            ews_color: null,
            symptoms: [],
            referred: false,
            follow_up: false,
            follow_up_date: null,
            recheck: false,
            arrow: null, // pass in as an arrow
            gestational_unit: Gestational_unit.EMPTY,
            cvsa_id: 'EMPTY', //worker id
            location: 'EMPTY',

            //Temporary variables
            fname: "",
            lname: "",
            temp_symptoms: "",
            error: false,   //to handle submit
            errorMsg: '',   //to handle submit
            msg: '',        //for the componenetDidMount error message
            vht_array: [],
            create_patient: false,
            user_array: [],
            worker_id: '',
            worker_role: [],
            location_array: [],
            dob_type: 'date',
            temp_dob: new Date(),
            recheck_history: [],
            retestAdvice: "RETEST_NOT_RECOMMENDED",

            //Symptoms
            symptoms_arr: [
                {id: 1, name: 'No Symptoms', checked: true},
                {id: 2, name: 'Headache', checked: false},
                {id: 3, name: 'Blurred vision', checked: false},
                {id: 4, name: 'Abdominal pain', checked: false},
                {id: 5, name: 'Bleeding', checked: false},
                {id: 6, name: 'Feverish', checked: false},
                {id: 7, name: 'Unwell', checked: false},
            ]

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleCheckbox = this.handleCheckbox.bind(this)
        this.setGestational_age = this.setGestational_age.bind(this)
    }

    //handle date change
    changeDOB = date => {
        this.setState({
            temp_dob: date
        });
    };

    //componentWillUpdate
    componentDidMount() {
        //get cvsa_id
        var user = localStorage.getItem("userData")
        var parsedUser = JSON.parse(user)
        this.setState({
            cvsa_id: parsedUser.id
        })
        this.getLocation()
            .catch(() => {
                this.setState({
                    location_array: []
                })
            })

        //check if systolic > diastolic
        ValidatorForm.addValidationRule('isGreater', (value) => {
            if (parseInt(value) <= parseInt(this.state.systolic)) {
                return true;
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


        //check the gestational age
        ValidatorForm.addValidationRule('checkPregnancy', (value) => {
            if (this.state.gestational_unit === Gestational_unit.WEEK) {
                this.setState({
                    msg: 'Value must be between 1 to 47'
                })
                return value <= 47 && value > 0;
            } else if (this.state.gestational_unit === Gestational_unit.MONTH) {
                this.setState({
                    msg: 'Value must be between 1 to 11'
                })
                return value <= 11 && value > 0;
            }
            return true;
        });
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

    //checkbox change handler
    handleCheckbox(id) {
        this.setState(prevState => {
            const updatedSymp = prevState.symptoms_arr.map(each => {
                // auto deselect n/a
                if (id !== 1 && each.id === id) {
                    each.checked = !each.checked
                    this.state.symptoms_arr[0].checked = false;
                } else if (id === 1) {
                    //auto deselect other symptoms
                    if (each.checked === true || each.id === 1) {
                        each.checked = !each.checked
                    }
                } else if (each.id === id) {
                    each.checked = !each.checked
                }
                return each
            });
            prevState.symptoms_arr = this.countChecked(updatedSymp);
            return prevState;
        })
    }

    // give user possible vht id
    async getVHTList() {
        var passback = await RequestServer.getUserList()
        if (passback !== null) {
            this.setState({
                user_array: Utility.populateVHT(passback.data)
            })
        }
    }

    setGestational_age(event) {
        if (event.target.value === Gestational_unit.NOT_PREGNANT) {
            this.setState({
                gestational_age: "0"
            })
        }
    }

    //if no symptom is checked and no other symptom, n/a should be selected
    countChecked(updatedSymp) {
        let count = 0
        updatedSymp.map(each => {
            if (each.checked) {
                count++
            }
        });
        if (count === 0 && this.state.temp_symptoms === "") {
            this.state.symptoms_arr[0].checked = true;
        } else if (this.state.temp_symptoms !== '' && this.state.symptoms_arr[0].checked) {
            this.state.symptoms_arr[0].checked = false;
        }
        return updatedSymp
    }

    //add checked symptoms in the array
    addSymptoms() {
        this.setState({symptoms: []}) //re-instantiate
        let symp = this.state.symptoms_arr;
        for (let index in symp) {
            if (symp[index].checked) {
                this.state.symptoms.push(symp[index].name)
            }
        }
    }

    //set ews_color with an arrow
    setColor() {
        this.setState({
            heart_rate: parseInt(this.state.heart_rate),
            systolic: parseInt(this.state.systolic),
            diastolic: parseInt(this.state.diastolic),
        })
        const RED_SYSTOLIC = 160;
        const RED_DIASTOLIC = 110;
        const YELLOW_SYSTOLIC = 140;
        const YELLOW_DIASTOLIC = 90;
        const SHOCK_HIGH = 1.7; // heartRate > systolic
        const SHOCK_MEDIUM = 0.9; //heartRate < systolic

        let shock = this.state.heart_rate / this.state.systolic;
        let isBpVeryHigh = (this.state.systolic >= RED_SYSTOLIC) || (this.state.diastolic >= RED_DIASTOLIC);
        let isBpHigh = (this.state.systolic >= YELLOW_SYSTOLIC) || (this.state.diastolic >= YELLOW_DIASTOLIC);
        let isSevereShock = (shock >= SHOCK_HIGH);
        let isShock = (shock >= SHOCK_MEDIUM);

        //down : shock index (the ratio)
        if (isSevereShock) {
            this.setState({
                ews_color: Color.RED,
                arrow: Arrow.DOWN
            })
        } else if (isBpVeryHigh) {
            this.setState({
                ews_color: Color.RED,
                arrow: Arrow.UP
            })
        } else if (isShock) {
            this.setState({
                ews_color: Color.YELLOW,
                arrow: Arrow.DOWN
            })
        } else if (isBpHigh) {
            this.setState({
                ews_color: Color.YELLOW,
                arrow: Arrow.UP
            })
        } else {
            this.setState({
                ews_color: Color.GREEN,
                arrow: Arrow.EMPTY
            })
        }
        this.state.recheck_history.push(this.state.ews_color)
    }

    // Check if one of the checkbox is selected or the selected checkboxes are valid
    checkSymptoms() {
        let symp = this.state.symptoms_arr;
        let checked = false; //check if at least one of the checkbox is selected
        for (let index in symp) {
            // should not check n/a and other symptoms
            if (index > 0 && symp[0].checked && symp[index].checked) {
                this.setState({
                    error: true,
                    errorMsg: "Please double check the Symptoms"
                })
                return;
            }
            if (!checked) {
                checked = symp[index].checked
            }
        }
        //no checkbox is selected and other symptoms textfield is empty
        if (!this.state.error && !checked && this.state.temp_symptoms === "") {
            this.setState({
                error: true,
                errorMsg: "Please select at least one check box"
            })
            return;
        }
        //No Symptoms is selected && other symptoms field has information
        if (symp[0].checked && this.state.temp_symptoms !== "") {
            this.setState({
                error: true,
                errorMsg: "Please double check the Symptoms: Cannot use textbox if healthy is selected"
            })
        }
    }


    checkGestAge() {
        if (this.state.gender === "FEMALE" && this.state.gestational_unit === Gestational_unit.EMPTY) {
            this.setState({
                error: true,
                errorMsg: this.state.errorMsg + "Please select at least one gestational age"
            })
        }
    }


    changeType() {
        //add the symptoms in the text field
        if (this.state.temp_symptoms !== "") {
            this.state.symptoms.push(this.state.temp_symptoms);
        }
        //add the checked symptoms
        this.addSymptoms();
    }


    //get a single patient with matching patient_id
    async getMatchingPatientData(patient_id) {
        let passback = await RequestServer.getPatientByID(patient_id)
        if (passback !== null && passback.data !== '') {
            let patient_data = passback.data

            this.setState({
                fname: patient_data.name.split(" ")[0],
                lname: patient_data.name.split(" ")[1],
                gender: patient_data.gender,
                create_patient: false
            })
            if (patient_data.birth_date.includes(", ")) {
                this.setState({
                    temp_dob: new Date(patient_data.birth_date)
                })

            }
        } else {
            this.setState({
                fname: '',
                lname: '',
                gender: "MALE",
                create_patient: true
            })
        }
        return true;
    }

    //format change
    changeState() {
        this.setState({
            name: this.state.fname + ' ' + this.state.lname
        })
    }


    //USING ALERT RIGHT NOW, SHOULD DISPLAY INSTEAD
    handleSubmit = async () => {
        this.setState({
            error: false,
            errorMessage: ''
        })
        this.checkSymptoms();
        this.checkGestAge();

        if (this.state.location === "EMPTY") {
            alert(this.state.errorMsg + "\nPlease select one of the location")
            return;
        }

        //the error controller
        if (this.state.error) {

            alert(this.state.errorMsg)
            return;
        }

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
        this.setColor();

        //check if we need to recheck the reading
        let retestAdvice = ReadingRequestAnalysis.computeAdvice(this.state.recheck_history)
        if (retestAdvice !== "RETEST_NOT_RECOMMENDED") {
            this.setState({
                recheck: true
            })
            alert(retestAdvice)
        }

        //setDate
        let today = new Date();
        this.setState({date: today.toString()})
        this.changeType();
        this.changeState();

        //assessment
        this.addAssessment();
    }


    async addAssessment() {
        var passback = await RequestServer.addAssessment(this.state)
        if (passback !== null) {
            this.props.history.push(
                '/',
                {detail: passback.data}
            )
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

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
        if (event.target.name === "patient_id") {
            this.getMatchingPatientData(event.target.value)
                .catch(() => {
                    return true;
                });
        }
    }


    // use variant="outlined" to wrap up the box
    render() {
        let symptom = this.state.symptoms_arr.map(item => <ShowSymp key={item.id} item={item}
                                                                    handleChange={this.handleCheckbox}/>)
        let user_select_option = this.state.user_array.map(user => <option key={user.id}
                                                                           value={user.id}> {user.name} </option>)
        let location_select_option = this.state.location_array.map(location => <option key={location.id}
                                                                                       value={location.id}> {location.name}</option>)

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
                <Grid>
                    <Cell col={4}>

                        {/*<label>Location: </label>*/}
                        <h4> Location </h4>
                        <select
                            value={this.state.location}
                            onChange={this.handleChange}
                            name="location"
                        >
                            <option value="EMPTY"> --SELECT ONE--</option>
                            {location_select_option}
                        </select>
                        <h4> Patient Form </h4>

                        <TextValidator
                            label="Attestation ID"
                            onChange={this.handleChange}
                            name="patient_id"
                            value={this.state.patient_id}
                            validators={['required', 'matchRegexp:^[0-9]{11}$']}
                            errorMessages={['this field is required', 'Must be 11 digits']}
                        />
                        <br/>
                        <div style={{display: (this.state.create_patient ? 'block' : 'none')}}>
                            <TextValidator
                                label="First Name"
                                onChange={this.handleChange}
                                name="fname"
                                value={this.state.fname}
                                validators={['required', 'matchRegexp:^[A-Za-z]+$']}
                                errorMessages={['this field is required', 'Invalid input (only letters)']}
                            />
                            <br/>

                            <TextValidator
                                label="Last Name"
                                onChange={this.handleChange}
                                name="lname"
                                value={this.state.lname}
                                validators={['required', 'matchRegexp:^[A-Za-z]+$']}
                                errorMessages={['this field is required', 'Invalid input (only letters)']}
                            />
                            <br/>
                        </div>
                        <br/>

                        <RadioGroup name="dob_type"
                                    onChange={this.handleChange}
                                    value={this.state.dob_type}>
                            <Radio value="date" ripple>
                                <span className="mdl-radio__label">Date of Birth</span>
                            </Radio>
                            <Radio value="age">Age</Radio>
                        </RadioGroup>


                        <div style={{display: (this.state.dob_type === "age" ? 'block' : 'none')}}>
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
                        <div style={{display: (this.state.dob_type === "date" ? 'block' : 'none')}}>
                            <label>Date of Birth:</label>
                            <br/>
                            <DatePicker
                                selected={this.state.temp_dob}
                                onChange={this.changeDOB}
                                maxDate={new Date()}
                            />

                        </div>
                        <br/>

                        <div style={{display: (this.state.create_patient ? 'block' : 'none')}}>
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
                        </div>
                        <br/>

                        <div style={{display: (this.state.gender === "FEMALE" ? 'block' : 'none')}}>
                            <label>Gestational Age:</label>
                            <br/>
                            <select
                                value={this.state.gestational_unit}
                                onChange={this.handleChange}
                                name="gestational_unit"
                                onClick={this.setGestational_age}
                            >
                                <option value="EMPTY"> --SELECT ONE--</option>
                                <option value="WEEK"> Week(s)</option>
                                <option value="MONTH"> Month(s)</option>
                                <option value="NOT_PREGNANT"> Not Pregnant</option>
                            </select>
                            <br/>

                            <div
                                style={{display: (this.state.gestational_unit !== Gestational_unit.NOT_PREGNANT && this.state.gestational_unit !== Gestational_unit.EMPTY ? 'block' : 'none')}}>

                                <TextValidator
                                    label="Gestational Age"
                                    onChange={this.handleChange}
                                    name="gestational_age"
                                    value={this.state.gestational_age}
                                    validators={['required', 'checkPregnancy', 'minNumber:0', 'maxNumber:60', 'matchRegexp:^[0-9]*$']}
                                    errorMessages={['this field is required', this.state.msg, 'MUST BE BETWEEN 0-60']}
                                />
                            </div>
                        </div>
                    </Cell>
                    <Cell col={4}>
                        <h4> Symptoms </h4>

                        {symptom}

                        <TextValidator
                            label="Other Symptoms"
                            onChange={this.handleChange}
                            name="temp_symptoms"
                            value={this.state.temp_symptoms}
                        />

                        <br/>
                    </Cell>
                    <Cell col={4}>
                        <h4>Vitals</h4>
                        <div
                            style={{display: (this.state.retestAdvice !== "RETEST_NOT_RECOMMENDED" ? 'block' : 'none')}}>
                            {/*<p>{this.state.retestAdvice}</p>*/}
                            <Alert key={3} variant={'danger'}>
                                {this.state.retestAdvice}
                            </Alert>
                            <br/>
                        </div>

                        <TextValidator
                            label="Systolic"
                            onChange={this.handleChange}
                            name="systolic"
                            value={this.state.systolic}
                            validators={['required', 'minNumber:10', 'maxNumber:300', 'matchRegexp:^[0-9]*$']}
                            errorMessages={['this field is required', 'MUST BE BETWEEN 10-300', 'MUST BE BETWEEN 10-300', 'MUST BE BETWEEN 10-300']}
                        />
                        <br/>
                        <TextValidator
                            label="Diastolic"
                            onChange={this.handleChange}
                            name="diastolic"
                            value={this.state.diastolic}
                            validators={['required', 'isGreater', 'minNumber:10', 'maxNumber:300', 'matchRegexp:^[0-9]*$']}
                            errorMessages={['this field is required', 'Diastolic should be <= to Systolic', 'MUST BE BETWEEN 10-300', 'MUST BE BETWEEN 10-300', 'MUST BE BETWEEN 10-300']}
                        />
                        <br/>
                        <TextValidator
                            label="Heart Rate"
                            onChange={this.handleChange}
                            name="heart_rate"
                            value={this.state.heart_rate}
                            validators={['required', 'minNumber:40', 'maxNumber:200', 'matchRegexp:^[0-9]*$']}
                            errorMessages={['this field is required', 'MUST BE BETWEEN 40-200', 'MUST BE BETWEEN 40-200', 'MUST BE BETWEEN 40-200']}
                        />
                    </Cell>
                </Grid>
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

export default NewAssessment
