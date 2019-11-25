import React, {Component} from 'react';
import MaterialTable from 'material-table';
import TrafficIconsCircle from "../Visuals/TrafficIconsCircle";
import TrafficIconsTriangle from "../Visuals/TrafficIconsTriangle";
import TrafficIconsOctagon from "../Visuals/TrafficIconsOctagon";
import ModalPopup from "../../Modals/ModalPopup";
import requestServer from '../RequestServer';


class ReferredList extends Component {

    constructor(props) {
        super(props);
        console.log(props.id)
        this.state = {
            columns: [],
            data: [],
            passed_value: props.id
        }
    }

    componentDidMount() {
        this.getAssessmentList()
        this.timer = setInterval(() => this.getAssessmentList(), 10000);
        this.setState({
            columns: [
                {
                    title: 'Patient Id',
                    field: 'patient_id',
                    headerStyle: {textAlign: 'center'},
                    cellStyle: {textAlign: 'center'}
                },
                {
                    title: 'Cradle Professional Id',
                    field: 'cvsa_id',
                    headerStyle: {textAlign: 'center'},
                    cellStyle: {textAlign: 'center'}
                },
                {
                    title: 'Early Warning Color',
                    field: 'ews_color',
                    headerStyle: {textAlign: 'center'},
                    cellStyle: {textAlign: 'center'}
                },
                {
                    title: 'Shock Arrow',
                    field: 'arrow',
                    headerStyle: {textAlign: 'center'},
                    cellStyle: {textAlign: 'center'}
                },
                {
                    title: 'Gestational Age',
                    field: 'gestational_age',
                    headerStyle: {textAlign: 'center'},
                    cellStyle: {textAlign: 'center'}
                },
                {
                    title: 'Referred?',
                    field: 'referred',
                    headerStyle: {textAlign: 'center'},
                    cellStyle: {textAlign: 'center'}
                },
                {
                    title: 'Assessment Information',
                    field: 'info',
                    headerStyle: {textAlign: 'center'},
                    cellStyle: {textAlign: 'center'}
                },
            ],
            data: [
                {
                    assessment_id: 'LOADING...',
                    ews_color: 'LOADING...',
                    patient_id: 'LOADING...',
                    cvsa_id: 'LOADING...',
                    gestational_age: 'LOADING...',
                    gestational_unit: 'LOADING...',
                    arrow: 'LOADING...',
                    info: <ModalPopup/>
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
        response.forEach(function (assessment) {
            console.log("assessment: ", assessment)
            var info = <ModalPopup
                patient_id={assessment.patient_id}
                cvsa_id={assessment.cvsa_id}
                symptoms={assessment.symptoms}
                systolic={assessment.systolic}
                diastolic={assessment.diastolic}
                heart_rate={assessment.heart_rate}
                id={assessment._id}
                assessment_date={assessment.date}
                follow_up_date={assessment.follow_up_date}
                gestational_age={assessment.gestational_age}
                gestational_unit={assessment.gestational_unit}
                ews_color={assessment.ews_color}
                arrow={assessment.arrow}
                referred={assessment.referred}
                assessment={assessment}
            />
            var assessment_obj = {
                id: assessment._id,
                ews_color: getColorVisual(assessment.ews_color),
                arrow: getArrowVisual(assessment.arrow),
                patient_id: assessment.patient_id,
                cvsa_id: assessment.cvsa_id,
                gestational_age: getGestationalAge(assessment),
                referred: getBoolVisual(assessment.referred),
                birth_date: assessment.birth_date,
                heart_rate: assessment.heart_rate,
                systolic: assessment.systolic,
                diastolic: assessment.diastolic,
                symptoms: assessment.symptoms,
                follow_up_date: assessment.follow_up_date,
                info: info,
            }

            assessmentList.push(assessment_obj)
        });

        this.setState({data: assessmentList})
    }

    //gets assessments for admin if that role is given, otherwise dynamically populates based on current user
    async getAssessmentList() {
        var passback = await requestServer.getReferredAssessments()
        if (passback !== null && passback.data !== "") {
            this.populateData(passback.data)
        }
    }


    render() {
        return (
            <div className="table-position">
                <MaterialTable
                    title="Referred List"
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
        <TrafficIconsCircle name="greencircle" width={50} fill={"#228B22"}/>
    </div>
);
const RedLight = () => (
    <div style={styles}>
        <TrafficIconsOctagon name="redcircle" width={50} fill={"#B22222"}/>
    </div>
);
const YellowLight = () => (
    <div style={styles}>
        <TrafficIconsTriangle name="triangle-container" width={50} fill={"#CCCC00"}/>
    </div>
);


function getArrowVisual(input) {
    switch (String(input).toUpperCase()) {
        case "UP":
            return <i className="arrow up icon"/>
        case "DOWN":
            return <i className="arrow down icon"/>
        case "EMPTY":
            return <i className="window minimize icon"/>
        default:
            return input
    }
}

function getColorVisual(input) {
    switch (String(input).toUpperCase()) {
        case "GREEN":
            return <GreenLight/>
        case "YELLOW":
            return <YellowLight/>
        case "RED":
            return <RedLight/>
        default:
            return input
    }
}

function getBoolVisual(input) {
    switch (String(input).toUpperCase()) {
        case "TRUE":
            return <i aria-hidden="true" className="check icon"/>
        case "FALSE":
            return <i aria-hidden="true" className="x icon"/>
        default:
            return input
    }
}

function getGestationalAge(assessment) {
    switch (String(assessment.gestational_unit).toUpperCase()) {
        case "WEEK":
            return (assessment.gestational_age + " Week(s)")
        case "MONTH":
            return (assessment.gestational_age + " Month(s)")
        default:
            return <i aria-hidden="true" className="dont icon"/>
    }
}


export default ReferredList;
