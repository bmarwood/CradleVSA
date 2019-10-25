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
        this.getUserList()
        this.setState({
            columns: [
                { title: 'Username', field: 'username' },
                { title: 'Password', field: 'password' },
                { title: 'Role', field: 'role', type: 'array' },
                { title: 'Name', field: 'name' },
                { title: 'Surname', field: 'surname' },
                { title: 'Sex', field: 'sex'},
                { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
                { title: 'ID Number', field: 'id', type: 'numberic'}
            ],
            Data:[
                {
                    username: 'Loading',
                    password: 'Loading',
                    role: ["Loading "],
                    name: 'Loading',
                    surname: 'Loading',
                    sex: 'Loading',
                    birthYear: 'Loading',
                    id: 'Loading' 
                }
            ]
    
        })
    }

    getUserRoles(user) {
        var roleString = ''
        if (user && user.roles) {
            user.roles.forEach(role => {
                roleString = roleString + " " + role.role
            })
            console.log('returning roles: ', roleString)
            return roleString
        }
        console.log('returning empty roles: ')

        return roleString
    }

    populateData(response) {
        var UserList = []

        response.forEach(user => {
            var roleString = this.getUserRoles(user)
  
            var username = user.username
            var password = user.password
            var name = user.name
            var surname = user.name.split(' ')[1]
            var sex = user.gender
            var birthYear = user.dob
            var id = user.id

            var user_obj = {
                username: username,
                password: password,
                role: roleString,
                name: name,
                surname: surname,
                sex: sex,
                birthYear: birthYear,
                id: id 
            }

            UserList.push(user_obj)
        });

        this.setState({ data: UserList })

    }

    async getUserList() {
        var passback = await requestServer.getUserList()
        if (passback !== null) {
            this.populateData(passback.data)
        }
    }


    render() {
        return (
            <div className="table-position">
                <MaterialTable
                    title="User"
                    columns={this.state.columns}
                    data={this.state.data}
                />
            </div>

        );
    }


}


export default UserList;