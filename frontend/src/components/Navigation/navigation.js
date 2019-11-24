import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import LandingPage from '../landingpage';
import NewAssessment from '../NewForm/NewAssessment';
import NewPatient from '../NewForm/NewPatient';
import NewUser from '../NewForm/NewUser';
import Landing_List from '../AdminComponents/AdminLanding';
import Login from './login';
import NoMatchPage from '../NoMatchPage';
import Logout from './logout';
import Register from '../register';
import PatientList from '../PatientComponents/PatientList';
import AssessmentList from '../AssessmentComponents/AssessmentList';
import PatientNotes from '../PatientComponents/PatientNotes';
import PatientAddMedication from '../PatientComponents/PatientAddMedication';
import Resources from '../Resources';
import ChangePassword from '../UserProfile/ChangePassword'
import Profile from '../UserProfile/Profile';
import Location from '../location';
import NewLocation from '../NewForm/NewLocation';
import IndividualPatient from '../IndividualPatient';
import IndividualCVSA from '../IndividualCVSA';
import CommunityReport from "../CommunityComponents/CommunityReport";
import TransferPatient from '../transferPatient';
import ReferredList from "../Referral/ReferredList";
//import RequestReport from "../AdminComponents/RequestReport";
//import VhtReport from "../AdminComponents/vhtReport";

const Navigation = () => (
    <Switch>
        {/* General Route */}
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/login" component={Login}/>
        <Route path="/resources" component={Resources}/>
        {/* Private Route */}
        <PrivateRoute exact path="/user-dashboard" component={PatientList}/>
        <PrivateRoute exact path="/AssessmentList" component={AssessmentList}/>
        <PrivateRoute path="/logout" component={Logout}/>
        <PrivateRoute path="/profile" component={Profile}/>
        <PrivateRoute path="/changePassword" component={ChangePassword}/>

        {/* Admin Route */}
        <AdminRoute path="/location" component={Location}/>
        <AdminRoute path="/newlocation" component={NewLocation}/>
        <AdminRoute exact path="/admin-dashboard" component={Landing_List}/>
        <AdminRoute exact path="/register" component={Register}/>
        <AdminRoute path="/admin/landing" component={Landing_List}/>
        <AdminRoute path="/PatientAddMedication" component={PatientAddMedication}/>
        <AdminRoute path="/PatientNotes" component={PatientNotes}/>


        <WorkerRoute path="/PatientList" component={PatientList}/>
        <WorkerRoute path="/PatientNotes" component={PatientNotes}/>
        <WorkerRoute path="/newAssessment" component={NewAssessment}/>
        <WorkerRoute path="/newPatient" component={NewPatient}/>
        <WorkerRoute path="/ReferredList" component={ReferredList}/>
        <ManagerRoute path="/newWorker" component={NewUser}/>
        <WorkerRoute path="/CommunityReport" component={CommunityReport}/>

        <ManagerRoute path="/transfer" component={TransferPatient}/>
        {/* <ManagerRoute path = "/request-VHT-report" component = {RequestReport}/>
        <ManagerRoute path = "/vht-report" component = {VhtReport}/> */}


        <Route path="/patient:id" component={IndividualPatient} />
        <Route path="/cvsa:id" component={IndividualCVSA} />
        <Route component={NoMatchPage} />

    </Switch>
)


const Role_Termination_Integer = -1

function getRoles() {
    var roleArray = []
    var user = localStorage.getItem("userData")
    var parsedUser = JSON.parse(user)
    if (parsedUser && parsedUser.roles) {
        parsedUser.roles.forEach(function (role) {
            roleArray.push(role.role)
        })
    }


    return roleArray
}

function PrivateRoute({component: Component, authed, ...rest}) {

    return (
        <Route {...rest} render={(props) => (
            localStorage.getItem('isLoggedIn') === 'true'
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/login',
                    state: {from: props.location}
                }}/>
        )}/>

    )
}

//TODO: Need to create a page for unauth access.
function WorkerRoute({component: Component, authed, ...rest}) {

    var roles = getRoles()

    return (
        <Route {...rest} render={(props) => (
            localStorage.getItem('isLoggedIn') === 'true' && (roles.indexOf("HEALTH_WORKER") > Role_Termination_Integer || roles.indexOf("ADMIN") > Role_Termination_Integer || roles.indexOf("COMMUNITY_HEALTH_OFFICER") > Role_Termination_Integer)
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/',
                    state: {from: props.location}
                }}/>
        )}/>

    )
}

//TODO: Need to create a redirect page for unauth access.
function AdminRoute({component: Component, authed, ...rest}) {

    var roles = getRoles()

    return (
        <Route {...rest} render={(props) => (
            localStorage.getItem('isLoggedIn') === 'true' && roles.indexOf("ADMIN") > Role_Termination_Integer
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/',
                    state: {from: props.location}
                }}/>
        )}/>

    )
}

function ManagerRoute({component: Component, authed, ...rest}) {

    var roles = getRoles()

    return (
        <Route {...rest} render={(props) => (
            localStorage.getItem('isLoggedIn') === 'true' && (roles.indexOf("ADMIN") > Role_Termination_Integer || roles.indexOf("COMMUNITY_HEALTH_OFFICER") > Role_Termination_Integer)
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/',
                    state: {from: props.location}
                }}/>
        )}/>

    )
}


export default Navigation;