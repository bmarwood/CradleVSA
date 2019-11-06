import React, {Component} from 'react';
import MaterialTable from 'material-table';
import './PatientComponents/PatientList.css';
import requestServer from './RequestServer';


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
                {title: 'Username', field: 'username'},
                {title: 'Role', field: 'role', type: 'array'},
                {title: 'Name', field: 'name'},
                {title: 'Surname', field: 'surname'},
                {title: 'Sex', field: 'sex'},
                {title: 'Birth Year', field: 'birthYear', type: 'numeric'},
                {title: 'ID Number', field: 'id', type: 'numberic'}
            ],
            Data: [
                {
                    username: 'Loading',
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
    
    getUserRoles(user) {
        var roleString = ''
        if (user && user.roles) {
            user.roles.forEach(role => {
                roleString = roleString + " " + role.role + ", "
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
            var name = user.name.split(' ')[0]
            var surname = user.name.split(' ')[1]
            var sex = user.gender
            var birthYear = user.dob
            var id = user.id

            var user_obj = {
                username: username,
                role: roleString,
                name: name,
                surname: surname,
                sex: sex,
                birthYear: birthYear,
                id: id
            }

            UserList.push(user_obj)
        });

        this.setState({data: UserList})

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
                    editable={{
                        onRowDelete: oldData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    var didDelete = this.deleteUser(oldData)
                                    console.log(oldData)
                                    if (didDelete) {
                                        const data = [...this.state.data];
                                        data.splice(data.indexOf(oldData), 1);
                                        this.setState({
                                            locations: data
                                        });
                                    }
                                }, 600);
                            }),


                    }}
                />
            </div>

        );
    }


}


export default UserList;