import React from 'react';
import symptoms from "./symptomData";
import ShowSymp from "./SymptomsForm";

class Symptoms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            symp: symptoms,
            other: ""
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(id){
        this.setState(prevState => {
            const updatedSymp = prevState.symp.map(each => {
                if(each.id === id){
                    each.checked = !each.checked
                }
                return each
            })
            return {
                symp: updatedSymp
            }
        })
        console.log(this.state.symp)
    }
    //
    // handleInputChange(event){
    //     this.setState({
    //         [event.target.name]: event.target.value
    //     })
    // }

    handleSubmit(id){

    }


    render() {
        const symptom = this.state.symp.map(item => <ShowSymp key = {item.id} item = {item}
        handleChange = {this.handleChange}/>)
        return (
            <form>
                {symptom}
                {/*<input*/}
                {/*    type="text"*/}
                {/*    value={this.state.other}*/}
                {/*    name="other"*/}
                {/*    placeholder="Other Symptoms"*/}
                {/*    onChange={this.handleInputChange}*/}
                {/*/>*/}
                {/*<button>Submit</button>*/}

            </form>
        )
    }

}


export default Symptoms;