import React, {Component} from 'react';
import requestServer from "./RequestServer";
import MaterialTable from "material-table";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import {ValidatorForm} from "react-material-ui-form-validator";
import Utility from "./NewForm/Utility";


class TransferPatient extends Component {

    constructor(props){
        super(props);
        this.state = {
            columns: [],
            data: [],
            vht_array: []
        }
    }

    componentDidMount() {
        this.getVHTListAll()
        this.getVHTList()
        this.timer = setInterval(() => this.getVHTListAll(), 10000);
        this.setState({
            columns:[
                { title: 'ID Number', field: 'id'},
                { title: 'Name', field: 'name'},
                { title: 'Surname', field: 'surname' },
                { title: 'Patient List', field: 'list_of_patients', type: 'array' },
                { title: 'Assessment List', field: 'list_of_assessments', type: 'array' },
            ],
            data: [
                {
                    id: 'Loading',
                    name: 'Loading',
                    surname: 'Loading',
                    list_of_patients: ["Loading "],
                    list_of_assessments: ["Loading "]
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
        var VHTList = []
        response.forEach(VHT => {
            var name = (VHT.name.split(" "))[0]
            var surname = (VHT.name.split(" "))[1]
            var list_of_patients = (VHT.list_of_patients)
            var list_of_assessments = (VHT.list_of_assessments)
            var id = VHT.id

            var VHT_obj = {
                name: name,
                surname: surname,
                list_of_assessments: list_of_assessments,
                list_of_patients: list_of_patients,
                id: id
            }

            VHTList.push(VHT_obj)
            //this.state.vht_array.push({id: VHT.id})
        });

        this.setState({data: VHTList})
    }

    async getVHTListAll(){
        var passback = await requestServer.getVHTList()
        if (passback !== null && passback.data !== "") {
            this.populateData(passback.data)
        }
    }

    async getVHTList() {
        var passback = await requestServer.getUserList()
        if (passback !== null) {
            this.setState({
                vht_array: Utility.populateVHT(passback.data)
            })
        }
    }

    render() {
        let vht_select_option = this.state.vht_array.map(item => <option id={item.id}
                                                                         value={item.id}> {item.id} </option>)
        return (
            <div className="landing-form">
                <h1 style={{color: "white"}}>Transfer Patients</h1>
                <MaterialTable
                    title="VHTs"
                    columns={this.state.columns}
                    data={this.state.data}/>
                <label>VHT A: </label>
                <select
                    value={this.state.vht_id}
                    onChange={this.handleChange}
                    name="vht_A_id"
                >
                    <option value="EMPTY"> --SELECT ONE--</option>
                    {vht_select_option}
                </select>
                <label>VHT B: </label>
                <select
                    value={this.state.vht_id}
                    onChange={this.handleChange}
                    name="vht_B_id"
                >
                    <option value="EMPTY"> --SELECT ONE--</option>
                    {vht_select_option}
                </select>
            </div>

        );

    }

}

export default TransferPatient