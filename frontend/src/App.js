// All the rest of the content of the landing page is coming from 
import React, {Component} from 'react';
import logo from './logo.svg';
import {Layout, Header, Navigation, Drawer, Content} from 'react-mdl';
import {Link} from 'react-router-dom';
import Nav from './components/navigation';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="demo-big-content">
          <Layout fixedHeader>
              <Header className = "header-color" title="CRADLE" transparent scroll waterfall seamed>
                  <Navigation>
                      <Link to ="/">Home</Link>
                      <Link to ="/users/hello">Hello</Link>
                      <Link to ="/login">Login</Link>
                      <Link to ="/assessments/all">Assessments</Link>
                      <Link to ="/users/PatientList">PatientList</Link>
                      <Link to ="/users/PatientChart">PatientChart</Link>
                      
                  </Navigation>
              </Header>
              <Drawer title="CRADLE">
                  <Navigation>
                      <Link to ="/">Home</Link>
                      <Link to ="/users/hello">Hello</Link>
                      <Link to ="/login">Login</Link>
                  </Navigation>
              </Drawer>
              <Content>
                  <div className="page-content" />
                  <Nav/>
              </Content>
          </Layout>
      </div>
    );
  }
}
  

export default App;
