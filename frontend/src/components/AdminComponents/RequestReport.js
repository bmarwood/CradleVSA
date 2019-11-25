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
            location_list: [],
            location: '',
            vht_id: '',
            temp_from_date: new Date(),
            temp_to_date: new Date(),
            from_date: 'date',
            to_date: 'date',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeLocation = this.handleChangeLocation.bind(this);
    }

    componentDidMount() {
        this.getVHTsList()
        this.getAllLocations()
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

    populateLocationData(response) {
        var LocationList = []

        var initObj = {
            id: 'all',
            name: "All",
            Address: "All"
        }
        
        LocationList.push(initObj)

        response.forEach(location => {
            var id = location.id
            var name = location.name
            var address = location.address
            console.log(name)
            var location_obj = {
                id: id,
                name: name,
                address: address
            }
            LocationList.push(location_obj)
        });

        this.setState({ location_list: LocationList })
        console.log("set location data", LocationList)

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

    async getAllLocations() {
        var passback = await requestServer.getLocations()
        if (passback !== null) {
            this.populateLocationData(passback.data)
        }
        else {
            console.log("Did not receive anything")
        }
    }


    handleChange(event) {
        this.setState({
            vht_id: event.target.value
        })
        console.log("value is", event.target.value)
    }

    handleChangeLocation(event) {
        this.setState({
            location: event.target.value
        })
        console.log("location is", event.target.value)
    }

    handleSubmit() {
        if (this.state.vht_id == '') {
            window.alert("You need to select valid VHT")
        }
        else {
            console.log("submitting: ", this.state)
            var vht_id = this.state.vht_id
            var from = this.state.from_date
            var to = this.state.to_date
            var location = this.state.location

            // this.requestReport(vht_id, from, to)
            if (from === "date" && to === "date") {
                let input_date_from = Utility.convertDate(this.state.temp_from_date)
                let input_date_to = Utility.convertDate(this.state.temp_to_date)
                let today = Utility.convertDate(new Date())

                this.setState({
                    from_date: input_date_from,
                    to_date: input_date_to,
                    location: location
                }, () => { this.requestReport(vht_id) })
            }

        }
    }

    requestReport(vht_id) {

        this.props.history.push({
            pathname: '/vht-report',
            state: {
                vht_id: vht_id,
                from: this.state.from_date,
                to: this.state.to_date,
                location: this.state.location
            }
        })
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

    getVHTOptions() {
        return (this.state.vht_list.map(item => {
            return <option key={item.id} value={item.id}> {item.id} </option>
        }))
    }

    getLocationOptions() {
        return (this.state.location_list.map(location => {
            console.log(location._id)
            console.log(location)
            return <option key={location.id} value={location.id}> {location.name} </option>
        }))
    }

    render() {
        return (
            <div style={{
                backgroundColor: 'white',
                margin: '20px auto',
                maxWidth: '50%',
                padding: '50px',
                textAlign: 'center',
                borderRadius: '10px'
            }}>
                <h1 style={{ color: "black" }}> VHT Activity Report</h1>
                {/* <h4 style={{color: "white"}}> Health Facility Location</h4> */}
                <h4 style={{ color: "black" }} >Select Health Facility Location </h4>
                <select
                    onChange={this.handleChangeLocation}
                    value={this.state.location}
                    name="location_list"
                >
                    <option value="null"> --SELECT ONE--</option>
                    {this.getLocationOptions()}
                </select>
                <br />

                <h4 style={{ color: "black" }}>Select VHT: </h4>
                <select
                    onChange={this.handleChange}
                    value={this.state.vht_id}
                    name="vht_list"
                >
                    <option value="null"> --SELECT ONE--</option>
                    {this.getVHTOptions()}
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
                <Button onClick={this.handleSubmit} type="submit" style={{
                    backgroundColor: 'blue',
                    color: 'white'
                }}>Submit</Button>
                <br />
            </div>

        );

    }
}

export default RequestReport;