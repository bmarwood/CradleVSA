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
                    title: 'VHT Id',
                    field: 'id',
                    headerStyle: { textAlign: 'center' },
                    cellStyle: { textAlign: 'center' }
                },
                {
                    title: 'Cradle Professional Id',
                    field: 'manager_id',
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
        response.forEach(vht => {
            var id = vht.id
            if (vht.manager_id == null || vht.manager_id == "EMPTY") {
                var manager_id = "No CHO Assigned"
            }
            else {
                var manager_id = vht.manager_id
            }
            var vht_obj = {
                id: id,
                manager_id: manager_id,
            }
            IdList.push(vht_obj)
        });
        this.setState({ data: IdList })
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
        this.setState({data: user_array})
        return user_array;
    }

    async getVHTList() {
        var passback = await requestServer.getUserList()
        if (passback !== null) {
            this.setState({
                vht_array: this.populateVHT(passback.data)
            })
        }
        this.populateData(this.state.vht_array)
    }


    async getSingleUser(ID) {
        var passback = await requestServer.getCVSA(ID)
        if (passback !== null && passback.data !== "") {
            return (passback.data)
        }
    }


    async updateSingleUser(patient) {
        var passback = await requestServer.updateUser(patient)
        if (passback !== null && passback.data !== "") {
            return (passback.data)
        }
    }


    async getCHOList() {
        var passback = await requestServer.getCHOList()
        var listOfCHOs = []
        if (passback !== null) {
            for (let a = 0; a < passback.data.length; a++){
                listOfCHOs.push(passback.data[a].id)
            }
            this.setState({cho_array:listOfCHOs})
        }
        this.getCHOWithVHT()
    }


    async getCHOWithVHT(){
        var temp_cho_w_vht = []
        var passback = await this.getVHTList()
        for(var a = 0; a < this.state.vht_array.length; a++){
            var response = await requestServer.getCVSA(this.state.vht_array[a].id)
            if(response.data.manager_id !== 'n/a'){
            }
            var response2 = await requestServer.getCVSA(response.data.manager_id)
            if(response2 != null){
                for(var x = 0; x < response2.data.roles.length; x++)
                    if(response2.data.roles[x].role === "COMMUNITY_HEALTH_OFFICER"){
                        if(!temp_cho_w_vht.includes(response2.data.id))
                        temp_cho_w_vht.push(response2.data.id)
                    }
            }
        }
        this.setState({cho_w_vht:temp_cho_w_vht})
    }


    handleSubmit = async () => {
        //set the patient object to be sent to update
        for (var itr = 0; itr < this.state.data.length; itr++) {
            if (this.state.data[itr].manager_id === this.state.from_cho) {
                var temp_patient = await this.getSingleUser(this.state.data[itr].id)
                temp_patient.manager_id = this.state.to_cho
                var update_response = await this.updateSingleUser(temp_patient)
            }
        }
        window.location.reload()
        alert("All Patients from ID: " + this.state.from_cho + " have been transferred to ID: " + this.state.to_cho)
    }


    handleSubmitSingle = async (id, fromList, toList) => {
        //set the patient object to be sent to update
        var temp_patient = await this.getSingleUser(id)
        temp_patient.manager_id = this.state.to_cho
        var update_response = await this.updateSingleUser(temp_patient)
        this.getVHTList()
        if (fromList.length === 1 || toList.length === 0) {
            window.location.reload()
        }
        alert("Patient ID: " + id + " from ID: " + this.state.from_cho + " has been transferred to ID: " + this.state.to_cho)
    }


    handleChange(event) {
        if (event.target.name === "vht_A_id") {
            if (event.target.value === this.state.to_cho && this.state.to_cho !== "null") {
                alert("Transfer to same CHO ID: " + event.target.value + " is not allowed\nPlease try again")
                event.target.value = null
            }
            this.setState({ from_cho: event.target.value })
        }
        else {
            if (event.target.value === this.state.from_cho && this.state.from_cho !== "null") {
                alert("Transfer to same CHO ID: " + event.target.value + " is not allowed\nPlease try again")
                event.target.value = null
            }
            this.setState({ to_cho: event.target.value })
        }
    }


    checkEmptyFlag() {
        if (this.state.cho_empty_flag) {
            if (!this.state.cho_w_patient.includes("No CHO Assigned")) {
                this.state.cho_w_patient.unshift("No CHO Assigned")
            }
        }
    }


    populateVHTLists(id){
        var tempPatientList = []
        for (var itr = 0; itr < this.state.data.length; itr++) {
            if (this.state.data[itr].manager_id === id) {
                tempPatientList.push(this.state.data[itr])
            }
        }
        return tempPatientList
    }


    render() {
        this.checkEmptyFlag()
        let temp_to_cho = this.state.to_cho
        let temp_from_cho = this.state.from_cho
        let temp_cho_array = this.state.cho_array
        let temp_cho_w_vht = this.state.cho_w_vht

        let vht_select_option = temp_cho_array.map(item => <option value={item}> {item} </option>)
        let vht_select_option2 = temp_cho_w_vht.map(item => <option value={item}> {item} </option>)
        let populate_only_selected_from = this.populateVHTLists(temp_from_cho)
        let populate_only_selected_to = this.populateVHTLists(temp_to_cho)

        return (
            <div>
                <div className="landing-formT">
                    <div className="round bg selector bigPad center">
                        <h1 style={{ color: "black" }}>Transfer VHTs</h1>
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
                                onClick={(e) => { if (window.confirm("Are you sure you wish to transfer all patients from ID: " + this.state.from_cho + " to ID: " + this.state.to_cho)) this.handleSubmit() }}>Submit</Button>
                    </div>
                </div>
                <div className="table-positionT">
                    <MaterialTable
                        title="VHTs assigned to CHO (From)"
                        columns={this.state.columns}
                        data={populate_only_selected_from}
                        actions={[
                            {
                                icon: 'compareArrows',
                                tooltip: 'Transfer Patient',
                                onClick: (event, rowData) => { if (window.confirm("Are you sure you wish to transfer patient ID: " + rowData.id + " from ID: " + this.state.from_cho + " to ID: " + this.state.to_cho)) this.handleSubmitSingle(rowData.id, populate_only_selected_from, populate_only_selected_to) }
                            }
                        ]}
                    />
                </div>
                <div className="table-positionT">
                    <MaterialTable
                        title="VHTS assigned to CHO (To)"
                        columns={this.state.columns}
                        data={populate_only_selected_to}
                    />
                </div>
            </div>
        );
    }
}

export default TransferVHT