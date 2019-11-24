import React from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { Grid, Cell } from 'react-mdl';
import RequestServer from '../RequestServer';
import DatePicker from "react-datepicker";
import Utility from "../NewForm/Utility";
import CommunityGraph from './CommunityGraph';
import CommunityPieChart from './CommunityPieChart';
import Alert from "react-bootstrap/Alert";
import { MDBCard, MDBCardTitle, MDBContainer } from "mdbreact";
import './Community.css';

class CommunityReport extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            location: 'EMPTY',
            location_array: [],
            from: new Date(),
            to: new Date(),
            pie_array: [1, 1, 1, 1, 1],
            display: false,
            vital_check: [0, 0, 0],
            graph_array: {
                systolic: [],
                diastolic: [],
                heart_rate: []
            }
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

        if (this.state.location === 'EMPTY') {
            alert("Please select location")
            return false
        }
        let response = await RequestServer.getAssessmentsByLocation(this.state.location)
        let temp_array = []
        if (response !== null) {
            let result = Utility.filterByDate(response.data, this.state.from, this.state.to)
            temp_array.push(result.num_red_up, result.num_red_down, result.num_yellow_down, result.num_yellow_up, result.num_green)

            this.setState({
                pie_array: temp_array,
                vital_check: result.vital_check,
                display: true,
                graph_array: {
                    systolic: result.systolic,
                    diastolic: result.diastolic,
                    heart_rate: result.heart_rate
                }
            })
        }
        return false;
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
        const count_assessment = this.state.pie_array.reduce((a, b) => a + b, 0)

        return (
            <div>
                <div className='selector background round allPad floatLeft'>
                    <ValidatorForm
                        ref="form"
                        onSubmit={this.handleSubmit}
                        onError={errors => console.log(errors)}
                    >

                        <Grid>
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
                            </Cell>
                            <br />
                            <div>
                            <Cell col={5} row={2}>
                                <h4>From:</h4>
                                <DatePicker
                                    value={this.state.from}
                                    selected={this.state.from}
                                    onChange={date => this.handleDateChange('from', date)}
                                    maxDate={this.state.to}
                                />
                            </Cell>
                            <Cell col={7}>
                                <h4>To:</h4>
                                <DatePicker
                                    value={this.state.to}
                                    selected={this.state.to}
                                    onChange={date => this.handleDateChange('to', date)}
                                    minDate={this.state.from}
                                    maxDate={new Date()}
                                />
                                <br />
                                <br />
                            </Cell>
                            </div>

                        </Grid>
                        <div className='pad-left'>
                            < Button type="submit" style={{
                                backgroundColor: 'blue',
                                color: 'white'
                            }}>Generate
                    </Button>
                        </div>
                    </ValidatorForm>
                </div>

                <br />
                <div className='floatRight wrapper round-more' style={{ display: (this.state.display ? 'block' : 'none') }}>
                    <MDBContainer>
                        <MDBCard className="card-body"
                            style={{ backgroundColor: " #efeff5\n", width: "auto", marginTop: "auto" }}>
                            <MDBCardTitle>The average of vital check during the period</MDBCardTitle>
                            <Grid>
                                <Cell col={4}>
                                    <br /><br />
                                    <Alert key={5} variant={'info'} style={{ fontSize: "auto" }}>
                                        Total Number of Assessments: {count_assessment}
                                        <br />
                                        Average Systolic : {this.state.vital_check[0]}
                                        <br />
                                        Average Diastolic : {this.state.vital_check[1]}
                                        <br />
                                        Average Heart-rate : {this.state.vital_check[2]}
                                    </Alert>
                                </Cell>
                                <Cell col={8}>
                                    <CommunityPieChart
                                        array={this.state.pie_array}
                                    />
                                </Cell>
                            </Grid>
                        </MDBCard>

                        <br />

                        <MDBCard className="card-body"
                            style={{ backgroundColor: " #efeff5\n", width: "auto", marginTop: "auto" }}>
                            <MDBCardTitle>Monthly average vital check Report</MDBCardTitle>
                            <CommunityGraph
                                array={this.state.graph_array}
                            />
                        </MDBCard>
                    </MDBContainer>
                </div>
            </div>
        )
    }
}

export default CommunityReport;
