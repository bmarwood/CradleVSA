import React, { Component } from 'react';
import requestServer from "./RequestServer";
import MaterialTable from "material-table";
import './Transfer.css';
import Button from '@material-ui/core/Button';
import Utility from "./NewForm/Utility";



class TransferVHT extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            data: [],
            vht_array: [],
            cho_array: [],
            cho_empty_flag: false,
            cho_w_vht: [],
            from_cho: '',
            to_cho: '',
            loading: true,
            user_role: [],
            user_id: '',
            some: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }


    componentDidMount() {
        this.getCHOList()
        this.getVHTList()
        this.timer = setInterval(() => this.getVHTList(), 10000);
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

    populateVHT(response) {
        var user_array = []
        response.forEach(user => {
            var roles = user.roles;
            var id = user.id;
            var manager_id = user.manager_id;
            roles.forEach(role => {
                if (role.role === "VHT") {
                    var user_obj = {
                        id: id,
                        name: id,
                        manager_id: manager_id
                    }
                    user_array.push(user_obj)
                }
            });
        });
        return user_array;
    }

    async getVHTList() {
        var passback = await requestServer.getUserList()
        if (passback !== null) {
            this.setState({
                vht_array: this.populateVHT(passback.data)
            })
        }
        //console.log("vht_array",this.state.vht_array)
    }

    // async getVHTList() {
    //     var passback = await requestServer.getVHTListForCHO()
    //     if (passback !== null && passback.data !== "") {
    //         this.setState({ vht_empty_flag: passback.flag })
    //         this.setState({ vht_w_patient: passback.vhtlist })
    //         this.populateData(passback.data)
    //     }
    // }


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


    async getCHOList() {
        var passback = await requestServer.getCHOList()
        var listOfCHOs = []
        if (passback !== null) {
            //console.log("passss",passback.data)
            for (let a = 0; a < passback.data.length; a++){
                console.log("passss",passback.data[a])
                listOfCHOs.push(passback.data[a].id)
            }
            this.setState({cho_array:listOfCHOs})
        }
        console.log("list",listOfCHOs)
        this.getCHOWithVHT()
    }


    async getCHOWithVHT(){
        var temp_cho_w_vht = []
        var passback = await this.getVHTList()
        console.log("vht_array",this.state.vht_array)
        for(var a = 0; a < this.state.vht_array.length; a++){
            var response = await requestServer.getCVSA(this.state.vht_array[a].id)
            if(response.data.manager_id !== 'n/a'){
                console.log("response",response.data.manager_id)
            }
            var response2 = await requestServer.getCVSA(response.data.manager_id)
            if(response2 != null){
                console.log("hi",response2.data.roles)
                for(var x = 0; x < response2.data.roles.length; x++)
                    if(response2.data.roles[x].role === "COMMUNITY_HEALTH_OFFICER"){
                        console.log("THE MANAGER IS CHO ID", response2.data.id)
                        if(!temp_cho_w_vht.includes(response2.data.id))
                        temp_cho_w_vht.push(response2.data.id)
                    }
            }
            // for(var x = 0; response2.data.roles.length; x++)
            //     if(response2.data.roles === "CHO"){
            //         console.log("THE MANAGER IS CHO ID", response2.data.id)
            //     }
        }
        this.setState({cho_w_vht:temp_cho_w_vht})
        //var response = await requestServer.getCVSA(id)
        //this.state.cho_w_vht
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

    populateVHTLists(id){
        return;
    }


    render() {
        //this.checkEmptyFlag()
        let temp_to_cho = this.state.to_cho
        let temp_from_cho = this.state.from_cho
        let temp_cho_array = this.state.cho_array
        let temp_cho_w_vht = this.state.cho_w_vht
        console.log(temp_cho_array)

        let vht_select_option = temp_cho_array.map(item => <option value={item}> {item} </option>)
        let vht_select_option2 = temp_cho_w_vht.map(item => <option value={item}> {item} </option>)
        let populate_only_selected_from = this.populateVHTLists(temp_from_cho)
        let populate_only_selected_to = this.populateVHTLists(temp_to_cho)

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

export default TransferVHT