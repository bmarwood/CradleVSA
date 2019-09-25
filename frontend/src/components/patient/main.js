import React, {Component} from "react";
import {Link} from 'react-router-dom';

function main (){
    return(
        <div>
            <ul>
                <li><Link to = {"/patient"}> Patient </Link></li>
                <li><Link to = {"/symptoms"}> Symptoms </Link></li>
                <li><Link to={"/vital"}> Vital </Link></li>
            </ul>
        </div>
    )
}

export default main
