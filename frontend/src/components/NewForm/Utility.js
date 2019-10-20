/*
    Helper functions for the forms:
    ..CovertDate - convert Date format to string
 */

class Utility{
    
    //convert date to the "Month Date, Year" format
    static convertDate(prev_date) {
        const MONTH_ARR = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let month = MONTH_ARR[prev_date.getMonth()];
        let date = prev_date.getDate();
        let year = prev_date.getFullYear();
        var date_string = month + " " + date + ", " + year
        return date_string;
    }
}

export default Utility;
