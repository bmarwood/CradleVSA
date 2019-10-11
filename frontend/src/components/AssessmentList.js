import React, { Component } from 'react';
import MaterialTable from 'material-table';
import './AssessmentList.css';
import TrafficIcons from "./Visuals/TrafficIcons";

import axios from 'axios';

class AssessmentList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            data: [],
        }
    }


    componentDidMount() {
        this.getAssessmentList()
        this.setState({
            columns: [
                { title: 'Assessment Number', field: 'id' },
                { title: 'patient Id', field: 'patient_id' },
                { title: 'Early Warning Color', field: 'ews_color' },
                { title: 'vht Id', field: 'vht_id' },
                { title: 'Date', field: 'date' },
                { title: 'Patient Age', field: 'patient_age' },
                { title: 'Gestational Age', field: 'gestational_age' },
                { title: 'Heart Rate', field: 'heart_rate' },
                { title: 'Systolic', field: 'systolic' },
                { title: 'Diastolic', field: 'diastolic' },
                { title: 'Symptoms', field: 'symptoms' },
                { title: 'Referred?', field: 'referred' },
                { title: 'Follow Up?', field: 'follow_up' },
                { title: 'Follow Up Date', field: 'follow_up_date' },
                { title: 'Recheck?', field: 'recheck' },
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
            var ews_color;
            switch (String(assessment.ews_color)) {
                case "Green":
                    ews_color = <GreenLight />
                    break;
                case "Yellow":
                    ews_color = <YellowLight />
                    break;
                case "Red":
                    ews_color = <RedLight />
                    break;
                default:
                    ews_color = assessment.ews_color
            }
            var symptoms = assessment.symptoms
            var referred = assessment.referred
            var follow_up = assessment.follow_up
            var follow_up_date = assessment.follow_up_date
            var recheck = assessment.recheck
            var id = assessment._id

            var assessment_obj = {
                patient_id: patient_id,
                ews_color: ews_color,
                patient_age: patient_age,
                vht_id: vht_id,
                date: date,
                gestational_age: gestational_age,
                heart_rate: heart_rate,
                systolic: systolic,
                diastolic: diastolic,
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

    getAssessmentList() {
        axios.get('http://localhost:8080/assessments/all', this.state)
            .then(response => {
                // console.log("response from server: ", response)
                this.populateData(response.data)
            })
            .catch(error => {
                console.log('error block')
                console.log(error)
                this.setState({
                    error: true,
                    errorMsg: 'Invalid Login'
                })
            })
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
const styles = {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    fontFamily: "sans-serif",
    justifyContent: "center"
};
const GreenLight = () => (
    <div style={styles}>
        <TrafficIcons name="greencircle" width={100} fill={"#228B22"} />
    </div>
);
const RedLight = () => (
    <div style={styles}>
        <TrafficIcons name="redcircle" width={100} fill={"#B22222"} />
    </div>
);
const YellowLight = () => (
    <div style={styles}>
        <TrafficIcons name="yellowcircle" width={100} fill={"#CCCC00"} />
    </div>
);

export default AssessmentList;