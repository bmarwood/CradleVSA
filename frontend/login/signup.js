import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './App';

class SignUp extends Component{
    constructor(props) {
        super(props);
        this.info = {
            fname : "",
            lname : "",
            email : "",
            pw : "",
            confirm_pw : "",
            confirm_code : "",
            userType : ""
        }
    }

    //PATTERN MATCHING SHOULD BE DONE !!!!!!
    formValidation(){
        return(
            this.info.fname.length > 0 &&
            this.info.lname.length > 0 &&
            this.info.email.length > 0 &&
            this.info.pw.length > 0 &&
            this.info.pw.length == this.info.confirm_pw
        );
    }

    getValidCode(userType){
        switch(userType) {
            case "VHT" :
                return("VHT")
                break;
            case "HealthWorker":
                return("HEALTH CARE")
                break;
            case "ADMIN":
                return("ADMIN")
            default:
                return("INVALID")
            // code block
        }
    }

    codeValidation(){
        return(
            this.info.confirm_code == this.getValidCode(this.info.userType)
        )
    }


}