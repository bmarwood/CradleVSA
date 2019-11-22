import React, { Component } from 'react';
import Popup from "reactjs-popup";
import PatientAddMedication from '../components/PatientComponents/PatientAddMedication';
import './NewMedicationPopup.css';
import Icon from '@material-ui/core/Icon';
import {Button} from 'react-bootstrap';

class NewMedicationPopup extends Component {
    render() {
        
        return (
            <Popup trigger={<Button>New Medication</Button>}//{<Icon>add</Icon>}
                modal>
                {close => (<PatientAddMedication {...this.props} />
                
                )}
            </Popup >   
        );
    }
}
export default NewMedicationPopup;