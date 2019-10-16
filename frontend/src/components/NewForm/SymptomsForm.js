import React from "react"

function SymptomsForm(props) {
    return(
        <div className = "sypmtoms">
            <p style={{ color: 'grey' }}>
            <input
                type = "checkbox"
                checked = {props.item.checked}
                onChange={() => props.handleChange(props.item.id)}
            />
            {props.item.name}</p>
        </div>
    )
}
export default SymptomsForm