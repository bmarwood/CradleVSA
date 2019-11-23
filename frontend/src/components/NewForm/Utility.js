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
                roleArray.push(role.role)
            })
        }
        return roleArray;
    }

    static filterByDate(assessments, from, to) {
        let to_date = new Date(to)

        let filtered_data = {
            assessments: [],
            diastolic: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            systolic: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            heart_rate: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            num_assessment: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            vital_check: [0, 0, 0],
            num_yellow_up: 0,
            num_yellow_down: 0,
            num_red_up: 0,
            num_red_down: 0,
            num_green: 0,
        }
        //change date to include the current date
        to_date.setHours(0, 0, 0, 0);
        to_date.setDate(to.getDate() + 1);

        if (filtered_data.assessments.length === 0) {
            return filtered_data
        }
        //+startDate2 == +startDate3
        assessments.forEach(assessment => {
            this.filterBlood(assessment, filtered_data)
            let assessment_Date = new Date(assessment.date)
            if (+assessment_Date >= +from && +assessment_Date <= +to_date) {
                filtered_data.vital_check[0] += assessment.systolic
                filtered_data.vital_check[1] += assessment.diastolic
                filtered_data.vital_check[2] += assessment.heart_rate
                filtered_data.assessments.push(assessment)
                this.filterColor(assessment, filtered_data)
            }
        })
        this.getAvg(filtered_data)
        let num_filtered_data = filtered_data.assessments.length
        filtered_data.vital_check = filtered_data.vital_check.map(function (x) {
            return Math.round(x / num_filtered_data);
        })
        return filtered_data
    }

    static getAvg(data) {
        for (let index in data.diastolic) {
            if (data.num_assessment[index] !== 0) {
                data.diastolic[index] = Math.round(data.diastolic[index] / data.num_assessment[index])
                data.systolic[index] = Math.round(data.systolic[index] / data.num_assessment[index])
                data.heart_rate[index] = Math.round(data.heart_rate[index] / data.num_assessment[index])
            }
        }
    }

    static filterBlood(assessment, data) {
        let date = new Date(assessment.date)
        let index = date.getMonth()
        data.diastolic[index] += assessment.diastolic
        data.systolic[index] += assessment.systolic
        data.heart_rate[index] += assessment.heart_rate
        data.num_assessment[index] += 1

    }

    static filterColor(assessment, filtered_data) {
        if (assessment.ews_color === "YELLOW") {
            if (assessment.arrow === "UP") {
                filtered_data.num_yellow_up++
            } else {
                filtered_data.num_yellow_down++
            }
        } else if (assessment.ews_color === "RED") {
            if (assessment.arrow === "UP") {
                filtered_data.num_red_up++
            } else {
                filtered_data.num_red_down++
            }
        } else {
            filtered_data.num_green++
        }
    }

}

export default Utility; //if I use new keyword here, I can use all the methods without static keyword. but it's should be a static class
