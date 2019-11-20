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


class TransferPatient extends Component {

    constructor(props){
        super(props);
        this.state = {
            columns: [],
            data: [],
            vht_array: [],
            vht_empty_flag: Boolean,
            vht_w_assessment: [],
            from_vht: '',
            to_vht: ''
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
        console.log(response)
        //this.getVHTList()
        //console.log(this.state.vht_array)
        var IdList = []
        response.forEach(patient => {
            var id = patient.id
            if(patient.vht_id == null){
                var vht_id = "EMPTY"
            }
            if(patient.vht_id == null || patient.vht_id == "EMPTY"){
                this.setState({vht_empty_flag: true})
            }
            else{
                var vht_id = patient.vht_id
            }
            //var list_of_patients = (VHT.list_of_patients)
            //var list_of_assessments = (VHT.list_of_assessments)
            //var id = VHT.id

            var patient_obj = {
                //id: patient.id,
                id: id,
                vht_id: vht_id,
            }
            //if (this.getRoles(assessment_obj.cvsa_id).contains("VHT")){
            IdList.push(patient_obj)
            //}

            //this.state.vht_array.push({id: VHT.id})
        });

        this.setState({data: IdList})
        console.log("hi", this.state.data)
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

    async getPatientList() {
        var passback = await requestServer.getPatientVHTList()
        if (passback !== null && passback.data !== "") {
            console.log("GODMODE",passback.vhtlist)
            this.setState({vht_w_assessment:passback.vhtlist})
            this.populateData(passback.data)
        }
    }

    // async getAssessmentList() {
    //     var userData = JSON.parse(localStorage.getItem("userData"))
    //     var roles = this.getRoles(userData)
    //     console.log("USER", userData)
    //     var passback
    //     if (this.isAdmin(roles)) {
    //         passback = await requestServer.getAssessmentsList()
    //
    //         if (passback !== null && passback.data !== "") {
    //             await this.vhtSet()
    //             await this.userSet(passback.data)
    //             let found = await this.parseThings(passback.data)
    //             console.log("foound",found)
    //
    //
    //
    //             var tempdata = passback.data
    //             console.log("PRE CHECK", passback.data)
    //             for (let i in found)
    //             {
    //
    //                 console.log("DELETING", passback.data[found[i]], "AT POSITION", found[i])
    //                 delete passback.data[found[i]]
    //             }
    //
    //             //delete passback.data[0]
    //             console.log("FINAL CHECK", passback.data)
    //             this.populateData(passback.data)
    //             //this.setState( vht_select_option: interse)
    //         }
    //
    //     } else {
    //         passback = await requestServer.getAssessmentsByUserId(userData.id)
    //
    //         if (passback !== null && passback.data !== "") {
    //             this.populateData(passback.data)
    //         }
    //     }
    // }
/*
    async getVHTListAll(){
        var passback = await requestServer.getVHTList()
        if (passback !== null && passback.data !== "") {
            this.populateData(passback.data)
        }
    }
*/
    // async vhtSet(){
    //     let vht_set1 = [];
    //     console.log("IN VHT CHECK",this.state.vht_array)
    //     for(let itr = 0; itr < Object.keys(this.state.vht_array).length; itr++){
    //          vht_set1.push(this.state.vht_array[itr].id)
    //      }
    //     this.setState({
    //         vht_set: vht_set1
    //     })
    //     console.log("IN VHT CHECK 1",this.state.vht_set)
    // }
    //
    // async userSet(data){
    //     let user_set1 = [];
    //     //console.log("IN VHT CHECK",this.state.vht_array)
    //     for(let itr = 0; itr < Object.keys(data).length; itr++){
    //         user_set1.push(data[itr].cvsa_id)
    //     }
    //     this.setState({
    //         user_set: user_set1
    //     })
    //     console.log("IN USER CHECK",this.state.user_set)
    // }


    async getVHTList() {
        var passback = await requestServer.getUserList()
        if (passback !== null) {
            this.setState({
                vht_array: Utility.populateVHT(passback.data),
                //vht_set: this.vhtSet(passback.data)
            })
        }
    }

    // async parseThings(data){
    //     let intersect = this.state.vht_set.filter(value => this.state.user_set.includes(value));
    //     console.log("intersect", intersect)
    //     let found = []
    //     for (let itr = 0; itr < Object.keys(data).length; itr++) {
    //
    //         if (!intersect.includes(data[itr].cvsa_id)) {
    //             found.push(itr)
    //         }
    //     }
    //     console.log("in getAss", intersect)
    //     this.setState({vht_w_assessment: intersect})
    //     console.log("in getAss with assessment", this.state.vht_w_assessment)
    //     console.log("in getAss without assessment", this.state.vht_array)
    //     console.log("in getAss", found)
    //     return found
    // }


    handleChange(event){
        if(event.target.name == "vht_A_id")
        {
            this.setState({from_vht:event.target.value})
            //(this.setState({[event.target.name]: event.target.value}))
        }
    }



    render() {

        //TO DO PUT THESE INTO FUNCTIONS AND CHANGE ON SELECT CHANGE
        let new_array_with_or_without = [] //this.state.vht_w_assessment
        for(var x= 0; x<this.state.vht_array.length; x++){
            if (this.state.vht_array[x].id != this.state.from_vht) {
                new_array_with_or_without.push(this.state.vht_array[x])
            }
        }

        if(this.state.vht_empty_flag) {
            if (!this.state.vht_w_assessment.includes("No VHT")) {
                this.state.vht_w_assessment.unshift("No VHT")
            }
        }


        console.log(new_array_with_or_without)
        let vht_select_option = new_array_with_or_without.map(item => <option id={item.id}
                                                                         value={item.id}> {item.id} </option>)

        let vht_select_option2 = this.state.vht_w_assessment.map(item => <option
                                                                                 value={item}> {item} </option>)

        console.log("WE ARE HERE",this.state.from_vht)
        return (
            <div>
                <div className = "landing-formT">
                    <h1 style={{color: "white"}}>Transfer Patients</h1>
                    <label style = {{color:"white"}} >Transfer From: </label>
                    <select
                        //value={this.state.vht_id}
                        onChange={this.handleChange}
                        name="vht_A_id"
                        value={this.state.vht_id}
                    >
                        <option value="EMPTY"> --SELECT ONE--</option>
                        {vht_select_option2}
                    </select>
                    <span className = "select-styleT" > >>> </span>
                    <label className = "select-styleT" >Transfer To: </label>
                    <select
                        //value={this.state.vht_id}
                        onChange={this.handleChange}
                        name="vht_B_id"
                    >
                        <option value="EMPTY"> --SELECT ONE--</option>
                        {vht_select_option}

                    </select>
                </div>
                <div className="table-positionT">
                <MaterialTable
                    title="table"
                    columns={this.state.columns}
                    data={this.state.data}
                    actions={[
                        {
                            icon: 'compareArrows',
                            tooltip: 'Transfer Patient',
                            onClick: (event, rowData) => alert("You Transferred " + rowData.vht_id)
                        }
                    ]}/>
                </div>
                <div className="table-positionT">
                    <MaterialTable
                        title="table"
                        columns={this.state.columns}
                        data={this.state.data}
                        actions={[
                            {
                                icon: 'compareArrows',
                                tooltip: 'Transfer Patient',
                                onClick: (event, rowData) => alert("You Transferred " + rowData.vht_id)
                            }
                        ]}
                    />

                </div>
            </div>


                );
        }
}

export default TransferPatient