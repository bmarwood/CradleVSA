/*
    Helper functions for the forms:
    ..CovertDate - convert Date format to string
 */
import {Component} from 'react';
import RequestServer from "../RequestServer";


class Utility extends Component {
    static MONTH_ARR = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    //convert date to the "Month Date, Year" format
    static convertDate(prev_date) {
        let month = this.MONTH_ARR[prev_date.getMonth()];
        let date = prev_date.getDate();
        let year = prev_date.getFullYear();
        var string_date = month + " " + date + ", " + year
        return string_date;
    }

    static convertStringToDate(string_date) {
        let date = new Date();
        let mmAndDD = string_date.split(", ")[0]
        let yy = parseInt(string_date.split(", ")[1])
        let dd = parseInt(mmAndDD.split(" ")[1])
        let mm = this.MONTH_ARR.indexOf(mmAndDD.split(" ")[0])
        date.setFullYear(yy, mm, dd);
        return date;
    }


    //RETURN User username and id
    static populateUser(response) {
        var user_array = []
        this.populateVHT(response);
        response.forEach(user => {
            var username = user.username
            var name = user.name
            var id = user.id

            var user_obj = {
                username: username,
                name: name,
                id: id
            }
            user_array.push(user_obj)
        });
        return user_array;
    }


    //RETURN valid VHT ID
    static populateVHT(response) {
        var user_array = []
        response.forEach(user => {
            var roles = user.roles;
            var id = user.id;
            roles.forEach(role => {
                if (role.role === "VHT") {
                    var user_obj = {
                        id: id,
                        name: id
                    }
                    user_array.push(user_obj)
                }
            });
        });
        return user_array;
    }


    static populatePatient(response) {
        var patient = {
            id: response.id,
            name: response.name,
            birth_date: response.birth_date,
            list_of_assessments: response.list_of_assessments,
            gender: response.gender
        }
        return patient;
    }


    static getRoles() {
        var roleArray = []
        var user = localStorage.getItem("userData")
        var parsedUser = JSON.parse(user)
        if (parsedUser && parsedUser.roles) {
            parsedUser.roles.forEach(function (role) {
                //console.log("User data is : " + role.role)
                roleArray.push(role.role)
            })
        }
        return roleArray;
    }

    static filterByDate(assessments, from, to) {
        to = to.setDate(to.getDate() + 1);
        let filtered_assessments = []
        if (assessments.length === 0) {
            return filtered_assessments
        }
        //+startDate2 == +startDate3
        assessments.forEach(assessment => {
            let assessment_Date = new Date(assessment.date)
            if (+assessment_Date >= +from && +assessment_Date <= +to) {
                filtered_assessments.push(assessment)
            }
        })
        return filtered_assessments
    }

}

export default Utility; //if I use new keyword here, I can use all the methods without static keyword. but it's should be a static class
