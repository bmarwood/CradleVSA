import React, { Component } from 'react';
import MaterialTable from 'material-table';
import './AssessmentList.css';
import requestServer from './RequestServer';

import axios from 'axios';

class AssessmentList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            data: []
        }
    }

    componentDidMount() {
        this.getAssessmentList()
        this.setState({
            columns: [
                { title: 'patient Id', field: 'patient_id' },
                { title: 'Patient Age', field: 'patient_age' },
                { title: 'vht Id', field: 'vht_id' },
                { title: 'Date', field: 'date' },
                { title: 'Gestational Age', field: 'gestational_age' },
                { title: 'Heart Rate', field: 'heart_rate' },
                { title: 'Systolic', field: 'systolic' },
                { title: 'Early Warning Color', field: 'ews_color' },
                { title: 'Symptoms', field: 'symptoms' },
                { title: 'Referred?', field: 'referred' },
                { title: 'Follow Up?', field: 'follow_up' },
                { title: 'Follow Up Date', field: 'follow_up_date' },
                { title: 'Recheck?', field: 'recheck' },
                { title: 'Id Number', field: 'id' },
            ],
            data: [
                {
                    patient_id: 'Ann',
                    patient_age: 'Howard',
                    vht_id: '1987',
                    date: 'Sept 1, 2019'
                },
            ],
        })
    }


    populateData(response) {
        console.log(response)
        var assessmentList = []
        response.forEach(assessment => {
            var patient_id = assessment.patient_id
            var patient_age = assessment.patient_age
            var vht_id = assessment.vht_id
            var date = assessment.date
            var gestational_age = assessment.gestational_age
            var heart_rate = assessment.heart_rate
            var systolic = assessment.systolic
            var diastolic = assessment.diastolic
            var ews_color = assessment.ews_color
            var symptoms = assessment.symptoms
            var referred = assessment.referred
            var follow_up = assessment.follow_up
            var follow_up_date = assessment.follow_up_date
            var recheck = assessment.recheck
            var id = assessment._id

            var assessment_obj = {
                patient_id: patient_id,
                patient_age: patient_age,
                vht_id: vht_id,
                date: date,
                gestational_age: gestational_age,
                heart_rate: heart_rate,
                systolic: systolic,
                diastolic: diastolic,
                ews_color: ews_color,
                symptoms: symptoms,
                referred: referred.toString(),
                follow_up: follow_up.toString(),
                follow_up_date: follow_up_date,
                recheck: recheck.toString(),
                id: id
            }

            assessmentList.push(assessment_obj)
        });

        this.setState({ data: assessmentList })

    }

    async getAssessmentList() {
        var passback = await requestServer.getAssessmentsList()
        if (passback !== null) {
            this.populateData(passback.data)
        }
    }

    render() {
        return (

            <div className="table-position">

                <MaterialTable
                    title="Assessment List"
                    columns={this.state.columns}
                    data={this.state.data}
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    const data = [...this.state.data];
                                    data[data.indexOf(oldData)] = newData;
                                    this.setState({ ...this.state, data });
                                }, 600);
                            }),
                        onRowDelete: oldData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    const data = [...this.state.data];
                                    data.splice(data.indexOf(oldData), 1);
                                    this.setState({ ...this.state, data });
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
                                window.open("/users/PatientChart")
                                //'popUpWindow',
                                //'height=500,width=800,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes')
                                //window.location.pathname = "/users/PatientList";
                            }
                        }
                    ]}
                />
            </div>

        );
    }


}

export default AssessmentList;