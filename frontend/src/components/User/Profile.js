import React, { Component, PostForm } from 'react';
import Button from '@material-ui/core/Button';
import SimpleList from './SimpleList'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import RequestServer from '../RequestServer';

//Profile class which gets user data from localStorage and display accordingly
class Profile extends Component {
    constructor(props) {
        super(props);
        let userData = JSON.parse(localStorage.getItem('userData'));
        this.state = {
            id : userData.id,
            username: userData.username,
            password: userData.password,
            name: userData.name,
            dob: userData.dob,
            address: userData.address,
            gender: userData.gender,
            roles: userData.roles,
            isInEditMode: false
        }
        console.log(this.state)

    }


    
    //Submit button handler to the back-end
    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        fetch('/api/form-submit-url', {
          method: 'POST',
          body: data,
        });
      }

    changeEditMode = () => {
        this.setState({
            isInEditMode: !this.state.isInEditMode
        })
    }

    //update the component after user clicks submit
    updateComponentValue = () => {
        this.setState({
            isInEditMode: false,
            name: this.refs.theTextInput.value
        })
    }

    renderEditView = () => {
        return <div className="landing-form" style = {{color : "white"}}>
            <input
                type = "text"
                defaultValue = {this.state.name}
                ref = "theTextInput"
            />
            SimpleList.SimpleList()
            <button onClick={this.changeEditMode}>X</button>
            <button onClick={this.updateComponentValue}>Submit</button>
        </div> 
    }

    renderDefaultView = () => {
        return <div className="landing-form" style = {{color : "white"}} onDoubleClick={this.changeEditMode}>
            {this.state.name}
        </div>
    }

    render() {
        return this.state.isInEditMode ? 
        this.renderEditView() : 
        this.renderDefaultView()
        
    }
}

export default Profile;


// <div className="landing-form" style = {{color : "white"}}>
            //     <h1> Your Profile</h1>
            //     <h2 style = {{color : "white"}}>Hello Ms.{this.state.name}</h2>
            //     <p>Username: {this.state.username}</p>
            //     <p>Full Name: {this.state.username}</p>
            //     <p>Date Of Birth: {this.state.dob}</p>
            //     <p>Address: {this.state.address}</p>
            //     <p>Gender: {this.state.gender}</p>
            // </div>