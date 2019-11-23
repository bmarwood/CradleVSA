import React, { Component } from 'react';
import Popup from "reactjs-popup";
import PatientNotes from '../components/PatientComponents/PatientNotes';

class MedicationPopup extends Component {
    render() {
        return (
            <Popup modal trigger={<button className="ui icon button"><i aria-hidden="true" className="clipboard icon"></i></button>}>
                {close => (<PatientNotes {...this.props} />)}
            </Popup >
        );
    }
}
export default MedicationPopup;
