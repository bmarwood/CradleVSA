import React, { Component } from 'react';
import Popup from "reactjs-popup";
import PatientAddMedication from '../components/PatientComponents/PatientAddMedication';
import {Button} from 'react-bootstrap';
import './NewMedicationPopup.css';

class NewMedicationPopup extends Component {
    render() {
        
        return (
            <Popup trigger={<Button>New Medication</Button>}
                modal>
                {close => (<PatientAddMedication {...this.props} />)}
            </Popup >
        );
    }
}
export default NewMedicationPopup;