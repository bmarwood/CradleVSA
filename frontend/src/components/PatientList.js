import React from 'react';
import MaterialTable from 'material-table';

export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Surname', field: 'surname' },
      { title: 'Sex', field: 'sex'},
      { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
      { title: 'ID Number', field: 'id', type: 'numberic'},
    ],
    data: [
      { name: 'Mehmet',
        surname: 'Baran',
        sex: 'M', 
        birthYear: 1987, 
        id: 849567 },
      {
        name: 'Zerya Betül',
        surname: 'Baran',
        sex: 'M',
        birthYear: 2017,
        id: 374856,
      },
      {
        name: 'Shayla',
        surname: 'Owens',
        sex: 'F',
        birthYear: 1991,
        id: 384957,
      },
      {
        name: 'Kirsten',
        surname: 'Turner',
        sex: 'F',
        birthYear: 1972,
        id: 794057,
      },
    ],
  });

  return (
    <MaterialTable
      title="Patients"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.push(newData);
              setState({ ...state, data });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data });
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              setState({ ...state, data });
            }, 600);
          }),
      }}

  //Other Actions
  actions={[
    {
      //Graph button
      icon: 'assessment',
      tooltip: 'Graph',
      onClick: (event, rowData) => {
        //Replace videos.js with graph page
        window.open("videos.js",'popUpWindow',
        'height=500,width=500,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes')
      }
    }
  ]}
    />
  );
}