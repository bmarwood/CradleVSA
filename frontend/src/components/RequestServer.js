import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

var IsVM = false;

function getServerLocation() {
    if (IsVM) {
        return 'http://cmpt373.csil.sfu.ca:8083'
    }
    return 'http://localhost:8080'
}

class RequestServer extends Component {
    constructor(props) {
        super(props)
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
            var response = await axios.post(getServerLocation() + '/assessments/add', assessment)
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
            var response = await axios.get(getServerLocation() + '/assessments/all')
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
            var response = await axios.get(getServerLocation() + '/patients/all')
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
            var response = await axios.post(getServerLocation() + '/users/login', userObj)
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