import React, {Component} from 'react';
import MaterialTable from 'material-table';
import './PatientList.css';
import GraphPopup from '../../Modals/GraphPopup';
import MedicationPopup from '../../Modals/MedicationPopup';
import requestServer from '../RequestServer';
import UpdatePatientPopup from "../../Modals/UpdatePatientPopup";
import ModalPopup from "../../Modals/ModalPopup";

class PatientList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            data: []
        }
        this.deletePatient = this.deletePatient.bind(this)
    }

    componentDidMount() {
        this.getPatientList()
        this.timer = setInterval(() => this.getPatientList(), 10000);
        this.setState({
            columns: [
                {title: 'Name', field: 'name'},
                {title: 'Surname', field: 'surname'},
                {title: 'Sex', field: 'sex'},
                {title: 'Birth Date', field: 'birthDate'},
                {title: 'ID Number', field: 'id'},
                {
                    title: 'Patient History',
                    field: 'graph',
                    headerStyle: {textAlign: 'center'},
                    cellStyle: {textAlign: 'center'}
                },
                {
                    title: 'Medications',
                    field: 'medications',
                    headerStyle: {textAlign: 'center'},
                    cellStyle: {textAlign: 'center'}
                },
                {
                    title: 'Update information',
                    field: 'update',
                    headerStyle: {textAlign: 'center'},
                    cellStyle: {textAlign: 'center'}
                },
            ],
            data: [
                {
                    graph: <GraphPopup/>,
                    medications: <MedicationPopup/>,
                    update: <UpdatePatientPopup/>
                },
            ],
        })
    }

    async deletePatient(patient) {
        let response = await requestServer.deletePatient(patient.id)
        if (response !== null) {
            return true
        }
        return false
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
            var graph = <GraphPopup/>
            var medications = <MedicationPopup/>
            var update = <UpdatePatientPopup
                id={patient.id}/>

            var patient_obj = {
                name: name,
                surname: surname,
                birthDate: birthDate,
                sex: sex,
                id: id,
                graph: graph,
                medications: medications,
                update: update
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

    render() {
        return (
            <div className="table-position">
                <MaterialTable
                    title="Patients"
                    columns={this.state.columns}
                    data={this.state.data}
                    editable={{
                        onRowDelete: oldData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    var didDelete = this.deletePatient(oldData)
                                    console.log(oldData)
                                    if (didDelete) {
                                        const data = [...this.state.data];
                                        data.splice(data.indexOf(oldData), 1);
                                        this.setState({
                                            data: data
                                        });
                                    }
                                }, 1000);
                            }),

                    }}
                />
            </div>
        );
    }
}

export default PatientList;
