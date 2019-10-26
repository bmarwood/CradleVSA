import React, { Component } from 'react';
import Popup from "reactjs-popup";
import './ModalPopup';
import './ModalPopup.css';
import requestServer from '../components/RequestServer';

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
                <h1>Asssessment ID: {this.props.id}</h1>
                <div className="temp">
                    {" "}
                    Patient Name: {this.state.patient_name}
                    <br />
                    VHT Name: {this.state.vht_name}
                    <br />
                    Date of Birth: {this.props.date}
                    <br />
                    Current Symptoms: {this.props.symptoms}
                    <br />
                    VHT Name: {this.state.vht_name}
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
        );
    }
}
export default ModalAssessment;                    