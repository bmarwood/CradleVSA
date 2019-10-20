import React, { Component } from 'react';
import MaterialTable from 'material-table';
import './AssessmentList.css';
import TrafficIcons from "./Visuals/TrafficIcons";
import axios from 'axios';
import ModalPopup from '../Modals/ModalPopup';

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
                { title: 'Assessment Id', field: 'id', headerStyle: { textAlign: 'center' }, cellStyle: { textAlign: 'center' } },
                { title: 'Early Warning Color', field: 'ews_color', headerStyle: { textAlign: 'center' }, cellStyle: { textAlign: 'center' } },
                { title: 'patient Id', field: 'patient_id', headerStyle: { textAlign: 'center' }, cellStyle: { textAlign: 'center' } },
                { title: 'VHT Id', field: 'vht_id', headerStyle: { textAlign: 'center' }, cellStyle: { textAlign: 'center' } },
                { title: 'Gestational Age', field: 'gestational_age', headerStyle: { textAlign: 'center' }, cellStyle: { textAlign: 'center' } },
                { title: 'Referred?', field: 'referred', headerStyle: { textAlign: 'center' }, cellStyle: { textAlign: 'center' } },
                { title: 'Follow Up?', field: 'follow_up', headerStyle: { textAlign: 'center' }, cellStyle: { textAlign: 'center' } },
                { title: 'Recheck?', field: 'recheck', headerStyle: { textAlign: 'center' }, cellStyle: { textAlign: 'center' } },
                { title: 'Assessment Information', field: 'info', headerStyle: { textAlign: 'center' }, cellStyle: { textAlign: 'center' } },
            ],
            data: [
                {
                    assessment_id: 'LOADING...',
                    ews_color: 'LOADING...',
                    patient_id: 'LOADING...',
                    vht_id: 'LOADING...',
                    gestational_age: 'LOADING...',
                    referred: 'LOADING...',
                    follow_up: 'LOADING...',
                    recheck: 'LOADING...',
                    info: <ModalPopup />
                },
            ],

        })
    }


    populateData(response) {
        console.log(response)
        var assessmentList = []
        response.forEach(assessment => {
            var assessment_id = assessment._id
            var patient_id = assessment.patient_id
            var patient_age = assessment.patient_age
            var vht_id = assessment.vht_id
            var date = assessment.date
            var gestational_age = assessment.gestational_age
            var heart_rate = assessment.heart_rate
            var systolic = assessment.systolic
            var diastolic = assessment.diastolic
            var ews_color
            switch (String(assessment.ews_color).toUpperCase()) {
                case "GREEN":
                    ews_color = <GreenLight />
                    break;
                case "YELLOW":
                    ews_color = <YellowLight />
                    break;
                case "RED":
                    ews_color = <RedLight />
                    break;
                default:
                    ews_color = assessment.ews_color
            }

            var symptoms = assessment.symptoms
            var referred
            switch (String(assessment.referred)) {
                case "true":
                    referred = <i aria-hidden="true" className="check icon"></i>
                    break;
                case "false":
                    referred = <i aria-hidden="true" className="x icon"></i>
                    break;
                default:
                    referred = assessment.referred
            }

            var follow_up
            switch (String(assessment.follow_up)) {
                case "true":
                    follow_up = <i aria-hidden="true" className="check icon"></i>
                    break;
                case "false":
                    follow_up = <i aria-hidden="true" className="x icon"></i>
                    break;
                default:
                    follow_up = assessment.follow_up
            }
            var follow_up_date = assessment.follow_up_date

            var recheck
            switch (String(assessment.recheck)) {
                case "true":
                    recheck = <i aria-hidden="true" className="check icon"></i>
                    break;
                case "false":
                    recheck = <i aria-hidden="true" className="x icon"></i>
                    break;
                default:
                    recheck = assessment.recheck
            }
            var info = <ModalPopup patient_id={assessment.patient_id} vht_id={assessment.vht_id}
            />
            var assessment_obj = {
                assessment_id: assessment._id,
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
                referred: referred,
                follow_up: follow_up,
                follow_up_date: follow_up_date,
                recheck: recheck,
                info: info
            }

            assessmentList.push(assessment_obj)
        });

        this.setState({ data: assessmentList })

    }

    getAssessmentList() {
        axios.get('http://localhost:8080/assessments/all', this.state)
            .then(response => {
                console.log("response from server: ", response)
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
                />
            </div>

        );
    }
}

const styles = {
    overflow: "hidden",
    display: "auto",
    flexWrap: "flex",
    alignItems: "center",
    fontFamily: "sans-serif",
    justifyContent: "left"
};
const GreenLight = () => (
    <div style={styles}>
        <TrafficIcons name="greencircle" width={50} fill={"#228B22"} />
    </div>
);
const RedLight = () => (
    <div style={styles}>
        <TrafficIcons name="redcircle" width={50} fill={"#B22222"} />
    </div>
);
const YellowLight = () => (
    <div style={styles}>
        <TrafficIcons name="yellowcircle" width={50} fill={"#CCCC00"} />
    </div>
);

export default AssessmentList;