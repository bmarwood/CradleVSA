import React, { Component } from 'react';
import axios from 'axios';
import Popup from "reactjs-popup";
import './AssessmentModal.css';

class AssessmentModal extends Component {
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
            patient_name: 'Gertrude',

        }
    }

    populateData(response) {
        // console.log(response)
        console.log(response.name)
        var patientData = {
            patient_name: response.name
        }
        this.setState({ data: patientData })
        // this.setState(this.patient_name = response.name);

    }

    getPatient() {
        axios.get('http://localhost:8080/patients/get' + this.props.patient_id)
            .then(response => {
                // console.log("response from server: ", response)
                this.setState({ patient_name: response.data.name })
                console.log(response)
                console.log(response.data.name)
                console.log(this.state)
            })
            .catch(error => {
                console.log('error block')
                console.log(error)
                this.setState({
                    error: true,
                })
            })
    }

    render() {
        return (
            <Popup trigger={<button className="ui icon button"><i aria-hidden="true" className="info circle icon"></i></button>} modal>
                { close => (
                    this.getPatient(),
                    < div className="modal">
                        <a className="close" onClick={close}>
                            &times;
                </a>
                        <h1>Asssessment ID: {this.props.id}</h1>
                        <div className="content">
                            {" "}
                            Patient Name: {this.state.patient_name}
                            <br />
                            Date of Birth: {this.props.date}
                            <br />
                            Current Symptoms: {this.props.symptoms}
                            <br />
                            VHT Name:
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
                    </div>
                )}
            </Popup >
        );
    }
}
export default AssessmentModal;