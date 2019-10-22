import React, { Component } from 'react';
import MaterialTable from 'material-table';
import './AssessmentList.css';
import TrafficIcons from "./Visuals/TrafficIcons";
import ModalPopup from '../Modals/ModalPopup';
import requestServer from './RequestServer';


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
        this.timer = setInterval(() => this.getAssessmentList(), 10000);
        this.setState({
            columns: [
                { title: 'Assessment Id', field: 'id', headerStyle: { textAlign: 'center' }, cellStyle: { textAlign: 'center' } },
                { title: 'Early Warning Color', field: 'ews_color', headerStyle: { textAlign: 'center' }, cellStyle: { textAlign: 'center' } },
                { title: 'Shock Arrow', field: 'arrow', headerStyle: { textAlign: 'center' }, cellStyle: { textAlign: 'center' } },
                { title: 'patient Id', field: 'patient_id', headerStyle: { textAlign: 'center' }, cellStyle: { textAlign: 'center' } },
                { title: 'VHT Id', field: 'vht_id', headerStyle: { textAlign: 'center' }, cellStyle: { textAlign: 'center' } },
                { title: 'Gestational Age', field: 'gestational_age', headerStyle: { textAlign: 'center' }, cellStyle: { textAlign: 'center' } },
                { title: 'Gestational Unit', field: 'gestational_unit', headerStyle: { textAlign: 'center' }, cellStyle: { textAlign: 'center' } },
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
                    gestational_unit: 'LOADING...',
                    referred: 'LOADING...',
                    follow_up: 'LOADING...',
                    recheck: 'LOADING...',
                    arrow: 'LOADING...',
                    info: <ModalPopup />
                },
            ],

        })
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }


    populateData(response) {

        var assessmentList = []
        response.forEach(function(assessment) {
            var assessment_id = assessment._id
            var patient_id = assessment.patient_id
            var patient_age = assessment.patient_age
            var vht_id = assessment.vht_id
            var date = assessment.date
            var gestational_age = assessment.gestational_age
            var gestational_unit = assessment.gestational_unit
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

            var arrow = assessment.arrow


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
            var info = <ModalPopup
                patient_id={assessment.patient_id}
                vht_id={assessment.vht_id}
                symptoms={assessment.symptoms}
                systolic={assessment.systolic}
                diastolic={assessment.diastolic}
                heart_rate={assessment.heart_rate}
                date={assessment.date}
            />
            var assessment_obj = {
                id: assessment_id,
                patient_id: patient_id,
                ews_color: ews_color,
                patient_age: patient_age,
                vht_id: vht_id,
                date: date,
                gestational_age: gestational_age,
                gestational_unit: gestational_unit,
                heart_rate: heart_rate,
                systolic: systolic,
                diastolic: diastolic,
                symptoms: symptoms,
                referred: referred,
                follow_up: follow_up,
                follow_up_date: follow_up_date,
                recheck: recheck,
                info: info,
                arrow: arrow
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