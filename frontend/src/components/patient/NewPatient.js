
import React from 'react';
import Button from '@material-ui/core/Button';
// import Checkbox from '@material-ui/core/Checkbox';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
// import TextField from 'material-ui/TextField';
import axios from 'axios';
import ShowSymp from "./SymptomsForm";


class newPatient extends React.Component {

    constructor(){
        super()
        this.state = {
            patient : {
                patient_id: "",
                initial: "",
                patient_age: "",
                time_scale: "",
                gestational_age: "",
                temp_symptoms: "",
                symptoms: [],
                systolic: "",
                diastolic: "",
                heart_rate: "",
                ews_color: "",
                vht_id : null,
                date: "",
                referred: false,
                follow_up: false,
                follow_up_date: null,
                recheck: false,
                //Symptoms
                symptoms_arr: [
                    {id: 1, name: 'No Symptoms (patient healthy)', checked: false},
                    {id: 2, name: 'Headache', checked: false},
                    {id: 3, name: 'Blurred vision', checked: false},
                    {id: 4, name: 'Abdominal pain', checked: false},
                    {id: 5, name: 'Bleeding', checked: false},
                    {id: 6, name: 'Feverish', checked: false},
                    {id: 7, name: 'Unwell', checked: false},
                ]
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleCheckbox = this.handleCheckbox.bind(this)
    }

    // private String patient_id;
    // private String patient_age;
    // private String vht_id;
    // private String date;
    // private String gestational_age;
    // private int heart_rate;
    // private int systolic;
    // private int diastolic;
    // private String ews_color;
    // private String symptoms;
    // private boolean referred;
    // private boolean follow_up;
    // private String follow_up_date;
    // private boolean recheck;
    //



    componentDidMount() {
        // custom rule will have name 'isValidEWS'
        ValidatorForm.addValidationRule('isValidEWS', (value) => {
            if (value === 'green' || value === 'yellow' || value ==='red') {
                return true;
            }
            return false;
        });
    }

    // componentWillUnmount() {
    //     // remove rule when it is not needed
    //     ValidatorForm.removeValidationRule('isValidEWS');
    // }

    handleCheckbox(id){
        this.setState(prevState => {
            const updatedSymp = prevState.patient.symptoms_arr.map(each => {
                if(each.id === id){
                    each.checked = !each.checked
                }
                return each
            });
            prevState.patient.symptoms_arr = updatedSymp;
            return prevState;
        })
        console.log(this.state.patient.symptoms_arr)
    }

    addSymptoms(){
        const symp = this.state.patient.symptoms_arr;
        for(var index in symp){
            if (symp[index].checked){
                this.state.patient.symptoms.push(symp[index].name)
            }
        }
    }

    changeType(){
        this.state.patient.heart_rate = parseInt(this.state.patient.heart_rate)
        this.state.patient.systolic = parseInt(this.state.patient.systolic)
        this.state.patient.diastolic = parseInt(this.state.patient.diastolic)
        this.state.patient.symptoms.push(this.state.patient.temp_symptoms)
        this.addSymptoms()
        delete this.state.patient.temp_symptoms;
        delete this.state.patient.symptoms_arr;

    }


    handleSubmit = () => {
        this.changeType();
        console.log(this.state)
        axios.post('http://localhost:8080/user/form', this.state.patient)
            .then(response => {
                this.setTheState(response)
                console.log(this.state)
                this.props.history.push(
                    '/',
                    { detail: response.data }
                )
            })
            .catch(error => {
                console.log('error block')
                console.log(error)
            })

    }


    handleChange(event){
        const { patient } = this.state;
        patient[event.target.name] = event.target.value;
        this.setState({ patient });
    }



    render() {
        const symptom = this.state.patient.symptoms_arr.map(item => <ShowSymp key = {item.id} item = {item}
                                                              handleChange = { this.handleCheckbox}/>)

        return (
            <ValidatorForm
                style={{
                    backgroundColor: 'white',
                    margin : 'auto',
                    padding : '50px'
                    // width: '400px',
                    // height: '400px'
                }}
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
            >
                <h4> Patient Form </h4>
                <TextValidator
                    label="ID"
                    onChange={this.handleChange}
                    name="patient_id"
                    value={this.state.patient.patient_id}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
                <br/>

                <TextValidator
                    label="Initial"
                    onChange={this.handleChange}
                    name="initial"
                    value={this.state.patient.initial}
                    validators={['required']}
                    errorMessages={['this field is required']}

                />
                <br/>

                <TextValidator
                    label="Age"
                    onChange={this.handleChange}
                    name="patient_age"
                    value={this.state.patient.patient_age}
                    validators={['required','minNumber:0', 'maxNumber:200', 'matchRegexp:^[0-9]*$']}
                    errorMessages={['this field is required', 'MUST BE BETWEEN 0-200']}
                />
                <br/>
                <br/>
                <label>Gestational Age:</label>
                <select
                    value={this.state.patient.status}
                    onChange={this.handleChange}
                    name="status"
                >
                    <option value=""> --SELECT ONE---</option>
                    <option value="w"> Week</option>
                    <option value="m"> Month</option>
                    <option value="n/a"> Not Pregnant</option>
                </select>
                <br/>


                <TextValidator
                    label="Gestational Age"
                    onChange={this.handleChange}
                    name="gestational_age"
                    value={this.state.patient.gestational_age}
                    validators={['required', 'minNumber:0', 'maxNumber:60', 'matchRegexp:^[0-9]*$']}
                    errorMessages={['this field is required','MUST BE BETWEEN 0-60','MUST BE BETWEEN 0-60','MUST BE BETWEEN 0-60']}
                />

                <br/>
                <h4> Symptoms </h4>

                {symptom}


                <TextValidator
                    label="Other Symptoms"
                    onChange={this.handleChange}
                    name="temp_symptoms"
                    value={this.state.patient.temp_symptoms}
                />

                <br/>

                <h4>Vitals</h4>
                <TextValidator
                    label="Systolic"
                    onChange={this.handleChange}
                    name="systolic"
                    value={this.state.patient.systolic}
                    validators={['required', 'minNumber:0', 'maxNumber:300', 'matchRegexp:^[0-9]*$']}
                    errorMessages={['this field is required','MUST BE BETWEEN 0-300']}
                />
                <br/>
                <TextValidator
                    label="Diastolic"
                    onChange={this.handleChange}
                    name="diastolic"
                    value={this.state.patient.diastolic}
                    validators={['required', 'minNumber:0', 'maxNumber:300', 'matchRegexp:^[0-9]*$']}
                    errorMessages={['this field is required','MUST BE BETWEEN 0-300']}
                />
                <br/>
                <TextValidator
                    label="Heart Rate"
                    onChange = {this.handleChange}
                    name="heart_rate"
                    value={this.state.patient.heart_rate}
                    validators={['required', 'minNumber:0', 'maxNumber:300', 'matchRegexp:^[0-9]*$']}
                    errorMessages={['this field is required','MUST BE BETWEEN 0-300']}
                />
                <br/>
                <TextValidator
                    label="Early Warning Sign"
                    onChange={this.handleChange}
                    name="ews_color"
                    value={this.state.patient.ews_color}
                    validators={['isValidEWS', 'required']} //TO DO
                    errorMessages={['Must be one of green, yellow, or red', 'this field is required']}
                />
                <br/>

                <br/>
                <Button type="submit" style={{
                    backgroundColor: 'blue',
                    color:'white'
                }}>Submit</Button>
                <br/>
                <br/>

            </ValidatorForm>
        );
    }
}




export default newPatient
