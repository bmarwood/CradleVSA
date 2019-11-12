import React, { Component } from 'react';
import Popup from "reactjs-popup";
import './ModalPopup';
import './ModalPopup.css';
import requestServer from '../components/RequestServer';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Tabs, Tab, Grid, Cell, Card, CardTitle, CardText, CardActions, CardMenu, IconButton } from 'react-mdl';

class ModalAssessment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            id: props.id,
            patient_id: '',
            systolic: '',
            diastolic: '',
            symptoms: '',
            date: '',
            heart_rate: '',
            patient_name: 'LOADING...',
            vht_name: 'LOADING...',

        }
    }

    componentDidMount() {
        this.getPatient();
        this.getVHT();
    }

    async getPatient() {

        var response = await requestServer.getPatient(this.props.patient_id)
        if (response !== null) {
            if (response.data === "") {
                this.setState({ patient_name: 'ID doesn\'t match to a patient' })
            } else {
                this.setState({ patient_name: response.data.name })
            }
        }
    }

    async getVHT() {
        var response = await requestServer.getVHT(this.props.vht_id)

        if (response !== null) {
            if (response.data === "") {
                this.setState({ vht_name: 'ID doesn\'t match to a vht' })
            } else {
                this.setState({ vht_name: response.data.name })
            }
        }
    }

    render() {
        return (
            <div className="modal">
                <div style={{ margin: 'auto', textAlign: 'center' }}>
                    <div style={{ margin: 'auto', backgroundColor: 'white', textAlign: 'center', width: '100%' }}>
                        <h1>Asssessment ID: {this.props.id}</h1>
                        <Grid className="demo-grid-ruler">
                            <Cell col={12}>
                                <TextField
                                    id="PatientName"
                                    label="PatientName"
                                    name="patient_name"
                                    className="demo-text"
                                    type="password"
                                    // value={this.state.old_password}
                                    // onChange={this.handleChange.bind(this)}
                                    autoComplete="current-password"
                                    margin="normal"
                                    variant="outlined"
                                />
                                <br />
                                <TextField

                                    label="Patient ID"
                                    // onChange={this.handleChange}
                                    name="patient_id"
                                    // value={this.state.patient_id}
                                    validators={['required']}
                                    margin="normal"

                                    errorMessages={['this field is required']}
                                />

                            </Cell>

                            <div className="demo-grid-ruler">
                                {" "}
                                Patient Name: {this.state.patient_name}
                                <br />
                                VHT Name: {this.state.vht_name}
                                <br />
                                Date of Birth: {this.props.date}
                                <br />
                                Current Symptoms: {this.props.symptoms}
                                <br />
                                Heart Rate: {this.props.heart_rate}
                                <br />
                                Diastolic: {this.props.diastolic}
                                <br />
                                Systolic: {this.props.systolic}
                            </div>
                            <div className="actions">
                                <Popup
                                    trigger={<button className="ui black basic button"> See Patient </button>}
                                    position="top center"
                                    closeOnDocumentClick
                                >
                                    <span>
                                        This will navigate to the individual Patient page
                        </span>
                                </Popup>
                                <Popup
                                    trigger={<button className="ui black basic button"> See VHT </button>}
                                    position="top center"
                                    closeOnDocumentClick
                                >
                                    <span>
                                        This will navigate to the individual VHT page
                        </span>
                                </Popup>
                            </div>
                        </Grid>

                    </div>
                </div>


            </div>
        );
    }
}
export default ModalAssessment;                    