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
    }
  }


  loginHandler = e => {
    e.preventDefault()
    console.log(e)
    console.log(this.state)
    axios.post('http://localhost:8080/users/login', this.state)
        .then(response => {
            window.location.href = '/'
            console.log("response from server: ", response, this.state)
            console.log("decomposing response: ", response.data.id, " ", response.data.name, response.status)
        })
        .catch(error => {
            console.log('error block')
            console.log(error)
        })
  }

  render() {
      return (
        <div>
          <MuiThemeProvider>
            <div className='login-form'>

            <TextField
              hintText="Enter your Username"
              floatingLabelText="Username"
              floatingLabelStyle={styles.input}
              onChange = {(event,newValue) => this.setState({username:newValue})}
              />
            <br/>
              <TextField
                type="password"
                hintText="Enter your Password"
                floatingLabelText="Password"
                floatingLabelStyle={styles.input}
                onChange = {(event,newValue) => this.setState({password:newValue})}
                />
              <br/>
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
};

export default Login;