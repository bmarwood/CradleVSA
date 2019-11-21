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
import PatientChart from '../PatientComponents/PatientChart'

class vhtReport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            id: 0,
            roles: [],
            greenCount: 0,
            redCount: 0,
            yellowCount: 0,
            patientCount: 0,
            assesmentCount: 0,
            referredAssessments: 0,
        }

        this.getAssessmentData = this.getAssessmentData.bind(this)

    }

    async componentDidMount() {
        this.getUserDetails()
        this.getPatientList()
    }

    async getPatientList() {
        var passback = await requestServer.getPatientListByVhtId('090909')
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

    getRoles() {
        var roleArray = []
        var user = localStorage.getItem("userData")
        var parsedUser = JSON.parse(user)
        if (parsedUser && parsedUser.roles) {
            parsedUser.roles.forEach(function (role) {
                roleArray.push(role.role + " ")
            })
        }
        return roleArray
    }


    async getAssessmentData() {
        console.log(this.state.id)
        var passback = await requestServer.getAssessmentsByCVSAId(this.state.id)
        if (passback !== null && passback.data !== "") {
            var reds = 0
            var yellows = 0
            var greens = 0
            var assesmentCount = 0
            var referredAssessments = 0

            passback.data.forEach((item) => {
                assesmentCount += 1

                console.log("item: ", item)

                if (item.referred) {
                    referredAssessments += 1
                }

                switch (item.ews_color) {
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
            })



            this.setState({
                greenCount: greens,
                redCount: reds,
                yellowCount: yellows,
                assesmentCount: assesmentCount,
                referredAssessments: referredAssessments
            })
        }
    }

    getUserDetails() {
        var user = localStorage.getItem("userData")
        var parsedUser = JSON.parse(user)
        var array = this.getRoles()
        this.setState({
            username: parsedUser.username,
            id: parsedUser.id,
            roles: array
        }, () => { this.getAssessmentData() })
        // console.log("response from server: ", response, this.state)
        // console.log("decomposing response: ", response.data.id, " ", response.data.name, response.status)
    }

    getPieChart() {
        if (!(this.state.redCount == 0 && this.state.yellowCount == 0 && this.state.greenCount == 0)) {
            return <ChartsPage data={this.state.redCount, this.state.greenCount, this.state.yellowCount} red={this.state.redCount} yellow={this.state.yellowCount} green={this.state.greenCount} />
        } else {
            console.log("no passed")
        }
    }


    render() {
        return (
            <div className='container'>
                <div className='top-card float-cards'>
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
                <div className='float-cards'>
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
                        {/* <PatientChart/> */}
                    </div>
                </div>
            </div>
        );
    }

}



export default vhtReport;