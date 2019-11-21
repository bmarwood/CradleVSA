import React from 'react';
import Button from '@material-ui/core/Button';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Grid, Cell, RadioGroup, Radio} from 'react-mdl';
import RequestServer from '../RequestServer';
import DatePicker from "react-datepicker";
import Utility from "../NewForm/Utility";


class CommunityReport extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            location: 'EMPTY',
            location_array: [],
            from: new Date(),
            to: new Date(),
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    //handle date change
    changeDOB = date => {
        this.setState({
            selected: date
        });
    };

    //componentWillUpdate
    componentDidMount() {
        this.getLocation()
            .catch(() => {
                this.setState({
                    location_array: []
                })
            })
    }

    //USING ALERT RIGHT NOW, SHOULD DISPLAY INSTEAD
    handleSubmit = async () => {
        console.log(this.state.location)
        if (this.state.location === 'EMPTY') {
            alert("Please select location")
            return false
        }
        let response = await RequestServer.getAssessmentsByLocation(this.state.location)
        if (response !== null) {
            let result = Utility.filterByDate(response.data, this.state.from, this.state.to)
            console.log(result)
        }
        // this.props.history.push(
        //     '/'
        // )
    }

    async getLocation() {
        let response = await RequestServer.getLocations()
        if (response !== null) {
            this.setState({
                location_array: response.data
            })
        }
        return [];
    }


    // use variant="outlined" to wrap up the box
    render() {
        let location_select_option = this.state.location_array.map(location => <option key={location.id}
                                                                                       value={location.id}> {location.name}</option>)

        return (
            <ValidatorForm
                style={{
                    backgroundColor: 'white',
                    margin: 'auto',
                    padding: '50px',
                    textAlign: 'center'
                }}
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
            >
                <h4> Location </h4>
                <select
                    value={this.state.location}
                    onChange={this.handleChange}
                    name="location"
                >
                    <option value="EMPTY"> --SELECT ONE--</option>
                    {location_select_option}
                </select>
                <br/>
                <br/>
                <h4>From:</h4>
                <DatePicker
                    name="from"
                    selected={this.state.from}
                    onChange={this.changeDOB}
                    maxDate={new Date()}
                />
                <br/>
                <br/>

                <h4>To:</h4>
                <DatePicker
                    name="to"
                    selected={this.state.to}
                    onChange={this.changeDOB}
                    minDate={this.state.from}
                    maxDate={new Date()}
                />
                <br/>
                <br/>
                < Button type="submit" style={{
                    backgroundColor: 'blue',
                    color: 'white'
                }}>Submit
                </Button>
            </ValidatorForm>
        )
    }
}

export default CommunityReport;
