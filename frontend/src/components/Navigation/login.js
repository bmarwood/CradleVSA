import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import React, { Component } from 'react';
import requestServer from '../RequestServer';

import '../../App.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            id: '',
            error: false,
            errorMsg: '',
            isAdmin: false,
            isUser: false,
        }
        this.keyPressed = this.keyPressed.bind(this)

    }

    setTheState(response) {
        this.setState({
            id: response.data.name,
        })
    }

    setRole(response) {
        response.data.roles.forEach(role => {

            console.log("role given to user: ", role)
            console.log("role given to user: ", role.role)

            if (role.role === 'ADMIN') {
                console.log('is admin')
                this.setState({
                    isAdmin: true
                })
            }

            if (role.role === 'USER') {
                console.log('is user')
                this.setState({
                    isUser: true
                })
            }

        });
    }

    navigate(response) {
        if (this.state.isAdmin) {
            this.props.history.push(
                '/admin-dashboard',
                { detail: response.data }
            )
            window.location.reload()
        } else {
            this.props.history.push(
                '/user-dashboard',
                { detail: response.data }
            )
            window.location.reload()
        }
    }

    testConsoleLog(response) {
        var user = localStorage.getItem("userData")
        console.log("User data is : " + user)
        console.log("response from server: ", response, this.state)
        console.log("decomposing response: ", response.data.id, " ", response.data.name, response.status)
    }

    loginHandler = async (e) => {
        e.preventDefault()
        var passback = await requestServer.login(this.state.username, this.state.password)
        // console.log(passback)
        if (passback === null) {
            this.setState({
                error: true,
                errorMsg: 'Invalid Login'
            })

        } else {
            localStorage.setItem("isLoggedIn", "true")
            localStorage.setItem("userData", JSON.stringify(passback.data))
        

            this.setTheState(passback)
            // this.testConsoleLog(passback)
            this.setRole(passback)
            this.navigate(passback)
        }

    }



    showErrorMsg() {
        return <p>{this.state.errorMsg}</p>
    }

    keyPressed(event) {
        if (event.key === "Enter") {
            console.log(event)
            this.loginHandler(event)
        }
    }


    render() {

        return (
            <div>
                <MuiThemeProvider>
                    <div className='login-form'>
                        <h2 style={{ color: "white" }}> Please Login </h2>

                        <TextField
                            hintText="Enter your Username"
                            inputStyle={styles.white}
                            floatingLabelText="Username"
                            hintStyle={styles.grey}
                            floatingLabelStyle={styles.input}
                            onChange={(event, newValue) => this.setState({ username: newValue })}
                            onKeyPress={this.keyPressed}

                        />
                        <br />
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            inputStyle={styles.white}
                            hintStyle={styles.grey}
                            floatingLabelText="Password"
                            floatingLabelStyle={styles.input}
                            onChange={(event, newValue) => this.setState({ password: newValue })}
                            onKeyPress={this.keyPressed}

                        />
                        <br />
                        <div className='errorMsg'>
                            {(this.state.error ? this.showErrorMsg() : '')}
                        </div>
                        <RaisedButton label="Submit" primary={true} style={styles.button}
                            onClick={(event) => this.loginHandler(event)} />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}


const styles = {
    'button': {
        margin: 15,
    },
    'input': {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        width: '100%',
        color: 'white'
    },
    'white': {
        color: 'white'
    },
    'grey': {
        color: 'grey'
    }
};

export default Login;