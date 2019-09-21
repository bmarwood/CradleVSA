// All the rest of the content of the landing page is coming from 
import React, {Component} from 'react';
import {List, ListItem} from 'react-mdl';
import logo from '../logo.svg';
import axios from 'axios';

import '../App.css';

class LandingPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id : '',
            name : '',
            salary : '',
            username: '',
            password: '',
        }
    }
    changeHandler = (e) => {
        this.setState({ [e.target.name] : e.target.value })
    }

    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        axios.post('http://localhost:8080/users/add', this.state)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

/*   componentDidMount() {
    setInterval(this.hello, 250);
}

hello = () => {
    fetch('/')
        .then(response => response.text())
        .then(message => {
            this.setState({message: message});
        });
}; */

  render() {
      const {id,name,salary} = this.state
      return (
          <div className="landing-form">
                {/* <h1 className="App-title">{this.state.message}</h1> */}
                <form onSubmit = {this.submitHandler}>
                    <div>
                        <p style = {{color: 'white'}}>Input ID</p>
                        <input type = "text" name = "id" title = "ID" value = {id} onChange = {this.changeHandler}/>
                    </div>
                    <div>
                        <p style = {{color: 'white'}}>Input Name</p>
                        <input type = "text" name = "name" title = "Name" value = {name} onChange = {this.changeHandler}/>
                    </div>
                    <div>
                        <p style = {{color: 'white'}}>Input Salary</p>
                        <input type = "text" name = "salary" title = "Salary" value = {salary} onChange = {this.changeHandler}/>
                    </div>
                    <button type = "submit"> Submit </button>
                </form>
          </div>
      );
  }
}

//Class Component
class FirstComponent extends Component {
  render() {
    return (
      <div className = "first-component">
        My Cradle
      </div>
    );
  }
}

//Class Component
class SecondComponent extends Component {
  render() {
    return (
      <div className = "second-component">
        <List>
            <ListItem>Bryan Cranston</ListItem>
            <ListItem>Aaron Paul</ListItem>
            <ListItem>Bob Odenkirk</ListItem>
        </List> 
      </div>

    );
  }
}

//Function Component
function ThirdComponent() {
  return (
    <div className = "third-component">
        This is third component
    </div>
  );
}

export default LandingPage;
