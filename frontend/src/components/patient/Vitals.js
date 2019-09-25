import React, {Component} from "react"

class Vitals extends Component{
    constructor(){
        super()
        this.state = {
            systolic : "",
            diastolic : "",
            heartRate : ""
        }
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return(
            <form>
                <input
                    type="text"
                    value={this.state.systolic}
                    name="systolic"
                    placeholder="Systolic"
                    onChange={this.handleChange}
                />
                <br/>
                <input
                    type="text"
                    value={this.state.diastolic}
                    name="diastolic"
                    placeholder="Diastolic"
                    onChange={this.handleChange}
                />
                <br/>
                <input
                    type="text"
                    value={this.state.heartRate}
                    name="heartRate"
                    placeholder="HeartRate"
                    onChange={this.handleChange}
                />
                <br/>
                <input type  = "submit" />
            </form>
        )
    }
}

export default Vitals
