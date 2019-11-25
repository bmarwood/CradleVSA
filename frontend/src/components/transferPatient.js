import React, { Component } from 'react';
import requestServer from "./RequestServer";
import MaterialTable from "material-table";
import './Transfer.css';
import Button from '@material-ui/core/Button';
import Utility from "./NewForm/Utility";



class TransferPatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            data: [],
            vht_array: [],
            vht_empty_flag: false,
            vht_w_patient: [],
            from_vht: '',
            to_vht: '',
            loading: true,
            user_role: [],
            user_id: '',
            some: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }


    componentDidMount() {
        this.getVHTList()
        this.getPatientList()
        this.timer = setInterval(() => this.getPatientList(), 10000);
        this.setState({
            columns: [
                {
                    title: 'Patient Id',
                    field: 'id',
                    headerStyle: { textAlign: 'center' },
                    cellStyle: { textAlign: 'center' }
                },
                {
                    title: 'Cradle Professional Id',
                    field: 'vht_id',
                    headerStyle: { textAlign: 'center' },
                    cellStyle: { textAlign: 'center' }
                },
            ],
            data: [
                {
                    patient_id: 'LOADING...',
                    vht_id: 'LOADING...',
                }
            ]
        })
    }


    componentWillUnmount() {
        clearInterval(this.timer);
        this.time = null;
    }


    populateData(response) {
        var IdList = []
        response.forEach(patient => {
            var id = patient.id
            if (patient.vht_id == null || patient.vht_id == "EMPTY") {
                var vht_id = "No VHT Assigned"
            }
            else {
                var vht_id = patient.vht_id
            }
            var patient_obj = {
                id: id,
                vht_id: vht_id,
            }
            IdList.push(patient_obj)
        });
        this.setState({ data: IdList })
    }


    getRoles() {
        if(this.state.user_role.length === 0)
        {
            var roleArray = []
            var user = localStorage.getItem("userData")
            var parsedUser = JSON.parse(user)
            if (parsedUser && parsedUser.roles) {
                parsedUser.roles.forEach(function (role) {
                    roleArray.push(role.role)
                })
            }
            var prole = this.checkRoles(roleArray)
            this.setState({user_role:prole, user_id: parsedUser.id})
            return prole
        }
        else{
            return this.state.user_role
        }
    }


    async getPatientList() {
        var ifCHO = await this.getRoles()
        if (ifCHO === 'CHO'){
            var passback = await requestServer.getPatientVHTList(this.state.user_id,"CHO")
            this.setState({loading:false})
        }
        else{
            var passback = await requestServer.getPatientVHTList(this.state.user_id, "ADMIN")
            this.setState({loading:false})
        }
        if (passback !== null && passback.data !== "") {
            this.setState({ vht_empty_flag: passback.flag })
            this.setState({ vht_w_patient: passback.vhtlist })
            this.populateData(passback.data)
        }
    }


    async getSinglePatient(ID) {
        var passback = await requestServer.getPatientByID(ID)
        if (passback !== null && passback.data !== "") {
            return (passback.data)
        }
    }


    async updateSinglePatient(patient) {
        var passback = await requestServer.updatePatient(patient)
        if (passback !== null && passback.data !== "") {
            return (passback.data)
        }
    }


    async getVHTList() {
        var ifCHO = await this.getRoles()
        if(ifCHO === "CHO"){
            var passback = await requestServer.getUserListCHO(this.state.user_id)
        }
        else{
            var passback = await requestServer.getUserList()
        }
        if (passback !== null) {
            this.setState({
                vht_array: Utility.populateVHT(passback.data),
            })
        }
    }


    handleSubmit = async () => {
        //set the patient object to be sent to update
        for (var itr = 0; itr < this.state.data.length; itr++) {
            if (this.state.data[itr].vht_id === this.state.from_vht) {
                var temp_patient = await this.getSinglePatient(this.state.data[itr].id)
                temp_patient.vht_id = this.state.to_vht
                var update_response = await this.updateSinglePatient(temp_patient)
            }
        }
        window.location.reload()
        alert("All Patients from ID: " + this.state.from_vht + " have been transferred to ID: " + this.state.to_vht)
    }


    handleSubmitSingle = async (id, fromList, toList) => {
        //set the patient object to be sent to update
        var temp_patient = await this.getSinglePatient(id)
        temp_patient.vht_id = this.state.to_vht
        var update_response = await this.updateSinglePatient(temp_patient)
        this.getPatientList()
        if (fromList.length === 1 || toList.length === 0) {
            window.location.reload()
        }
        alert("Patient ID: " + id + " from ID: " + this.state.from_vht + " has been transferred to ID: " + this.state.to_vht)
    }


    handleChange(event) {
        if (event.target.name === "vht_A_id") {
            if (event.target.value === this.state.to_vht && this.state.to_vht !== "null") {
                alert("Transfer to same VHT ID: " + event.target.value + " is not allowed\nPlease try again")
                event.target.value = null
            }
            this.setState({ from_vht: event.target.value })
        }
        else {
            if (event.target.value === this.state.from_vht && this.state.from_vht !== "null") {
                alert("Transfer to same VHT ID: " + event.target.value + " is not allowed\nPlease try again")
                event.target.value = null
            }
            this.setState({ to_vht: event.target.value })
        }
    }


    populatePatientLists(vht_id) {
        var tempPatientList = []
        for (var itr = 0; itr < this.state.data.length; itr++) {
            if (this.state.data[itr].vht_id === vht_id) {
                tempPatientList.push(this.state.data[itr])
            }
        }
        return tempPatientList
    }


    checkEmptyFlag() {
        if (this.state.vht_empty_flag) {
            if (!this.state.vht_w_patient.includes("No VHT Assigned")) {
                this.state.vht_w_patient.unshift("No VHT Assigned")
            }
        }
    }


    checkRoles(roleArray)
    {
        const Role_Termination_Integer = -1
        if(roleArray.indexOf("ADMIN") > Role_Termination_Integer){
            return "ADMIN"
        }
        else if(roleArray.indexOf("COMMUNITY_HEALTH_OFFICER") > Role_Termination_Integer) {
            return "CHO"
        }
        else{
            return "NO ROLE"
        }
    }


    render() {
        this.checkEmptyFlag()
        let temp_to_vht = this.state.to_vht
        let temp_from_vht = this.state.from_vht
        let temp_vht_array = this.state.vht_array
        let temp_vht_w_patient = this.state.vht_w_patient


        let vht_select_option = temp_vht_array.map(item => <option id={item.id}
                                                                         value={item.id}> {item.id} </option>)
        let vht_select_option2 = temp_vht_w_patient.map(item => <option
                                                                                 value={item}> {item} </option>)
        let populate_only_selected_from = this.populatePatientLists(temp_from_vht)
        let populate_only_selected_to = this.populatePatientLists(temp_to_vht)

        return (
            <div>
                <div className="landing-formT">
                    <div className="round bg selector bigPad center">
                        <h1 style={{ color: "black" }}>Transfer Patients</h1>
                        <label style={{ color: "black" }} >Transfer From: </label>
                        <select
                            onChange={this.handleChange}
                            name="vht_A_id"
                            value={this.state.vht_id}
                        >
                            <option value="null"> --SELECT ONE--</option>
                            {vht_select_option2}
                        </select>
                        <span className="select-styleT" > >>> </span>
                        <label className="select-styleT" >Transfer To: </label>
                        <select
                            onChange={this.handleChange}
                            name="vht_B_id"
                            value={this.state.vht_id}
                        >
                            <option value="null"> --SELECT ONE--</option>
                            {vht_select_option}
                        </select>
                        <Button type="submit" style={{
                            backgroundColor: 'blue',
                            color: 'white',
                            marginLeft: 20
                        }}
                            onClick={(e) => { if (window.confirm("Are you sure you wish to transfer all patients from ID: " + this.state.from_vht + " to ID: " + this.state.to_vht)) this.handleSubmit() }}>Submit</Button>
                    </div>
                </div>
                <div className="table-positionT">
                    <MaterialTable
                        title="Patients assigned to VHT (From)"
                        columns={this.state.columns}
                        data={populate_only_selected_from}
                        actions={[
                            {
                                icon: 'compareArrows',
                                tooltip: 'Transfer Patient',
                                onClick: (event, rowData) => { if (window.confirm("Are you sure you wish to transfer patient ID: " + rowData.id + " from ID: " + this.state.from_vht + " to ID: " + this.state.to_vht)) this.handleSubmitSingle(rowData.id, populate_only_selected_from, populate_only_selected_to) }
                            }
                        ]}
                    />
                </div>
                <div className="table-positionT">
                    <MaterialTable
                        title="Patients assigned to VHT (To)"
                        columns={this.state.columns}
                        data={populate_only_selected_to}
                    />
                </div>
            </div>
        );
    }
}

export default TransferPatient