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

            if (role.role === 'ADMIN') {
                this.setState({
                    isAdmin: true
                })
            }

            if (role.role === 'USER') {
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

    loginHandler = async (e) => {
        e.preventDefault()
        var passback = await requestServer.login(this.state.username, this.state.password)
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