import React, {Component} from 'react';
import MaterialTable from 'material-table';
import './AssessmentList.css';
import TrafficIcons from "../Visuals/TrafficIcons";
import ModalPopup from "../../Modals/ModalPopup";
import requestServer from '../RequestServer';


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
                {
                    title: 'Patient Id',
                    field: 'patient_id',
                    headerStyle: {textAlign: 'center'},
                    cellStyle: {textAlign: 'center'}
                },
                {
                    title: 'Cradle Professional Id',
                    field: 'vht_id',
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
                    title: 'Follow Up?',
                    field: 'follow_up',
                    headerStyle: {textAlign: 'center'},
                    cellStyle: {textAlign: 'center'}
                },
                {
                    title: 'Recheck?',
                    field: 'recheck',
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
                    vht_id: 'LOADING...',
                    gestational_age: 'LOADING...',
                    gestational_unit: 'LOADING...',
                    referred: 'LOADING...',
                    follow_up: 'LOADING...',
                    recheck: 'LOADING...',
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
                id: assessment._id,
                ews_color: getColorVisual(assessment.ews_color),
                arrow: getArrowVisual(assessment.arrow),
                patient_id: assessment.patient_id,
                vht_id: assessment.vht_id,
                gestational_age: getGestationalAge(assessment),
                referred: getBoolVisual(assessment.referred),
                follow_up: getBoolVisual(assessment.follow_up),
                recheck: getBoolVisual(assessment.recheck),
                patient_age: assessment.patient_age,
                date: assessment.date,
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

    getRoles(parsedUser) {
        var roleArray = []
        if (parsedUser && parsedUser.roles) {
            parsedUser.roles.forEach(function (role) {
                console.log("User data is : " + role.role)
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
        var userData = JSON.parse(localStorage.getItem("userData"))
        var roles = this.getRoles(userData)
        var passback
        if (this.isAdmin(roles)) {
            passback = await requestServer.getAssessmentsList()

            if (passback !== null && passback.data !== "") {
                this.populateData(passback.data)
            }

        } else {
            passback = await requestServer.getAssessmentsByUserId(userData.id)

            if (passback !== null && passback.data !== "") {
                this.populateData(passback.data)
            }
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
        <TrafficIcons name="greencircle" width={50} fill={"#228B22"}/>
    </div>
);
const RedLight = () => (
    <div style={styles}>
        <TrafficIcons name="redcircle" width={50} fill={"#B22222"}/>
    </div>
);
const YellowLight = () => (
    <div style={styles}>
        <TrafficIcons name="yellowcircle" width={50} fill={"#CCCC00"}/>
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


export default AssessmentList;
