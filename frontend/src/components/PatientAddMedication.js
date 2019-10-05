import React from 'react';
import {Button, Textfield, Grid, Cell} from 'react-mdl';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik } from 'formik';

class PatientAddMedication extends React.Component {
 
    state = {
        medication: '',
        dose: '',
        startDate: new Date(),
        endDate: new Date(),
    }

    changeStartDate = date => {
        this.setState({
          startDate: date
        });
      };

    changeEndDate = date => {
        this.setState({
          endDate: date
        });
      };

    changeMedication = (event) => {
        const medication = event.target.value;
        this.setState({ medication });
    }
    changeDose = (event) => {
        const dose = event.target.value;
        this.setState({ dose });
    }
 
    handleSubmit = () => {
        //submit logic
    }
 
    render() {
        const { medication } = this.state;
        const { dose } = this.state;
        return (
            //<div style={{width: '100%', margin: 'auto'}}>
            <Grid>
            <ValidatorForm
            style={{
            backgroundColor: 'white',
            margin : 'auto',
            padding : '50px',
            textAlign: 'center'
            }}
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}

            >
                <h3>Patient Name</h3>
                <Cell col={6}>
                <TextValidator
                    label="Medication"
                    onChange={this.changeMedication}
                    name="medication"
                    value={medication}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
                </Cell>
                <Cell col={6}>
                 <TextValidator
                    label="Dose"
                    onChange={this.changeDose}
                    name="dose"
                    value={dose}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
                </Cell>
                <Grid>
                <Cell col={3}>
                <p>Start Date:</p>
                </Cell>
                <Cell col={4}>
                <DatePicker
                selected={this.state.startDate}
                onChange={this.changeStartDate}
                />
                </Cell>
                </Grid>
                <Grid>
                <Cell col={3}>
                <p>End Date:</p>
                </Cell>
                <Cell col={4}>
                <DatePicker
                selected={this.state.endDate}
                onChange={this.changeEndDate}
                />
                </Cell>
                </Grid>
                <Cell col={6}>
                <Textfield
                onChange={() => {}}
                label="Side Effects"
                rows={3}
                style={{width: '200px'}}
                />
                </Cell>
                <Cell col={4}>
                <Button type="submit" style={{
                    backgroundColor: 'blue', 
                    color: 'white'}}
                >Submit</Button>
                </Cell>
            </ValidatorForm>
            </Grid>
            //</div>
        );
    }
}
export default PatientAddMedication;