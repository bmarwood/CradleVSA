import React, { Component } from 'react';
import './AdminLanding.css';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PatientList from '../PatientComponents/PatientList'
import UserList from '../UserList'
import ChartsPage from '../Chart/PieChart'
import requestServer from '../RequestServer'
import VHTChart from '../VHTChart'

class vhtReport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: 'Undefined',
            vht_id: 0,
            roles: [],
            greenCount: 0,
            redCount: 0,
            yellowCount: 0,
            patientCount: 0,
            assesmentCount: 0,
            referredAssessments: 0,
            assessmentList: [],
            selectedFrom: 0,
            selectedTo: 0,
            loading: true
        }

        this.getAssessmentData = this.getAssessmentData.bind(this)
    }

    async componentDidMount() {
        this.setStateForSelectedDates()
        this.getPatientList()
    }


    getRoles(parsedUser) {
        var roleArray = []
        if (parsedUser && parsedUser.roles) {
            parsedUser.roles.forEach(function (role) {
                roleArray.push(role.role + " ")
            })
        }
        return roleArray
    }

    async getPatientList() {
        var passback = await requestServer.getPatientListByVhtId(this.state.vht_id)
        if (passback !== null && passback.data !== "") {
            console.log("Patient List: ", passback.data)
            var counter = 0;
            passback.data.forEach((item) => {
                counter += 1;
            })

            this.setState({
                patientCount: counter
            })
        } else {
            console.log("Else")
        }
    }

    setStateForSelectedDates() {
        var from = this.props.location.state.from
        var to = this.props.location.state.to

        var monthFrom = new Date(from)
        var monthTo = new Date(to)

        monthTo.setDate(new Date(to).getDate() + 1)
        console.log("Months: ", monthFrom, monthTo)

        this.setState({
            selectedFrom: monthFrom,
            selectedTo: monthTo
        }, () => { this.getVhtDetails() })
    }

    async getVhtDetails() {
        if (this.props.location.state && this.props.location.state.vht_id) {
            var id = this.props.location.state.vht_id
            this.setState({
                vht_id: id
            })

            var passback = await requestServer.getCVSA(id)
            if (!(passback === null || passback === '')) {
                console.log("passback: ", passback.data)
                var user = passback.data
                // var parsedUser = JSON.parse(user)
                var array = this.getRoles(user)
                this.setState({
                    username: user.name,
                    roles: array
                }, () => { this.getAssessmentData() })
            }

        } else {
            console.log("Not coming from proper route, vht_Id has not been passed by Request Report")
        }
    }


    assessmentIsInRange(assessment) {
        var date = new Date(assessment.date)
        console.log("name of person and month of assessment: ", assessment.name, date)
        console.log("month from: ", this.state.selectedFrom)
        console.log("month to: ", this.state.selectedTo)
        if (date >= +this.state.selectedFrom && date <= +this.state.selectedTo) {
            console.log('true')
            return true
        }
        console.log('false')
        return false
    }

    async getAssessmentData() {

        var passback = await requestServer.getAssessmentsByCVSAId(this.state.vht_id)
        if (passback !== null && passback.data !== "") {
            console.log("assessments received from the server: ", passback.data)
            var reds = 0
            var yellows = 0
            var greens = 0
            var assesmentCount = 0
            var referredAssessments = 0

            passback.data.forEach((assessment) => {

                if (this.assessmentIsInRange(assessment)) {
                    assesmentCount += 1

                    if (assessment.referred) {
                        referredAssessments += 1
                    }

                    switch (assessment.ews_color) {
                        case 'GREEN':
                            greens = greens + 1
                            break;
                        case 'RED':
                            reds = reds + 1
                            break;
                        case 'YELLOW':
                            yellows = yellows + 1
                            break;
                        default:
                            break;
                    }
                }

            })



            this.setState({
                assessmentList: passback.data,
                greenCount: greens,
                redCount: reds,
                yellowCount: yellows,
                assesmentCount: assesmentCount,
                referredAssessments: referredAssessments,
                loading: false,
            })
        }
    }





    render() {
        if (!this.state.loading) {
            return (
                <div className='cardContainer'>

                    <div className='top-card'>
                        <div className="card">
                            <h3>Number of <br />Patients:</h3>
                            <h1>{this.state.patientCount}</h1>
                        </div>
                        <div className="card">
                            <h3>Number of <br />Assesments:</h3>
                            <h1>{this.state.assesmentCount}</h1>
                        </div>
                        <div className="card">
                            <h3>Number of <br />Referred Assesments:</h3>
                            <h1>{this.state.referredAssessments}</h1>
                        </div>
                    </div>
                    <div className='left-card'>
                        <div className="one-edge-shadow modal-header p-30">
                            <h3>Username: {this.state.username} </h3><br />
                            <div className='modal-header-direction'>
                                <div className='float-left'>
                                    <h5>
                                        Roles: {this.state.roles}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='right-card'>
                        <VHTChart assessmentList={this.state.assessmentList} />
                    </div>
                </div>
            );
        } else {
            return (
                <div></div>
            )
        }
    }

}



export default vhtReport;