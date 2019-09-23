// All the rest of the content of the landing page is coming from 
import React, {Component} from 'react';
import {List, ListItem} from 'react-mdl';
import logo from '../logo.svg';
import '../App.css';

class Hello extends Component {

  state = {};

  componentDidMount() {
      setInterval(this.hello, 250);
  }

  hello = () => {
      fetch('/users/hello')
          .then(response => response.text())
          .then(message => {
              this.setState({message: message});
          });
  };

  render() {
      return (
          <div className="App">
              <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo"/>
                  <h1 className="App-title">{this.state.message}</h1>
                  <FirstComponent />
                  <SecondComponent />
                  <ThirdComponent />
              </header>
              
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

export default Hello;
