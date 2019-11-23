import React from 'react';
import Button from '@material-ui/core/Button';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Grid, Cell} from 'react-mdl';
import RequestServer from '../RequestServer';
import DatePicker from "react-datepicker";
import Utility from "../NewForm/Utility";
import CommunityGraph from './CommunityGraph';
import CommunityPieChart from './CommunityPieChart';

class CommunityReport extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            location: 'EMPTY',
            location_array: [],
            from: new Date(),
            to: new Date(),
            pie_array: [1, 2, 3, 4, 5],
            red_down: 0,
            display: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    handleDateChange = (dateName, dateValue) => {
        this.setState({
            [dateName]: dateValue
        })
    }

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
        console.log(this.state)
        if (this.state.location === 'EMPTY') {
            alert("Please select location")
            return false
        }
        let response = await RequestServer.getAssessmentsByLocation(this.state.location)

        let temp_array = []
        if (response !== null) {
            let result = Utility.filterByDate(response.data, this.state.from, this.state.to)
            console.log(result)
            temp_array.push(result.num_red_up, result.num_red_down, result.num_yellow_down, result.num_yellow_up, result.num_green)
            console.log(temp_array)
            this.setState({
                pie_array: temp_array,
                red_down: result.num_red_down,
                display: true
            })
        }
        // CommunityPieChart.changeData(temp_array)

        return false;
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
            <div style={{
                backgroundColor: 'white',
                margin: 'auto',
                padding: '50px',
                textAlign: 'center'
            }}>
                <ValidatorForm
                    ref="form"
                    onSubmit={this.handleSubmit}
                    onError={errors => console.log(errors)}
                >
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Cell col={4}>
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
                        </Cell>
                        <Cell col={4}>
                            <h4>From:</h4>
                            <DatePicker
                                value={this.state.from}
                                selected={this.state.from}
                                onChange={date => this.handleDateChange('from', date)}
                                maxDate={this.state.to}
                            />
                            <br/>
                            <br/>

                        </Cell>
                        <Cell col={4}>
                            <h4>To:</h4>
                            <DatePicker
                                value={this.state.to}
                                selected={this.state.to}
                                onChange={date => this.handleDateChange('to', date)}
                                minDate={this.state.from}
                                maxDate={new Date()}
                            />
                            <br/>
                            <br/>
                        </Cell>
                    </Grid>
                    < Button type="submit" style={{
                        backgroundColor: 'blue',
                        color: 'white'
                    }}>Generate
                    </Button>
                </ValidatorForm>

                <div style={{display: (this.state.display ? 'block' : 'none')}}>
                    <CommunityGraph/>
                    <br/>
                    <CommunityPieChart
                        array={this.state.pie_array}
                        redDown={this.state.red_down}
                    />
                </div>
            </div>
        )
    }
}

export default CommunityReport;
