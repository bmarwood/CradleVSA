// All the rest of the content of the landing page is coming from 
import React, {Component} from 'react';
import {Layout, Header, Navigation, Drawer, Content} from 'react-mdl';
import {Link} from 'react-router-dom';
import Nav from './components/navigation';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';


class App extends Component {
  render() {
    return (
      <div className="demo-big-content">
          <Layout fixedHeader>
              <Header className = "header-color" title="CRADLE" transparent scroll waterfall seamed>
                  <Navigation>
                      <Link to ="/">Home</Link>
                      <Link to ="/users/admin/landing">Admin Landing page</Link>
                      <Link to ="/users/PatientList">Patient List</Link>
                      <Link to ="/users/AssessmentList">Assessments List</Link>
                      <Link to ="/users/PatientNotes">Note</Link>
                  </Navigation>
              </Header>
              <Drawer title="CRADLE">
                  <Navigation>
                      <Link to ="/login">Login</Link>
                      <Link to ="/users/form">New Assessment</Link>
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

    ifLoggedIn() {
        if(localStorage.getItem('isLoggedIn') === 'true') {
            return (<Link to ="/logout">Logout</Link>)
        } else {
            return (<Link to ="/login">Login</Link>)
        }
    }

    navBasedOnLogin() {
        if(localStorage.getItem('isLoggedIn') === 'true') {
            return (                        
            <Navigation>
                <Link to ="/">Home</Link>
                <Link to ="/users/admin/landing">Admin Landing page</Link>
                <Link to ="/users/PatientList">Patient List</Link>
                <Link to ="/users/AssessmentList">Assessments List</Link>
                <Link to ="/users/PatientChart">Patient Chart</Link>
                <Link to ="/resources">Resources</Link>
            </Navigation>
            )
        } else {
            return (                        
            <Navigation>
                <Link to ="/">Home</Link>
                <Link to ="/resources">Resources</Link>
            </Navigation>
            )
        }
    }

    render() {
        return (
            <div className="demo-big-content">
                <Layout fixedHeader>
                    <Header className = "header-color" title="CRADLE" transparent scroll waterfall seamed>
                        {this.navBasedOnLogin()}


                    </Header>
                    <Drawer title="CRADLE">
                        <Navigation>
                            {this.ifLoggedIn()}
                            <Link to ="/users/newAssessment">New Assessment</Link>
                            <Link to ="/users/newPatient">New Patient</Link>
                            <Link to ="/users/newUser">New User</Link>
                            <Link to ="/users/profile">Profile</Link>
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
