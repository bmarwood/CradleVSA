import React, { Component } from 'react';
import Popup from "reactjs-popup";
import PatientNotes from '../components/PatientNotes';

class MedicationPopup extends Component {
    render() {
        return (
            <Popup trigger={<button className="ui icon button"><i aria-hidden="true" className="clipboard icon"></i></button>}
                modal>
                {close => (<PatientNotes {...this.props} />)}
            </Popup >
        );
    }
}
export default MedicationPopup;
