import React, {Component} from 'react';
import {Textfield, Grid, Cell} from 'react-mdl';
import MaterialTable from 'material-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ButtonToolbar, Button} from 'react-bootstrap';
import AddMedication from './PatientAddMedication'

//Function for Modals (popups)
function ModalPopup(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Medication
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
        <AddMedication/>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function PatientNotes() {
  const [modalShow, setModalShow] = React.useState(false);

    //Set columns and fake/demo data for table
    const [state, setState] = React.useState({
      columns: [
          { title: 'Medication', field: 'medication' },
          { title: 'Dose', field: 'dose' },
          { title: 'Start Date', field: 'startDate'},
          { title: 'End Date', field: 'endDate'},
          { title: 'Side Effects', field: 'sideEffects'},
        ], 
        data: [
          { 
            medication: 'Medication Name',
            dose: '5mg',
            startDate: 'Start', 
            endDate: 'End', 
            sideEffects: 'dry mouth' },
          {
            medication: 'Medication Name 2',
            dose: '2mg',
            startDate: 'Start',
            endDate: 'End',
            sideEffects: 'itchy skin',
          },
        ],
      });

    return (
      <div className = "table-position" >
      <MaterialTable
      title="Patient Name"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.push(newData);
              setState({ ...state, data });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data });
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              setState({ ...state, data });
            }, 600);
              }),
        }}
    
    //Other Actions
    actions={[
      {
        //Graph button for patient chart
        icon: 'assessment',
        tooltip: 'Graph',
        onClick: () => {
          //Popup for Patient chart, opens PatientChart.js
          window.open("/PatientChart",'popUpWindow',
          'height=500,width=800,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes')
        }
      },
    ]}
      />
      <div>
      <ButtonToolbar>
      <Button variant="primary" onClick={() => setModalShow(true)}>
       New Medication
      </Button>

      <ModalPopup
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </ButtonToolbar>
      </div>
    </div>
     );
   }


