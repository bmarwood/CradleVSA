import React, {Component} from 'react';
import MaterialTable from 'material-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import requestServer from '../RequestServer';
import NewMedicationPopup from '../../Modals/NewMedicationPopup';

class PatientNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            data: []
        }
    }

    componentDidMount() {
        this.getPatientList()
        this.timer = setInterval(() => this.getPatientList(), 10000);
        this.setState({
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
        })
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }
    populateData(response) {
      console.log(response)
      var patientList = []
      response.forEach(patient => {
          var name = (patient.name.split(" "))[0]
          var surname = (patient.name.split(" "))[1]
          var birthDate = patient.birth_date
          var sex = patient.gender[0]
          var id = patient.id

          var patient_obj = {
              name: name,
              surname: surname,
              birthDate: birthDate,
              sex: sex,
              id: id,
          }

          patientList.push(patient_obj)
      });

      this.setState({data: patientList})

  }
    async getPatientList() {
      var passback = await requestServer.getPatientList()
      if (passback !== null && passback.data !== "") {
          this.populateData(passback.data)
      }
  }
render(){
    return (
        <div className = "table-position" >
        <MaterialTable
        title="Patient Name"
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
        <div>
        <NewMedicationPopup/>
        </div>
      </div>
       );
}


}
export default PatientNotes;
