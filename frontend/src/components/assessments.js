// All the rest of the content of the landing page is coming from 
import React, {Component} from 'react';
import {List, ListItem} from 'react-mdl';
import logo from '../logo.svg';
import '../App.css';

class Assessments extends Component {

  state = {
    isLoading: true,
    assessments: [],
    error: null
  };

  componentDidMount() {
      setInterval(this.assessments, 250);
  }

  assessments = () => {
      fetch('/assessments/all')
          .then(response => response.text())
          .then(message => {
              this.setState({message: message});
          });
  };

  render() {
    const { isLoading, assessments, error} = this.state
      return (
          <div className="App">
              <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo"/>
                  <h1 className="App-title">{this.state.message}</h1>
                  <FirstComponent />
              </header>
              
          </div>
      );
  }
}

//Class Component
class FirstComponent extends Component {
  render() {
    return (
      <div className = "Assess-component">
         <span className="assesslist">&#x3C;AssessList /&#x3E;</span>
  
      </div>
    );
  }
}


//Class Component
class SecondComponent extends Component {
  render() {
    return (
      <div className = "second-component">
        My Body 
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

export default Assessments;
