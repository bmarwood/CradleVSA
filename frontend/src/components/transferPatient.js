import React, {Component} from 'react';
import requestServer from "./RequestServer";
import MaterialTable from "material-table";
import './Transfer.css';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import {ValidatorForm} from "react-material-ui-form-validator";
import Utility from "./NewForm/Utility";
import ModalPopup from "../Modals/ModalPopup";
import {toast} from "react-toastify";


class TransferPatient extends Component {

    constructor(props){
        super(props);
        this.state = {
            columns: [],
            data: [],
            vht_array: [],
            vht_empty_flag: false,
            vht_w_assessment: [],
            from_vht: '',
            to_vht: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.getVHTList()
    }

    componentDidMount() {
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
        console.log(response)
        var IdList = []
        response.forEach(patient => {
            var id = patient.id
            if(patient.vht_id == null){
                var vht_id = "EMPTY"
            }
            else{
                var vht_id = patient.vht_id
            }


            var patient_obj = {
                id: id,
                vht_id: vht_id,
            }
            IdList.push(patient_obj)

        });

        this.setState({data: IdList})
    }


    async getPatientList() {
        var passback = await requestServer.getPatientVHTList()
        if (passback !== null && passback.data !== "") {
            this.setState({vht_empty_flag:passback.flag})
            this.setState({vht_w_assessment:passback.vhtlist})
            this.populateData(passback.data)
        }
    }

    async getSinglePatient(ID) {
        var passback = await requestServer.getPatientByID(ID)
        if (passback !== null && passback.data !== "") {
            return(passback.data)
        }
    }

    async updateSinglePatient(patient){
        var passback = await requestServer.updatePatient(patient)
        if (passback !== null && passback.data !== "") {
            return(passback.data)
        }
    }


    async getVHTList() {
        var passback = await requestServer.getUserList()
        if (passback !== null) {
            this.setState({
                vht_array: Utility.populateVHT(passback.data),
            })
        }
    }


    handleSubmit = async () => {
        //set the patient object to be sent to update
        for (var itr = 0; itr<this.state.data.length; itr++){
            if(this.state.data[itr].vht_id === this.state.from_vht){
                var temp_patient = await this.getSinglePatient(this.state.data[itr].id)
                temp_patient.vht_id = this.state.to_vht
                var update_response = await this.updateSinglePatient(temp_patient)
            }
        }

        window.location.reload()
        alert("All Patients from ID: "+ this.state.from_vht +" have been tranferred to ID: "+ this.state.to_vht)
    }




    handleChange(event){
        if(event.target.name === "vht_A_id")
        {
            if(event.target.value == this.state.to_vht && this.state.to_vht !== "null"){
                alert("Transfer to same VHT ID: "+ event.target.value + " is not allowed\nPlease try again")
                event.target.value = null
            }
            this.setState({from_vht:event.target.value})
        }
        else{
            if(event.target.value == this.state.from_vht && this.state.from_vht !== "null"){
                alert("Transfer to same VHT ID: "+ event.target.value + " is not allowed\nPlease try again")
                event.target.value = null
            }
            this.setState({to_vht:event.target.value})
        }
    }

    populatePatientLists(vht_id){
        var tempPatientList = []
        for (var itr = 0; itr<this.state.data.length; itr++){
            if(this.state.data[itr].vht_id === vht_id){
                tempPatientList.push(this.state.data[itr])
            }
        }
        return tempPatientList
    }

    checkEmptyFlag(){
        if(this.state.vht_empty_flag) {
            if (!this.state.vht_w_assessment.includes("EMPTY")) {
                this.state.vht_w_assessment.unshift("EMPTY")
            }
        }
    }

    render() {

        this.checkEmptyFlag()

        let temp_to_vht = this.state.to_vht
        let temp_from_vht = this.state.from_vht



        let vht_select_option = this.state.vht_array.map(item => <option id={item.id}
                                                                         value={item.id}> {item.id} </option>)

        let vht_select_option2 = this.state.vht_w_assessment.map(item => <option
                                                                                 value={item}> {item} </option>)

        let populate_only_selected_from = this.populatePatientLists(temp_from_vht)


        let populate_only_selected_to = this.populatePatientLists(temp_to_vht)


        return (
            <div>
                <div className = "landing-formT">
                    <h1 style={{color: "white"}}>Transfer Patients</h1>
                    <label style = {{color:"white"}} >Transfer From: </label>
                    <select
                        onChange={this.handleChange}
                        name="vht_A_id"
                        value={this.state.vht_id}
                    >
                        <option value="null"> --SELECT ONE--</option>
                        {vht_select_option2}
                    </select>
                    <span className = "select-styleT" > >>> </span>
                    <label className = "select-styleT" >Transfer To: </label>
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
                        marginLeft:20
                    }}
                    onClick={(e) => {if (window.confirm("Are you sure you wish to transfer all patients from ID: "+this.state.from_vht+" to ID: "+this.state.to_vht)) this.handleSubmit()}}>Submit</Button>
                </div>

                <div className="table-positionT">
                <MaterialTable
                    title= "Patients assigned to VHT (From)"
                    columns={this.state.columns}
                    data={populate_only_selected_from}
                    // TO DO IMPLEMENT single patient transfer
                    // actions={[
                    //     {
                    //         icon: 'compareArrows',
                    //         tooltip: 'Transfer Patient',
                    //         onClick: (event, rowData) => alert("You Transferred " + rowData.vht_id)
                    //     }
                    // ]}
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