import React from "react";
import {Pie} from "react-chartjs-2";
import {MDBContainer} from "mdbreact";

class ChartsPage extends React.Component {
    constructor(props) {
        super(props)
    }

    static getDerivedStateFromProps(props, state) {
        return {
            dataPie: {
                labels: ["Red Up", "Red Down", "Yellow Down", "Yellow Up", "Green"],
                datasets: [
                    {
                        data: props.array,
                        backgroundColor: [
                            "#ff3300",
                            "#cc0000",
                            "#ffff00",
                            "#ffffcc",
                            "#66ff33",
                        ],
                        hoverBackgroundColor: [
                            "#ff8566",
                            "#ff0000",
                            "#ffffe6",
                            "#ffffe6",
                            "#b3ff99",
                        ]
                    }
                ]
            }
        };
    }


    render() {
        return (
            <MDBContainer>
                <Pie data={this.state.dataPie} options={{responsive: true}}/>
            </MDBContainer>
        );
    }
}

export default ChartsPage;