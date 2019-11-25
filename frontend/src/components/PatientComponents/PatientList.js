import React, {Component} from 'react';
import MaterialTable from 'material-table';
import './PatientList.css';
import GraphPopup from '../../Modals/GraphPopup';
import MedicationPopup from '../../Modals/MedicationPopup';
import requestServer from '../RequestServer';
import UpdatePatientPopup from "../../Modals/UpdatePatientPopup";
import RecentAssessmentPopup from "../../Modals/RecentAssessmentPopup";
import { Link } from 'react-router-dom';

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
                    title: 'Patient Page',
                    field: 'assessment',
                    headerStyle: {textAlign: 'center'},
                    cellStyle: {textAlign: 'center'}
                },
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
                    assessment: <button className="ui icon button"><i className="info icon"/></button>,
                    name: 'Loading...',
                    surname: 'Loading...',
                    sex: 'Loading...',
                    birthDate: 'Loading...',
                    id: 'Loading...',
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
        var patientList = []
        response.forEach(patient => {
            var name = (patient.name.split(" "))[0]
            var surname = (patient.name.split(" "))[1]
            var birthDate = patient.birth_date
            var sex = patient.gender[0]
            var id = patient.id
            var assessment = <button className="ui icon button"> <Link to={`/patient${patient.id}`}><i className="info icon"/></Link></button>
            var graph = <GraphPopup
                patient_id={patient.id}
                patient_name={name + " " + surname}
            />
            var medications = <MedicationPopup
            patient_id={patient.id}
            patient_name={name+" "+surname}
            />
            var update = <UpdatePatientPopup
                id={patient.id}/>

            var patient_obj = {
                name: name,
                surname: surname,
                birthDate: birthDate,
                sex: sex,
                id: id,
                assessment: assessment,
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
                    options={{
                        sorting: false,
                        pageSizeOptions: [5]
                      }}
                    editable={{
                        onRowDelete: oldData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    var didDelete = this.deletePatient(oldData)
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
