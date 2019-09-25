import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.symptoms = {
            symptoms: [
                {id: 1, name: 'No Symptoms (patient healthy)'},
                {id: 2, name: 'Headache'},
                {id: 3, name: 'Blurred vision'},
                {id: 4, name: 'Abdominal pain'},
                {id: 5, name: 'Bleeding'},
                {id: 6, name: 'Feverish'},
                {id: 7, name: 'Unwell'}
            ]
        }
    }


    render() {
        return (
            <li>
                <h3>{this.symptoms.symptoms.id}</h3>
                <p>{this.symptoms.symptoms.name}</p>
            </li>
        )
    }

}

const Symptoms = () => {
    return (
        <form>
            <div>
                <label>ID Number</label>
                <input type="text" name="id" required />
                <label>Initial</label>
                <input type="text" name="initial" required />
            </div>
            <div>
                <label>Age</label>
                <input type="number" name="age" required />
            </div>
            <div>
                <label>status</label>
                <input type="text" name="status"/>
            </div>
            <div>
                <label>Gestational Age</label>
                <input type="number" name="gestational"/>
            </div>
            <button type="submit">Next</button>
        </form>
    )
}
export default Symptoms;