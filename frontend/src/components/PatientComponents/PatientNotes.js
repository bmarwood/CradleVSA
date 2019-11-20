import React, {Component} from 'react';
import MaterialTable from 'material-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import RequestServer from '../RequestServer';
import NewMedicationPopup from '../../Modals/NewMedicationPopup';
import './PatientNotes.css';

class PatientNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            data: [],
            patient_name: "Loading"
        }
    }

    componentDidMount() {
      this.getMedicationList()
      this.timer = setInterval(() => this.getMedicationList(), 10000);
      this.setState({
            columns: [
                { title: 'Medication', field: 'medication' },
                { title: 'Dose', field: 'dose' },
                { title: 'Start Date', field: 'startDate'},
                { title: 'End Date', field: 'endDate'},
                { title: 'Side Effects', field: 'sideEffects'},
                { title: 'Frequency', field: 'frequency'},
              ], 
              data: [
                { 
                  medication: 'Medication Name',
                  dose: '5mg',
                  startDate: 'Start', 
                  endDate: 'End', 
                  sideEffects: 'dry mouth',
                  frequency: 'daily'
                },
                {
                  medication: 'Medication Name 2',
                  dose: '2mg',
                  startDate: 'Start',
                  endDate: 'End',
                  sideEffects: 'itchy skin',
                  frequency: 'twice daily'
                },
            ],
        })
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }
    populateData(response) {
      var medicationsList = []
      response.forEach(list_of_medications => {
        var medication = list_of_medications.medication_name
        var dose = list_of_medications.dose
        var startDate = list_of_medications.start_date
        var endDate = list_of_medications.end_date
        var sideEffects = list_of_medications.side_effects
        var frequency = list_of_medications.frequency

        var medications_obj = {
          medication: medication,
          dose: dose,
          startDate: startDate,
          endDate: endDate,
          sideEffects: sideEffects,
          frequency: frequency
      }

      medicationsList.push(medications_obj)
    });
    this.setState({data: medicationsList})
}
  async getMedicationList() {
      var passback = await RequestServer.getMedicationListByID(this.props.patient_id)
      if (passback !== null && passback.data !== "") {
          this.populateData(passback.data)
      }
  }
  async getMatchingPatientID(patient_id) {
    var passback = await RequestServer.getPatientByID(patient_id)
    if (passback != null) {
        this.populateData(passback.data.list_of_medications
        )
        console.log(passback.data.list_of_medications)
        console.log("passback.data.list_of_assessments[0]")
        console.log(passback.data.list_of_medications[0])
    }
}

render(){
  
    return (
      
        <div className = "table-position" >
        <MaterialTable
        title={this.props.patient_name}
        columns={this.state.columns}
        data={this.state.data}
        editable={{
          // onRowAdd: newData =>
          //   new Promise(resolve => {
          //     setTimeout(() => {
          //       resolve();
          //       const data = [...state.data];
          //       data.push(newData);
          //       setState({ ...state, data });
          //     }, 600);
          //   }),
          // onRowUpdate: (newData, oldData) =>
          //   new Promise(resolve => {
          //     setTimeout(() => {
          //       resolve();
          //       const data = [...state.data];
          //       data[data.indexOf(oldData)] = newData;
          //       setState({ ...state, data });
          //     }, 600);
          //   }),
          // onRowDelete: oldData =>
          //   new Promise(resolve => {
          //     setTimeout(() => {
          //       resolve();
          //       const data = [...state.data];
          //       data.splice(data.indexOf(oldData), 1);
          //       setState({ ...state, data });
          //     }, 600);
          //       }),
          }}
        />
        <NewMedicationPopup
        patient_id={this.props.patient_id}
        name={this.props.name}
        surname={this.props.surname}
        patient_name={this.props.patient_name}
        />
      </div>
       );
}


}
export default PatientNotes;
