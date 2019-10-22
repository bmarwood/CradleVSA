import { Component } from 'react';
import axios from 'axios';
import '../App.css';

var IsVM = false;



class RequestServer extends Component {
    
    getServerLocation() {
        if (IsVM) {
            return 'http://cmpt373.csil.sfu.ca:8083'
        }
        return 'http://localhost:8080'
    }

    // getPatient(patient_ID) {
    //     try {
    //         var response = await axios.get(getServerLocation() + '/patients/all')
    //         return response
    //     }
    //     catch (error) {
    //         console.log('error block')
    //         console.log(error)
    //         return null
    //     }
    // }

    async addAssessment(assessment) {
        try {
            var response = await axios.post(this.getServerLocation() + '/assessments/add', assessment)
            return response
        }
        catch (error) {
            console.log('error block')
            console.log(error)
            return null
        }
    }

    async addPatient(patient) {
        try {
            var response = await axios.post(this.getServerLocation() + '/patients/add', patient)
            return response
        }
        catch (error) {
            console.log('error block')
            console.log(error)
            return null
        }
    }
    
    async addUser(user) {
        try {
            var response = await axios.post(this.getServerLocation() + '/users/register', user)
            console.log("RESPONSE IN ADD USER : ", response)
            return response
        }
        catch (error) {
            console.log('error block')
            console.log(error)
            return null
        }
    }
    
    async getPatient(id){
        try {
            var response = await axios.get(this.getServerLocation() + '/patients/get' + id)
            return response
        }
        catch (error) {
            console.log('error block')
            console.log(error)
            return null
        }
    }

    async getVHT(id){
        try {
            var response = await axios.get(this.getServerLocation() + '/vhts/get' + id)
            return response
        }
        catch (error) {
            console.log('error block')
            console.log(error)
            return null
        }
    }

    async getAssessmentsList() {
        try {
            var response = await axios.get(this.getServerLocation() + '/assessments/all')
            return response
        }
        catch (error) {
            console.log('error block')
            console.log(error)
            return null
        }
    }

     async getPatientList() {
        try {
            var response = await axios.get(this.getServerLocation() + '/patients/all')
            return response
        }
        catch (error) {
            console.log('error block')
            console.log(error)
            return null
        }
    }

    async login(username, password) {
        var userObj = {
            username: username,
            password: password
        }
        try {
            var response = await axios.post(this.getServerLocation() + '/users/login', userObj)
            return response
        }
        catch (error) {
            console.log('error block')
            console.log(error)
            return null
        }
    }

}
export default new RequestServer();