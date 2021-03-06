import React, { Component } from 'react';
import MaterialTable from 'material-table';
import './PatientComponents/PatientList.css';
import requestServer from './RequestServer';
import UpdateUserPopup from "../Modals/UpdateUserPopup";
import { Link } from 'react-router-dom';


class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            data: []
        }
        this.deleteUser = this.deleteUser.bind(this)
    }

    componentDidMount() {
        this.getUserList()
        this.timer = setInterval(() => this.getUserList(), 10000);
        this.setState({
            columns: [
                { title: 'User Info', field: 'id', type: 'numberic' },
                { title: 'Username', field: 'username' },
                { title: 'Name', field: 'name' },
                { title: 'Surname', field: 'surname' },
                { title: 'Role', field: 'role', type: 'array' },
                { title: 'Sex', field: 'sex' },
                { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
                {
                    title: 'Update information',
                    field: 'update',
                    headerStyle: { textAlign: 'center' },
                    cellStyle: { textAlign: 'center' }
                },
            ],
            Data: [
                {
                    username: 'Loading',
                    role: ["Loading "],
                    name: 'Loading',
                    surname: 'Loading',
                    sex: 'Loading',
                    birthYear: 'Loading',
                    id: <button className="ui icon button"> <i className="info icon"/></button>,
                    update: <UpdateUserPopup />
                }
            ]

        })
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    async deleteUser(user) {
        let response = await requestServer.deleteUser(user.id)
        if (response !== null) {
            return true
        }
        return false
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getUserRoles(user) {
        var roleString = ''
        if (user && user.roles) {

            var roles = []
            user.roles.forEach(element => {
                let role = this.capitalizeFirstLetter(element.role.toLowerCase()).replace(/_/g, " ")
                roles.push(role)
            });

            roles = roles.join(", ")
            return roles
        }
        return roleString
    }

    populateData(response) {
        var UserList = []

        response.forEach(user => {
            var roleString = this.getUserRoles(user)

            var username = user.username
            var name = user.name.split(' ')[0]
            var surname = user.name.split(' ')[1]
            var sex = user.gender
            var birthYear = user.dob
            var id = user.id
            var update = <UpdateUserPopup
                id={user.id}
            />

            var user_obj = {
                username: username,
                role: roleString,
                name: name,
                surname: surname,
                sex: sex,
                birthYear: birthYear,
                id: <button className="ui icon button"> <Link to={`/cvsa${id}`}><i className="info icon"/></Link></button>,
                update: update
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

    updateRow(oldData) {
        this.props.history.push(
            '/newWorker',
        )
    }


    render() {

        return (
            <div className="table-position">
                <MaterialTable
                    title="User"
                    columns={this.state.columns}
                    data={this.state.data}
                    editable={{
                        onRowDelete: oldData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    var didDelete = this.deleteUser(oldData)
                                    if (didDelete) {
                                        const data = [...this.state.data];
                                        data.splice(data.indexOf(oldData), 1);
                                        this.setState({
                                            data: data
                                        });
                                    }
                                }, 1000);
                            }),

                    }}
                />
            </div>

        );
    }


}


export default UserList;