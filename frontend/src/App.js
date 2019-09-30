// All the rest of the content of the landing page is coming from 
import React, {Component} from 'react';
import logo from './logo.svg';
import {Layout, Header, Navigation, Drawer, Content} from 'react-mdl';
import {Link} from 'react-router-dom';
import Nav from './components/navigation';
import './App.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class App extends Component {
  render() {
    return (
      <div className="demo-big-content">
          <Layout fixedHeader>
              <Header className = "header-color" title="CRADLE" transparent scroll waterfall seamed>
                  <Navigation>
                      <Link to ="/">Home</Link>
                      <Link to ="/users/form">New Assessment</Link>
                      <Link to ="/login">Login</Link>
                      <Link to ="/assessments/all">Assessments</Link>
                      <Link to ="/users/PatientList">PatientList</Link>
                      <Link to ="/users/PatientChart">PatientChart</Link>
                      <Link to ="/users/admin/landing">Admin Landing page</Link>
                  </Navigation>
              </Header>
              <Drawer title="CRADLE">
                  <Navigation>
                      <Link to ="/">Home</Link>
                      <Link to ="/users/form">New Assessment</Link>
                      <Link to ="/login">Login</Link>
                      <Link to ="/assessments/all">Assessments</Link>
                      <Link to ="/users/PatientList">PatientList</Link>
                      <Link to ="/users/PatientChart">PatientChart</Link>
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
