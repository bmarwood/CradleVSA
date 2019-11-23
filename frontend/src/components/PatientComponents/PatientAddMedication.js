import React from 'react';
import {Button, Textfield, Grid, Cell} from 'react-mdl';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RequestServer from '../RequestServer';
import Utility from '../NewForm/Utility';
import '../../Modals/NewMedicationPopup';
// import '../../Modals/NewMedicationPopup.css';

class PatientAddMedication extends React.Component {
 
    constructor(props){
        super(props);
        this.state = {
            id: '',
            patient_id : props.patient_id,
            medication_name: '',
            dose: '',
            start_date: '',
            end_date: '',
            side_effects: '',
            temp_start_date: new Date(),
            temp_end_date: new Date(),
            patient_name: "Loading",
            frequency: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.changeStartDate = this.changeStartDate.bind(this);
        this.changeEndDate = this.changeEndDate.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    changeStartDate = date => {
        this.setState({
          temp_start_date: date
        });
      };

    changeEndDate = date => {
        this.setState({
          temp_end_date: date
        });
      };
    changeState() {
        this.setState({
            start_date: Utility.convertDate(this.state.temp_start_date),
            end_date: Utility.convertDate(this.state.temp_end_date)
        })
    }
    handleSubmit = async () => {
        this.changeState();
        console.log(this.state)
        var response = await RequestServer.addMedications(this.state)
        if (response !== null) {
            alert("Medication Added")
        }
    }
    render() {
        return (
            <div className = "modal" >
                <div style={{ textAlign: 'center' }}>
                    <div style={{ backgroundColor: 'white', textAlign: 'center'}}>           
                     <ValidatorForm
            style={{
            backgroundColor: 'white',
            margin : 'auto',
            padding : '5px',
            textAlign: 'center'
            }}
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}

            >
                <Grid>
                    <Cell col={4}></Cell>
                    <Cell col={4}>
                    <h3>{this.props.patient_name}</h3>
                    </Cell>
                    <Cell col={4}></Cell>
                </Grid>

                <Grid>
                <Cell col={4}>
                <p>Start Date:</p>
                <DatePicker
                selected={this.state.temp_start_date}
                onChange={this.changeStartDate}
                />
                </Cell>
                <Cell col={4}>
                <TextValidator
                    label="Medication"
                    onChange={this.handleChange}
                    name="medication_name"
                    value={this.state.medication_name}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
                </Cell>
                <Cell col={4}></Cell>
                </Grid>
                <Grid>
                <Cell col={4}>
                <p>End Date:</p>
                <DatePicker
                selected={this.state.temp_end_date}
                onChange={this.changeEndDate}
                />
                </Cell>
                <Cell col={4}>
                 <TextValidator
                    label="Dose"
                    onChange={this.handleChange}
                    name="dose"
                    value={this.state.dose}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
                </Cell>
                <Cell col={4}></Cell>
                </Grid>

                <Grid>
                <Cell col={4}></Cell>
                <Cell col={4}>
                <TextValidator
                label="Frequency"
                onChange={this.handleChange}
                name="frequency"
                value={this.state.frequency}
                validators={['required']}
                errorMessages={['this field is required']}
                />
                </Cell>
                </Grid>
                <Grid>
                <Cell col={4}></Cell>
                <Cell col={4}>
                </Cell>
                </Grid>

                <Grid>
                <Cell col={4}></Cell>
                <Cell col={4}>
                <TextValidator
                label="Side Effects"
                onChange={this.handleChange}
                name="side_effects"
                value={this.state.side_effects}
                />
                </Cell>
                <Cell col={4}></Cell>
                </Grid>
                <Grid>
                <Cell col={4}></Cell>
                <Cell col={4}>
                <Button type="submit" style={{
                    backgroundColor: 'blue', 
                    color: 'white'
                }}>Submit </Button>
                </Cell>
                <Cell col={4}></Cell>
                </Grid>
            </ValidatorForm>
            </div>
            </div>
            </div>
        );
    }
}
export default PatientAddMedication;