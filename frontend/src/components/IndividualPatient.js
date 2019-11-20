import React, { Component } from 'react';
import Popup from "reactjs-popup";
import MaterialTable from 'material-table';
import requestServer from '../components/RequestServer';
import TrafficIconsCircle from '../components/Visuals/TrafficIconsCircle';
import TrafficIconsTriangle from "../components/Visuals/TrafficIconsTriangle";
import TrafficIconsOctagon from "../components/Visuals/TrafficIconsOctagon";
import Button from '@material-ui/core/Button';
import './IndividualPatient.css';
import AssessmentList from "../components/AssessmentComponents/AssessmentList";


class IndividualPatient extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            data: [],
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
        console.log(this.props.match.params.id)
        this.getLastAssessmentByPatient();
        this.getPatient();
        // this.getCVSA();
    }

    async getLastAssessmentByPatient() {
        var response = await requestServer.getLastAssessmentByPatientByID(this.state.id)
        if (response !== null) {
            if (response.data === "") {
                this.setState({ patient_name: 'ID doesn\'t match to a patient' })
            } else {
                console.log("Last Assess:", response.data)
                console.log("got data")
                // this.setState({
                //     patient_name: response.data.name,
                //     patient_dob: response.data.birth_date
                // })
            }
        }
    }

    async getPatient() {

        var response = await requestServer.getPatient(this.state.id)
        if (response !== null) {
            if (response.data === "") {
                this.setState({ patient_name: 'ID doesn\'t match to a patient' })
            } else {
                console.log("Patient DATA:", response.data)
                console.log("got data")
                this.setState({
                    patient_name: response.data.name,
                    patient_dob: response.data.birth_date
                })
            }
        }
    }

    async getCVSA() {
        var response = await requestServer.getCVSA(782827)

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

    async deleteAssessment(id) {
        var response = await requestServer.deleteAssessment(id)
        if (response !== null) {
            window.location.reload()
        }
    }

    render() {
        return (
            <div id='individual' className='description-body'>
                <div className="overview bg m-100">

                    <div className="one-edge-shadow modal-header p-30">
                        <h3>Patient Name: {this.state.patient_name}</h3><br />
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
                    <h3 className='padding-left'> Last Assessment: </h3>
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
                                Current Symptoms: {this.props.symptoms}
                            </div>

                            <div className='float-right'>
                                Date of Birth: {this.state.patient_dob}
                                <br />
                                Patient Age: {this.calculateAge() ? this.calculateAge() : 0}
                                <br />
                                Date of Assessment: {this.props.assessment_date}
                                <br />
                                Follow Up Date: {this.props.follow_up_date}
                            </div>
                        </div>

                    <div className="delete">
                        <div className='pb-30'>
                            <Button onClick={
                                () => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteAssessment(this.props.id) }
                            } className="ui black basic button float-button-right">
                                Delete Last Assessment <i className="trash icon" />
                            </Button>
                        </div>

                    </div>
                </div>

                <div className='list'>
                    <AssessmentList id={this.state.id} />
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


export default IndividualPatient;
