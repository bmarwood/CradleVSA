import React from "react"

function PatientForm(props){
    return (
        <form onSubmit={props.handleSubmit}>
            <input
                type="text"
                value={props.data.id}
                name="id"
                placeholder="ID Number"
                onChange={props.handleChange}
            />
            <br/>
            <input
                type="text"
                value={ props.data.initial}
                name="initial"
                placeholder="Initial"
                onChange={props.handleChange}
            />
            <br/>
            <input
                type="text"
                value={ props.data.age}
                name="age"
                placeholder="Age"
                onChange={props.handleChange}
            />
            <br/>


            <select
                value={props.data.status}
                onChange={props.handleChange}
                name="status"
            >
                <option value=""> --SELECT ONE---</option>
                <option value="week"> Week</option>
                <option value="month"> Month</option>
                <option value="n/a"> Not Pregnent</option>
            </select>

            <input
                type="text"
                value={props.data.gAge}
                name="gAge"
                placeholder="Gestational Age"
                onChange={props.handleChange}
            />

            {/*<input type = "submit" />*/}
            <button>Submit</button>
        </form>
    )
}

export default PatientForm