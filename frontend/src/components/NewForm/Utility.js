/*
    Helper functions for the forms:
    ..CovertDate - convert Date format to string
 */
import { Component } from 'react';

class Utility extends Component{

    //convert date to the "Month Date, Year" format
    static convertDate(prev_date) {
        const MONTH_ARR = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let month = MONTH_ARR[prev_date.getMonth()];
        let date = prev_date.getDate();
        let year = prev_date.getFullYear();
        var date_string = month + " " + date + ", " + year
        return date_string;
    }

    
    //RETURN User username and id
    static populateUser(response) {
        var user_array = []
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
}

export default Utility; //if I use new keyword here, I can use all the methods without static keyword. but it's should be a static class
