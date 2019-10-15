import React, {Component} from 'react';
import {Button, Textfield, Grid, Cell} from 'react-mdl';
import MaterialTable from 'material-table';
import Modal from 'react-modal';

export default function PatientNotes() {

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
      <Button name="new" style={{
                    backgroundColor: 'blue', 
                    color: 'white'}}
                >New Medication</Button>      
      </div>
    </div>
    );
  }

