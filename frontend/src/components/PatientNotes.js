import React from 'react';
import {Button} from 'react-mdl';

const PatientNotes = () => (
  <div style = {{backgroundColor:'white'}}> 
    <h3>Patient Name</h3>
    
    <Button onClick={window.open("/PatientAddMedication",'popUpWindow',
          'height=500,width=800,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes')}>New Medication</Button>
  </div>
);

export default PatientNotes;