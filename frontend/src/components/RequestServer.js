import {Component} from 'react';
import axios from 'axios';
import Utility from './NewForm/Utility'
import '../App.css';

var IsVM = true;


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
        } catch (error) {
            console.log('error block')
            console.log(error)
            return null
        }
    }

    async addPatient(patient) {
        try {
            var response = await axios.post(this.getServerLocation() + '/patients/add', patient)
            return response
        } catch (error) {
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
        } catch (error) {
            console.log('error block')
            console.log(error)
            return null
        }
    }

    async getPatient(id) {
        try {
            var response = await axios.get(this.getServerLocation() + '/patients/get' + id)
            return response
        } catch (error) {
            console.log('error block')
            console.log(error)
            return null
        }
    }

    async getVHT(id) {
        try {
            var response = await axios.get(this.getServerLocation() + '/vhts/get' + id)
            return response
        } catch (error) {
            console.log('error block')
            console.log(error)
            return null
        }
    }

    async getAssessmentsList() {
        try {
            var response = await axios.get(this.getServerLocation() + '/assessments/all')
            return response
        } catch (error) {
            console.log('error block')
            console.log(error)
            return null
        }
    }

    async getPatientList() {
        try {
            var response = await axios.get(this.getServerLocation() + '/patients/all')
            return response
        } catch (error) {
            console.log('error block')
            console.log(error)
            return null
        }
    }

    async getAssessmentsByUserId(id) {
        try {
            var response = await axios.get(this.getServerLocation() + '/assessments/getByUserId' + id)
            return response
        } catch (error) {
            console.log('error block')
            console.log(error)
            return null
        }
    }

    //TEST : http://localhost:8080/patients/get1
    //get only signle patient by the id
    async getPatientByID(patient_id) {
        try {
            var response = await axios.get(this.getServerLocation() + '/patients/get' + patient_id)
            return response
        } catch (error) {
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
        } catch (error) {
            console.log('error block')
            console.log(error)
            return null
        }
    }


    async getUserList() {
        try {
            var response = await axios.get(this.getServerLocation() + '/users/all')
            return response
        } catch (error) {
            console.log('error block')
            console.log(error)
            return null
        }
    }

    //update patient.assessment list
    async updatePatientAssessmentList(patient_id, assessment) {
        try {
            let patient = await this.getPatientByID(patient_id)
            console.log(patient.data.list_of_assessments)
            let new_patient = Utility.populatePatient(patient.data)
            new_patient.list_of_assessments.push(assessment)
            // new_patient.list_of_assessments.push([assessment.name, assessment.id])
            console.log("\n\n patient.data")
            console.log(new_patient)
            console.log(new_patient)

            var response = await axios.post(this.getServerLocation() + '/patients/update/' + patient_id, new_patient)
            return response
        } catch (error) {
            console.log('error block')
            console.log(error)
            return null
        }
    }

    async getNextAssessmentID() {
        let assessment_list = await this.getAssessmentsList();
        console.log(assessment_list.data)
        console.log(typeof (assessment_list.data))
        console.log(assessment_list.data.length)
        return assessment_list.data.length

    }
}

export default new RequestServer();
