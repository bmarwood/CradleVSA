import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import React, {Component} from 'react';
import axios from 'axios';
import '../App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      id: '',
      name:'',
      address: '',
      dob: '',
      gender: '',
      username:'',
      password:'',
      passwordRetyped:'',
      error: false,
      errorMsg: '',
      disableButton: false,
    }
  }

  checkPasswordMatch() {
    if (this.state.password.trim() === "" || this.state.password != this.state.passwordRetyped) {
        console.log('Passwords mismatched')
        this.setState({
            error: true,
            errorMsg: "Passwords do not match"
        }, () => {console.log(this.state.password, this.state.passwordRetyped)})
        return false;
    }
    return true;
  }

  testConsoleLog(response) {
    console.log("response from server: ", response, this.state)
    console.log("decomposing response: ", response.data.id, " ", response.data.name, response.status)
  }

  clearFields() {
    this.setState({
        id: '',
        name:'',
        address: '',
        dob: '',
        gender: '',
        username:'',
        password:'',
        passwordRetyped:'',
        error: false,
        errorMsg: '',
        disableButton: true
    }, () => { document.getElementById("register-form").reset() })
  }


  isFieldEmpty() {
    if (this.state.id === "" || this.state.name === "") {
      return true;
    }
    if (this.state.address === "" || this.state.gender === "") {
      return true;
    }
    if (this.state.dob === "" || this.state.username === "") {
      return true;
    }

    return false;
  }

  registerHandler = e => {
    e.preventDefault()

    var passwordMatch = this.checkPasswordMatch()
    var fieldEmpty = this.isFieldEmpty()

    if (!passwordMatch) {return;}

    if (fieldEmpty) {return;}

    console.log("State before calling register function", this.state)

    axios.post('http://localhost:8083/users/register', this.state)
        .then(response => {
            toast("User Added");
            this.clearFields()
          })
        .catch(error => {
            console.log('error block')
            console.log(error)
            this.setState({
              error: true, 
              errorMsg: 'Unable to register'
            })
        })
  }

  showErrorMsg() {
    return <p>{this.state.errorMsg}</p>
  }

  radioHandler(e) {
    console.log(e.target)
    var target = e.target.name
    var value = e.target.value

    this.setState({
      [target]: value
    }, () => {console.log("gender in state: ", this.state.gender)})
  }

  handleDatePicker(value) {

    this.setState({
      dob: value
    }, () => {console.log("Current State", this.state)})
    
  }

  render() {
  toast.configure()

      return (
        <div>
          <MuiThemeProvider>
            <div className='login-form'>
              <form id="register-form">
                <TextField
                  hintText="Enter your Worker Id"
                  inputStyle={styles.white}
                  floatingLabelText="Worker Id"
                  hintStyle={styles.grey}
                  floatingLabelStyle={styles.input}
                  onChange = {(event,newValue) => this.setState({id:newValue})}
                />
                <br/>
                <TextField
                  hintText="Enter your Name"
                  inputStyle={styles.white}
                  floatingLabelText="Name"
                  hintStyle={styles.grey}
                  floatingLabelStyle={styles.input}
                  onChange = {(event,newValue) => this.setState({name:newValue})}
                />
                <br/>
                <TextField
                  hintText="Address"
                  inputStyle={styles.white}
                  floatingLabelText="Address"
                  hintStyle={styles.grey}
                  floatingLabelStyle={styles.input}
                  onChange = {(event,newValue) => this.setState({address:newValue})}
                />
                <br/>
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
                  <TextField
                    type="password"
                    hintText="Retype your Password"
                    inputStyle={styles.white}
                    hintStyle={styles.grey}
                    floatingLabelText="Retype your Password"
                    floatingLabelStyle={styles.input}
                    onChange = {(event,newValue) => this.setState({passwordRetyped:newValue})}
                  />
                  <br/>
                  <TextField
                    hintText="(MM/DD/YYYY)"
                    inputStyle={styles.white}
                    floatingLabelText="Date Of Birth (MM/DD/YYYY)"
                    hintStyle={styles.grey}
                    floatingLabelStyle={styles.input}
                    onChange = {(event,newValue) => this.setState({dob:newValue})}
                  />
                  <br/>
                  <br/>

                  <input type="radio" value="MALE" name="gender" checked={this.state.gender === "MALE"} onChange = {(e) => this.radioHandler(e)}/> Male
                  <input type="radio" value="FEMALE" name="gender" checked={this.state.gender === "FEMALE"} onChange = {(e) => this.radioHandler(e)}/> Female

                  <div className='errorMsg'>
                    {(this.state.error ? this.showErrorMsg() : '' )}
                  </div>

                  <ToastContainer position={toast.POSITION.BOTTOM_RIGHT}/>
                  <RaisedButton disable={this.state.disableButton} label="Register" primary={true} style={styles.button} onClick={(event) => this.registerHandler(event)}/>
                  
                </form>
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

export default Register;