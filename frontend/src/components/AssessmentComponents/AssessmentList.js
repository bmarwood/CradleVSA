import React, { Component } from 'react';
import MaterialTable from 'material-table';
import './AssessmentList.css';
import TrafficIconsCircle from "../Visuals/TrafficIconsCircle";
import TrafficIconsTriangle from "../Visuals/TrafficIconsTriangle";
import TrafficIconsOctagon from "../Visuals/TrafficIconsOctagon";
import ModalPopup from "../../Modals/ModalPopup";
import requestServer from '../RequestServer';
import { Link } from 'react-router-dom';



class AssessmentList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            data: [],
            passed_value: props.id
        }

        this.deleteAssessment = this.deleteAssessment.bind(this);
    }

    componentDidMount() {
        this.getAssessmentList()
        this.timer = setInterval(() => this.getAssessmentList(), 10000);
        this.setState({
            columns: [
                {
                    title: 'Patient Id',
                    field: 'patient_id',
                    headerStyle: { textAlign: 'center' },
                    cellStyle: { textAlign: 'center' }
                },
                {
                    title: 'Cradle Professional Id',
                    field: 'cvsa_id',
                    headerStyle: { textAlign: 'center' },
                    cellStyle: { textAlign: 'center' }
                },
                {
                    title: 'Early Warning Color',
                    field: 'ews_color',
                    headerStyle: { textAlign: 'center' },
                    cellStyle: { textAlign: 'center' }
                },
                {
                    title: 'Shock Arrow',
                    field: 'arrow',
                    headerStyle: { textAlign: 'center' },
                    cellStyle: { textAlign: 'center' }
                },
                {
                    title: 'Gestational Age',
                    field: 'gestational_age',
                    headerStyle: { textAlign: 'center' },
                    cellStyle: { textAlign: 'center' }
                },
                {
                    title: 'Referred?',
                    field: 'referred',
                    headerStyle: { textAlign: 'center' },
                    cellStyle: { textAlign: 'center' }
                },
                {
                    title: 'Follow Up?',
                    field: 'follow_up',
                    headerStyle: { textAlign: 'center' },
                    cellStyle: { textAlign: 'center' }
                },
                {
                    title: 'Recheck?',
                    field: 'recheck',
                    headerStyle: { textAlign: 'center' },
                    cellStyle: { textAlign: 'center' }
                },
                {
                    title: 'Assessment Information',
                    field: 'info',
                    headerStyle: { textAlign: 'center' },
                    cellStyle: { textAlign: 'center' }
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

    async deleteAssessment(assessment) {
        var response = await requestServer.deleteAssessment(assessment.id)
        if (response !== null) {
            return true
        }
        return false
    }


    async populateData(response) {
        var assessmentList = []
        for (let assessment of response) {
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
            />
            var assessment_obj = {
                assessment_date: assessment.date,
                id: assessment._id,
                ews_color: getColorVisual(assessment.ews_color),
                arrow: getArrowVisual(assessment.arrow),
                patient_id: assessment.patient_id,
                cvsa_id: assessment.cvsa_id,
                gestational_age: getGestationalAge(assessment),
                referred: getBoolVisual(assessment.referred),
                follow_up: getBoolVisual(assessment.follow_up),
                recheck: await checkForRecheck(assessment.recheck, assessment.date, assessment.patient_id, assessment._id),
                birth_date: assessment.birth_date,
                heart_rate: assessment.heart_rate,
                systolic: assessment.systolic,
                diastolic: assessment.diastolic,
                symptoms: assessment.symptoms,
                follow_up_date: assessment.follow_up_date,
                info: info,
            }
            assessmentList.push(assessment_obj)
        }
        assessmentList.sort((a, b) => ((convertToDate(a.assessment_date) > convertToDate(b.assessment_date)) ? 1 : ((convertToDate(b.assessment_date)) > convertToDate(a.assessment_date))) ? -1 : 0)
        this.setState({ data: assessmentList })
    }

    getRoles(parsedUser) {
        var roleArray = []
        if (parsedUser && parsedUser.roles) {
            parsedUser.roles.forEach(function (role) {
                roleArray.push(role.role)
            })
        }

        return roleArray
    }

    isAdmin(roles) {
        if (roles.indexOf("ADMIN") > -1) {
            return true
        }
        return false
    }

    //gets assessments for admin if that role is given, otherwise dynamically populates based on current user
    async getAssessmentList() {
        if (this.state.passed_value) {
            //check for id by patient
            //if not patient check by cvsa
            var passback = await requestServer.getPatient(this.state.passed_value)
            if (passback.data.length !== 0) {
                passback = await requestServer.getAssessmentsByPatientId(this.state.passed_value)
            } else {
                passback = await requestServer.getAssessmentsByCVSAId(this.state.passed_value)
            }

            //if still none, then bad call
            if (passback.data.length === 0) {
                alert("No History Found")
            }
            this.populateData(passback.data)
            return
        }
        var userData = JSON.parse(localStorage.getItem("userData"))
        var roles = this.getRoles(userData)
        var passback
        if (this.isAdmin(roles)) {
            passback = await requestServer.getAssessmentsList()
        } else {
            passback = await requestServer.getAssessmentsByCVSAId(userData.id)
        }
        if (passback !== null && passback.data !== "") {
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
        <TrafficIconsCircle name="greencircle" width={50} fill={"#228B22"} />
    </div>
);
const RedLight = () => (
    <div style={styles}>
        <TrafficIconsOctagon name="redcircle" width={50} fill={"#B22222"} />
    </div>
);
const YellowLight = () => (
    <div style={styles}>
        <TrafficIconsTriangle name="triangle-container" width={50} fill={"#CCCC00"} />
    </div>
);

function convertToDate(date) {
    return new Date(date)
}

async function checkForRecheck(recheck, date, patient_id, id) {
    // if date within 20 min display button
    let recheckVal = String(recheck).toUpperCase();
    if (recheckVal === "TRUE") {
        var old_date = new Date(date)
        var datenew = new Date()

        var dif = Math.abs((datenew.getTime() - old_date.getTime()) / 1000 / 60)
        var lastAssessmentIdByPatient
        lastAssessmentIdByPatient = await getLastAssessmentIDByPatient(patient_id);
        //check if last assessment by patient or less then 20 min
        if (dif <= 20 && (id === lastAssessmentIdByPatient)) {
            return <button className="ui icon button"><Link to={`/newAssessment${patient_id}`}><i aria-hidden="true" className="check icon"></i></Link></button>
        } else {
            return getBoolVisual(recheck)
        }
    } else {
        return getBoolVisual(recheck)
    }
}

async function getLastAssessmentIDByPatient(id) {
    var response = await requestServer.getLastAssessmentByPatientByID(id)
    if (response !== null) {
        if (response.data === "") {
            this.setState({ patient_name: 'ID doesn\'t match to a patient' })
        } else {
            return response.data._id
        }
    } else {
        return null;
    }
}




function getArrowVisual(input) {
    switch (String(input).toUpperCase()) {
        case "UP":
            return <i className="arrow up icon" />
        case "DOWN":
            return <i className="arrow down icon" />
        case "EMPTY":
            return <i className="window minimize icon" />
        default:
            return input
    }
}

function getColorVisual(input) {
    switch (String(input).toUpperCase()) {
        case "GREEN":
            return <GreenLight />
        case "YELLOW":
            return <YellowLight />
        case "RED":
            return <RedLight />
        default:
            return input
    }
}

function getBoolVisual(input) {
    switch (String(input).toUpperCase()) {
        case "TRUE":
            return <i aria-hidden="true" className="check icon" />
        case "FALSE":
            return <i aria-hidden="true" className="x icon" />
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
            return <i aria-hidden="true" className="dont icon" />
    }
}


export default AssessmentList;
