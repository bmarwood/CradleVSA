import React, { Component } from 'react';
import requestServer from './RequestServer';
import TrafficIconsCircle from './Visuals/TrafficIconsCircle';
import TrafficIconsTriangle from "./Visuals/TrafficIconsTriangle";
import TrafficIconsOctagon from "./Visuals/TrafficIconsOctagon";
import './IndividualPatient.css';
import AssessmentList from "./AssessmentComponents/AssessmentList";
import GraphPopup from '../Modals/GraphPopup';


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
            patient_name: '',
            patient_dob: '',
            CVSA_name: '',
        }
    }

    componentDidMount() {
        this.getLastAssessmentByPatient();
        this.getPatient();
    }

    async getLastAssessmentByPatient() {
        var response = await requestServer.getLastAssessmentByPatientByID(this.state.id)
        if (response !== null) {
            if (response.data === "") {
                this.setState({ patient_name: 'ID doesn\'t match to a patient' })
            } else {
                this.setState({
                    assessment_id: response.data._id,
                    ews_color: response.data.ews_color,
                    patient_dob: response.data.birth_date,
                    gestational_age: response.data.gestational_age,
                    heart_rate: response.data.heart_rate,
                    diastolic: response.data.diastolic,
                    systolic: response.data.systolic,
                    arrow: response.data.arrow,
                    symptoms: (response.data.symptoms).join(", "),
                    gestational_unit: response.data.gestational_unit,
                    assessment_date: response.data.date,
                })
            }
        } else {
            this.setState({
                assessment_id: 'No Assessments',
            })
        }
    }

    async getPatient() {
        var response = await requestServer.getPatient(this.state.id)
        if (response !== null) {
            if (response.data === "") {
                this.setState({ patient_name: 'ID doesn\'t match to a patient' })
            } else {
                this.setState({
                    patient_id: response.data.id,
                    patient_name: response.data.name,
                    patient_dob: response.data.birth_date
                })
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

                    <div className="one-edge-shadow modal-header ">
                        <h3>Patient Name: {this.state.patient_name}</h3><br />
                        <div className='modal-header-direction'>
                            <h5>
                                Patient ID: {this.state.patient_id}
                                <br />
                                Date of Birth: {this.state.patient_dob}
                            </h5>

                        </div>
                    </div>
                    <h3 className='padding-left'> Last Assessment: {this.state.assessment_id} </h3>
                    <div className="one-edge-shadow modal-body p-30">
                        <div className='float-left'>
                            Early Warning Color: {this.getColorVisual(this.state.ews_color)}
                            <br />
                            Arrow: {this.getArrowVisual(this.state.arrow)}
                            <br />
                            Heart Rate: {this.state.heart_rate}
                            <br />
                            Diastolic: {this.state.diastolic}
                            <br />
                            Systolic: {this.state.systolic}
                            <br />
                            Gestational Age: {this.state.gestational_age != 0 ? this.props.gestational_age : <i aria-hidden="true" className="dont icon" />}
                            <br />
                            Gestational Unit: {this.getGestationalUnit(this.state.gestational_unit)}
                            <br />
                            Current Symptoms: {this.state.symptoms}
                        </div>

                        <div className='float-right'>
                            Date of Birth: {this.state.patient_dob}
                            <br />
                            Patient Age: {this.calculateAge() ? this.calculateAge() : 0}
                            <br />
                            Date of Assessment: {this.state.assessment_date}
                            <br />
                            Follow Up Date: {this.state.follow_up_date != null ? this.state.follow_up_date : <i aria-hidden="true" className="dont icon" />}
                            <br />
                            History Graph: <GraphPopup
                                patient_id={this.state.patient_id}
                                patient_name={this.state.patient_name}
                            />
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
