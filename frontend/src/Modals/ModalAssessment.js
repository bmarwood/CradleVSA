import React, { Component } from 'react';
import Popup from "reactjs-popup";
import './ModalPopup';
import './ModalPopup.css';
import MaterialTable from 'material-table';
import requestServer from '../components/RequestServer';
import TrafficIconsCircle from '../components/Visuals/TrafficIconsCircle';
import TrafficIconsTriangle from "../components/Visuals/TrafficIconsTriangle";
import TrafficIconsOctagon from "../components/Visuals/TrafficIconsOctagon";
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
            patient_dob: '',
            CVSA_name: 'LOADING...',

        }
    }

    componentDidMount() {
        this.getPatient();
        this.getCVSA();
    }

    async getPatient() {

        var response = await requestServer.getPatient(this.props.patient_id)
        if (response !== null) {
            if (response.data === "") {
                this.setState({ patient_name: 'ID doesn\'t match to a patient' })
            } else {
                // console.log("Patient DATA:", response.data )
                this.setState({ 
                    patient_name: response.data.name,
                    patient_dob: response.data.birth_date 
                })
            }
        }
    }

    async getCVSA() {
        var response = await requestServer.getCVSA(this.props.cvsa_id)

        if (response !== null) {
            if (response.data === "") {
                this.setState({ CVSA_name: 'ID doesn\'t match to a CVSA' })
            } else {
                this.setState({ CVSA_name: response.data.name })
            }
        }
    }


    calculateAge() {

        if (this.state.patient_dob != '' || this.state.patient_dob != null) {
            var dob = new Date(this.state.patient_dob) 
            var age = ~~((Date.now() - dob) / (31557600000))
            return age
        }
        return null

    }

    render() {
        return (
            <div className="modal">

                <div className="one-edge-shadow modal-header p-30">
                    <h3>Asssessment ID: {this.props.id}</h3><br />
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
                                Cradle Professional ID: {this.props.cvsa_id}
                                <br />
                                Cradle Professional Name: {this.state.cvsa_name}
                            </h5>
                        </div>
                    </div>
                </div>

                <div className="modal-body p-30">
                    <div className='float-left'>
                        Asssessment Color: {this.getColorVisual(this.props.ews_color)}
                        <br />
                        Arrow: {this.getArrowVisual(this.props.arrow)}
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
                        Date of Birth: {this.state.patient_dob}
                        <br />
                        Patient Age: {this.calculateAge() ? this.calculateAge() : 0 }
                            <br />
                        Date of Assessment: {this.props.assessment_date}
                        <br />
                        Follow Up Date: {this.props.follow_up_date}
                    </div>
                </div>

                <div className="actions">
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
                    </div>
            </div>
        );
    }
    getColorVisual(input) {
        switch (String(input).toUpperCase()) {
            case "GREEN":
                return <GreenLight />
            case "YELLOW":
                return <YellowLight />
            case "RED":
                return <RedLight />
            default:
                return input
        }
    }
    getArrowVisual(input) {
        switch (String(input).toUpperCase()) {
            case "UP":
                console.log("Hitting case")
                return <i className="arrow up icon" />
            case "DOWN":
                    console.log("Hitting case")
                return <i className="arrow down icon" />
            case "EMPTY":
                    console.log("Hitting case")
                return <i className="window minimize icon" />
            default:
                    console.log(input)

                return input
        }
    }
}

const styles = {
    overflow: "hidden",
    display: "auto",
    flexWrap: "flex",
    alignItems: "center",
    fontFamily: "sans-serif",
    justifyContent: "left"
};
const GreenLight = () => (
    <div style={styles}>
        <TrafficIconsCircle name="greencircle" width={50} fill={"#228B22"} />
    </div>
);
const RedLight = () => (
    <div style={styles}>
        <TrafficIconsOctagon name="redcircle" width={50} fill={"#B22222"} />
    </div>
);
const YellowLight = () => (
    <div style={styles}>
        <TrafficIconsTriangle name="triangle-container" width={50} fill={"#CCCC00"} />
    </div>
);
export default ModalAssessment;                    