import React, {Component} from 'react';

class Reference extends Component{
    constructor(){
        super()
        this.state = {
            firstName: "",
            lastName: "",
            isChecked: true,
            gender: "",
            favColor: "blue",
        }
        this.handleChange = this.handleChange.bind(this)
    }

    // handleChange(event){
    //     this.setState({
    //         [event.target.name]: event.target.value
    //     })
    // }

    handleChange(event){
        const {name, value, type, checked} = event.target
        type === "checkbox" ? this.setState({[name] : checked}) : this.setState({
            [name]: value
        })
    }

    handleSumbit(event){

    }


    render() {
        return(
            <form onSubmit = {this.handleSubmit}>
                <input
                    type = "text"
                    value = {this.state.firstName}
                    name = "firstName"
                    placeholder = "First Name"
                    onChange = {this.handleChange}
                />
                <br/>
                <input
                    type = "text"
                    value = {this.state.lastName}
                    name = "lastName"
                    placeholder = "Lirst Name"
                    onChange = {this.handleChange}
                />
                //Checkedbox
                <input
                    type = "checkbox"
                    name = "isFriendly"
                    checked = {this.state.isChecked}
                    onChange = {this.handleChange}
                /> Is checked?

                //Radio Button
                <label>
                    <input
                        type = "raido"
                        name = "gender"
                        value = "male"
                        checked = {this.state.isChecked}
                        onChange = {this.handleChange}
                    /> Male
                </label>

                //Radio Button
                <label>
                    <input
                        type = "raido"
                        name = "gender"
                        value = "male"
                        checked = {this.state.gender === "male"}
                        onChange = {this.handleChange}
                    /> Male
                </label>

                //Radio Button
                <label>
                    <input
                        type = "raido"
                        name = "gender"
                        value = "female"
                        checked = {this.state.gender === "female"}
                        onChange = {this.handleChange}
                    /> Female
                </label>

                //Select Box
                <label>
                    Favorite Color:
                </label>
                <select
                    value = {this.state.favColor}
                    onChange = {this.handleChange}
                    name = "favColor"
                >
                    <option value = "blue"> Blue </option>
                    <option value = "red"> Red </option>
                    <option value = "yellow"> Yellow </option>
                </select>

                {/*<input type = "submit" />*/}
                <button>Submit</button>
            </form>
        )

    }

}

export default Reference
