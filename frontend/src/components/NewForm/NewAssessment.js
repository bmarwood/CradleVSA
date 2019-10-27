import React from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import ShowSymp from "./SymptomsForm";
import { Grid, Cell } from 'react-mdl';
import RequestServer from '../RequestServer';
import Utility from './Utility';

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
    WEEK: "WEEK(S)",
    MONTH: "MONTH(S)",
    NOT_PREGNANT: "NOT_PREGNANT"
}

//Form for a new assessment
class NewAssessment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //use get method to get the assessment id <- should be equal to # of assessments + 1
            id: '',
            patient_id: "",
            patient_age: "",
            vht_id: null,
            date: "",
            gestational_age: "",
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

            //Temporary variables
            gestational_unit: null,
            initial: "",
            temp_symptoms: "",
            error: false,   //to handle submit
            errorMsg: '',   //to handle submit
            msg: '',        //for the componenetDidMount error message

            //Symptoms
            symptoms_arr: [
                { id: 1, name: 'No Symptoms (patient healthy)', checked: true },
                { id: 2, name: 'Headache', checked: false },
                { id: 3, name: 'Blurred vision', checked: false },
                { id: 4, name: 'Abdominal pain', checked: false },
                { id: 5, name: 'Bleeding', checked: false },
                { id: 6, name: 'Feverish', checked: false },
                { id: 7, name: 'Unwell', checked: false },
            ]

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleCheckbox = this.handleCheckbox.bind(this)
    }


    componentDidMount() {
        //get id of user
        var userData = JSON.parse(localStorage.getItem("userData"))
        this.setState({
            vht_id: userData.id
        })

        //check if systolic > diastolic
        ValidatorForm.addValidationRule('isGreater', (value) => {
            if (parseInt(value) <= parseInt(this.state.systolic)) {
                return true;
            }
            return false;
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
            } else if (this.state.gestational_unit === Gestational_unit.NOT_PREGNANT) {
                this.setState({
                    msg: 'Value must be 0'
                })
                return value === 0;
            }
            this.setState({
                msg: 'Must select one of the Gestational age'
            })
            return false;
        });
    }

    //checkbox change handler
    handleCheckbox(id) {
        this.setState(prevState => {
            const updatedSymp = prevState.symptoms_arr.map(each => {
                if (each.id === id) {
                    each.checked = !each.checked
                }
                return each
            });
            prevState.symptoms_arr = updatedSymp;
            return prevState;
        })
    }

    //add checked symptoms in the array
    addSymptoms() {
        this.setState({ symptoms: [] }) //re-instantiate
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
            heart_rate:  parseInt(this.state.heart_rate),
            systolic:  parseInt(this.state.systolic),
            diastolic:  parseInt(this.state.diastolic),
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
        if (this.state.gestational_unit === Gestational_unit.EMPTY) {
            this.setState({
                error: true,
                errorMsg: this.state.errorMsg + "Please select at least one gestational age"
            })
        }

        //combine the number and time scale
        if (!this.state.error) {
            this.setState({
                gestational_age: this.state.gestational_age
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
    async getMatchingPatientID(patient_id) {
        var passback = await RequestServer.getPatientByID(patient_id)
        console.log(passback)
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


    //USING ALERT RIGHT NOW, SHOULD DISPLAY INSTEAD
    handleSubmit = async () => {
        this.setState({
            error: false,
            errorMessage: ''
        })
        this.checkSymptoms();
        this.checkGestAge();
        //the error controller
        if (this.state.error) {
            alert(this.state.errorMsg)
            return;
        }
        //true if id does not exist
        let no_existing_ID = await this.checkID(this.state.patient_id)

        if (no_existing_ID) {
            alert("Patient ID does NOT EXIST")
            this.setState({
                patient_id: ''
            })
            return;
        }

        //setDate
        let today = new Date();
        this.setState({ date: Utility.convertDate(today) })
        this.setColor();
        this.changeType();
        console.log(this.state)

        //assessment
        this.addAssessment();
    }


    async addAssessment() {
        console.log("this.state")

        var passback = await RequestServer.addAssessment(this.state)
        if (passback !== null) {
            this.props.history.push(
                '/',
                { detail: passback.data }
            )
        }
    }


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    // use variant="outlined" to wrap up the box
    render() {
        let symptom = this.state.symptoms_arr.map(item => <ShowSymp key={item.id} item={item}
            handleChange={this.handleCheckbox} />)
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
                <Grid>
                    <Cell col={4}>
                        <h4> Patient Form </h4>
                        {/* <TextValidator
                            label="Assigned Worker Id"
                            onChange={this.handleChange}
                            name="id"
                            value={this.state.id}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        /> */}
                        <br />
                        <TextValidator
                            label="Patient ID"
                            onChange={this.handleChange}
                            name="patient_id"
                            value={this.state.patient_id}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <br />

                        <TextValidator
                            label="Initials"
                            onChange={this.handleChange}
                            name="initial"
                            value={this.state.initial}
                            validators={['required', 'matchRegexp:^[A-Za-z]+$']}
                            errorMessages={['this field is required', 'Invalid input (only letters)']}
                        />
                        <br />

                        <TextValidator
                            label="Age"
                            onChange={this.handleChange}
                            name="patient_age"
                            value={this.state.patient_age}
                            validators={['required', 'minNumber:0', 'maxNumber:200', 'matchRegexp:^[0-9]*$']}
                            errorMessages={['this field is required', 'MUST BE BETWEEN 0-200']}
                        />
                        <br />
                        <br />
                        <label>Gestational Age:</label>
                        <select
                            value={this.state.gestational_unit}
                            onChange={this.handleChange}
                            name="gestational_unit"
                        >
                            <option value="EMPTY"> --SELECT ONE---</option>
                            <option value="WEEK"> Week(s)</option>
                            <option value="MONTH"> Month(s)</option>
                            <option value="NOT_PREGNANT"> Not Pregnant</option>
                        </select>
                        <br />


                        <TextValidator
                            label="Gestational Age"
                            onChange={this.handleChange}
                            name="gestational_age"
                            value={this.state.gestational_age}
                            validators={['required', 'checkPregnancy', 'minNumber:0', 'maxNumber:60', 'matchRegexp:^[0-9]*$']}
                            errorMessages={['this field is required', this.state.msg, 'MUST BE BETWEEN 0-60']}
                        />
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

                        <br />
                    </Cell>
                    <Cell col={4}>

                        <h4>Vitals</h4>
                        <TextValidator
                            label="Systolic"
                            onChange={this.handleChange}
                            name="systolic"
                            value={this.state.systolic}
                            validators={['required', 'minNumber:10', 'maxNumber:300', 'matchRegexp:^[0-9]*$']}
                            errorMessages={['this field is required', 'MUST BE BETWEEN 0-300', 'MUST BE BETWEEN 0-300', 'MUST BE BETWEEN 0-300']}
                        />
                        <br />
                        <TextValidator
                            label="Diastolic"
                            onChange={this.handleChange}
                            name="diastolic"
                            value={this.state.diastolic}
                            validators={['required', 'isGreater', 'minNumber:10', 'maxNumber:300', 'matchRegexp:^[0-9]*$']}
                            errorMessages={['this field is required', 'Diastolic should be <= to Systolic', 'MUST BE BETWEEN 0-300', 'MUST BE BETWEEN 0-300', 'MUST BE BETWEEN 0-300']}
                        />
                        <br />
                        <TextValidator
                            label="Heart Rate"
                            onChange={this.handleChange}
                            name="heart_rate"
                            value={this.state.heart_rate}
                            validators={['required', 'minNumber:40', 'maxNumber:200', 'matchRegexp:^[0-9]*$']}
                            errorMessages={['this field is required', 'MUST BE BETWEEN 0-300', 'MUST BE BETWEEN 0-300', 'MUST BE BETWEEN 0-300']}
                        />
                    </Cell>
                </Grid>
                <br />
                <br />
                <Button type="submit" style={{
                    backgroundColor: 'blue',
                    color: 'white'
                }}>Submit</Button>
                <br />
                <br />

            </ValidatorForm>
        );
    }
}

export default NewAssessment
