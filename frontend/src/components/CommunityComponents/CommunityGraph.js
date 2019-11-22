import React from "react";
import {Line} from "react-chartjs-2";
import {MDBContainer} from "mdbreact";
import RequestServer from '../RequestServer';

class CommunityGraph extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataLine: [],
        }
    }

    componentDidMount() {
        //this.getMatchingPatientID(this.props.patient_id)
        //this.timer = setInterval(() => this.getMatchingPatientID(this.props.patient_id), 10000);
        this.getPatientList()
        this.setState({
            dataLine: {
                labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
                datasets: [
                    {
                        label: "Systolic",
                        fill: true,
                        backgroundColor: "rgba(255, 157, 148, .3)",
                        borderColor: "red",
                        data: []
                    },
                    {
                        label: "Diastolic",
                        fill: true,
                        backgroundColor: "rgba(97, 105, 255, .3)",
                        borderColor: "blue",
                        data: []
                    },
                    {
                        label: "Heart Rate",
                        fill: true,
                        backgroundColor: "rgba(159, 255, 133, .3)",
                        borderColor: "Green",
                        data: []
                    }
                ]
            },
            options: {
                legend: {
                    labels: {
                        fontColor: "white"
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: "white",
                            fontSize: 15
                        }
                    }]
                }
            }
        })
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    populateData(response) {
        console.log(response)

        var dataLineArray = []
        var labels = []

        var systolicData = []
        var diastolicData = []
        var heartRateData = []

        var datasets = [
            {
                label: "Systolic",
                fill: true,
                backgroundColor: "rgba(255, 157, 148, .3)",
                borderColor: "red",
                data: systolicData
            },
            {
                label: "Diastolic",
                fill: true,
                backgroundColor: "rgba(97, 105, 255, .3)",
                borderColor: "blue",
                data: diastolicData
            },
            {
                label: "Heart Rate",
                fill: true,
                backgroundColor: "rgba(159, 255, 133, .3)",
                borderColor: "Green",
                data: heartRateData
            }
        ]
        response.forEach(list_of_assessments => {
            //Array of dates
            if (list_of_assessments.date.split(" ",4).length > 3) {
                var tempdate = (list_of_assessments.date.split(" ",4))
                tempdate.shift()
                labels.push(tempdate.join(' '))
              } else {
                  labels.push(list_of_assessments.date)
            }
            //3 Arrays for readings
            systolicData.push(list_of_assessments.systolic)
            diastolicData.push(list_of_assessments.diastolic)
            heartRateData.push(list_of_assessments.heart_rate)

            var dataLine_obj = {
                labels: labels,
                datasets: datasets
            }
       
            dataLineArray.push(dataLine_obj)
        });

        //Shows a blank page on graph if no list of assessments exists
        if(typeof dataLineArray[0] !== "undefined"){
        this.setState({dataLine: dataLineArray[0]})
        }
        else{
            window.alert("No history found")
        }
    }

    async getPatientList() {
        var passback = await RequestServer.getAssessmentsList()
        if (passback != null) {
            console.log(passback.data)
            //Converts dates in list_of_assessments to Date format to sort by date
            this.populateData(passback.data.sort(function(a,b){
                a = Utility.convertStringToDate(a.date);
                b = Utility.convertStringToDate(b.date);
                return a > b ? 1 : a < b ? -1 : 0;
            })
            )
        }
    }
    render() {
        return (
            <MDBContainer style={{backgroundColor: 'white'}}>
                <h3 className="mt-5">{this.props.patient_name}</h3>
                <Line data={this.state.dataLine} options={{responsive: true}}/>
            </MDBContainer>
        );
    }
}

export default CommunityGraph;