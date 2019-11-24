// All the rest of the content of the landing page is coming from 
import React, { Component } from 'react';
import Utility from '../NewForm/Utility';
import Button from '@material-ui/core/Button';
import '../../App.css';
import requestServer from '../RequestServer';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class RequestReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vht_list: [],
            vht_id: '',
            temp_from_date: new Date(),
            temp_to_date: new Date(),
            from_date: 'date',
            to_date: 'date',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.getVHTsList()
    }


    populateData(response) {
        console.log("response", response)
        var VHTList = []

        response.forEach(user => {
            var id = user.id
            if (id == null) {
                var id = "N/A";
            }
            console.log(id)
            var vht_obj = {
                title: id,
                id: id
            }
            VHTList.push(vht_obj)
        });

        this.setState({ vht_list: VHTList })
        console.log("set data", VHTList)

    }

    async getVHTsList() {
        var passback = await requestServer.getAllVHTs()
        if (passback !== null) {
            this.populateData(passback.data)
        }
        else {
            console.log("Did not receive anything")
        }
    }


    handleChange(event) {
        console.log("EVENT", event.target.name)
        //event.target.selected = event.target.id
        this.setState({
            //[event.target.name] : event.target.value,
            vht_id: event.target.value
        })
        console.log("value is", event.target.value)
    }

    handleSubmit = async () => {
        if (this.state.vht_id = '') {
            window.alert("You need to select valid VHT")
        }
        else {
            console.log(this.state)
            if (this.state.from_date === "date" && this.state.to_date === "date") {
                let input_date_from = Utility.convertDate(this.state.temp_from_date)
                let input_date_to = Utility.convertDate(this.state.temp_to_date)
                let today = Utility.convertDate(new Date())

                this.setState({
                    from_date: input_date_from,
                    to_date: input_date_to
                }, () => {this.requestReport()})
            }
           
        }
    }

    requestReport() {

    }

    changeFromDate = date => {
        this.setState({
            temp_from_date: date
        });
    };

    changeToDate = date => {
        if (date - this.state.temp_from_date < 0) {
            window.alert("Invalid Range of Date. Please try again")
        }
        else {
            this.setState({
                temp_to_date: date
            });
        }
    };

    getOptions() {
        return (this.state.vht_list.map(item => {
            return <option key={item.id} value={item.id}> {item.id} </option>
        }))
    }

    render() {
        return (
            <div style={{
                backgroundColor: 'white',
                margin: 'auto',
                padding: '50px',
                textAlign: 'center'
            }}>
                <h1 style={{ color: "black" }}> VHT Activity Report</h1>
                <label style={{ color: "black" }} >Select VHT: </label>
                <form onSubmit={this.handleSubmit}>
                    <select
                        onChange={this.handleChange}
                        value={this.state.vht_list}
                        name="vht_list"
                    >
                        <option value="null"> --SELECT ONE--</option>
                        {this.getOptions()}
                    </select>

                    <h4 style={{ color: "black" }}> Select Duration for the Report</h4>
                    <h4 style={{ color: "black" }}> From</h4>
                    <br />
                    <DatePicker
                        name="from_date"
                        selected={this.state.temp_from_date}
                        onChange={this.changeFromDate}
                        maxDate={new Date()}
                    />
                    <h4 style={{ color: "black" }}> To</h4>
                    <br />
                    <DatePicker
                        name="to_date"
                        selected={this.state.temp_to_date}
                        onChange={this.changeToDate}
                        maxDate={new Date()}
                    />
                    <br />
                    <br />
                    <br />
                    <br />
                    <Button type="submit" style={{
                        backgroundColor: 'blue',
                        color: 'white'
                    }}>Submit</Button>
                    <br />
                </form>
            </div>

        );

    }
}

export default RequestReport;