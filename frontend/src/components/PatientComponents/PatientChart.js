import React from "react";
import {Line} from "react-chartjs-2";
import {MDBContainer} from "mdbreact";
import './PatientChart.css';
import '../../Modals/GraphPopup';
import RequestServer from '../RequestServer';


class PatientChart extends React.Component {
    /*
      state = {
        dataLine: {
          labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
          datasets: [
            {
              label: "Systolic",
              fill: true,
              backgroundColor: "rgba(255, 157, 148, .3)",
              borderColor: "red",
              data: [65, 59, 80, 81, 56, 55, 40, 50, 62, 81, 90, 100]
            },
            {
              label: "Diastolic",
              fill: true,
              backgroundColor: "rgba(97, 105, 255, .3)",
              borderColor: "blue",
              data: [60, 102, 98, 80, 86, 90, 90, 82, 91, 95, 85, 80]
            },
            {label: "Heart Rate",
              fill: true,
              backgroundColor: "rgba(159, 255, 133, .3)",
              borderColor: "Green",
              data: [80, 89, 98, 150, 86, 81, 90, 82, 91, 95, 120, 200]
          }
          ]

        },
        options: {
          legend:{
            labels:{
              fontColor: "white"
            }
          },
          scales:{
            yAxes:[{
              ticks:{
                fontColor: "white",
                fontSize: 15
              }
            }]
          }
        }
      };
    
   */
    constructor(props) {
        super(props);
        this.state = {
            dataLine: []
        }
    }

    componentDidMount() {
        this.getMatchingPatientID("81991")
        this.timer = setInterval(() => this.getMatchingPatientID("81991"), 10000);
        //this.getPatientList()
        //this.timer = setInterval(() => this.getPatientList(), 10000);

        this.setState({
            dataLine: {
                labels: ["Jan", "Feb", "March"],
                datasets: [
                    {
                        label: "Systolic",
                        fill: true,
                        backgroundColor: "rgba(255, 157, 148, .3)",
                        borderColor: "red",
                        data: [2, 3 ,4]
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
        response.forEach(list_of_assessments =>{
            systolicData.push(list_of_assessments.systolic)
            diastolicData.push(list_of_assessments.diastolic)
            heartRateData.push(list_of_assessments.heart_rate)
        })

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
            
            labels.push(list_of_assessments.date)

              var dataLine_obj= {
              labels: labels,
              datasets: datasets
            }
            dataLineArray.push(dataLine_obj)
        });

        this.setState({dataLine: dataLineArray[0]})

    }

   async getMatchingPatientID(patient_id) {
    var passback = await RequestServer.getPatientByID(patient_id)
    if (passback != null) {
        this.populateData(passback.data.list_of_assessments
        )
        console.log(passback.data.list_of_assessments)
        console.log("passback.data.list_of_assessments[0]")
        console.log(passback.data.list_of_assessments[0].heart_rate)
    }
}

    async getPatientList() {
        var passback = await RequestServer.getPatientList()
        if (passback !== null) {
            this.populateData(passback.data)
        }
    }

    render() {
        return (
            <MDBContainer style={{backgroundColor: 'white'}}>
                <h3 className="mt-5">Blood Pressure and Heart Rate</h3>
                <Line data={this.state.dataLine} options={{responsive: true}}/>
            </MDBContainer>
        );
    }
}

export default PatientChart;