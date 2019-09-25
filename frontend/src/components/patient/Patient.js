import React, {Component} from "react";
import PatientForm from "./PatientForm"

class Patient extends Component{
    constructor(){
        super()
        this.state = {
            id: "",
            initial: "",
            age: "",
            status: "",
            gAge: ""
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event){
        //actions to handle submit
    }




    render(){
        return(
            <div>
                <PatientForm
                    handleChange = {this.handleChange}
                    handleSubmit = {this.handleSubmit}
                    data = {this.state}
                />
            </div>
        )
    }
}

export default Patient