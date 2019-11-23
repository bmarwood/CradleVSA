import React, { Component } from 'react';
import Popup from "reactjs-popup";
import './ModalPopup';
import './ModalPopup.css';
import requestServer from '../components/RequestServer';
import TrafficIconsCircle from '../components/Visuals/TrafficIconsCircle';
import TrafficIconsTriangle from "../components/Visuals/TrafficIconsTriangle";
import TrafficIconsOctagon from "../components/Visuals/TrafficIconsOctagon";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class ModalAssessment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            id: props.id,
            patient_id: '',
            systolic: '',
            diastolic: '',
            symptoms: (this.props.symptoms).join(", "),
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
            }
            else {
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

    async deleteAssessment(id) {
        var response = await requestServer.deleteAssessment(id)
        if (response !== null) {
            window.location.reload()
        }
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

                <div className="one-edge-shadow modal-body p-30">
                    <div className='float-left'>
                        Early Warning Color: {this.getColorVisual(this.props.ews_color)}
                        <br />
                        Arrow: {this.getArrowVisual(this.props.arrow)}
                        <br />
                        Heart Rate: {this.props.heart_rate}
                        <br />
                        Diastolic: {this.props.diastolic}
                        <br />
                        Systolic: {this.props.systolic}
                        <br />
                        Gestational Age: {this.props.gestational_age != 0 ? this.props.gestational_age : <i aria-hidden="true" className="dont icon" />}
                        <br />
                        Gestational Unit: {this.getGestationalUnit(this.props.gestational_unit)}
                        <br />
                        Current Symptoms: {this.state.symptoms}
                    </div>

                    <div className='float-right'>
                        Date of Birth: {this.state.patient_dob}
                        <br />
                        Patient Age: {this.calculateAge() ? this.calculateAge() : 0}
                        <br />
                        Date of Assessment: {this.props.assessment_date}
                        <br />
                        Follow Up Date: {this.props.follow_up_date != null ? this.props.follow_up_date : <i aria-hidden="true" className="dont icon" />}
                    </div>
                </div>

                <div className="actions">
                    <div className='float-button-left pb-30'>
                        <button className="ui black basic button "> <Link to={`/patient${this.props.patient_id}`}>See Patient</Link></button>
                        <button className="ui black basic button "> <Link to={`/cvsa${this.props.cvsa_id}`}> See Cradle Professional </Link> </button>
                    </div>
                    <div className='pb-30'>
                        <Button onClick={
                            () => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteAssessment(this.props.id) }
                        } className="ui black basic button float-button-right">
                            <i className="trash icon" />
                        </Button>
                    </div>

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
                return <i className="arrow up icon" />
            case "DOWN":
                return <i className="arrow down icon" />
            case "EMPTY":
                return <i className="window minimize icon" />
            default:
                return input
        }
    }
    getGestationalUnit(input) {
        switch (String(input).toUpperCase()) {
            case "WEEK":
                return ("Week(s)")
            case "MONTH":
                return ("Month(s)")
            default:
                return <i aria-hidden="true" className="dont icon" />
        }
    }
}

const styles = {
    // overflow: "hidden",
    display: "auto",
    flexWrap: "flex",
    alignItems: "center",
    fontFamily: "sans-serif",
    justifyContent: "left",
    display: 'inline-block'
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