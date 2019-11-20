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
            vht_empty_flag: Boolean,
            vht_w_assessment: [],
            from_vht: '',
            to_vht: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.getVHTList()
    }

    componentDidMount() {
        //this.getVHTList()
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
            if(!this.state.vht_empty_flag && (patient.vht_id == null || patient.vht_id == "EMPTY" )){
                this.setState({vht_empty_flag: true})
                console.log("PLEASE")
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
        //console.log("hi", this.state.data)
    }

    getRoles(parsedUser) {
        var roleArray = []
        if (parsedUser && parsedUser.roles) {
            parsedUser.roles.forEach(function (role) {
                //console.log("User data is : " + role.role)
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
            //console.log("GODMODE",passback.vhtlist)
            this.setState({vht_w_assessment:passback.vhtlist})
            this.populateData(passback.data)
        }
    }



    async getVHTList() {
        var passback = await requestServer.getUserList()
        if (passback !== null) {
            this.setState({
                vht_array: Utility.populateVHT(passback.data),
                //vht_set: this.vhtSet(passback.data)
            })
        }
    }


    handleSubmit = async () => {
        alert("TRANSFER!!")
        //input validation
        // this.setState({
        //     error: false
        // })
        // this.checkRole();
        // if (this.state.error) {
        //     alert("Must select one role")
        //     return
        // }
        //
        // //remove and change the inputs
        // this.changeState();
        // //console.log(this.state);
        //
        // //  '/users/register/this.state'
        // var response = null
        // if (this.state.update) {
        //     response = await requestServer.updateUser(this.state)
        //     alert("UPDATED!!")
            // } else {
            //     response = await RequestServer.addUser(this.state)
            //     if (response !== null) {
            //         toast("User Added");
            //         this.props.history.push(
            //             '/',
            //             {detail: response.data}
            //         )
            //     } else {
            //         this.setState({
            //             error: true,
            //             errorMsg: 'Unable to register'
            //         })
            //     }
            // }

        //}
    }




    handleChange(event){
        if(event.target.name == "vht_A_id")
        {
            this.setState({from_vht:event.target.value})
            //console.log("HMMM",event.target.value)
            //(this.setState({[event.target.name]: event.target.value}))
        }
        else{
            this.setState({to_vht:event.target.value})
        }
    }



    render() {
        let temp_to_vht = this.state.to_vht
        let temp_from_vht = this.state.from_vht
        if(this.state.vht_array[0] != undefined){
            console.log("vht_ARRAY 123",this.state.vht_array[0].id)
            if(temp_to_vht === temp_from_vht && (temp_to_vht != '') && (temp_to_vht !='null')){
                if(this.state.from_vht === this.state.vht_array[0].id){
                    temp_to_vht = this.state.vht_array[1].id
                }
                else{
                    temp_to_vht = this.state.vht_array[0].id
                }
            }
        }

        console.log("THESE ARE THE two",temp_from_vht,temp_to_vht)

        //TO DO PUT THESE INTO FUNCTIONS AND CHANGE ON SELECT CHANGE
        let new_array_with_or_without = [] //this.state.vht_w_assessment
        //let temp_new_with_or_without = []
        for(var x= 0; x<this.state.vht_array.length; x++){
            if (this.state.vht_array[x].id != temp_from_vht) {
                new_array_with_or_without.push(this.state.vht_array[x])
            }
        }
        //new_array_with_or_without = temp_new_with_or_without

        if(this.state.vht_empty_flag) {
            if (!this.state.vht_w_assessment.includes("EMPTY")) {
                this.state.vht_w_assessment.unshift("EMPTY")
            }
        }


        //console.log(new_array_with_or_without)
        let vht_select_option = new_array_with_or_without.map(item => <option id={item.id}
                                                                         value={item.id}> {item.id} </option>)

        let vht_select_option2 = this.state.vht_w_assessment.map(item => <option
                                                                                 value={item}> {item} </option>)
        let populate_only_selected_from = []
        //let temp_from = []

        for (var itr = 0; itr<this.state.data.length; itr++){
            if(this.state.data[itr].vht_id === this.state.from_vht){
                populate_only_selected_from.push(this.state.data[itr])
            }
        }
        //populate_only_selected_from = temp_from

        let populate_only_selected_to = []
        //let temp_to = []
        for (var itr = 0; itr<this.state.data.length; itr++){
            if(this.state.data[itr].vht_id === temp_to_vht){
                populate_only_selected_to.push(this.state.data[itr])
            }
        }
        //populate_only_selected_to = temp_to



        //console.log("POPULATE",populate_only_selected)

        //console.log("WE ARE HERE",this.state.from_vht,this.state.to_vht)
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
                        <option value="null"> --SELECT ONE--</option>
                        {vht_select_option2}
                    </select>
                    <span className = "select-styleT" > >>> </span>
                    <label className = "select-styleT" >Transfer To: </label>
                    <select
                        //value={this.state.vht_id}
                        onChange={this.handleChange}

                        name="vht_B_id"
                    >
                        <option value="null"> --SELECT ONE--</option>
                        {vht_select_option}
                    </select>
                    <Button type="submit" style={{
                        backgroundColor: 'blue',
                        color: 'white',
                        marginLeft:20
                    }} onClick={this.handleSubmit}>Submit</Button>
                </div>

                <div className="table-positionT">
                <MaterialTable
                    title= "Patients assigned to VHT (From)"
                    columns={this.state.columns}
                    data={populate_only_selected_from}
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
                        title="Patients assigned to VHT (To)"
                        columns={this.state.columns}
                        data={populate_only_selected_to}
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