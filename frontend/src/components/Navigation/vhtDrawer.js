// All the rest of the content of the landing page is coming from 
import React from 'react';
import { Navigation } from 'react-mdl';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

export default class VhtDrawer extends React.Component {
    constructor() {
        super();

        this.state = {
            showPatients: false,
            showWorkers: false,
            showOthers: false,
            showRecords: false,
        }

        this.showPatients = this.showPatients.bind(this)
        this.showWorkers = this.showWorkers.bind(this)
        this.showOthers = this.showOthers.bind(this)
        this.showRecords = this.showRecords.bind(this)

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

    showRecords() {
        var bool = this.state.showRecords
        this.setState({
            showRecords: !bool
        })
    }

    render() {

        var patientsClass = this.state.showPatients ? 'showMenu' : "hideMenu"
        var workersClass = this.state.showWorkers ? 'showMenu' : "hideMenu"
        var othersClass = this.state.showOthers ? 'showMenu' : "hideMenu"
        var recordClass = this.state.showRecords ? 'showMenu' : "hideMenu"

        var patientIcon = this.state.showPatients ? faCaretUp : faCaretDown
        var workerIcon = this.state.showWorkers ? faCaretUp : faCaretDown
        var otherIcon = this.state.showOthers ? faCaretUp : faCaretDown
        var recordIcon = this.state.showRecords ? faCaretUp : faCaretDown

        return (
            <Navigation>

                <h1 className='titleMenu' onClick={() => { this.showPatients() }}>FORMS <FontAwesomeIcon icon={patientIcon} /></h1>
                <span className={patientsClass}>
                    <Link className='link-menu' to="/newAssessment">New Assessment</Link>
                </span>
                <br />
               
            </Navigation>
        )

    }

}