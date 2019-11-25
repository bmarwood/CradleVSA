import { Component } from 'react';
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

    async getLocations() {
        try {
            var response = await axios.get(this.getServerLocation() + '/location/all')
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async addLocation(location) {
        try {
            var response = await axios.post(this.getServerLocation() + '/location/add', location)
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async deleteLocation(id) {
        try {
            var response = await axios.delete(this.getServerLocation() + '/location/delete/' + id)
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async addAssessment(assessment) {
        try {
            var response = await axios.post(this.getServerLocation() + '/assessments/add', assessment)
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async addPatient(patient) {
        try {
            var response = await axios.post(this.getServerLocation() + '/patients/add', patient)
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async addUser(user) {
        try {
            var response = await axios.post(this.getServerLocation() + '/users/register', user)
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async getPatient(id) {
        try {
            var response = await axios.get(this.getServerLocation() + '/patients/get' + id)
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async getAllVHTs() {
        try {
            var response = await axios.get(this.getServerLocation() + '/vhts/all')
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async getVhtById(id) {
        try {
            var response = await axios.get(this.getServerLocation() + '/vhts/get' + id)
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async getCVSA(id) {
        try {
            var response = await axios.get(this.getServerLocation() + '/users/get' + id)
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async getAssessmentsList() {
        try {
            var response = await axios.get(this.getServerLocation() + '/assessments/all')
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async getReferredAssessments() {
        try {
            var response = await axios.get(this.getServerLocation() + '/assessments/getReferred')
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async getPatientList() {
        try {
            var response = await axios.get(this.getServerLocation() + '/patients/all')
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }


    async getPatientVHTList(user_id, role) {
        try {
            var response = await axios.get(this.getServerLocation() + '/patients/all')
            var userMap = await this.getUserList()
            var vhtList = []
            var vhtWithPatients = []
            //all vhts from userlist
            for (let x = 0; x < userMap.data.length; x++) {
                for (let y = 0; y < userMap.data[x].roles.length; y++) {
                    if (userMap.data[x].roles[y].role === "VHT") {
                        if(role === "CHO"){
                            if(userMap.data[x].manager_id ===user_id)
                            {
                                vhtList.push(userMap.data[x].id)
                            }

                        }
                        else{
                            vhtList.push(userMap.data[x].id)
                            //this.getPatientVHTListFilter(user_id, userMap.data[x])
                        }
                    }
                }
            }
            var newResponse = []
            var flag = false
            //all patients that have a vht_id or "EMPTY"
            for (let a = 0; a < response.data.length; a++) {
                if (response.data[a].vht_id == null || response.data[a].vht_id === "EMPTY") {
                    newResponse.push(response.data[a])
                    flag = true
                }
                if (vhtList.includes(response.data[a].vht_id)) {
                    if (!vhtWithPatients.includes(response.data[a].vht_id)) {
                        vhtWithPatients.push(response.data[a].vht_id)
                    }
                    newResponse.push(response.data[a])
                }
            }
            response.flag = flag
            response.data = newResponse
            response.vhtlist = vhtWithPatients
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async getVHTList() {
        try {
            var response = await axios.get(this.getServerLocation() + '/vhts/all')
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async getPatientListByVhtId(id) {
        try {
            var response = await axios.get(this.getServerLocation() + '/patients/belongTo' + id)
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }

    //get list of assessments based on the worker id
    async getAssessmentsByCVSAId(id) {
        try {
            var response = await axios.get(this.getServerLocation() + '/assessments/getByCVSAId' + id)
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }

    //get list of assessments based on the worker id and filters by date
    async getAssessmentsByCVSAIdByDate(id, from, to) {
        try {
            var response = await axios.get(this.getServerLocation() + '/assessments/filter/getByCVSAId' + id + "/" + from + "/" + to)
            return response
        } catch (error) {
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
            console.log(error)
            return null
        }
    }

    //get list of assessments based on the patient id
    async getAssessmentsByLocation(location_id) {
        try {
            var response = await axios.get(this.getServerLocation() + '/assessments/getByLocation' + location_id)
            return response
        } catch (error) {
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
            console.log(error)
            return null
        }
    }

    async getLastAssessmentByPatientByID(patient_id) {
        try {
            var response = await axios.get(this.getServerLocation() + '/assessments/last/getByPatientId' + patient_id)
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async getLastAssessmentByCVSAByID(CVSA_id) {
        try {
            var response = await axios.get(this.getServerLocation() + '/assessments/last/getByCVSAId' + CVSA_id)
            return response
        } catch (error) {
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
            console.log(error)
            return null
        }
    }


    async getUserList() {
        try {
            var response = await axios.get(this.getServerLocation() + '/users/all')
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async getUserListCHO(user_id){
        try {
            var temp_user_list = []
            var response = await axios.get(this.getServerLocation() + '/users/all')
            for (let a = 0; a < response.data.length; a++) {
                if(response.data[a].manager_id === user_id){
                    temp_user_list.push(response.data[a])
                }
            }
            response.data = temp_user_list
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }

    //update patient.assessment list
    async updatePatientAssessmentList(patient_id, assessment) {
        try {
            let patient = await this.getPatientByID(patient_id)
            let new_patient = Utility.populatePatient(patient.data)
            new_patient.list_of_assessments.push(assessment)
            var response = await axios.post(this.getServerLocation() + '/patients/update/' + patient_id, new_patient)
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }


    async updateUserPassword(user) {
        try {
            let response = await axios.post(this.getServerLocation() + '/users/updatePassword/' + user.id + "/" + user.username + "/" + user.old_password + "/" + user.new_password)
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async updateUser(user) {
        try {
            let response = await axios.post(this.getServerLocation() + '/users/update/' + user.id, user)
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }


    async updatePatient(patient) {
        try {
            let response = await axios.post(this.getServerLocation() + '/patients/update/' + patient.id, patient)
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }

    //delete patient & delete assessments
    async deletePatient(patient_id) {
        try {
            let response = await axios.delete(this.getServerLocation() + '/patients/delete/' + patient_id)
            return response

        } catch (error) {
            console.log(error)
            return null
        }
    }

    async deleteUser(user_id) {
        try {
            var response = await axios.delete(this.getServerLocation() + '/users/delete/' + user_id)
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async deleteAssessment(assessment_id) {
        try {
            var response = await axios.delete(this.getServerLocation() + '/assessments/delete/' + assessment_id)
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async updateReferral(assessment) {
        try {
            var response = await axios.post(this.getServerLocation() + '/assessments/updateReferral/' + assessment._id, assessment)
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async getMedicationList() {
        try {
            var response = await axios.get(this.getServerLocation() + '/medications/all')
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async getMedicationListByID(patient_id) {
        try {
            var response = await axios.get(this.getServerLocation() + '/medications/get' + patient_id)
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }
    async addMedications(medications) {
        try {
            var response = await axios.post(this.getServerLocation() + '/medications/add', medications)
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }


    async deleteMedication(id) {
        try {
            let response = await axios.delete(this.getServerLocation() + '/medications/delete' + id)
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }
}



export default new RequestServer();
