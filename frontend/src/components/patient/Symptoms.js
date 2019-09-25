import React from 'react';
import symptoms from "./symptomData";
import ShowSymp from "./SymptomsForm";

class Symptoms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            symp: symptoms
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
    }

    handleSubmit(id){

    }


    render() {
        const symptom = this.state.symp.map(item => <ShowSymp key = {item.id} item = {item}
        handleChange = {this.handleChange}/>)
        return (
            <form>
                {symptom}
                <button>Submit</button>
            </form>
        )
    }

}

// const Symptoms = () => {
//     return (
//         <form>
//             <div>
//                 <label>ID Number</label>
//                 <input type="text" name="id" required />
//                 <label>Initial</label>
//                 <input type="text" name="initial" required />
//             </div>
//             <div>
//                 <label>Age</label>
//                 <input type="number" name="age" required />
//             </div>
//             <div>
//                 <label>status</label>
//                 <input type="text" name="status"/>
//             </div>
//             <div>
//                 <label>Gestational Age</label>
//                 <input type="number" name="gestational"/>
//             </div>
//             <button type="submit">Next</button>
//         </form>
//     )
// }
export default Symptoms;