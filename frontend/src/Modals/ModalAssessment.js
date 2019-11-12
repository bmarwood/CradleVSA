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
                
                <div className="one-edge-shadow modal-header p-30">
                    <h3>Asssessment ID: {this.props.id}</h3><br/>
                    <div className='modal-header-direction'>
                        <div className='float-left'>
                            <h5>
                                Patient ID: {this.props.patient_id}
                                <br />
                                Patient Name: {this.state.patient_name}
                            </h5>

                        </div>

                        <div className='float-right'>
                            <h5>
                                VHT ID: {this.props.vht_id}
                                <br />
                                VHT Name: {this.state.vht_name}
                            </h5>
                        </div>
                    </div>

                  

                </div>


                <div className="modal-body p-30">
                    <div className='float-left'>
                        Asssessment Color: {this.props.ews_color}
                        <br />
                        Heart Rate: {this.props.heart_rate}
                        <br />
                        Diastolic: {this.props.diastolic}
                        <br />
                        Systolic: {this.props.systolic}
                        <br />
                        Current Symptoms: {this.props.symptoms}
                    </div>

                    <div className='float-right'>
                        Date of Birth: {this.props.date}
                        <br />
                        Patient Age: TODO
                            <br />
                        Date of Assessment: {this.props.assessment_date}
                        <br />
                        Follow Up Date: {this.props.follow_up_date}
                    </div>


                    {/* <div className="actions">
                            <Popup
                                trigger={<button className="ui black basic button"> See Patient </button>}
                                position="top center"   
                                closeOnDocumentClick
                            >
                                <span>This will navigate to the individual Patient page</span>
                            </Popup>
                            <Popup
                                trigger={<button className="ui black basic button"> See VHT </button>}
                                position="top center"
                                closeOnDocumentClick
                            >
                                <span>This will navigate to the individual VHT page</span>
                            </Popup>
                        </div> */}
                </div>
            </div>
        );
    }
}
export default ModalAssessment;                    