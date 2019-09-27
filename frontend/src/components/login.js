import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import React, {Component} from 'react';
import axios from 'axios';

import '../App.css';

import { Redirect } from 'react-router-dom';


class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      id: '',
      error: false,
      errorMsg: '',
    }
  }

  setTheState(response) {
    this.setState({
      id: response.data.name,
    })
  }

  testConsoleLog(response) {
    console.log("response from server: ", response, this.state)
    console.log("decomposing response: ", response.data.id, " ", response.data.name, response.status)
  }

  loginHandler = e => {
    e.preventDefault()

    axios.post('http://localhost:8080/users/login', this.state)
        .then(response => {
            localStorage.setItem("isLoggedIn", "true")
            this.setTheState(response)
            this.testConsoleLog(response)
            this.props.history.push(
              '/dashboard',
              { detail: response.data }
            )
        })
        .catch(error => {
            console.log('error block')
            console.log(error)
            this.setState({
              error: true, 
              errorMsg: 'Invalid Login'
            })
        })
  }

  showErrorMsg() {
    return <p>{this.state.errorMsg}</p>
  }

  render() {

      return (
        <div>
          <MuiThemeProvider>
            <div className='login-form'>

            <TextField
              hintText="Enter your Username"
              inputStyle={styles.white}
              floatingLabelText="Username"
              hintStyle={styles.grey}
              floatingLabelStyle={styles.input}
              onChange = {(event,newValue) => this.setState({username:newValue})}
              />
            <br/>
              <TextField
                type="password"
                hintText="Enter your Password"
                inputStyle={styles.white}
                hintStyle={styles.grey}
                floatingLabelText="Password"
                floatingLabelStyle={styles.input}
                onChange = {(event,newValue) => this.setState({password:newValue})}
                />
              <br/>
              <div className='errorMsg'>
                {(this.state.error ? this.showErrorMsg() : '' )}
              </div>
              <RaisedButton label="Submit" primary={true} style={styles.button} onClick={(event) => this.loginHandler(event)}/>
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