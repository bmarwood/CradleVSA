import React from 'react';
//import Reference from "./Reference"

const PatientForm = () => {
  return (
      //<Reference />
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
export default PatientForm;