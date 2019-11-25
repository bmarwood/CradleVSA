// All the rest of the content of the landing page is coming from 
import React from 'react';
import { Navigation } from 'react-mdl';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default class AdminDrawer extends React.Component {
    constructor() {
        super();

        this.state = {
            showPatients: false,
            showWorkers: false,
            showOthers: false,
        }

        this.showPatients = this.showPatients.bind(this)
        this.showWorkers = this.showWorkers.bind(this)
        this.showOthers = this.showOthers.bind(this)
    }

    showPatients() {
        var bool = this.state.showPatients
        this.setState({
            showPatients: !bool
        })
    }

    showWorkers() {
        var bool = this.state.showWorkers
        this.setState({
            showWorkers: !bool
        })
    }

    showOthers() {
        var bool = this.state.showOthers
        this.setState({
            showOthers: !bool
        })
    }

    render() {
        var patientsClass = this.state.showPatients ? 'showMenu' : "hideMenu"
        var workersClass = this.state.showWorkers ? 'showMenu' : "hideMenu"
        var othersClass = this.state.showOthers ? 'showMenu' : "hideMenu"


        return (
            <Navigation>
                <h1 className='titleMenu' onClick={() => { this.showPatients() }}>PATIENTS RELATED</h1>
                <span className={patientsClass}>
                    <Link className='link-menu' to="/newPatient">New Patient</Link>
                    <Link className='link-menu' to="/newAssessment">New Assessment</Link>
                    <Link className='link-menu' to="/Transfer">Transfer Patients</Link>
                    <Link className='link-menu' to="/ReferredList">Referral</Link>
                    <Link className='link-menu' to="/CommunityReport">Community Report</Link>
                </span>

                <br />
                <h1 className='titleMenu' onClick={() => { this.showWorkers() }}>WORKERS RELATED</h1>
                <span className={workersClass}>
                    <Link className='link-menu' to="/newWorker">New Worker</Link>
                    <Link className='link-menu' to="/request-VHT-report">Request VHT Report</Link>
                </span>

                <br />
                <h1 className='titleMenu' onClick={() => { this.showOthers() }}>OTHERS</h1>
                <span className={othersClass}>
                    <Link className='link-menu' to="/location">View/Add Locations</Link>
                </span>

            </Navigation>

        )
    }

}
