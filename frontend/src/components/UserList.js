import React, { Component } from 'react';
import MaterialTable from 'material-table';
import './PatientList.css';
import requestServer from './RequestServer';


class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            data: []
        }
    }

    componentDidMount() {
        this.getPatientList()
        this.setState({
            columns: [
                {title: 'Username', field: 'username'},
                {title: 'Password', field: 'password'},
                {title: 'Role', field: 'role', type: 'array'},
                {title: 'Name', field: 'name'},
                {title: 'Surname', field: 'surname'},
                {title: 'Sex', field: 'sex'},
                {title: 'Birth Year', field: 'birthYear', type: 'numeric'},
                {title: 'ID Number', field: 'id', type: 'numberic'}
            ],
            Data: [
                {
                    username: 'ahoward849567',
                    password: 'password1',
                    role: ["CHO "],
                    name: 'Ann',
                    surname: 'Howard',
                    sex: 'Female',
                    birthYear: 1987,
                    id: 849567
                }
            ]

        })
    }
}

export default UserList