// All the rest of the content of the landing page is coming from 
import React, {Component} from 'react';
import {Layout, Header, Navigation, Drawer, Content} from 'react-mdl';
import {Link} from 'react-router-dom';
import Nav from './components/navigation';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import WorkerNav from './components/workerNav'
import AdminNav from './components/adminNav'
import LoggedOutNav from './components/loggedOutNav'
import HealthWorkerDrawer from './components/healthWorkerDrawer'
import AdminDrawer from './components/adminDrawer'
import ChoDrawer from "./components/choDrawer";

const Role_Termination_Integer = -1

class App extends Component {

    getRoles() {
        var roleArray = []
        var user = localStorage.getItem("userData")
        var parsedUser = JSON.parse(user)
        if (parsedUser && parsedUser.roles) {
            parsedUser.roles.forEach( function(role) {
                console.log("User data is : " + role.role)
                roleArray.push(role.role)
            })
        }
        
        return roleArray
    }

    ifLoggedIn() {
        var roles = this.getRoles()

        if (localStorage.getItem('isLoggedIn') === 'true' && this.isHealthWorker(roles)) {
            return (<HealthWorkerDrawer/>)
        } else if(localStorage.getItem('isLoggedIn') === 'true' && this.isCHO(roles)) {
            return (<ChoDrawer/>)
        } else if (localStorage.getItem('isLoggedIn') === 'true' && this.isAdmin(roles)) {
            return (<AdminDrawer/>)
        } else {
            return (
                <Navigation>
                    <Link to ="/login">Login</Link>
                </Navigation>
            )
        }
    }

    isHealthWorker(roles) {
        if (roles.indexOf("HEALTH_WORKER") > Role_Termination_Integer) {
            return true
        }
        
        return false 
    }

    isAdmin(roles) {
        if (roles.indexOf("ADMIN") > Role_Termination_Integer) {
            return true
        }
        
        return false 
    }
    isCHO(roles){
        if (roles.indexOf("COMMUNITY_HEALTH_OFFICER") > Role_Termination_Integer){
            return true
        }
        return false
    }
    navBasedOnLogin() {
        var roles = this.getRoles()

        if (localStorage.getItem('isLoggedIn') === 'true' && this.isHealthWorker(roles)) {
            return (                  
                <WorkerNav/>
            )
        }
        else if (localStorage.getItem('isLoggedIn') === 'true' && this.isAdmin(roles)) {
            return (                  
                <AdminNav/>      
            )
        }
        else if (localStorage.getItem('isLoggedIn') === 'true' && this.isCHO(roles)) {
            return (
                <WorkerNav/>
            )
        }
        else {
            return (                        
                <LoggedOutNav/>
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
                            {this.ifLoggedIn()}

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
