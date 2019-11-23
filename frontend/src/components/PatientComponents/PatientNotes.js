import React, {Component} from 'react';
import MaterialTable from 'material-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import RequestServer from '../RequestServer';
import NewMedicationPopup from '../../Modals/NewMedicationPopup';
import '../../Modals/MedicationPopup';
import '../../Modals/MedicationPopup.css';

class PatientNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            data: [],
            patient_name: "Loading",
          }
          this.deleteMedications = this.deleteMedications.bind(this)
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
                  frequency: 'daily',
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
        var id = list_of_medications.id

        var medications_obj = {
          medication: medication,
          dose: dose,
          startDate: startDate,
          endDate: endDate,
          sideEffects: sideEffects,
          frequency: frequency,
          id: id
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
  async deleteMedications(id) {
    let response = await RequestServer.deleteMedications(this.state.id)
    if (response !== null) {
      return true
  }
  return false
}
render(){
    return (
        <div className = "modal" >
            <div style={{ margin: 'auto', textAlign: 'center' }}>
                <div style={{ margin: 'auto', backgroundColor: 'white', textAlign: 'center', width: '100%' }}>
        <MaterialTable
        title={this.props.patient_name}
        columns={this.state.columns}
        data={this.state.data}
        editable={{
          }}
        />
        <NewMedicationPopup
        patient_id={this.props.patient_id}
        name={this.props.name}
        surname={this.props.surname}
        patient_name={this.props.patient_name}
        /> 
      </div>
      </div>
      </div>
       );
}
}
export default PatientNotes;
