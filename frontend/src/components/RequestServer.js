import {Component} from 'react';
import axios from 'axios';
import Utility from './NewForm/Utility'
import '../App.css';


var IsVM = false;

class RequestServer extends Component {

    getServerLocation() {
        if (IsVM) {
            return 'http://cmpt373.csil.sfu.ca:8083'
        }
        return 'http://localhost:8080'
    }

    async getLocations() {
        try {
            var response = await axios.get(this.getServerLocation() + '/location/all')
            return response
        } catch (error) {
            console.log('error block')
            console.log(error)
            return null
        }
    }

    async addLocation(location) {
        try {
            var response = await axios.post(this.getServerLocation() + '/location/add', location)
            return response
        } catch (error) {
            console.log('error block')
            console.log(error)
            return null
        }
    }

    async deleteLocation(id) {
        try {
            var response = await axios.delete(this.getServerLocation() + '/location/delete/' + id)
            return response
        } catch (error) {
            console.log('error block')
            console.log(error)
            return null
        }
    }

    async getPatient(patient_ID) {
        try {
            var response = await axios.get(this.getServerLocation() + '/patients/all')
            return response
        } catch (error) {
            console.log('error block')
            console.log(error)
            return null
        }
    }

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

    async getVHTList() {
        try {
            var response = await axios.get(this.getServerLocation() + '/vhts/all')
            return response
        } catch (error) {
            console.log('error block')
            console.log(error)
            return null
        }
    }

    //get list of assessments based on the worker id
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

    //get list of assessments based on the patient id
    async getAssessmentsByPatientId(patient_id) {
        try {
            var response = await axios.get(this.getServerLocation() + '/assessments/getAByPatientId' + patient_id)
            return response
        } catch (error) {
            console.log('error block')
            console.log(error)
            return null
        }
    }

    //TEST : http://localhost:8080/patients/get1
    //get only single patient by the patient id
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


    async updateUserPassword(user) {
        try {
            let response = await axios.post(this.getServerLocation() + '/users/updatePassword/' + user.id + "/" + user.username + "/" + user.old_password + "/" + user.new_password)
            return response
        } catch (error) {
            console.log('error block')
            console.log(error)
            return null
        }
    }

    async updateUser(user) {
        try {
            let response = await axios.post(this.getServerLocation() + '/users/update/' + user.id, user)
            return response
        } catch (error) {
            console.log('error block')
            console.log(error)
            return null
        }
    }
}

export default new RequestServer();
